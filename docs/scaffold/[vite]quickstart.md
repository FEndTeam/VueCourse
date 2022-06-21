# [vite]快速入门

这一小节，我们来学习如何使用vite来快速创建项目

::: warning Path

1. 脚手架的基本使用
2. 脚手架的目录结构
:::

## Kn.1：脚手架的基本使用

* ⓵ 在命令中输入执行`vite`的命令

```bash
npm create vite@latest
```

* ⓶ 在命令中输入项目名称

```bash
? Project name: » vite-project
```

* ⓷ 选择前端框架

```bash
? Select a framework: » - Use arrow-keys. Return to submit.
>   vanilla
    vue
    react
    preact
    lit
    svelte
```

* ⓸ 选择项目中是否使用ts

```bash
? Select a variant: » - Use arrow-keys. Return to submit.
>   vue
    vue-ts
```

* ⓹ 进入项目目录，下载依赖并启动项目

```bash

Done. Now run:

  cd vite-project
  npm install
  npm run dev
```

## Kn.2：脚手架的目录结构

```bash
📂 Vue 项目目录结构
├─📂 node_modules  // 所有依赖安装文件夹
├─📂 public      
│    └─📄 favicon.ico // 应用程序顶部的icon图标       
│   
├─📂 src  // 基本所有开发都在这个文件夹中进行
│    ├─📂 assets  
│    │    └─📄 logo.png     
│    ├─📂 components  
│    │    └─📄 HelloWorld.vue      
│    ├─📄 App.vue
│    └─📄 main.js
├─📄 .gitignore
├─📄 index.html
├─📄 vite.config.js
├─📄 package-lock.json  // 依赖本地下载版本管理文件
├─📄 package.json  // 应用的配置文件：包括应用名称、一些依赖包、以及项目的启动、打包等等
└─📄 README.md     // 项目说明文档
```
