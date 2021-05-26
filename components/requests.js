const fs = require('fs')
const reqs = require('@wvcode/requests')

module.exports = function (url, options) {
  let r = null
  if (options.hasOwnProperty('config')) {
    let file = JSON.parse(fs.readFileSync(options.config, 'utf-8'))
    r = new reqs(file)
  } else {
    r = new reqs()
  }
  r.get(url).then(response => {
    if (!options.hasOwnProperty('file')) {
      console.log(JSON.stringify(response))
    } else {
      console.log(`Saving content to file ${options.file}`)
      fs.writeFileSync(options.file, JSON.stringify(response))
    }
  })
}
