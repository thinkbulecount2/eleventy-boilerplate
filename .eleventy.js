const now = String(Date.now());
const htmlmin = require('html-minifier');

if (process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget('./src/assets/css/tailwind.css');
  eleventyConfig.addPassthroughCopy({ './src/assets/css/tailwind.css': './assets/css/style.css' });

  eleventyConfig.addShortcode('version', function () {
    return now;
  });

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified
    }
    return content
  });

  eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));

  function extractExcerpt(post) {
    if(!post.templateContent) return '';
    if(post.templateContent.indexOf('</p>') > 0) {
      let end = post.templateContent.indexOf('</p>');
      return post.templateContent.substr(0, end+4);
    }
    return post.templateContent;
  }

  // Set directories to pass through to the _site folder
  eleventyConfig.addPassthroughCopy('./src/assets/images/');
  eleventyConfig.addPassthroughCopy('./src/assets/fonts/');
  eleventyConfig.addPassthroughCopy('./src/assets/js/');
  eleventyConfig.addPassthroughCopy('./src/assets/favicons/');

  return {
      dir: {
          input: "src",
          output: "_site",
          includes: "_includes",
          data: "_data"
      },
      templateFormats: ["html", "liquid", "md", "11ty.js"]
  }
}
