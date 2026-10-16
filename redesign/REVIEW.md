# Local preview review — 2026-10-16

Preview: <http://127.0.0.1:4322/> and <http://127.0.0.1:4322/life/>.
Branch: `codex/astro-academic-redesign`, based on published commit `7b98962`.
The prototype has not been pushed or deployed.

- Astro production build: 11 pages generated successfully.
- Astro check: 0 errors, 0 warnings, 0 hints.
- Original Jekyll build: successful; `redesign/` excluded from its output.
- Internal links and assets: all 22 referenced local targets returned HTTP 200.
- Content: 25 publications, 23 direct paper links, 5 projects, 7 news items.
- Featured papers: all four show and bold Aoran Wang in the compact author list.
- Research: keyword search, Accepted filter, and BibTeX clipboard copy verified.
- News: three recent entries; four older entries expand and collapse with mouse
  and keyboard.
- Responsive checks: 320px home/research/CV/projects; 390px home/Life; 768px
  project grid with two columns; desktop home and Life. No horizontal document
  overflow observed.
- All five project images loaded in the browser.
- PDF CV downloaded through its browser control and matched the reviewed
  original SHA-256: `8087c50c36608a522fe0798ecf9be39aecf3035800d98d9a253be8d4fc8be690`.
- The PDF CV matches the approved original exactly. The homepage portrait was
  replaced with the current Google Scholar photograph on 2026-10-16; its local
  asset is `public/assets/img/profile-scholar.jpg` (256 × 256).
- Photo viewer: next button, arrow-key navigation, and Escape verified using
  temporary portrait fixtures; fixtures removed and the final empty Life page
  rebuilt and checked.
- Font files and their OFL licenses are included locally.

The Life page is ready for real photographs and short notes. Its current empty
state is intentional. External paper URLs and publication statuses are imported
from the previously reviewed bibliography.

## Homepage hierarchy and project cards

- Homepage order: introduction → compact News → selected publications →
  projects → Life. News retains three recent items and four expandable items.
- At 390px, the selected-publications section begins at approximately 1017px,
  compared with 2289px before the change.
- Three featured projects use matching conceptual SVG covers. Original research
  overview figures remain on each project detail page.
- Desktop project-card links share the same baseline. At 768px, links in the
  two-column row are also aligned; the third card spans the following row.
- CV source now lists Experience before Education, with the Shanghai AI
  Laboratory researcher position first in Experience.
- Updated Astro build and type check passed. The requested order, News content,
  four selected papers, three SVG covers, original detail figures, and local
  link targets were checked. No horizontal overflow at 320px, 390px, or 768px.

## Search and GitHub Pages preparation

- Bibliography IDs map to explicit paper acronyms in
  `_data/publication_aliases.yml`. Search normalizes case, spaces, Unicode
  hyphens, and accents, and retains title/author/venue/year matching.
- Four search regression tests pass against the imported real bibliography.
  Browser checks found one matching paper for VIPER-R1, viper r1, VIPERR1,
  SciReasoner, Intern-S1, and StructInfer. Status filtering still applies;
  a VIPER-R1 query with Preprint returns zero and Accepted returns one.
- At 390px, SciReasoner search returns the correct single paper without
  horizontal overflow. The temporary viewport override was reset.
- Both original project URLs work with and without trailing slashes. Browser
  navigation verified `/projects/1_project/` → `/projects/structural-inference/`
  and `/projects/2_project` → `/projects/llm4edukg/`.
- The release contains 13 HTML files including two immediate static redirect
  pages. Its 25 local reference targets, 25 publications, canonical redirect
  destinations, PDF CV, and `.nojekyll` marker passed build validation.
- `npm run validate` passed: build, Astro check, search tests, and artifact
  checks. The prepared deployment workflow passed actionlint 1.7.12.
- The workflow uses locked Astro content-parser dependencies, Node.js 24,
  separate build/deploy jobs, a validated artifact including hidden files,
  and the existing `gh-pages` publishing branch. PRs do not deploy.
- No commits were pushed, no remote workflow was dispatched, and Pages
  settings were not changed. The GitHub-hosted workflow itself remains unrun.
