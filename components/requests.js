const fs = require('fs')
const reqs = require('@wvcode/requests')

module.exports = function (url, options) {
  let configObject = {
    cfg: options.hasOwnProperty('config') ? JSON.parse(fs.readFileSync(options.config, 'utf-8')) : null,
    useAuth: options.hasOwnProperty('auth'),
    authType: options.hasOwnProperty('typeauth') ? options.typeauth : null,
    credentials: options.hasOwnProperty('security') ? JSON.parse(fs.readFileSync(options.security, 'utf-8')) : null
  }

  const r = new reqs(configObject)

  r.get(url).then(response => {
    if (!options.hasOwnProperty('file')) {
      console.log(JSON.stringify(response))
    } else {
      console.log(`Saving content to file ${options.file}`)
      fs.writeFileSync(options.file, JSON.stringify(response))
    }
  })
}
