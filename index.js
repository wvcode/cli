#! /usr/bin/env node

const { Command } = require('commander')

/**
 * available commands
 */
const requestAction = require('./components/requests')
const encodeAction = require('./components/encode')
const decodeAction = require('./components/decode')
const projectAction = require('./components/createproject')

const program = new Command()
// set the program version
program.version('0.0.1')

const requests = program
  .command('requests')
  .description('process web requests (REST APIS only)')

requests
  .command('get <url>')
  .description('Call a web rest api with no authentication.')
  .option('-f, --file <filename>', 'Dump the content to file')
  .option('-c, --config <configfilename>', 'path for the configuration file')
  .action(requestAction)

program
  .command('encode <value>')
  .description('Encode to Base64')
  .action(encodeAction)

program
  .command('decode <value>')
  .description('Decode to UTF-8')
  .action(decodeAction)

program
  .command('create <projectname>')
  .description('cria um novo projeto node')
  .action(projectAction)

program.parse()
