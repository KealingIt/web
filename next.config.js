const withOptimizedImages = require('next-optimized-images')

module.exports = withOptimizedImages({
  reactStrictMode: true,
  handleImages: ['jpeg', 'png', 'svg'],
})