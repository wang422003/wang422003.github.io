#!/usr/bin/env ruby
# Run from the repository root: bundle exec ruby _cv/generate_publications.rb
require "bibtex"

ROOT = File.expand_path("..", __dir__)

def tex(value)
  value.to_s.gsub(/[\\{}&#%_$~^]/) do |char|
    { "\\" => "\\textbackslash{}", "{" => "\\{", "}" => "\\}",
      "&" => "\\&", "#" => "\\#", "%" => "\\%", "_" => "\\_",
      "$" => "\\$", "~" => "\\textasciitilde{}", "^" => "\\textasciicircum{}" }.fetch(char)
  end
end

def author_text(name)
  initials = name.given.to_s.split(/[\s-]+/).map { |part| "#{part[0]}." }.join
  formatted = tex("#{name.family}, #{initials}")
  name.family.to_s == "Wang" && name.given.to_s == "Aoran" ? "\\underline{#{formatted}}" : formatted
end

def authors(entry)
  names = entry.author.map { |name| name }
  # Retain author order and show Aoran explicitly in large collaborations.
  if names.length > 20
    own_index = names.index { |name| name.family.to_s == "Wang" && name.given.to_s == "Aoran" }
    indices = ([0, 1, 2, own_index, names.length - 1].compact).uniq.sort
    parts = []
    indices.each_with_index do |index, position|
      parts << "\\ldots" if position > 0 && index > indices[position - 1] + 1
      parts << author_text(names[index])
    end
    parts.join(", ")
  else
    parts = names.map { |name| author_text(name) }
    return parts.join(" and ") if parts.length == 2
    parts.length > 1 ? "#{parts[0...-1].join(', ')}, and #{parts[-1]}" : parts.first
  end
end

def venue(entry)
  if entry[:journal].to_s.start_with?("arXiv")
    return "arXiv:#{tex(entry[:arxiv])}"
  end

  abbr = entry[:abbr].to_s
  text = tex(entry[:journal])
  if entry[:booktitle]
    # Conference editions can precede the formal proceedings publication year.
    text = case abbr
           when "CMSB" then "CMSB 2025 (LNCS)"
           when "ECML PKDD" then "ECML PKDD 2024 Workshops (CCIS)"
           else
             track = entry[:booktitle].to_s.include?("Datasets and Benchmarks") ? " Datasets and Benchmarks Track" : ""
             "#{tex(abbr)} #{entry[:year]}#{track}"
           end
  end
  volume = entry[:volume].to_s
  issue = entry[:number].to_s
  text += ", #{tex(volume)}" unless volume.empty?
  text += "(#{tex(issue)})" unless issue.empty?
  pages = entry[:pages].to_s
  unless pages.empty?
    label = entry.key == "wang2026sigfn" ? "Article" : "pp."
    text += ", #{label} #{tex(pages)}"
  end
  text += ". #{tex(entry[:note])}" unless entry[:note].to_s.empty?
  text
end

entries = BibTeX.open(File.join(ROOT, "_bibliography/papers.bib")).query("@*")
entries = entries.each_with_index.sort_by { |(entry, index)| [-entry[:year].to_i, index] }.map(&:first)
preprints, published = entries.partition { |entry| entry[:journal].to_s.start_with?("arXiv") }

{ "publications" => published, "preprints" => preprints }.each do |filename, papers|
  lines = ["% Generated from _bibliography/papers.bib; do not edit by hand.", "\\resumePublicationSubHeadingListStart", "  \\vspace{2pt}"]
  papers.each do |entry|
    raise "Aoran Wang missing from #{entry.key}" unless entry.author.any? { |name| name.family.to_s == "Wang" && name.given.to_s == "Aoran" }
    url = entry[:website] || entry[:pdf] || ("https://doi.org/#{entry[:doi]}" unless entry[:doi].to_s.empty?)
    raise "Missing paper link for #{entry.key}" unless url
    title = tex(entry[:title])
    title += "." unless title.end_with?("?", "!", ".")
    citation = "#{authors(entry)} (#{entry[:year]}). #{title} #{venue(entry)}."
    label = filename == "preprints" ? "Link to preprint" : "Link to paper"
    citation += " (\\href{#{tex(url)}}{\\underline{#{label}}}.)"
    lines << "  % #{entry.key}"
    # Keep each citation together while preserving the original circular bullets.
    lines << "  \\resumePublicationItem{\\begin{minipage}[t]{\\linewidth}\\raggedright #{citation}\\end{minipage}}"
  end
  lines << "\\resumePublicationSubHeadingListEnd"
  File.write(File.join(__dir__, "#{filename}.tex"), lines.join("\n") + "\n")
  puts "#{filename}: #{papers.length} entries"
end
