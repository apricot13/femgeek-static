const { DateTime } = require("luxon");
const fs = require("fs");
const path = require("path");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const manifestPath = path.resolve(__dirname, "_site", "assets", "manifest.json");
const manifest = JSON.parse(
  fs.readFileSync(manifestPath, { encoding: "utf8" })
);


module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  // eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("twoCol", "layouts/two-col.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("EEE dd LLL yyyy");
  });

  eleventyConfig.addFilter("archiveDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("yyyy-LL-dd");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });


    // Adds a universal shortcode to return the URL to a webpack asset. In Nunjack templates:
  // {% webpackAsset 'main.js' %} or {% webpackAsset 'main.css' %}
  eleventyConfig.addShortcode("webpackAsset", function(name) {
    if (!manifest[name]) {
      throw new Error(`The asset ${name} does not exist in ${manifestPath}`);
    }
    return manifest[name];
  });


  // support drafts and scheduled posts https://remysharp.com/2019/06/26/scheduled-and-draft-11ty-posts use IFTTT for cron
  const now = new Date();

  const livePosts = p => p.date <= now && !p.data.draft;



  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('./posts/**/*.md')
      .filter(livePosts);  
  });


  eleventyConfig.addCollection('drafts', collection => {
    return collection.getFilteredByGlob('./posts/**/*.md')
    .filter(_ => !livePosts(_));
  });



  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().filter(livePosts).forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {


          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }
          return true;
        });


        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet].sort();
  });

  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });


  // var defaultRender = markdownLibrary.renderer.rules.image;
  // markdownLibrary.renderer.rules.image = function (tokens, idx, options, env, self) {

  //   const token = tokens[idx];
  //   const aIndex = token.attrIndex('src');
  //   const link = token.attrs[aIndex][1];
    

  //   if(/(http(s?)):\/\//i.test(link)) {
    
  //   } else {
  //     var abspath = '';
  //     abspath += env.metadata.url;

      

  //     let filePath = env.page.filePathStem.split('/');
  //     filePath.pop();
      


  //     if(env.page.url.charAt(0) === '/') {
  //       abspath += env.page.url.substring(1);
  //     }


  //     abspath += filePath.join('/');
      
  //     abspath += "" + link;

      

  //     tokens[idx].attrs[aIndex][1] = abspath;

  //   }

  //   // pass token to default renderer.
  //   return defaultRender(tokens, idx, options, env, self);
  // }


  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid",
      "jpg",
      "jpeg",
      "png",
      "gif"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
