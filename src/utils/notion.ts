import { Client } from '@notionhq/client';
import { formatter } from './formatter';

const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
const databaseId = import.meta.env.NOTION_DATABASE_ID;

const formatDate = (date: string) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}`;
}

export async function getApps() {
  if (!import.meta.env.NOTION_API_KEY || !import.meta.env.NOTION_DATABASE_ID) {
    console.error(' check your .env file, NOTION_API_KEY or NOTION_DATABASE_ID is not defined');
    return [];
  }
  return fetchAppsFromNotion();
}

export async function getDatabase() {
  const database = await notion.databases.retrieve({
    database_id: databaseId
  });

  return {
    title: database.title[0]?.plain_text || '',
    description: database.description[0]?.plain_text || ''
  };
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
          icon: props.icon.files[0]?.type === 'external' ? props.icon.files[0].external.url : props.icon.files[0]?.file.url||'',
          emoji: props.emoji.rich_text[0]?.plain_text || page.icon?.emoji || '',
          link: props.link.url,
          tags: props.tags.multi_select.map((tag: any) => {
            return {
              name: tag.name,
              color: tag.color
            }
          }) || [],
          content: formatter(pageBlocks.results),
          date: formatDate(props.created_time.date?.start || page.created_time),
          isPin: props.pin.checkbox
        };
      })
    );

    return apps.sort((a, b) => {
      if (a.isPin === b.isPin) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (a.isPin) return -1;
      return 1;
    });

  } catch (error) {
    console.error('notion error:', error);
    return [];
  }
}