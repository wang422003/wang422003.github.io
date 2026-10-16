/** @param {string} value */
export function normalizeSearchText(value) {
  return value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/**
 * @param {{title: string, authors: {first: string, last: string}[], venue: string,
 * year: number, venueFull?: string, aliases?: string[], arxiv?: string | null,
 * doi?: string | null}} paper
 */
export function createPublicationSearchText(paper) {
  return normalizeSearchText(
    [
      paper.title,
      ...paper.authors.map((author) => `${author.first} ${author.last}`),
      `${paper.venue} ${paper.year}`,
      paper.venueFull || "",
      ...(paper.aliases || []),
      paper.arxiv || "",
      paper.doi || "",
    ].join(" "),
  );
}

/** @param {string} searchText @param {string} query */
export function matchesPublicationSearch(searchText, query) {
  const words = normalizeSearchText(query).split(" ").filter(Boolean);
  const index = normalizeSearchText(searchText);
  const compactIndex = index.replaceAll(" ", "");
  return words.every(
    (word) => index.includes(word) || compactIndex.includes(word),
  );
}
