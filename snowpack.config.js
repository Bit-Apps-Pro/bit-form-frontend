module.exports = {
  extends: '@snowpack/app-scripts-react',
  routes: [
    {
      match: 'routes',
      src: '.*',
      dest: '/index.html',
    },
  ],
  plugins: [
    '@snowpack/plugin-sass',
    /* [
      "snowpack-plugin-swc",
      {
        "input": ['.js', '.mjs', '.jsx', '.ts', '.tsx'], // (optional) specify files for swc to transform
        transformOptions: {
          // swc transform options
        }
      }
    ] */
  ],
  knownEntrypoints: ["react/jsx-runtime"]
  /* routes: {
    port: 3000,
    src: 'src',
    bundle: false,
    fallback: 'index.html',
  },
 */
  /* installOptions: {
    polyfillNode: true,
  }, */
};