module.exports = {
  plugins: [
    // require the plugin directly to ensure PostCSS loads it correctly
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};
