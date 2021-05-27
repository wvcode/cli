const fs = require('fs')
const fileUtils = require('@wvcode/utils')
const path = require('path')

module.exports = async function (options) {
  for (var file of options.source) {
    console.log(`Convertendo arquivo ${file} para o formato ${options.target}`)
    const sourceExt = path.extname(file)
    const targetName = file.replace(sourceExt, `.${options.target}`)
    console.log(sourceExt, targetName)
    let content = null
    console.log('==> carregando o arquivo...')
    if (sourceExt.toLowerCase() == '.json') {
      content = JSON.parse(fs.readFileSync(file, 'utf8'))
    }
    if (sourceExt.toLowerCase() == '.csv') {
      content = await fileUtils.files.readCSVtoJSON(file)
    }
    console.log('==> salvando o arquivo...')
    if (options.target.toLowerCase() == 'json') {
      fs.writeFileSync(targetName, JSON.stringify(content))
    }
    if (options.target.toLowerCase() == 'csv') {
      fileUtils.files.writeJSONtoCSV(content, targetName)
    }
    console.log(`arquivo ${targetName} salvo`)
  }
}
