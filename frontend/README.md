/client
 ┣ /src
 ┃ ┣ /components
 ┃ ┃ ┣ Navbar.jsx
 ┃ ┃ ┣ TopicList.jsx
 ┃ ┃ ┣ ContentList.jsx
 ┃ ┃ ┣ MarkdownEditor.jsx
 ┃ ┃ ┣ MarkdownViewer.jsx
 ┃ ┃ ┗ NoteActions.jsx  ← (copy, download buttons)
 ┃ ┣ /pages
 ┃ ┃ ┣ Home.jsx
 ┃ ┃ ┣ TopicPage.jsx
 ┃ ┃ ┗ NotePage.jsx
 ┃ ┣ /utils
 ┃ ┃ ┗ markdownUtils.js
 ┃ ┣ App.jsx
 ┃ ┗ main.jsx



 /server
 ┣ /models
 ┃ ┗ Note.js
 ┣ /routes
 ┃ ┗ noteRoutes.js
 ┣ server.js
 ┗ .env



| Step | Goal                           | Tools                         | Tracker   |
| ---- | ------------------------------ | ----------------------------- |           |
| 1    | Build React UI with dummy data | React, Tailwind, React Router |           |
| 2    | Add Markdown conversion        | `react-markdown`              |           |
| 3    | Setup Express backend          | Express, Mongoose             |           |
| 4    | Connect MongoDB                | Mongo Atlas or local          |           |
| 5    | Integrate API with frontend    | Axios                         |           |
| 6    | Add CRUD + UI polish           | Copy, download, edit          |           |
| 7    | Deploy                         | Render/Netlify or Vercel      |           |

