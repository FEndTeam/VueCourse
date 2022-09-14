# 脚手架简介

这一小节，我们来了解一下脚手架的基础知识

::: warning Path

1. 为什么需要学习脚手架
2. 脚手架是什么
3. 常见的脚手架
4. 常见的前端构建工具
:::

## Kn.1：为什么需要学习脚手架

随着前端项目开发的越来越复杂，我们需要开始考虑许许多多问题，比如：
  
* 项目的目录结构如何划分
* 如何管理文件间的互相依赖关系
* 如何管理第三方库的依赖
* 如何让项目在发布时进行压缩，减小传输大小以及混淆变量名

如今的前端项目已经变得非常复杂了，我们不能单纯的使用 script 标签来引入大量的第三方库，不能使用 less 或者 sass 等预处理器来对 css 进行更好的编写，不能很好的管理第三方库的版本和依赖

为了解决这些问题，我们可能需要学习一些包管理工具、打包工具比如：babel、webpack、npm 等。配置转换规则、打包依赖以及热更新等功能。

可是这样对于一些初学者而言并不友好，你还没有开始上手学习各种知识就被迫学习许多辅助型的工具，而且它们的配置都不那么简单。

脚手架的出现就是为了帮助我们解决上述所有问题的一个很方便的工具。

## Kn.2：脚手架是什么

在现实生活中，脚手架是为了保证各施工过程顺利进行而搭设的工作平台。
建造完成之前可以在脚手架上方便的工作，建造后可以直接拆除不会对建造有任何关联。
而我们提到的 Vue 脚手架和这有异曲同工之处。

编程中提到的脚手架，其实是一种工具，帮我们可以快速生成项目的工程化结构。
每个项目的效果不同但是其项目结构大致相同，所以没必要每次进行重复的工作，脚手架提供了一个学习 Vue 的舒适环境，也是用 Vue 创建新的单页应用的最佳方式。

它会配置你的开发环境，以便使你能够使用最新的 JavaScript 特性，提供良好的开发体验，并为生产环境优化你的应用程序。

## Kn.3: 快速开始

在Vue中，我们可以使用 `Vue CLI` 这种基于Webpack的脚手架，也可以使用以速度快著称的 `Vite` 这样的脚手架。而我们要学习的是 `Vite`

* ⓵ 在命令中输入执行vite的命令

```bash
npm create vite@latest
```

* ⓶ 在命令中输入项目名称

```bash
? Project name: » vite-project
```

* ⓷ 选择前端框架

```bash
? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
❯   Vue
    React
    Preact
    Lit
    Svelte
```

* ⓸ 选择一个变体

```bash
? Select a variant: › - Use arrow-keys. Return to submit.
    JavaScript
    TypeScript
❯   Customize with create-vue
    Nuxt
```

* 添加 TypeScript 吗？

```bash
Vue.js - The Progressive JavaScript Framework

# 需要在项目中添加 TypeScript支持吗？
✔ Add TypeScript? … No / Yes
# 需要在项目中添加 JSX支持吗？
✔ Add JSX Support? … No / Yes
# 对于单页面应用开发 需要在项目中添加Vue Router 吗？
✔ Add Vue Router for Single Page Application development? … No / Yes
# 需要在项目中添加 Pinia来对状态进行管理吗？
✔ Add Pinia for state management? … No / Yes
# 需要在项目中添加 Vitest 进行单元测试吗？
✔ Add Vitest for Unit Testing? … No / Yes
# 需要在项目中添加 Cypress 进行 端对端测试吗？
✔ Add Cypress for End-to-End testing? … No / Yes
# 需要在项目中添加 ESLint 进行代码质量检测吗？
✔ Add ESLint for code quality? … No / Yes
# 需要在项目中添加 Prettier 进行代码格式化吗？
✔ Add Prettier for code formatting? … No / Yes
```

## Kn.4：目录结构

```bash
📂 Vue 项目目录结构
├─📂 node_modules  // 所有依赖安装文件夹
├─📂 public      
│    └─📄 favicon.ico // 应用程序顶部的icon图标       
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
