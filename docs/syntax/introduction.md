# 基本介绍

::: tip 目标
这一小节，我们的目标是了解Vue，并对它有一个大概的认识
:::

::: warning 步骤

1. 概念
2. 特点
3. 发展简史
4. 为什么学习Vue3
5. 简单使用

:::

::: info 体验

* **Kn.1：概念**

  Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。
  它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面，无论任务是简单还是复杂。

  ![尤雨溪](./images/image_202201071714.jpg)

* **Kn.2：特点**

  * **⓵ 门槛低，上手快**

    简单易学，只要稍微会点`HTML`、`CSS`、`JavaScript`基础就能很快上手`Vue`

  * **⓶ 灵活的组件系统**

    组件（`Component`）是 `Vue` 最强大的功能之一。组件可以扩展 `HTML` 元素，封装可重用的代码。

  * **⓷ 强大的指令系统**

    `Vue` 与页面进行交互，主要就是通过内置指令来完成的，指令的作用是当其表达式的值改变时相应地将某些行为应用到 `DOM` 。

  * **⓸ 丰富的生态系统**

    在 `GitHub`中，有非常多的有关 `Vue`周边的库，官方提供了几个开发Vue项目必用的库(`VueRouter`、`Vuex`、`Nuxt`)，除此以外，全世界各国的程序员都在为Vue提供相关的库(表单校验、UI组件等),如果你还对Vue周边有任何疑问，还可以访问[GitHub仓库](https://github.com/vuejs/awesome-vue)去查看详细信息

  * **⓹ 先进的框架思想**

    Vue采用 `MVVM`设计思想来对视图层的开发进行了升级，使得我们从以前的**命令式**编程转变为**声明式**编程，其中`MVVM`中的 `M`代表状态(即数据)，`V`代表模板(即`HTML`),而`VM`正是视图模型(`ViewModel`),也是Vue在前端开发中所扮演的角色，监听数据变化，控制视图更新。

    ![MVVM](./images/image_20222_01_08_2009.png)

* **Kn.3：发展简史**

  `Vue` 最初源于 2013 年，当时只是作者尤雨溪(`Evan You`)在 `Google Creative Lab`的创意技术人员(`Create Technologist`)工作时的业余项目。

  尤雨溪在`Google`工作一段时间后，结合过去开发 `AngularJS` 的经验，开发出 `Vue` 这一套框架，并在2014年2月再 `Hacker News` 与 `Reddit` 等网站对外正式发布了这个 `Vue 0.8` 的版本。

  随着时间的流逝，`Vue` 也吸引到知名 `PHP` 框架 `Laravel` 的作者 `Taylor Otwell` 在 `Twitter` 上为 `Vue` 打起免费广告， 并在后续版本中被纳入 `Laravel` 官方指定的入门套件，这使得 `Vue` 逐渐在技术圈更加广为人知。

  后来，**`Vue` 1.x 版正式发布于 2015 年**， 这个时期的 `Vue` 就像轻量版的 `AngularJS`(v1)，将 `template` 直接在浏览器中解析。同年， `VueRouter`、`Vuex`、`Vue CLI` 等周边生态工具链也相继发布。

  接着，**2016 年 10 月发布 Vue 2.x版本(代号: `Ghost in the Shell`)**。由于这个版本借鉴了 `React` 的 `Virtual DOM` 更新机制， 将 `template` 编译为 `render function`，并回传 `Virtual DOM` ，再由浏览器输出渲染，也提供了 `SSR` 的可能性，在维持 v1 时期的良好开发体验与增强执行效率的平衡下，使得 Vue 正式站稳脚跟，跻身于主流前端框架之列。

  而万众期待的**Vue 3.x(版本代号：One Piece)于 2020年9月18日 正式推出**。此版本底层核心由 `TypeScript` 重写，除了有九成以上 语法 与 `Vue 2.x` 相容之外，效率变得更快、编译后的体积更小之外，也加入了不少好用的特性。

* **Kn.4：为什么学习Vue3**

  * ⓵ Vue3 运行性能大幅提升，速度是 Vue2 的 1.5 倍左右
  * ⓶ Vue3 支持 tree shaking，可以进行按需编译，编译后的文件体积比 Vue2 更小
  * ⓷ Vue3 组合式 API 使应用中的功能代码更聚合，使组件间公共逻辑的抽取更容易
  * ⓸ Vue3 对 TypeScript 的支持更加友好，对大型前端应用的支持更加游刃有余
  * ⓹ Vue3 中提供了更加先进的功能，比如 teleport，suspense 等
  * ⓺ Vue 是目前国内前端使用者最多的框架，Vue3 是将来的必然趋势

* **Kn.5：简单使用**

  请直接复制下面的代码到一个 HTML 文件中，并在浏览器中打开它：

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
* 【难点】
* 【注意点】

:::