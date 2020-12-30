const plugins = [
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-preset-env"),
    require("postcss-css-variables")
  ];
  
  if (process.env.NODE_ENV === "production") {
    plugins.push(require("cssnano"));
  }
  
  module.exports = { plugins };