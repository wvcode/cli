module.exports = function (value) {
  let buff = new Buffer.from(value)
  let base64data = buff.toString('base64')
  let result =
    base64data.slice(2, base64data.length - 1) +
    base64data.slice(0, 2) +
    base64data.slice(base64data.length - 1)

  console.log(`${value} = ${result}`)
}
