

// {
//   "title": "femgeek",
//   "url": "http://localhost:8080/",
//   "description": "00100101 oooh shiney. A blog about my hobbies and interests",
//   "feed": {
//     "subtitle": "A blog about my hobbies and interests",
//     "filename": "feed.xml",
//     "path": "/feed/feed.xml",
//     "id": "https://example.com/"
//   },
//   "jsonfeed": {
//     "path": "/feed/feed.json",
//     "url": "https://example.com/feed/feed.json"
//   },
//   "author": {
//     "name": "Han",
//     "url": "https://femgeek.co.uk/about/"
//   }
// }



module.exports = {
  ENV: process.env.ELEVENTY_ENV,
  title: "femgeek",
  url: "http://localhost:8080/",

  github: "https://github.com/apricot13/femgeek-static",
  description: "00100101 oooh shiney. A blog about my hobbies and interests",
  feed: {
    subtitle: "A blog about my hobbies and interests",
    filename: "feed.xml",
    path: "/feed/feed.xml",
    id: "https://example.com/"
  },
  jsonfeed: {
    path: "/feed/feed.json",
    url: "https://example.com/feed/feed.json"
  },
  author: {
    name: "Han",
    url: "https://femgeek.co.uk/about/"
  }
};
