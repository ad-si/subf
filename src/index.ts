import { parse } from "csv-parse/sync"
import { readFile } from "node:fs/promises"

export async function searchAndReplace(
  replacementsFilePath: string,
  textFilePath: string,
): Promise<string> {
  const [textFileContent, replacementsContent] = await Promise.all([
    readFile(textFilePath, "utf8"),
    readFile(replacementsFilePath, "utf-8"),
  ])

  const records: string[][] = parse(replacementsContent, {
    delimiter: "\t",
    comment: "#",
  })

  let fixedText = textFileContent

  for (const [match, replacement] of records) {
    const pattern = new RegExp(`(\\W|^)${match}(\\W|$)`, "igm")
    const normReplacement = /^\\u.*/g.test(replacement)
      ? String.fromCharCode(parseInt(replacement.substring(2), 16))
      : replacement

    fixedText = fixedText.replace(pattern, `$1${normReplacement}$2`)
  }

  return fixedText
}
