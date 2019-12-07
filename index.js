const fse = require('fs-extra')
const csvParse = require('csv-parse/lib/sync')

module.exports = async function searchAndReplace (replacementsFilePath, textFilePath) {
  const [textFileContent, replacementsContent] = await Promise
    .all([
      fse.readFile(textFilePath, 'utf8'),
      fse.readFile(replacementsFilePath, 'utf-8'),
    ])
  let fixedText = textFileContent
  const records = csvParse(
    replacementsContent,
    {
      delimiter: '\t',
      comment: '#',
    }
  )

  records.forEach(pair => {
    const [match, replacement] = pair
    const pattern = new RegExp(`(\\W|^)${match}(\\W|$)`, 'igm')
    const normReplacement = (/^\\u.*/g).test(replacement)
      ? String.fromCharCode(`0x ${replacement.substr(2)}`)
      : replacement

    fixedText = fixedText.replace(pattern, `$1${normReplacement}$2`)
  })

  console.info(fixedText)
}
