import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../astro.config.mjs";

const root = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const site = new URL(config.site);
const checked = new Set();

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(join(directory, entry.name))
          : join(directory, entry.name),
      ),
    )
  ).flat();
}

async function localTarget(url) {
  let target = resolve(root, "." + decodeURIComponent(url.pathname));
  assert.ok(
    target === root || target.startsWith(root + sep),
    `Path outside build: ${url}`,
  );
  if ((await stat(target)).isDirectory()) target = join(target, "index.html");
  assert.ok((await stat(target)).isFile(), `Missing target: ${url}`);
  checked.add(target);
  return target;
}

const pages = (await files(root)).filter((path) => path.endsWith(".html"));
for (const page of pages) {
  const path = relative(root, page)
    .split(sep)
    .join("/")
    .replace(/index\.html$/, "");
  const base = new URL(path, site);
  const html = await readFile(page, "utf8");
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), base);
    if (url.origin === site.origin) await localTarget(url);
  }
}

for (const path of [
  ".nojekyll",
  "index.html",
  "publications/index.html",
  "cv/index.html",
  "assets/pdf/CV-Aoran_Wang.pdf",
]) {
  assert.ok(
    (await stat(join(root, path))).isFile(),
    `Missing release file: ${path}`,
  );
}
const { papers } = JSON.parse(
  await readFile(new URL("../.cache/site.json", import.meta.url), "utf8"),
);
const publications = await readFile(
  join(root, "publications/index.html"),
  "utf8",
);
assert.equal(
  [...publications.matchAll(/\bdata-publication(?:\s|>)/g)].length,
  papers.length,
  "Publication count changed during build",
);

for (const [from, to] of Object.entries(config.redirects)) {
  assert.equal(typeof to, "string");
  const html = await readFile(join(root, from, "index.html"), "utf8");
  assert.ok(
    html.includes(`content="0;url=${to}"`),
    `Missing immediate static redirect: ${from}`,
  );
  assert.ok(
    html.includes(`rel="canonical" href="${new URL(to, site)}"`),
    `Wrong canonical URL: ${from}`,
  );
  const destination = await localTarget(new URL(to, site));
  assert.notEqual(
    dirname(destination),
    dirname(join(root, from, "index.html")),
    `Redirect loop: ${from}`,
  );
}
console.log(
  `Verified ${pages.length} HTML pages, ${checked.size} local targets, ${papers.length} publications, .nojekyll, and ${Object.keys(config.redirects).length} legacy redirects.`,
);
