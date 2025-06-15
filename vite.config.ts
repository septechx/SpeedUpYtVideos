import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import { version } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://www.google.com/s2/favicons?sz=64&domain=youtube.com",
        namespace: "seps-scripts",
        match: ["https://*.youtube.com/*", "https://*.youtube-nocookie.com/*"],
        author: "septech",
        name: "Speed Up Yt Videos",
        version,
        updateURL:
          "https://raw.githubusercontent.com/septechx/SpeedUpYtVideos/refs/heads/master/dist/speedupytvideos.user.js",
        downloadURL:
          "https://raw.githubusercontent.com/septechx/SpeedUpYtVideos/refs/heads/master/dist/speedupytvideos.user.js",
      },
    }),
  ],
});
