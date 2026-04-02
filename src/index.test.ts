import path from "node:path"
import { describe, expect, it } from "vitest"
import { searchAndReplace } from "./index.ts"

const fixturesDir = path.resolve(import.meta.dirname, "..")

describe("searchAndReplace", () => {
  it("replaces values from TSV file in text", async () => {
    const result = await searchAndReplace(
      path.join(fixturesDir, "replacements.tsv"),
      path.join(fixturesDir, "example.txt"),
    )

    expect(result).toBe(
      [
        "replacement",
        "  replacement",
        "another replacement",
        "",
        "correct",
        "  correct",
        "it is correct",
        "",
      ].join("\n"),
    )
  })

  it("handles empty replacements file", async () => {
    const { writeFile, unlink } = await import("node:fs/promises")
    const emptyTsv = path.join(fixturesDir, "empty.tsv")
    const textFile = path.join(fixturesDir, "example.txt")

    await writeFile(emptyTsv, "")
    try {
      const result = await searchAndReplace(emptyTsv, textFile)
      expect(result).toBe(
        [
          "value",
          "  value",
          "another value",
          "",
          "broken",
          "  broken",
          "it is broken",
          "",
        ].join("\n"),
      )
    }
    finally {
      await unlink(emptyTsv)
    }
  })
})
