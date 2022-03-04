# 创建一个Vue应用

::: tip 目标
这一小节，我们的目标是来掌握简单Vue应用的开发
:::

::: warning 步骤

1. 创建HTML文件,添加基本模板
2. 引入Vue库文件
3. 创建Vue实例对象
4. 创建容器元素
5. 挂载Vue实例对象
6. 创建根组件
7. 渲染根组件
:::

::: info 体验

* **Step.1：创建HTML文件,添加基本模板**

  ```html
  <!-- 略 -->
  ```

* **Step.2：引入Vue库文件**

  ```html
  <script src="https://unpkg.com/vue@3"></script>
  ```

* **Step.3：创建Vue实例对象**

  每个 Vue 应用都是通过 createApp 函数创建一个新的应用实例

  ```js
  let app = Vue.createApp({});
  ```

* **Step.4：创建容器元素**

  ```html
  <body>
    <!-- 容器元素 -->
    <div id="app"></div>
  </body>
  ```

* **Step.5：挂载Vue实例对象**

  应用实例必须在调用了 `.mount()` 方法后才会渲染出来。该方法接收一个“容器”参数，可以是一个实际的 DOM 元素或是一个 CSS 选择器字符串

  ```js
  // 把 app 挂载到 id 为 app的元素上
  app.mount('#app');
  ```

* **Step.6：注册根组件**

  应用实例提供了一些方法来注册应用范围内可用的资源，例如注册一个组件

  ```js
   // 创建 根组件
    app.component('App', {
      template: '<div>Hello Vue</div>',
    })
  ```

* **Step.7：渲染根组件**

  ```html
  <body>
    <!-- 挂载元素 -->
    <div id="app">
      <!-- 根组件 -->
      <App></App>
    </div>
  </body>
  ```

:::

::: danger 总结

* 【重点】
  * ⓵ 创建HTML文件,添加基本模板
  * ⓶ 引入Vue库文件
  * ⓷ 创建Vue实例对象
  * ⓸ 创建容器元素
  * ⓹ 挂载Vue实例对象
  * ⓺ 创建根组件
  * ⓻ 渲染根组件

* 【注意点】
  * ⓷ 创建Vue实例对象
  * ⓺ 创建根组件
:::
