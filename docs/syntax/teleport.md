# Teleport·传送门

::: tip 目标
这一小节，我们的目标是掌握传送门Teleport的使用,那它的作用是什么呢？`<Teleport>` 是一个内置组件，使我们可以将一个组件的一部分模板“传送”到该组件的 DOM 层次结构之外的 DOM 节点中。

:::

::: warning 步骤

1. 基本使用
2. 搭配组件使用
3. 禁用传送门
4. 同一目标上多个传送门
:::

::: info 体验

* **Kn.1：基本使用**

  有时我们可能会遇到以下情况：组件模板的一部分在逻辑上属于它，但从视图角度来看，在 DOM 中它应该显示在 Vue 应用之外的其他地方。

  最常见的例子是构建一个全屏的模态框时。
  理想情况下，我们希望模态框的按钮和模态框本身是在同一个组件中，因为它们都与组件的开关状态有关。
  但这意味着该模态框将与按钮一起呈现，并且位于应用程序的 DOM 更深的层次结构中。
  在想要通过 CSS 选择器定位该模态框时非常困难。

  试想下面这样的 HTML 结构：

  ```html
  <div class="outer">
    <h3>Tooltips with Vue 3 Teleport</h3>
    <div>
      <MyModal />
    </div>
  </div>
  ```

  接下来我们来看看 modal-button 的实现。

  ```html

  <script setup>
  import { ref } from 'vue'

  const open = ref(false)
  </script>

  <template>
    <button @click="open = true">Open Modal</button>

    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </template>

  <style scoped>
  .modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
  }
  </style>

  ```

  这个组件中有一个 `<button>` 按钮来触发打开模态框，和一个 class 名为 .modal 的 `<div>`，它包含了模态框的内容和一个用来关闭的按钮。

  当在初始 HTML 结构中使用这个组件时，会有一些潜在的问题：

  * position: fixed 能够相对于视口放置的条件是：没有任何祖先元素设置了 transform、perspective 或者 filter 样式属性。而如果我们想要用 CSS transform 为祖先节点 `<div class="outer">` 设置动画，则会破坏模态框的布局结构！
  * 这个模态框的 z-index 被包含它的元素所制约。如果有其他元素与 `<div class="outer">` 重叠并有更高的 z-index，则它会覆盖住我们的模态框。

  `<Teleport>` 提供了一个更简洁的方式来解决此类问题，使我们无需考虑那么多层 DOM 结构的问题。
  让我们用 `<Teleport>` 改写一下 `<MyModal>`：

  ```html
  <button @click="open = true">Open Modal</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
  ```

  为 `<Teleport>` 指定的目标 to 期望接收一个 CSS 选择器字符串或者一个真实的 DOM 节点。
  这里我们其实就是让 Vue 去“传送这部分模板片段到 body 标签下”。

* **Kn.2：搭配组件使用**

  `<Teleport>` 只改变了渲染的 DOM 结构，它不会影响组件间的逻辑关系。
  也就是说，如果 `<Teleport>` 包含了一个组件，那么该组件始终和这个使用了 `<teleport>` 的组件保持逻辑上的父子关系。
  传入的 props 和触发的事件也会照常工作。

  这也意味着来自父组件的注入也会按预期工作，子组件将在 Vue Devtools 中嵌套在父级组件下面，而不是放在实际内容移动到的地方。

* **Kn.3：禁用传送门**

  在某些场景中，你们可能需要视情况禁用 `<Teleport>`。
  举个例子，我们想要在桌面端将一个组件当做浮层来渲染，但在移动端则当作行内组件。
  可以对 `<Teleport>` 动态地传入一个 disabled prop 来处理这两种不同情况。

  ```html
  <Teleport :disabled="isMobile">
    ...
  </Teleport>
  ```

  这里的 isMobile 状态可以根据媒体查询的不同结果动态地更新。

* **Kn.4：同一目标上多个传送门**

  一个常见的应用场景就是写一个可重用的 `<Modal>` 组件，可能同时存在多个实例。
  对于此类场景，多个 `<teleport>` 组件可以将其内容挂载在同一个目标元素上，而顺序就是简单的顺次追加，后挂载的将排在目标元素下更后面的位置上。

  我们给出下面这样的用例：

  ```html
  <Teleport to="#modals">
    <div>A</div>
  </Teleport>
  <Teleport to="#modals">
    <div>B</div>
  </Teleport>
  ```

  渲染的结果为:

  ```html
  <div id="modals">
    <div>A</div>
    <div>B</div>
  </div>
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
