// 此代码使用了: https://github.com/otoyo/astro-notion-blog/blob/main/src/lib/notion/client.ts

function _buildRichText(richTextObject: responses.RichTextObject): RichText {
  const annotation: Annotation = {
    Bold: richTextObject.annotations.bold,
    Italic: richTextObject.annotations.italic,
    Strikethrough: richTextObject.annotations.strikethrough,
    Underline: richTextObject.annotations.underline,
    Code: richTextObject.annotations.code,
    Color: richTextObject.annotations.color,
  }

  const richText: RichText = {
    Annotation: annotation,
    PlainText: richTextObject.plain_text,
    Href: richTextObject.href,
  }

  if (richTextObject.type === 'text' && richTextObject.text) {
    const text: Text = {
      Content: richTextObject.text.content,
    }

    if (richTextObject.text.link) {
      text.Link = {
        Url: richTextObject.text.link.url,
      }
    }

    richText.Text = text
  } else if (richTextObject.type === 'equation' && richTextObject.equation) {
    const equation: Equation = {
      Expression: richTextObject.equation.expression,
    }
    richText.Equation = equation
  } else if (richTextObject.type === 'mention' && richTextObject.mention) {
    const mention: Mention = {
      Type: richTextObject.mention.type,
    }

    if (richTextObject.mention.type === 'page' && richTextObject.mention.page) {
      const reference: Reference = {
        Id: richTextObject.mention.page.id,
      }
      mention.Page = reference
    }

    richText.Mention = mention
  }

  return richText
}

function _buildBlock(blockObject: responses.BlockObject): Block {
  const block: Block = {
    Id: blockObject.id,
    Type: blockObject.type,
    HasChildren: blockObject.has_children,
  }

  switch (blockObject.type) {
    case 'paragraph':
      if (blockObject.paragraph) {
        const paragraph: Paragraph = {
          RichTexts: blockObject.paragraph.rich_text.map(_buildRichText),
          Color: blockObject.paragraph.color,
        }
        block.Paragraph = paragraph
      }
      break
    case 'heading_1':
      if (blockObject.heading_1) {
        const heading1: Heading1 = {
          RichTexts: blockObject.heading_1.rich_text.map(_buildRichText),
          Color: blockObject.heading_1.color,
          IsToggleable: blockObject.heading_1.is_toggleable,
        }
        block.Heading1 = heading1
      }
      break
    case 'heading_2':
      if (blockObject.heading_2) {
        const heading2: Heading2 = {
          RichTexts: blockObject.heading_2.rich_text.map(_buildRichText),
          Color: blockObject.heading_2.color,
          IsToggleable: blockObject.heading_2.is_toggleable,
        }
        block.Heading2 = heading2
      }
      break
    case 'heading_3':
      if (blockObject.heading_3) {
        const heading3: Heading3 = {
          RichTexts: blockObject.heading_3.rich_text.map(_buildRichText),
          Color: blockObject.heading_3.color,
          IsToggleable: blockObject.heading_3.is_toggleable,
        }
        block.Heading3 = heading3
      }
      break
    case 'bulleted_list_item':
      if (blockObject.bulleted_list_item) {
        const bulletedListItem: BulletedListItem = {
          RichTexts:
            blockObject.bulleted_list_item.rich_text.map(_buildRichText),
          Color: blockObject.bulleted_list_item.color,
        }
        block.BulletedListItem = bulletedListItem
      }
      break
    case 'numbered_list_item':
      if (blockObject.numbered_list_item) {
        const numberedListItem: NumberedListItem = {
          RichTexts:
            blockObject.numbered_list_item.rich_text.map(_buildRichText),
          Color: blockObject.numbered_list_item.color,
        }
        block.NumberedListItem = numberedListItem
      }
      break
    case 'to_do':
      if (blockObject.to_do) {
        const toDo: ToDo = {
          RichTexts: blockObject.to_do.rich_text.map(_buildRichText),
          Checked: blockObject.to_do.checked,
          Color: blockObject.to_do.color,
        }
        block.ToDo = toDo
      }
      break
    case 'video':
      if (blockObject.video) {
        const video: Video = {
          Caption: blockObject.video.caption?.map(_buildRichText) || [],
          Type: blockObject.video.type,
        }
        if (
          blockObject.video.type === 'external' &&
          blockObject.video.external
        ) {
          video.External = { Url: blockObject.video.external.url }
        }else if(blockObject.video.type === 'file' && blockObject.video.file){
          video.File = {
            Type: blockObject.video.type,
            Url: blockObject.video.file.url,
            ExpiryTime: blockObject.video.file.expiry_time,
          }
        }
        block.Video = video
      }
      break
    case 'image':
      if (blockObject.image) {
        const image: Image = {
          Caption: blockObject.image.caption?.map(_buildRichText) || [],
          Type: blockObject.image.type,
        }
        if (
          blockObject.image.type === 'external' &&
          blockObject.image.external
        ) {
          image.External = { Url: blockObject.image.external.url }
        } else if (
          blockObject.image.type === 'file' &&
          blockObject.image.file
        ) {
          image.File = {
            Type: blockObject.image.type,
            Url: blockObject.image.file.url,
            ExpiryTime: blockObject.image.file.expiry_time,
          }
        }
        block.Image = image
      }
      break
    case 'file':
      if (blockObject.file) {
        const file: File = {
          Caption: blockObject.file.caption?.map(_buildRichText) || [],
          Type: blockObject.file.type,
        }
        if (blockObject.file.type === 'external' && blockObject.file.external) {
          file.External = { Url: blockObject.file.external.url }
        } else if (blockObject.file.type === 'file' && blockObject.file.file) {
          file.File = {
            Type: blockObject.file.type,
            Url: blockObject.file.file.url,
            ExpiryTime: blockObject.file.file.expiry_time,
          }
        }
        block.File = file
      }
      break
    case 'code':
      if (blockObject.code) {
        const code: Code = {
          Caption: blockObject.code.caption?.map(_buildRichText) || [],
          RichTexts: blockObject.code.rich_text.map(_buildRichText),
          Language: blockObject.code.language,
        }
        block.Code = code
      }
      break
    case 'quote':
      if (blockObject.quote) {
        const quote: Quote = {
          RichTexts: blockObject.quote.rich_text.map(_buildRichText),
          Color: blockObject.quote.color,
        }
        block.Quote = quote
      }
      break
    case 'equation':
      if (blockObject.equation) {
        const equation: Equation = {
          Expression: blockObject.equation.expression,
        }
        block.Equation = equation
      }
      break
    case 'callout':
      if (blockObject.callout) {
        let icon: FileObject | Emoji | null = null
        if (blockObject.callout.icon) {
          if (
            blockObject.callout.icon.type === 'emoji' &&
            'emoji' in blockObject.callout.icon
          ) {
            icon = {
              Type: blockObject.callout.icon.type,
              Emoji: blockObject.callout.icon.emoji,
            }
          } else if (
            blockObject.callout.icon.type === 'external' &&
            'external' in blockObject.callout.icon
          ) {
            icon = {
              Type: blockObject.callout.icon.type,
              Url: blockObject.callout.icon.external?.url || '',
            }
          }
        }

        const callout: Callout = {
          RichTexts: blockObject.callout.rich_text.map(_buildRichText),
          Icon: icon,
          Color: blockObject.callout.color,
        }
        block.Callout = callout
      }
      break
    case 'synced_block':
      if (blockObject.synced_block) {
        let syncedFrom: SyncedFrom | null = null
        if (
          blockObject.synced_block.synced_from &&
          blockObject.synced_block.synced_from.block_id
        ) {
          syncedFrom = {
            BlockId: blockObject.synced_block.synced_from.block_id,
          }
        }

        const syncedBlock: SyncedBlock = {
          SyncedFrom: syncedFrom,
        }
        block.SyncedBlock = syncedBlock
      }
      break
    case 'toggle':
      if (blockObject.toggle) {
        const toggle: Toggle = {
          RichTexts: blockObject.toggle.rich_text.map(_buildRichText),
          Color: blockObject.toggle.color,
          Children: [],
        }
        block.Toggle = toggle
      }
      break
    case 'embed':
      if (blockObject.embed) {
        const embed: Embed = {
          Url: blockObject.embed.url,
        }
        block.Embed = embed
      }
      break
    case 'bookmark':
      if (blockObject.bookmark) {
        const bookmark: Bookmark = {
          Url: blockObject.bookmark.url,
        }
        block.Bookmark = bookmark
      }
      break
    case 'link_preview':
      if (blockObject.link_preview) {
        const linkPreview: LinkPreview = {
          Url: blockObject.link_preview.url,
        }
        block.LinkPreview = linkPreview
      }
      break
    case 'table':
      if (blockObject.table) {
        const table: Table = {
          TableWidth: blockObject.table.table_width,
          HasColumnHeader: blockObject.table.has_column_header,
          HasRowHeader: blockObject.table.has_row_header,
          Rows: [],
        }
        block.Table = table
      }
      break
    case 'column_list':
      const columnList: ColumnList = {
        Columns: [],
      }
      block.ColumnList = columnList
      break
    case 'table_of_contents':
      if (blockObject.table_of_contents) {
        const tableOfContents: TableOfContents = {
          Color: blockObject.table_of_contents.color,
        }
        block.TableOfContents = tableOfContents
      }
      break
    case 'link_to_page':
      if (blockObject.link_to_page && blockObject.link_to_page.page_id) {
        const linkToPage: LinkToPage = {
          Type: blockObject.link_to_page.type,
          PageId: blockObject.link_to_page.page_id,
        }
        block.LinkToPage = linkToPage
      }
      break
  }

  return block
}

function _formatRichTexts(richTexts: RichText[]): string {
  return richTexts.map(rt => {
    let text = rt.PlainText;
    if (rt.Annotation.Bold) text = `**${text}**`;
    if (rt.Annotation.Italic) text = `*${text}*`;
    if (rt.Annotation.Strikethrough) text = `~~${text}~~`;
    if (rt.Annotation.Code) text = `\`${text}\``;
    if (rt.Href) text = `[${text}](${rt.Href})`;
    return text;
  }).join('');
}

export function formatter(blocks: any[]) {
  let content = '';

  blocks.forEach(block => {
    let obj = _buildBlock(block)
    let type = obj.Type

    switch (type) {
      case 'paragraph':
        if (obj.Paragraph) {
          content += _formatRichTexts(obj.Paragraph.RichTexts) + '\n\n';
        }
        break;
      case 'heading_1':
        if (obj.Heading1) {
          content += `# ${_formatRichTexts(obj.Heading1.RichTexts)}\n\n`;
        }
        break;
      case 'heading_2':
        if (obj.Heading2) {
          content += `## ${_formatRichTexts(obj.Heading2.RichTexts)}\n\n`;
        }
        break;
      case 'heading_3':
        if (obj.Heading3) {
          content += `### ${_formatRichTexts(obj.Heading3.RichTexts)}\n\n`;
        }
        break;
      case 'bulleted_list_item':
        if (obj.BulletedListItem) {
          content += `- ${_formatRichTexts(obj.BulletedListItem.RichTexts)}`;
          if (blocks[blocks.indexOf(block) + 1]?.type === 'bulleted_list_item') {
            content += '\n';
          } else {
            content += '\n\n';
          }
        }
        break;
      case 'numbered_list_item':
        if (obj.NumberedListItem) {
          content += `1. ${_formatRichTexts(obj.NumberedListItem.RichTexts)}\n`;
        }
        break;
      case 'to_do':
        if (obj.ToDo) {
          const checkbox = obj.ToDo.Checked ? '[x]' : '[ ]';
          content += `${checkbox} ${_formatRichTexts(obj.ToDo.RichTexts)}\n`;
        }
        break;
      case 'image':
        if (obj.Image) {
          const url = obj.Image.External?.Url || obj.Image.File?.Url || '';
          content += `![](${url})\n\n`;
        }
        break;
      case 'code':
        if (obj.Code) {
          content += '```' + obj.Code.Language + '\n';
          content += _formatRichTexts(obj.Code.RichTexts) + '\n';
          content += '```\n\n';
        }
        break;
      case 'toggle':
        if (obj.Toggle) {
          content += `**${_formatRichTexts(obj.Toggle.RichTexts)}**\n\n`;
        }
        break;
      case 'quote':
        if (obj.Quote) {
          content += `> ${_formatRichTexts(obj.Quote.RichTexts)}\n\n`;
        }
        break;
      case 'video':
        if (obj.Video) {
          content += obj.Video.Type === 'external'
          ? `<iframe src="${obj.Video.External.Url}" frameborder="0" allowfullscreen ></iframe>\n\n`
          : `<video src="${obj.Video.File.Url}" controls></video>\n\n`
        }

        break;
      case 'embed':
        if (obj.Embed) {
          content += `<iframe src="${obj.embed.Url}" frameborder="0" allowfullscreen ></iframe>\n\n`
        }
        break;

      // 按需添加
      default:
        console.log(`type`,  type);
        break;
    }
  });

  return content.trim();
}