/**
 * @Desc: generate project
 * @Date: 2019-02-21
 */

const ora = require('ora');
const download = require('./download');
const templates = require('./templates');
const to = require('try-to-catch');
const imp = {};

/**
 * generate project
 * @param {String} projectName
 */
imp.generate = async (projectName = 'demo-project', templateName = 'default') => {
  let {downloadUrl} = templates[templateName];
  //下载模板项目，下载墙loading提示
  const spinner = ora('正在下载模板...').start();
  //第一个参数是模板仓库地址，第二个参数是创建的项目目录名，第三个参数是clone
  const [err, res] = await to(download, downloadUrl, projectName)
  const promise = new Promise((resolve, reject) => {
    if (err) {
      spinner.fail('项目模板下载失败: ', err);
      reject(err)
    } else {
      spinner.succeed('项目模板下载成功');
      resolve()
    }
  })
};

module.exports = imp;
