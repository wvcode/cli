const { decode } = require('@wvcode/utils')

module.exports = function (value) {
  let base64data = decode(value)
  console.log(`${value} = ${base64data}`)
}
