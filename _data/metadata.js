

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


// path: "/feed/feed.xml",


module.exports = {
  ENV: process.env.ELEVENTY_ENV,
  title: "femgeek",
  url: process.env.SITE_URL,

  github: "https://github.com/apricot13/femgeek-static",
  description: "00100101 oooh shiney. A blog about my hobbies and interests",
  feed: {
    subtitle: "A blog about my hobbies and interests",
    filename: "feed.xml",
    path: "/feed",
    id: "https://www.femgeek.co.uk/"
  },
  jsonfeed: {
    path: "/feed/feed.json",
    url: "https://www.femgeek.co.uk/feed/feed.json"
  },
  author: {
    name: "Han",
    url: "https://www.femgeek.co.uk/about/"
  }
};
