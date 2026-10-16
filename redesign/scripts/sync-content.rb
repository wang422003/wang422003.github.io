require "json"
require "yaml"
require "date"
require "fileutils"
require "bibtex"
require "kramdown"

ROOT = File.expand_path("../..", __dir__)
PREVIEW = File.expand_path("..", __dir__)
def yaml_file(path)
  YAML.safe_load(File.read(path), permitted_classes: [Time, Date], aliases: true)
end
def document(path)
  _, front, body = File.read(path).split(/^---\s*$\n?/, 3)
  [YAML.safe_load(front, permitted_classes: [Time, Date], aliases: true), body.to_s]
end
def markup(body)
  body = body.gsub(/\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}/, '\1')
  body = body.gsub(/\{%.*?%\}/m, "").gsub(":tada:", "🎉").gsub(":star:", "⭐")
  Kramdown::Document.new(body).to_html
end

highlights = yaml_file(File.join(ROOT, "_data/publication_highlights.yml"))
aliases = yaml_file(File.join(ROOT, "_data/publication_aliases.yml"))
papers = BibTeX.open(File.join(ROOT, "_bibliography/papers.bib")).query("@*").map do |entry|
  preprint = entry[:journal].to_s.start_with?("arXiv")
  {
    id: entry.key, title: entry[:title].to_s, year: entry[:year].to_i,
    venue: entry[:abbr].to_s, venueFull: (entry[:booktitle] || entry[:journal]).to_s,
    status: preprint ? "Preprint" : (entry[:note].to_s.empty? ? "Published" : entry[:note].to_s),
    selected: entry[:selected].to_s == "true", highlight: highlights[entry.key],
    aliases: aliases.fetch(entry.key, []),
    authors: entry.author.map { |n| { first: n.given.to_s, last: n.family.to_s, self: n.given.to_s == "Aoran" && n.family.to_s == "Wang" } },
    pdf: entry[:pdf]&.to_s, website: entry[:website]&.to_s, code: entry[:code]&.to_s,
    doi: entry[:doi]&.to_s, arxiv: entry[:arxiv]&.to_s, abstract: entry[:abstract]&.to_s,
    bibtex: entry.to_s
  }
end
unknown_aliases = aliases.keys - papers.map { |paper| paper[:id] }
abort "Unknown bibliography keys in publication_aliases.yml: #{unknown_aliases.join(', ')}" unless unknown_aliases.empty?
news = Dir[File.join(ROOT, "_news/*.md")].map do |path|
  front, body = document(path)
  date = front["date"]
  { date: date.to_s, label: front["date_display"] || Date.parse(date.to_s).strftime("%b %-d, %Y"), html: markup(body) }
end.sort_by { |n| n[:date] }.reverse
projects = Dir[File.join(ROOT, "_projects/*.md")].map do |path|
  front, body = document(path)
  slug = (front["permalink"] || "").split("/").last
  slug = front["title"].downcase.gsub(/[^a-z0-9]+/, "-").sub(/-$/, "") if slug.to_s.empty?
  { slug: slug, title: front["title"], description: front["description"], image: "/" + front["img"],
    order: front["importance"], external: front["redirect"], html: markup(body) }
end.sort_by { |p| p[:order] }
assets = ["assets/pdf/CV-Aoran_Wang.pdf"] + projects.map { |p| p[:image].delete_prefix("/") }
assets.uniq.each do |path|
  destination = File.join(PREVIEW, "public", path)
  FileUtils.mkdir_p(File.dirname(destination))
  FileUtils.cp(File.join(ROOT, path), destination)
end
data = { papers: papers, news: news, projects: projects,
  cv: yaml_file(File.join(ROOT, "_data/cv.yml")),
  repositories: yaml_file(File.join(ROOT, "_data/repositories.yml")) }
FileUtils.mkdir_p(File.join(PREVIEW, ".cache"))
File.write(File.join(PREVIEW, ".cache/site.json"), JSON.pretty_generate(data))
puts "Synced #{papers.size} papers, #{news.size} news items, #{projects.size} projects and the approved PDF CV."
