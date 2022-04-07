#! /usr/bin/env node

const { Command, Option } = require('commander')

/**
 * available commands
 */
const requestAction = require('./components/requests')
const encodeAction = require('./components/encode')
const decodeAction = require('./components/decode')
const createProjectAction = require('./components/createproject')
const convertFileAction = require('./components/convertfile')
const convertExcelAction = require('./components/convertexcel')
const processSurveyAction = require('./components/processsurvey')

const program = new Command()
// atribui a versão do cli
program.version('0.0.6')

//Comando de Requests - Operações com REST API
const requests = program.command('requests').description('process web requests (REST APIS only)')

requests
  .command('get <url>')
  .description('Acessa uma REST API e retorna o conteúdo')
  .option('-f, --file <filename>', 'Salva o conteúdo em arquivo')
  .option('-c, --config <configfilename>', 'caminho para o arquivo de configuração')
  .option('-a, --auth', 'usa autenticação', false)
  .addOption(
    new Option('-t, --typeauth <type>', 'tipo de autenticação')
      .choices(['Basic', 'NTLM', 'ntlm', 'basic', null])
      .default(null)
  )
  .option('-s, --security <securityfilename>', 'caminho para o arquivo contendo credenciais de acesso')
  .action(requestAction)

//Comandos para fazer o encode/decode de strings
program.command('encode <value>').description('Encode to Base64').action(encodeAction)

program.command('decode <value>').description('Decode to UTF-8').action(decodeAction)

// Comandos de conversão de arquivos
const files = program.command('files').description('rotinas de conversão de arquivos')

files
  .command('convert')
  .description('converte uma lista de arquivos')
  .option('-s, --source <filename...>', 'lista de arquivos de origem')
  .addOption(new Option('-t, --target <formatType>', ' formato do(s) arquivo(s) de destino').choices(['json', 'csv']))
  .action(convertFileAction)

// Comando para exportar excel com multiplas abas
const excel = program.command('excel').description('rotinas de conversão de arquivos excel')

excel
  .command('convert')
  .description('converte um arquivo excel')
  .option('-s, --source <filename>', 'nome do arquivo de origem')
  .option('-w, --worksheets <sheetnames...>', 'nome das planilhas')
  .addOption(new Option('-t, --target <formatType>', ' formato do(s) arquivo(s) de destino').choices(['json', 'csv']))
  .action(convertExcelAction)

//Comando de Manipulação de projetos
const project = program.command('project').description('rotinas de manipulação de projetos')
project.command('create <projectname>').description('cria um novo projeto node').action(createProjectAction)

//Comando de processamento de dados de surveys
const form = program.command('survey').description('rotinas para processamento de dados de surveys')
form
  .command('process')
  .description('processa o arquivo')
  .option('-s, --source <filename...>', 'nome do arquivo de origem')
  .option('-t, --target-folder <path>', 'nome do diretorio onde armazenar os arquivos processados', './')
  .addOption(
    new Option('-f, --format <type>', 'formato do arquivo de destino')
      .choices(['csv', 'CSV', 'json', 'JSON', 'Csv', 'Json'])
      .default('csv')
  )
  .action(processSurveyAction)

//Inicializa o parser
program.parse()
