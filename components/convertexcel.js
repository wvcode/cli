const fs = require('fs')
const fileUtils = require('@wvcode/utils')
const path = require('path')

module.exports = async function (options) {
  for (var wsheet of options.worksheets) {
    console.log(`Convertendo arquivo ${options.source} aba ${wsheet} para o formato ${options.target}`)
    const targetName = `${wsheet}.${options.target}`

    let content = null
    console.log('==> carregando dados...')
    content = await fileUtils.files.xlsxToJson(options.source, wsheet)

    console.log('==> salvando o arquivo...')
    if (options.target.toLowerCase() == 'json') {
      fs.writeFileSync(targetName, JSON.stringify(content, '', 2))
    }
    if (options.target.toLowerCase() == 'csv') {
      fileUtils.files.writeJSONtoCSV(content, targetName)
    }
    console.log(`arquivo ${targetName} salvo`)
  }
}
