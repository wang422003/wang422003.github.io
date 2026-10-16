import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  devToolbar: { enabled: false },
  site: "https://wang422003.github.io",
  output: "static",
  build: { format: "directory" },
  trailingSlash: "ignore",
  redirects: {
    "/projects/1_project/": "/projects/structural-inference/",
    "/projects/2_project/": "/projects/llm4edukg/",
  },
  markdown: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] },
});
