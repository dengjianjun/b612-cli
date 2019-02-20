## b612-cli
##### [b612-cli](http://10.35.33.29:9999/dengjianjun/b612-cli)是帮助你快速创建生成h5活动项目的脚手架工具
### Installation
1. `git clone http://10.35.33.29:9999/dengjianjun/b612-cli.git`
2. `npm i`
3. `npm link`

### Usage
```
b612 init my-project default
```
1. 初始化项目是第一项`my-project`是项目名称。
2. 第二项default是模板名称，可选，默认使用`default`模板。
3. 目前只做了一个模板，后续再添加。

##### 初始化项目完成以后
```
cd my-project //进入项目目录
npm install //安装项目依赖
npm start //运行项目
```
### command
###### 启动项目
`npm start` 或者 `npm run dev`
###### 打包项目
`npm run build`

### Version
- `v1.0.0`实现基本构建功能