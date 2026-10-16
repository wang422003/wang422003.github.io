# Aoran Wang - Academic Homepage

Source for <https://wang422003.github.io/>. The reviewed Astro redesign is in
[redesign/](redesign/README.md), based on astro-academic. Original Jekyll/al-folio
sources remain as the content source and for reference. The migration is local
and has not been published.

## Local preview

```sh
cd redesign
bundle install
npm ci
npm run validate
npm run preview -- --port 4322
```

Open <http://127.0.0.1:4322/>. Use `npm run dev -- --port 4322` instead for live
layout editing. Node.js 24 and Ruby/Bundler are used in CI. Astro's locked Ruby
dependencies only parse the existing content; no Jekyll build is needed.

## Content

- `redesign/src/pages/index.astro`: homepage biography and section layout.
- `redesign/src/config.ts`: contact information and navigation.
- `_bibliography/papers.bib`: publications shared by the homepage, publications
  page, web CV, and generated PDF CV references.
- `_data/publication_highlights.yml`: short research highlights for homepage
  selected papers.
- `_data/publication_aliases.yml`: project names and acronyms used by paper search.
- `_news/`: research announcements. Use `date_display` when only a year is known.
  The homepage shows the latest three by default and lets readers expand older
  items; the Astro presentation is in `redesign/src/components/News.astro`.
- `_projects/`: project descriptions and links.
- `_data/cv.yml`: web CV sections.
- `_cv/`: editable LaTeX CV source and publication generator.
- `assets/pdf/CV-Aoran_Wang.pdf`: reviewed CV download.
- `redesign/astro.config.mjs`: site URL, static build, and legacy project redirects.
- `_config.yml`: retained Jekyll configuration; excludes `redesign/`.

Template blog posts and sample navigation are excluded from the generated site.
The original theme license and attribution are retained.

## Domain and publication

The site uses `https://wang422003.github.io` with an empty `baseurl`.
There is no custom domain, so no `CNAME` file is needed.
GitHub Pages currently serves the `gh-pages` branch at `/` with HTTPS enforced.

The prepared deploy workflow builds and validates Astro, uploads `redesign/dist/`
including `.nojekyll`, and publishes that artifact to the existing `gh-pages`
branch on `master`/`main` pushes or manual runs on those branches. PRs only build
and validate. The workflow in this migration branch has not been pushed or run
on GitHub. Local validation does not change Pages settings or the live site.

Old project URLs `/projects/1_project/` and `/projects/2_project/` have static
compatibility redirects to their named project pages. Details and local
verification commands are in [redesign/README.md](redesign/README.md).

## Legacy Jekyll preview

From the repository root, the original site can still be previewed with:

```sh
bundle install
bundle exec jekyll build
python3 -m http.server 4000 --bind 127.0.0.1 --directory _site
```
