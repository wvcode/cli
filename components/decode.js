module.exports = function (value) {
  let result =
    value.slice(value.length - 3, value.length - 1) +
    value.slice(0, value.length - 3) +
    value.slice(value.length - 1)
  let buff = new Buffer.from(result, 'base64')
  let base64data = buff.toString('utf-8')

  console.log(`${value} = ${base64data}`)
}
