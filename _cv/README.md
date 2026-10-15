# PDF CV source

The template comes from the Overleaf project
<https://www.overleaf.com/project/6537b2479d8897a27917b725>.
The local version retains its fonts, margins, section rules, and list styles.

Edit `main.tex` for experience and research interests. Paper metadata is shared
with the website in `_bibliography/papers.bib`. From the repository root, run:

```sh
bundle exec ruby _cv/generate_publications.rb
```

Compile `main.tex` with pdfLaTeX. The generated `publications.tex` and
`preprints.tex` must be beside it. For Overleaf, upload these three files.
Large collaboration author lists are abbreviated in order, with Aoran Wang
always shown and underlined. The website retains the full author lists.

The reviewed PDF is copied to `assets/pdf/CV-Aoran_Wang.pdf`, which the CV page
already links to. Updates remain local until the website is published.
