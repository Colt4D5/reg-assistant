import adapter from "sveltekit-adapter-chrome-extension";

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
};

export default config;
