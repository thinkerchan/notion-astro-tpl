# notion-astro-tpl
> 如果你想展示你的个人作品又不想开发网站，可以试试这个模板，基于Astro和Notion API实现

## 更新记录
- 2024/12/23 支持readme链接【startsWith('https://raw.githubusercontent.com/') 且优先级小于文章内容】
- 2024/09/11 第一版

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 config
先在项目根目录创建`.env`文件
```env
NOTION_API_KEY=
NOTION_DATABASE_ID=
```

```ts
export const SITE = {
  "title": "My Side Works",
  "author": "ThinkerChan",
  "twitter":"thinkerchan",
  "github":"thinkerchan/notion-astro-tpl",
  "description": "thinkerchan",
  "keywords": "apps.thinkerchan.com",
  "cmtURL":"https://cmt.testdog.cn",
  "cmtJs":"https://unpkg.com/@waline/client@2.15.8/dist/waline.js",
  "cmtCss":"https://unpkg.com/@waline/client@3.3.2/dist/waline.css",
  "pv":true,
  "buyMeCoffeeId":"thinkerchan"
}

```
## 创建notion数据库

> notion数据库的icon字段,和页面内markdown的图片链接尽量用链接的形式，否则可能会受到notion referer的限制而无法显示(假设你不公开notion页面)

你可以按下图创建数据库：
- 站点描述默认读取SITE.description, 如果有自定义描述则优先读取自定义描述
- 图标读取顺序: icon > emoji > title icon
- created_time 手动填写，如为空则读默认创建时间

![](https://telegram-file.vercel.app/api/file/BQACAgUAAxkDAAP8Z2kdVMwC397WCTUNrfHHmMhJ9aQAAoARAALO_0lXnvHR2X4fSPk2BA.png)

## 注意事项

如你对notion数据库进行了修改，都需要去vercel重新部署