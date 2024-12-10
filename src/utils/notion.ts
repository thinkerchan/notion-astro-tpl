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
        const props = page.properties

        return {
          id: pageId,
          title: props.title.title[0]?.plain_text,
          desc: props.desc.rich_text[0]?.plain_text,
          icon: props.icon.files[0]?.type === 'external' ? props.icon.files[0].external.url : props.icon.files[0]?.file.url,
          link: props.link.url,
          tags: props.tags.multi_select.map((tag: any) => {
            return {
              name: tag.name,
              color: tag.color
            }
          }) || [],
          content: formatter(pageBlocks.results),
          date: page.created_time? new Date(page.created_time).toLocaleDateString() : '',
        };
      })
    );

    return apps;
  } catch (error) {
    console.error('notion error:', error);
    return [];
  }
}