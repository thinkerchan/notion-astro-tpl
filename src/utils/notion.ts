import { Client } from '@notionhq/client';
import { formatter } from './formatter';

const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
const databaseId = import.meta.env.NOTION_DATABASE_ID;

export async function getApps() {
  if (!import.meta.env.NOTION_API_KEY || !import.meta.env.NOTION_DATABASE_ID) {
    console.error('NOTION_API_KEY或NOTION_DATABASE_ID未定义');
    return [];
  }
  return fetchAppsFromNotion();
}

async function fetchAppsFromNotion() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const apps = await Promise.all(
      response.results.map(async (page: any) => {
        const pageId = page.id;
        const pageBlocks = await notion.blocks.children.list({ block_id: pageId });
        return {
          id: pageId,
          title: page.properties.title.title[0]?.plain_text,
          desc: page.properties.desc.rich_text[0]?.plain_text,
          icon: page.properties.icon.files[0]?.type === 'external' ? page.properties.icon.files[0].external.url : page.properties.icon.files[0]?.file.url,
          link: page.properties.link.url,
          tags: page.properties.tags.multi_select.map((tag: any) => {
            return {
              name: tag.name,
              color: tag.color
            }
          }) || [],
          content: formatter(pageBlocks.results),
        };
      })
    );

    return apps;
  } catch (error) {
    console.error('notion error:', error);
    return [];
  }
}