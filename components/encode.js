const { encode } = require('@wvcode/utils')

module.exports = function (value) {
  let utf8 = encode(value)
  console.log(`${value} = ${utf8}`)
}
