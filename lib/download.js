/**
 * @Desc: download h5 template
 * @Date: 2019-02-21
 */
const dl = require('download-git-repo');

function download(downloadUrl, projectName) {
  console.log(downloadUrl)
  return new Promise((resolve, reject) => {
    // use http git clone
    const option = {clone: true};
    //第一个参数是模板仓库地址，第二个参数是创建的项目目录名，第三个参数是clone
    dl(downloadUrl, projectName, option, err => {
      console.log('dl:--',downloadUrl, projectName, option);
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  });
};
module.exports = download
