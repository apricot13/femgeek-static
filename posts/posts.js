module.exports = {
  tags: ["posts"],
//   eleventyComputed: {
//     permalink: data => {
//         if (process.env.ELEVENTY_ENV !== "production")
//             return data.permalink;
//         else return data.draft ? false : data.permalink;
//     }
// }
}



// eleventyExcludeFromCollections: data => {
//     console.log(process.env.ELEVENTY_ENV)
//     console.log(data) 
//     if (process.env.ELEVENTY_ENV !== "production" && data.draft) {
//         return true;
//     }        
//     else return false;
// }   


// module.exports = {
//   eleventyComputed: {
//     myTemplateString: "This is assumed to be a template string!",
//     myString: data => "This is a string!",
//     myFunction: data => `This is a string using ${data.someValue}.`,
//     myAsyncFunction: async data => await someAsyncThing(),
//     myPromise: data => {
//       return new Promise(resolve => {
//         setTimeout(() => resolve("100ms DELAYED HELLO"), 100);
//       })
//     }
//   }
// };
