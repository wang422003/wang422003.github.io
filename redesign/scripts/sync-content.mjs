import { spawnSync } from "node:child_process";
import { join, delimiter } from "node:path";

// npm can reorder PATH on macOS. Keep the active Ruby and its gems together.
const rubyPaths = [process.env.RUBY_ROOT, process.env.GEM_HOME]
  .filter(Boolean)
  .map((root) => join(root, "bin"));
const result = spawnSync(
  "bundle",
  ["exec", "ruby", "scripts/sync-content.rb"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PATH: [...rubyPaths, process.env.PATH].join(delimiter),
    },
  },
);
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
