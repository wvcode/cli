const fs = require('fs')
const exec = require('child_process').exec

module.exports = function (projectName) {
  const editorConfig = `
      # EditorConfig is awesome: https://EditorConfig.org

      # top-most EditorConfig file
      root = true

      [*]
      indent_style = space
      indent_size = 2
      end_of_line = lf
      charset = utf-8
      trim_trailing_whitespace = true
      insert_final_newline = true`

  const eslintrc = `
      {
        "extends": "airbnb",
        "rules": {
          "no-console": 0,
          "linebreak-style": [
            "error",
            "unix"
          ],
          "no-use-before-define": [
            "off"
          ],
          "comma-dangle": [
            "error",
            "never"
          ],
          "global-require": [
            "off"
          ],
          "import/no-dynamic-require": [
            "off"
          ]
        },
        "env": {
          "browser": true,
          "node": true
        }
      }`

  const prettierrc = `{
      "semi": false,
      "singleQuote": true,
      "arrowParens": "avoid",
      "trailingComma": "none",
      "endOfLine": "auto",
      "printWidth": "120"
    }`

  const packagejson = `{
    "name": "${projectName}",
    "version": "0.0.1",
    "license": "MIT",
    "main": "index.js",
    "dependencies": {
      "@wvcode/utils": "^1.0.0",
      "config": "^3.3.6",
      "lodash": "^4.17.21",
      "log4js": "^6.3.0"
    }
  }`

  const indexjs = `#! /usr/bin/env node
    console.log('Hello, World!')`

  console.log(`Gerando arquivos para o projeto ${projectName}...`)

  console.log(`Gerando arquivo .editorConfig`)
  fs.writeFileSync('.editorconfig', editorConfig)

  console.log(`Gerando arquivo .eslintrc`)
  fs.writeFileSync('.eslintrc', eslintrc)

  console.log(`Gerando arquivo .prettierrc`)
  fs.writeFileSync('.prettierrc', prettierrc)

  console.log(`Gerando arquivo package.json`)
  fs.writeFileSync('package.json', packagejson)

  console.log(`Gerando arquivo index.js`)
  fs.writeFileSync('index.js', indexjs)

  console.log(`Instalando pacotes básicos...`)
  exec('npm install', function (error, stdOut, stdErr) {
    console.log('Processo finalizado.')
  })
}
