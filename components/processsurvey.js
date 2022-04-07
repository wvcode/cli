const fs = require('fs')
const fileUtils = require('@wvcode/utils')
const path = require('path')

module.exports = async function (options) {
  if (options.hasOwnProperty('source')) {
    console.log(`Arquivos a processar: ${options.source}`)
    console.log(`Diretório de armazenamento: ${options.targetFolder}`)
    console.log(`Formato dos arquivos processados: ${options.format}`)
    console.log(`\n---- Iniciando Processamento ----\n`)

    for (var file of options.source) {
      let records = []
      let record_id = 1

      const sourceExt = path.extname(file)
      const targetName = path.join(
        options.targetFolder,
        'processed_' + path.basename(file.replace(sourceExt, `.${options.format.toLowerCase()}`))
      )

      console.log(`Processando arquivo ${file}...`)

      const dictData = fileUtils.files.csvToJson(file)
      ;(await dictData).forEach(data => {
        let record = {}
        record['id'] = record_id
        data.hasOwnProperty('Timestamp') ? (record['time_stamp'] = data['Timestamp']) : null
        record['load_date'] = data.hasOwnProperty('load_date') ? data['load_date'] : new Date()

        Object.keys(data).forEach(field => {
          if (
            field.toLowerCase().search('all that apply') > -1 ||
            field.toLowerCase().search('all that applies') > -1
          ) {
            data[field].split(';').forEach(value => {
              let rec = Object.assign({}, record)
              rec['question'] = field
              rec['answer'] = value
              records.push(rec)
            })
          } else {
            let rec = Object.assign({}, record)
            rec['question'] = field
            rec['answer'] = data[field]
            records.push(rec)
          }
        })
        record_id++
      })

      console.log(`Salvando arquivo ${targetName}...`)
      options.format.toLowerCase() == 'csv'
        ? fileUtils.files.writeJSONtoCSV(records, targetName)
        : fs.writeFileSync(targetName, JSON.stringify(records, '', 2))
    }
  } else {
    console.log('informe um ou mais arquivos de origem, separados por espaço')
  }
}
