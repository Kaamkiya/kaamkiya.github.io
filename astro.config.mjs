// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

export default defineConfig({
  site: "https://kaamkiya.github.io",
  // TODO: add icons for external links (maybe into a footer?)
  /*integrations: [icon({
    "simple-icons": ["github", "matrix", "mastodon"],
  })],*/
});
