/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  }
}
