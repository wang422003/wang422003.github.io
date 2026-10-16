import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createPublicationSearchText,
  matchesPublicationSearch,
} from "../src/lib/publication-search.mjs";

const { papers } = JSON.parse(
  readFileSync(new URL("../.cache/site.json", import.meta.url), "utf8"),
);
const search = (query) =>
  papers.filter((paper) =>
    matchesPublicationSearch(createPublicationSearchText(paper), query),
  );

test("project acronyms find papers whose formal titles do not contain them", () => {
  assert.deepEqual(
    search("VIPER-R1").map((paper) => paper.id),
    ["liu2026viper"],
  );
  assert.deepEqual(
    search("SciReasoner").map((paper) => paper.id),
    ["tang2026native_structural_reasoning"],
  );
  assert.deepEqual(
    search("StructInfer").map((paper) => paper.id),
    ["wang2024benchmarking"],
  );
  for (const alias of ["SICSM", "SGSI", "SIDEC"])
    assert.equal(search(alias).length, 1, alias);
});

test("case, spaces, and Unicode hyphens do not prevent acronym matches", () => {
  for (const query of ["  viper r1  ", "VIPERR1", "VIPER–R1", "viper‑r1"]) {
    assert.deepEqual(
      search(query).map((paper) => paper.id),
      ["liu2026viper"],
      query,
    );
  }
  assert.deepEqual(
    search("interns1").map((paper) => paper.id),
    ["bai2025interns1"],
  );
});

test("title, author, venue, and multiple terms still work with aliases", () => {
  assert.ok(
    search("PhysUniBench").some((paper) => paper.id === "wang2025physunibench"),
  );
  assert.ok(search("Aoran Wang").some((paper) => paper.id === "liu2026viper"));
  assert.deepEqual(
    search("viper NeurIPS 2026").map((paper) => paper.id),
    ["liu2026viper"],
  );
  assert.deepEqual(
    search("Mimicking the Physicist").map((paper) => paper.id),
    ["liu2026viper"],
  );
  assert.deepEqual(
    search("2508.17380").map((paper) => paper.id),
    ["liu2026viper"],
  );
});

test("empty searches restore all papers and unrelated queries have no matches", () => {
  assert.equal(search("   ").length, papers.length);
  assert.equal(search("unrelated-query-93751").length, 0);
});
