// CLI entry point

import path from "node:path"
import { searchAndReplace } from "./index.js"

if (!process.argv[2] || !process.argv[3]) {
  console.info("Usage: subf <tsv-file> <text-file>")
}
else {
  const result = await searchAndReplace(
    path.resolve(process.argv[2]),
    path.resolve(process.argv[3]),
  )
  console.info(result)
}
