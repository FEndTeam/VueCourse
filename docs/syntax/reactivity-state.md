# 响应式状态

::: tip 目标
这一小节，我们的目标是学习响应式状态
:::

::: warning 步骤

1. 什么是响应性
2. 声明响应式状态
3. 使用响应式状态
4. 更改响应式状态
5. `<script setup>`
6. `reactive()`的局限性
:::

::: info 体验

* **Kn.1：什么是响应性**

  这个术语最近在编程中经常出现，但人们说它的时候究竟是想表达什么意思呢？响应性是一种可以使我们声明式地处理变化的编程范式。组件状态都是响应式的 JavaScript 对象。当更改它们时，视图会随即更新，这就是响应性...

* **Kn.2：声明响应式状态**

  我们可以使用`reactive()`函数创建一个响应式对象或数组,**在 Vue 中，状态都是默认深层响应式的。这意味着即使在更改深层次的对象或数组，你的改动也能被检测到。**

  ```js
  import { reactive } from 'vue'

  const state = reactive({ count: 0 })
  ```

* **Kn.3：使用响应式状态**

  要在组件模板中使用响应式状态，请在`setup()`函数中定义并返回

  ```js
  import { reactive } from 'vue'

  export default {
    // `setup` 是一个专门用于组合式 API 的特殊钩子
    setup() {
      const state = reactive({ count: 0 })

      // 暴露 state 到模板
      return {
        state
      }
    }
  }
  ```

  ```html
  <div>{{ state.count }}</div>
  ```

* **Kn.4：更改响应式状态**

  要在组件中修改响应式状态,我们可以在这个作用域下定义可更改响应式状态的函数，并作为一个方法与 state 一起暴露出去

  ```js
  import { reactive } from 'vue'
  
  export default {
    setup() {
      const state = reactive({ count: 0 })
  
      function increment() {
        state.count++
      }
  
      // 不要忘了同时暴露 increment 函数
      return {
        state,
        increment
      }
    }
  }
  ```

  暴露的方法通常会被用作事件监听器

  ```html
  <button @click="increment">
  {{ state.count }}
  </button>
  ```

* **Kn.5：`<script setup>`**

  在 `setup()` 函数中手动暴露状态和方法可能非常繁琐。幸运的是，可以通过使用构建工具来简化该操作。当使用单文件组件（SFC）时，我们可以使用 `<script setup>` 来简化大量样板代码。

  ```js
  <script setup>
  import { reactive } from 'vue'

  const state = reactive({ count: 0 })

  function increment() {
    state.count++
  }
  </script>

  <template>
    <button @click="increment">
      {{ state.count }}
    </button>
  </template>
  ```

* **Kn.6：`reactive()`的局限性**

  `reactive()` API 有两条限制：
  * ⓵ 仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 基础类型 无效。
  * ⓶ 因为 Vue 的响应式系统是通过属性访问进行追踪的，因此我们必须始终保持对该响应式对象的引用。这意味着我们不可以随意地 “替换” 一个响应式对象

    ```js
    let state = reactive({ count: 0 })

    // 这将不会按照你的期望工作
    state = reactive({ count: 1 })
    ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
