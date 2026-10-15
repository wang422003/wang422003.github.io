---
layout: about
title: About
permalink: /
subtitle: AI for Science · Multimodal Models · Scientific Reasoning

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false # crops the image to make it circular

news: true  # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true  # includes social icons at the bottom of the page
---

I am a researcher at Shanghai AI Laboratory, working on AI for Science.

My research focuses on multimodal models and scientific reasoning, with particular interests in equation discovery and structural inference of dynamical systems.

If you are interested in collaboration opportunities, please contact me at

**[{{ site.email }}](mailto:{{ site.email }})**

{% assign cv_page = site.pages | where: "permalink", "/cv/" | first %}
<p class="profile-links">
  <a href="https://scholar.google.com/citations?user={{ site.scholar_userid }}">Google Scholar</a>
  <span aria-hidden="true">·</span>
  <a href="https://github.com/{{ site.github_username }}">GitHub</a>
  <span aria-hidden="true">·</span>
  <a href="{{ cv_page.cv_pdf | prepend: '/assets/pdf/' | relative_url }}" download>PDF CV</a>
</p>
