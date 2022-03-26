# 自定义指令

::: tip 目标
这一小节，我们的目标是掌握自定义指令的使用,那什么应该使用自定义指令呢？只有当所需功能只能通过直接 DOM 操作来实现时，才应该使用自定义指令。尽可能使用声明式的模板、使用内置指令。
:::

::: warning 步骤

1. 介绍
2. 指令钩子
3. 简化形式
4. 对象字面量
5. 在组件上使用
:::

::: info 体验

* **Kn.1：介绍**

  除了 Vue 内置的一系列指令 (比如 v-model 或 v-show) 之外，Vue 还允许你注册自定义的指令。

  我们已经介绍过了两种 Vue 中重用逻辑的方式：组件和可组合函数。
  组件主要关注构建视图区块，而可组合函数关注于有状态的逻辑。
  自定义指令则主要是 封装了可重用的对底层 DOM 访问的逻辑。

  一个自定义指令被定义为一个包含类似于组件的生命周期钩子的对象。
  钩子接收指令绑定到的元素。下面是一个自定义指令的例子，当元素被 Vue 插入到   DOM 中时，会聚焦一个 input 元素：

  ```js
  <script setup>
  // 在模板中注册 v-focus
  const vFocus = {
    mounted: (el) => el.focus()
  }
  </script>

  <template>
    <input v-focus />
  </template>
  ```

  假设你还未点击页面中的其他地方，那么上面这个 input 元素则会被自动聚焦。
  该指令比 autofocus attribute 更有用，因为它不仅仅可以在页面加载完成后运行，还可以在 Vue 动态插入元素后运行。

  在 `<script setup>` 中，任何以 v 开头的 camelCase 格式的变量都会可以被用作一个自定义指令。
  在上面的例子中，vFocus 即可以在模板中被用作指令 v-focus。

  如果不使用 `<script setup>`，自定义指令可以通过 directives 选项注册：

  ```js
  export default {
    setup() {
      /*...*/
    },
    directives: {
      // 在模板中启用 v-focus
      focus: {
        /* ... */
      }
    }
  }
  ```

  常常也会将一个自定义指令注册到应用全局：

  ```js
  const app = createApp({})

  // 使 v-focus 在所有组件中都可用
  app.directive('focus', {
    /* ... */
  })
  ```

* **Kn.2：指令钩子**

  一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

  ```js
  const myDirective = {
    // 在绑定元素的 attribute 前调用
    // 或事件监听器应用前调用
    created(el, binding, vnode, prevVnode) {
      // 下面会介绍各个参数的细节
    },
    // 在元素被插入到 DOM 前调用
    beforeMount() {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都 挂载 完成后调用
    mounted() {},
    // 绑定元素的父组件更新前调用
    beforeUpdate() {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都 更新 完成后调用
    updated() {},
    // 绑定元素的父组件卸载之前调用
    beforeUnmount() {},
    // 绑定元素的父组件卸载之后调用
    unmounted() {}
    }
  }
  ```

* **Kn.3：简化形式**

  对于自定义指令来说，mounted 和 updated 需要相同的行为、又并不关心其他钩子的情况很常见。
  在这种时候，此时你可以将指令定义成一个下面这样的函数：

  ```html
  <div v-color="color"></div>
  ```

  ```js
  app.directive('color', (el, binding) => {
    // 这会在 `mounted` 和 `updated` 时都调用
    el.style.color = binding.value
  })
  ```

* **Kn.4：对象字面量**

  如果你的指令需要多个值，你可以向它传递一个 JavaScript 对象字面量。
  请记住，指令也可以接收任何合法的 JavaScript 表达式。

  ```html
  <div v-demo="{ color: '白色', text: '你好!' }"></div>
  ```

  ```js
  app.directive('demo', (el, binding) => {
    console.log(binding.value.color) // => "白色"
    console.log(binding.value.text) // => "你好!"
  })
  ```

* **Kn.5：在组件上使用**

  当在组件上使用自定义指令时，它会始终应用于组件的根节点，和透传 attributes 类似。

  ```html
  <MyComponent v-demo="test" />
  ```

  ```html
  <!-- MyComponent 的模板 -->

  <div> 
    <!-- v-demo 指令会被应用在此处 -->
    <span>我的组件内容</span>
  </div>
  ```

  如果组件可能含有多个根节点，指令不会起效、被忽略，还会抛出一个警告。
  和 attribute 不同，指令不可以通过 v-bind="$attrs" 来传递给一个不同的元素。
  总而言之，不推荐在组件上使用自定义指令。

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
