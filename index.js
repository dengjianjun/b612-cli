#!/usr/bin/env node
/**
 * @Desc: the entry of the project
 * @Date: 2019-02-21
 */

const program = require('commander'); //设计命令行
const inquirer = require('inquirer'); //命令行答询
const handlebars = require('handlebars'); //修改字符
const chalk = require('chalk'); //命令行输出字符颜色
const logSymbols = require('log-symbols'); //命令行输出符号
const fs = require('fs');
const file = require('./lib/file');
const templates = require('./lib/templates');

program.usage('init <projectName> [templateName]')
  .version('1.0.0'); // -V|--version时输出版本号1.0.0

// b612 init <project> [template]
program
  .command('init <projectName> [templateName]')
  .description('初始化项目模板')
  .action((projectName, templateName = 'default') => {
    main(projectName, templateName);
  })

// b612 list
program
  .command('list')
  .description('查看所有可用模板')
  .action(() => {
    let log = '\n'
    for (let key in templates) {
      const template = templates[key]
      log += `\t${key}    ${template.description}\n`
    }
    console.log(log)
  })

/**
 * Help.
 */
function help() {
  // no command
  if (process.argv.length < 3) {
    return program.help();
  }
}

help();

/**
 * main
 */
async function main(projectName, templateName) {
  await file.generate(projectName, templateName);
  prompt(projectName)
}

/**
 * 处理输入
 */
async function prompt(projectName) {
  const author = require('git-user-name')();
  const promptList = [
    {
      type: 'input',
      name: 'name',
      message: '请输入项目名称',
      default: projectName
    },
    {
      type: 'input',
      name: 'description',
      message: '请输入项目简介',
      default: 'This is a vue activity project.'
    },
    {
      type: 'input',
      name: 'author',
      message: '请输入作者名称',
      default: author
    },
    {
      type: 'input',
      name: 'mail',
      message: '请输入作者邮箱',
      default: `${author}@yiruikecorp.com`
    }
  ]
  //命令行答询
  const answers = await inquirer.prompt(promptList)
  const files = ['package.json', 'README.md'];
  files.forEach(file => {
    //根据命令行答询结果修改对应文件
    const filePath = `${projectName}/${file}`;
    const packsgeContent = fs.readFileSync(filePath, 'utf8');
    const packageResult = handlebars.compile(packsgeContent)(answers);
    fs.writeFileSync(filePath, packageResult);
  });
  //用chalk和log-symbols改变命令行输出样式
  console.log(logSymbols.success, chalk.green('模板项目文件准备成功'));
}

// error on unknown commands
program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);
