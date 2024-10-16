// 由于每个人对富文本的解析需求不一样，所以这里只提供一个默认的解析方式，如果需要自定义解析方式，可以在blockHandlers中添加新的解析方式
// https://github.com/otoyo/astro-notion-blog/blob/main/src/lib/notion/client.ts 可以参考这个人对notion富文本的解析

const blockHandlers = {
  paragraph: (block: any) => ({
    content: block.paragraph.rich_text.map((text: any) => text.plain_text).join('') + '\n\n'
  }),
  heading_1: (block: any) => ({
    content: '# ' + block.heading_1.rich_text.map((text: any) => text.plain_text).join('') + '\n\n'
  }),
  heading_2: (block: any) => ({
    content: '## ' + block.heading_2.rich_text.map((text: any) => text.plain_text).join('') + '\n\n'
  }),
  heading_3: (block: any) => ({
    content: '### ' + block.heading_3.rich_text.map((text: any) => text.plain_text).join('') + '\n\n'
  }),
  bulleted_list_item: (block: any) => ({
    content: '- ' + block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join('') + '\n'
  }),
  numbered_list_item: (block: any) => ({
    content: '1. ' + block.numbered_list_item.rich_text.map((text: any) => text.plain_text).join('') + '\n'
  }),
  image: (block: any) => ({
    content: `![图片](${block.image.type === 'external' ? block.image.external.url : block.image.file.url})\n\n`
  }),
  video: (block: any) => ({
    content: block.video.type === 'external'
      ? `<iframe src="${block.video.external.url}" frameborder="0" allowfullscreen ></iframe>\n\n`
      : `<video src="${block.video.file.url}" controls></video>\n\n`
  }),
  embed: (block: any) => ({
    content: `<iframe src="${block.embed.url}" frameborder="0" allowfullscreen ></iframe>\n\n`
  })
};

export function formatter(blocks: any[]) {
  let content = '';

  blocks.forEach(block => {
    const handler = blockHandlers[block.type];
    if (handler) {
      const result = handler(block);
      content += result.content;
    }
  });

  return content.trim();
}