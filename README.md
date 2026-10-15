# Aoran Wang - Academic Homepage

Source for <https://wang422003.github.io/>, built with Jekyll and the
[al-folio](https://github.com/alshedivat/al-folio) theme.

## Local preview

```sh
bundle install
bundle exec jekyll build
python3 -m http.server 4000 --bind 127.0.0.1 --directory _site
```

Open <http://localhost:4000/>. Rebuild and reload after editing files.
Images use their original files with responsive CSS, so ImageMagick is optional.

## Content

- `_pages/about.md`: biography and contact information.
- `_bibliography/papers.bib`: publications shared by the homepage, publications
  page, web CV, and generated PDF CV references.
- `_news/`: research announcements. Use `date_display` when only a year is known.
- `_projects/`: project descriptions and links.
- `_data/cv.yml`: web CV sections.
- `_cv/`: editable LaTeX CV source and publication generator.
- `assets/pdf/CV-Aoran_Wang.pdf`: reviewed CV download.
- `_config.yml`: site identity, root URL, and theme settings.

Template blog posts and sample navigation are excluded from the generated site.
The original theme license and attribution are retained.

## Domain and publication

The site uses `https://wang422003.github.io` with an empty `baseurl`.
There is no custom domain, so no `CNAME` file is needed.
GitHub Pages currently serves the `gh-pages` branch at `/` with HTTPS enforced.

The deploy workflow publishes on pushes to `master` or `main`. Keep changes
local until publication is explicitly requested. Local builds and previews do
not publish the website or change GitHub Pages settings.
