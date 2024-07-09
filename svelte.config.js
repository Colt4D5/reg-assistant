import adapter from "sveltekit-adapter-chrome-extension";
// import adapter from 'sveltekit-adapter-browser-extension';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: null,
      precompress: false,
      manifest: "manifest.json",
    }),
    appDir: "app",
  },
  // adapter: adapter({
  //   // default options are shown
  //   pages: 'build', // the output directory for the pages of your extension
  //   assets: 'build', // the asset output directory is derived from pages if not specified explicitly
  //   fallback: undefined, // set to true to output an SPA-like extension
  //   manifestVersion: 2 // the version of the automatically generated manifest (Version 3 is required by Chrome).
  // }),
  // appDir: 'app', // This is important - chrome extensions can't handle the default _app directory name.
  // prerender: {
  //   default: true
  // }
};

export default config;
