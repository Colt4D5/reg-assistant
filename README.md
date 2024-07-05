# Reg Assist Tool

This is a web browser extension build in Sveltekit with Bun to assist in ASP/VBScript development whilst developing registration forms.

## Installation Instructions

This extension is built on the Chrome v3 manifest but is also compatible with firefox, though installation will slightly differ depending on browser of choice.

### Chrome

1. Clone this repo with `git clone https://github.com/Colt4D5/reg-assistant.git`
2. Enter the project directory and run `bun run build`. This will build the project and make it ready for installation to your browser.
3. Visit `chrome://extensions` in your browser.
4. Enable Developer Mode if not already enabled.
   1. Will be a switch in top right on window.
5. Select "Load Unpacked" and use the finder to select the "build" directory in within this project that was just created by the Bun bundler.
6. Extension is now ready for use (instructions below).

### Firefox

Firefox has some odd security measures in place that does not allow local extensions to remain installed after the current session is over, so you may have to take some alternate actions, or you can just opt for Firefox Developer Edition or Firefox Nightly, both of which will allow you to keep local extensions enabled.

Coming soon...