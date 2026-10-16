# Academic website redesign — local prototype

An Astro prototype for Aoran Wang, adapted from
[astro-academic](https://github.com/MaxwelsDonc/astro-academic) under its MIT
license. The original [LICENSE](LICENSE) is retained.

The visual direction is warm ivory paper, Newsreader serif headings, ink green
text, and restrained teal accents. The existing Jekyll site remains the published
website while this migration is reviewed locally. This directory is excluded
from Jekyll output. The prepared deployment workflow builds this Astro project.

Newsreader and Inter fonts are served locally. Their SIL Open Font Licenses
are included in `public/fonts/`.

## Preview

Use Node.js 24 (as in CI) and Ruby with Bundler. The content bridge has its own
small, locked dependency set and does not require the legacy Jekyll gems.

```sh
cd redesign
bundle install
npm ci
npm run dev -- --port 4322
```

Open <http://127.0.0.1:4322/>. Port 4321 is used by another local project.

```sh
npm run validate
npm run preview -- --port 4322
```

`dev` and `build` first synchronize the approved bibliography, news, project
descriptions, CV sections, and PDF CV from the parent site into this
prototype. The generated content cache is ignored by Git. Edit the parent
content files and restart the preview to import further updates. Astro refreshes
layout and style edits automatically.

The homepage portrait is stored at `public/assets/img/profile-scholar.jpg`.
It is the 256 × 256 profile photograph from
[Aoran Wang’s Google Scholar page](https://scholar.google.com/citations?user=03a5OXgAAAAJ),
retrieved on 2026-10-16. It is independent of the original Jekyll portrait.

## Structure

- `src/pages/`: home, publications, project pages, CV, repositories, and Life.
- `src/components/`: shared navigation, project cards, publication entries, news.
- `src/styles/global.css`: responsive editorial design and reduced-motion rules.
- `src/config.ts`: identity, social links, and primary navigation.
- `scripts/sync-content.rb`: content bridge from the current Jekyll source.
- `../_data/publication_aliases.yml`: paper acronyms keyed by bibliography ID.
- `src/lib/publication-search.mjs`: shared Unicode and acronym matching.
- `scripts/verify-build.mjs`: checks local links, publication counts, release
  files, and legacy redirects in the actual generated site.
- `src/data/life.ts`: real photographs and personal notes, currently empty.
- `public/assets/img/projects/*-cover.svg`: simplified conceptual covers for the
  three featured projects. The complete original research figures remain on
  their project detail pages.

## Adding photographs and notes

Place approved photographs in `public/images/life/` and add entries to
`src/data/life.ts`, including a descriptive `alt` field. Use the date of the
photograph or note. An entry with `image` appears in the gallery; one without
`image` appears as a written note. The photo viewer supports previous/next
buttons, arrow keys, and Escape to close. No stock images or invented personal
records are included.

## Publication

The prepared `.github/workflows/deploy.yml` installs the locked Ruby content
parser and Node dependencies, then runs `npm run validate`. This builds Astro,
checks types, tests search behavior against the imported bibliography, and
validates the generated static site. Only the validated `dist/` artifact is
published. The hidden `.nojekyll` marker is included in the artifact so GitHub
Pages serves Astro’s `_astro/` directory correctly.

Deployment retains the repository’s existing `gh-pages` branch publishing
configuration using [github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action).
The root URL remains `https://wang422003.github.io/`, with no repository prefix
or custom domain. No Pages settings need to change for this workflow.

PRs build and validate without publishing. Deployment is limited to
`master`/`main` pushes or manual workflow runs on those branches. Local builds
and this `codex/astro-academic-redesign` working branch do not publish anything.
This migration has not been pushed and the remote workflow has not been run.

## Legacy project links

| Old path | Current project page |
| --- | --- |
| `/projects/1_project/` | `/projects/structural-inference/` |
| `/projects/2_project/` | `/projects/llm4edukg/` |

Both slash and slashless paths work in the local preview. The directory-format
build preserves GitHub Pages URLs and generates immediate static redirect pages
with canonical URLs and a clickable fallback. These are HTML redirects; GitHub
Pages does not provide configurable server-side redirect status codes. Existing
`/publications/`, `/projects/`, `/cv/`, project URLs, and the PDF CV path are retained.
