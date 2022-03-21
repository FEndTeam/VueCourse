# 条件渲染

::: tip 目标
这一小节，我们的目标是掌握条件渲染
:::

::: warning 步骤

1. `v-if`
2. `v-else`
3. `<template>` 上的 `v-if`
4. `v-show`
5. `v-if` vs `v-show`
:::

::: info 体验

* **Kn.1：`v-if`**

  `v-if` 指令被用于按条件渲染一个区块。这个区块只会在指令的表达式为真时才被渲染。

  ```html
  <h1 v-if="awesome">Vue is awesome!</h1>
  ```

* **Kn.2：`v-else`**

  你也可以使用 `v-else` 为 `v-if` 添加一个“else 区块”。

  ```html
  <button @click="awesome = !awesome">Toggle</button>

  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
  ```

  一个 `v-else` 元素必须跟在一个 `v-if` 或者 `v-else-if` 元素后面，否则将不会识别它。

  顾名思义，v-else-if 提供的是相应于 v-if 的“else if 区块”。它可以连续多次重复使用：

  ```html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

  和 `v-else` 相似，一个使用 `v-else-if` 的元素必须紧跟在一个 `v-if` 或一个 `v-else-if` 元素后面。

* **Kn.3：`<template>` 上的 `v-if`**

  因为 v-if 是一个指令，他必须依附于某个元素。
  但如果我们想要切换不只一个元素呢？
  在这种情况下我们可以在一个 `<template>` 元素上使用 v-if，
  这只是一个不可见的包装器元素，最后渲染的结果并不会包含这个 `<template>` 元素。

  ```html
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
  ```

  `v-else` 和 `v-else-if` 也可以在 `<template>` 上使用。

* **Kn.4：`v-show`**

  另一个可以用来按条件显示一个元素的指令是 v-show。其用法基本一样：

  ```html
  <h1 v-show="ok">Hello!</h1>
  ```

  不同之处在于 `v-show` 会在 `DOM` 渲染中保留该元素；`v-show` 仅切换了该元素上名为 `display` 的`CSS` 属性。

  v-show 不支持在 `<template>` 元素上使用，也没有 `v-else` 来配合。

* **Kn.5：`v-if` vs `v-show`**

  `v-if` 是“真实的”按条件渲染，因为它确保了条件区块内的事件监听器和子组件都会在切换时被销毁与重建。

  `v-if`也是懒加载的：如果在初次渲染时条件值为 `false`，则不会做任何事。条件区块会直到条件首次变为`true`时才渲染。

  相比之下，`v-show`简单许多，元素无论初始条件如何，始终会被渲染，仅作`CSS class`的切换。

  总的来说，`v-if` 在首次渲染时的切换成本比 `v-show` 更高。因此当你需要非常频繁切换时 `v-show` 会更好，而运行时不常改变的时候`v-if` 会更合适。

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
