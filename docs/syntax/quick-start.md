# 快速开始

::: tip 目标
这一小节，我们的目标是了解使用Vue的方式
:::

::: warning 步骤

1. 使用脚手架
2. 使用库文件
:::

::: info 体验

* **Kn.1：使用脚手架**

  构建工具让我们能使用 Vue 单文件组件 (SFC)。Vue 官方的构建流程是基于 **Vite** 的，一个现代、轻量、极速的构建工具。

  * ⓵ 为了在机器上创建一个启用构建工具的 Vue 项目，请在命令行中运行下面的指令 (不要带上 > 符号)

    ```bash
    > npm init vue@latest
    ```

  * ⓶ 可选功能提示

    ```bash

    PS E:\python19\20220322\other> npm init vue@latest
    Need to install the following packages:
      create-vue@latest
    Ok to proceed? (y) y

    Vue.js - The Progressive JavaScript Framework

    √ Project name: ... 项目名称
    √ Add TypeScript? ... No / Yes
    √ Add JSX Support? ... No / Yes
    √ Add Vue Router for Single Page Application development? ... No / Yes
    √ Add Pinia for state management? ... No / Yes
    √ Add Vitest for Unit Testing? ... No / Yes
    √ Add Cypress for both Unit and End-to-End testing? ... No / Yes
    √ Add ESLint for code quality? ... No / Yes
    √ Add Prettier for code formatting? ... No / Yes

    Scaffolding project in E:\python19\20220322\other\项目名称...

    Done. Now run:

      cd 项目名称
      npm install
      npm run dev

    ```

* ⓷ 装依赖并启动开发服务器

    ```bash
    > cd <your-project-name>
    > npm install
    > npm run dev
    ```

* **Kn.2：使用库文件**

  若不想经过脚手架的构建流程就可以使用 Vue，请直接复制下面的代码到一个 HTML 文件中，并在浏览器中打开它：

  ```html
  <script src="https://unpkg.com/vue@3"></script>
  
  <div id="app">{{ message }}</div>
  
  <script>

    // 创建 Vue 应用
    let app = Vue.createApp({
       data() {
        return {
          message: 'Hello Vue!'
        }
      }
    });
    // 把 app 挂载到 id 为 app的元素上
    app.mount('#app');
  </script>
  ```

:::

::: danger 总结

* 【重点】
  * ⓵ 掌握引入库文件来使用Vue
  * ⓶ 了解在脚手架中使用Vue
* 【注意点】
  * ⓵ 推荐的 IDE 配置是 [Visual Studio Code](https://code.visualstudio.com/)+ [Volar扩展](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)，选用 WebStorm 也是可以的。

:::
