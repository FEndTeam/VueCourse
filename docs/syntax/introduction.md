# 基本介绍

::: tip 目标
这一小节，我们的目标是了解Vue，并对它有一个大概的认识
:::

::: warning 步骤

1. 什么是Vue
2. 渐进式框架
3. 单文件组件
4. API 风格

:::

::: info 体验

* **Kn.1：什么是Vue**

  Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面，无论任务是简单还是复杂。

  下面是一个最基本的示例：

  ```html
  <div id="app">
    <button @click="count++">
      Count is: {{ count }}
    </button>
  </div>
  ```

  ```js
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        count: 0
      }
    }
  }).mount('#app')
  ```

  * **声明式渲染**：Vue 通过自己的模板语法扩展了标准 HTML，使我们可以声明式地描述基于 JavaScript 状态输出 HTML
  * **响应性**：Vue 会自动跟踪 JavaScript 状态变化并在改变发生时响应式地更新 DOM

* **Kn.2：渐进式框架**

  Vue 是一个框架和生态，功能覆盖了大部分前端开发常见的需求。根据你的需求场景，Vue 可以按不同的方式使用：
  * 增强静态的 HTML 而无需构建步骤
  * 在任何页面中作为 Web Components 嵌入
  * 单页应用 (SPA)
  * 全栈 / 服务端渲染 (SSR)
  * JAMStack / 静态站点生成 (SSG)
  * 目标为桌面端、移动端、WebGL，甚至是命令行终端

* **Kn.3：单文件组件**

  在大多数启用了构建工具的 Vue 项目中，我们可以使用一种类似 HTML 格式的文件来书写 Vue 组件，它被称为单文件组件 (也被称为 *.vue 文件，英文缩写为 SFC)。顾名思义，Vue 的单文件组件会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里。

  ```html
  <script>
    export default {
      data() {
        return {
          count: 0
        }
      }
    }
  </script>

  <template>
    <button @click="count++">Count is: {{ count }}</button>
  </template>

  <style scoped>
    button {
      font-weight: bold;
    }
  </style>  
  ```

  单文件组件是 Vue 的标志性功能。如果你的用例需要进行构建，我们推荐用它来编写 Vue 组件

* **Kn.4：`API`风格**

  Vue 的组件可以按两种不同的风格书写：**选项式 API**和**组合式 API**

  **选项式 API：**

  使用选项式 API，我们可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。

  ```html
  <script>
    export default {
      // data() 返回的属性将会成为响应式的状态
      // 并且暴露在 `this` 上
      data() {
        return {
          count: 0
        }
      },

      // methods 是一些用来更改状态与触发更新的函数
      // 它们可以在模板中作为事件监听器绑定
      methods: {
        increment() {
          this.count++
        }
      },

      // 生命周期钩子会在组件生命周期的各个不同阶段被调用
      // 例如这个函数就会在组件挂载完成后被调用
      mounted() {
        console.log(`The initial count is ${this.count}.`)
      }
    }
  </script>
  
  <template>
    <button @click="increment">count is: {{ count }}</button>
  </template>
  ```

  **组合式 API:**

  通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 `<script setup>` 搭配使用。这个 setup attribute 是一个标识，告诉 Vue 需要在编译时进行转换，来减少使用组合式 API 时的样板代码。

  ```html
  <script>
  import { defineComponent, ref } from 'vue';
  
  import HelloWorld from './components/HelloWorld.vue'
  import TheWelcome from './components/TheWelcome.vue'
  
  export default defineComponent({
    components: {
        HelloWorld,
        TheWelcome
    },
    setup() {
      let num = ref(0)
  
      return {
        num
      }
    }
  });
  </script>
  ```

  ```html
  <script setup>
    import { ref, onMounted } from 'vue'

    // 响应式状态
    const count = ref(0)

    // 用来修改状态、触发更新的函数
    function increment() {
      count.value++
    }

    // 生命周期钩子
    onMounted(() => {
      console.log(`The initial count is ${count.value}.`)
    })
  </script>

  <template>
    <button @click="increment">Count is: {{ count }}</button>
  </template>
  ```

:::

::: danger 总结

* 【重点】
  * ⓵ 什么是Vue
  * ⓶ 渐进式框架
  * ⓷ 单文件组件
  * ⓸ API 风格
* 【难点】

* 【注意点】

:::
