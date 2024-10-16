# notion-astro-tpl
> 如果你想展示你的个人作品又不想开发网站，可以试试这个模板，基于Astro和Notion API实现

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
  "description": "thinkerchan",
  "keywords": "apps.thinkerchan.com",
  "cmtURL":"https://cmt.testdog.cn", // 评论系统使用waline
  "cmtJs":"https://unpkg.com/@waline/client@2.15.8/dist/waline.js",
  "cmtCss":"https://unpkg.com/@waline/client@3.3.2/dist/waline.css",
  "pv":true // 是否开启访问量统计
}
```
## ⚠️ 注意事项

> notion数据库的icon字段,和页面内markdown的图片链接尽量用链接的形式，否则可能会受到notion referer的限制而无法显示(假设你不公开notion页面)

![](http://t-qiniu.linkroutes.com/uPic/ofVl42_dGwKmo.png)