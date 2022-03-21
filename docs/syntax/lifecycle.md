# 生命周期

::: tip 目标
这一小节，我们的目标是掌握熟悉Vue生命周期，掌握生命周期钩子函数.
为什么要学习生命周期呢？
每个 Vue 组件实例在创建时都需要经历一系列的初始化步骤，比如设置好数据侦听，编译模板，挂载实例到 DOM 以及数据改变时更新 DOM。
在此过程中，它也会运行称为生命周期钩子的函数，让开发者有机会在特定阶段添加自己的代码。
:::

::: warning 步骤

1. 注册周期钩子
2. 生命周期图示
:::

::: info 体验

* **Kn.1：注册周期钩子**

  举个例子，`onMounted` 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码。

  ```js
  <script setup>
  import { onMounted } from 'vue'
  
  onMounted(() => {
    console.log(`the component is now mounted.`)
  })
  </script>
  ```

  还有其他一些钩子，会在实例生命周期的不同阶段被调用，最常用的是 `onMounted`，`onUpdated` 和 `onUnmounted`。

  当调用 `onMounted` 时，Vue 会自动将注册的回调函数与当前活动组件实例相关联。
  
  这就要求这些钩子在组件设置时同步注册。例如请不要这样做：

  ```js
  setTimeout(() => {
    onMounted(() => {
      // 这将不会正常工作
    })
  }, 100)
  ```

  请注意，这并不意味着对 onMounted 的调用必须放在 `setup()` 或 `<script setup>` 内的词法环境下。
  `onMounted()` 也可以在一个外部函数中调用，只要调用栈是同步的，且最终起源自`setup()`。

* **Kn.2：生命周期图示**

  下面是实例生命周期的图表。

  ![lifecycle](./images/lifecycle.png)
:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
