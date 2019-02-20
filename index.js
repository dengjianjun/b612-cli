#!/usr/bin/env node

const program = require('commander'); //设计命令行
const download = require('download-git-repo'); //github仓库下载
const inquirer = require('inquirer'); //命令行答询
const handlebars = require('handlebars'); //修改字符
const ora = require('ora'); //命令行中加载状态标识
const chalk = require('chalk'); //命令行输出字符颜色
const logSymbols = require('log-symbols'); //命令行输出符号
const fs = require('fs');
// 可用模板,目前只有一个，后续有需要再加
const templates = {
  'default': {
    url: 'http://10.35.33.29:9999/dengjianjun/activityTemplate',
    downloadUrl: 'direct:http://10.35.33.29:9999/dengjianjun/activityTemplate.git',
    description: '默认h5活动页模板'
  }
}


program.usage('init [h5-template]')
  .version('0.1.0'); // -V|--version时输出版本号0.1.0

// b612 init <project> [template]
program
  .command('init <project> [template]')
  .description('初始化项目模板')
  .action((projectName, templateName = 'default') => {
    let {
      downloadUrl
    } = templates[templateName];
    //下载模板项目，下载墙loading提示
    const spinner = ora('正在下载模板...').start();
    //第一个参数是模板仓库地址，第二个参数是创建的项目目录名，第三个参数是clone
    download(downloadUrl, projectName, {
      clone: true
    }, err => {
      if (err) {
        spinner.fail('项目模板下载失败');
      } else {
        spinner.succeed('项目模板下载成功');
        //命令行答询
        inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: '请输入项目名称',
            default: projectName
          },
          {
            type: 'input',
            name: 'description',
            message: '请输入项目简介',
            default: ''
          },
          {
            type: 'input',
            name: 'author',
            message: '请输入作者名称',
            default: ''
          },
          {
            type: 'input',
            name: 'mail',
            message: '请输入作者邮箱',
            default: ''
          }
        ]).then(answers => {
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
        })
      }
    })
  })

// b612 list
program
  .command('list')
  .description('查看所有可用模板')
  .action(() => {
    console.log(`
            default   默认h5活动页模板
        `)
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

// error on unknown commands
program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

program.parse(process.argv);
