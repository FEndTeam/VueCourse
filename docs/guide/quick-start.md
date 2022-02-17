---
footer: false
---

# 快速开始 {#quick-start}

根据你的使用场景和个人偏好，在使用 Vue 时，你可以选择是否采用构建流程。

## 采用构建工具 {#with-build-tools}

构建工具让我们能使用 Vue [单文件组件]。Vue 官方的构建流程是基于 [Vite](https://vitejs.dev) 的，一个现代、轻量、极速的构建工具。

### 线上构建 {#online}

你可以通过 [StackBlitz](https://vite.new/vue) 在线使用单文件组件尝试 Vue。StackBlitz 直接在浏览器里运行了基于 Vite 的构建设置，所以它和在本地设置几乎完全一致，但不需要在机器上安装任何依赖。

### 本地构建 {#local}

:::tip 前提条件

- 熟悉命令行
- 已安装 [Node.js](https://nodejs.org/)
:::

为了在机器上创建一个启用构建工具的 Vue 项目，请在命令行中运行下面的指令 (不要带上 `>` 符号)：

<div class="language-sh"><pre><code><span class="line"><span style="color:var(--vt-c-green);">&gt;</span> <span style="color:#A6ACCD;">npm init vue@latest</span></span></code></pre></div>

这一指令将会安装并执行 [create-vue](https://github.com/vuejs/create-vue)，它是 Vue 官方的项目脚手架工具。你将会看到一些诸如 TypeScript 和测试支持之类的可选功能提示：

如果不确定是否要开启某个功能，你可以直接按下回车键选择 `No`。在项目被创建后，通过以下步骤安装依赖并启动开发服务器：

你现在应该已经运行起来了你的第一个 Vue 项目！下面是一些补充提示：

- 推荐的 IDE 配置是 [Visual Studio Code](https://code.visualstudio.com/)+ [Volar 扩展](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)，选用 [WebStorm](https://www.jetbrains.com/webstorm/) 也是可以的。
- 更多工具细节，包括与后端框架的整合，我们会在[工具链指引]
- 要了解构建工具 Vite 更多背后的细节，请查看 [Vite 文档](https://cn.vitejs.dev)。
- 如果你选择使用 TypeScript，请阅读 [TypeScript 使用指南]

## 不使用构建工具 {#without-build-tools}

若不想经过构建流程就可以使用 Vue，请直接复制下面的代码到一个 HTML 文件中，并在浏览器中打开它：

```html
<script src="https://unpkg.com/vue@3"></script>

<div id="app">{{ message }}</div>

<script>
  Vue.createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

上面的例子使用了全局构建版的 Vue，该版本的所有 API 都暴露在了全局变量 `Vue` 上。

在全局构建版可用的情况下，为保持一致性，在该文档的其余部分我们会主要使用 [ES 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)语法。若想通过原生 ES 模块使用 Vue，请使用下面这样的 HTML：

```html
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

注意我们可以直接在代码中导入 `'vue'`——这是因为有代码块 `<script type="importmap">`，使用了一个名为[导入映射表 (Import Maps)](https://caniuse.com/import-maps) 的浏览器原生功能。目前只有基于 Chromium 的浏览器支持导入映射表，所以我们推荐你在学习过程中使用 Chrome 或 Edge。如果更偏爱那些还不支持导入映射表的浏览器，你可以使用 [es-module-shims](https://github.com/guybedford/es-module-shims) 来进行 polyfill。

你可以在映射表中添加其他的依赖——但请务必确保你使用的是该库的 ES 模块版本。

:::tip 不要用在生产环境
基于导入映射表的配置仅用于学习——如果你想在生产环境不通过构建工具使用 Vue，请务必阅读[生产环境部署指南]。
:::

### 通过 HTTP 提供服务 {#serving-over-http}

随着对这份指南的逐步深入，我们可能需要将代码分割成单独的 JavaScript 文件，以便更容易管理。例如：

```html
<!-- index.html -->
<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}
```

为了使其工作，你需要通过 `http://` 协议为你的 HTML 提供服务，而不是 `file://` 协议。想启动一个本地的 HTTP 服务器，请先安装 [Node.js](https://nodejs.org/zh/)，然后从命令行在 HTML 文件所在文件夹下运行 `npx serve`。你也可以使用其他任何可以基于正确的 MIME 类型服务静态文件的 HTTP 服务器。

可能你也注意到了，这里导入的组件模板是内联的 JavaScript 字符串。如果你正在使用 VSCode，你可以安装 [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) 扩展，然后在字符串前加上一个前缀注释 `/*html*/` 以高亮语法。