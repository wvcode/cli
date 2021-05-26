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
      "trainlingComma": "none",
      "endOfLine": "auto"
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

  fs.writeFileSync('.editorconfig', editorConfig)
  fs.writeFileSync('.eslintrc', eslintrc)
  fs.writeFileSync('.prettierrc', prettierrc)
  fs.writeFileSync('package.json', packagejson)
  fs.writeFileSync('index.js', indexjs)
  exec('npm install', function (error, stdOut, stdErr) {
    console.log('done.')
  })
}
