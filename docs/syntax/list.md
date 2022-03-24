# 列表渲染

::: tip 目标
这一小节，我们的目标是掌握列表渲染的诸多知识点
:::

::: warning 步骤

1. `v-for`
2. `v-for`与对象
3. 在`v-for`里使用值范围
4. `<template>`上的`v-for`
5. `v-for`与`v-if`
6. 通过 `key` 管理状态
7. 组件上使用`v-for`
8. 数组变化侦测
9. 展示过滤或排序后的结果
:::

::: info 体验

* **Kn.1：`v-for`**
  
  我们可以使用 v-for 指令基于一个数组来渲染一个列表。
  v-for 指令需要一种特殊的语法形式 item in items，其中items 是源数据的数组，而 item 是迭代项的别名：

  ```js
  const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
  ```

  ```html
  <li v-for="item in items">
    {{ item.message }}
  </li>
  ```

  在 `v-for` 块中可以完整地访问父作用域内的 `property`。
  `v-for` 也支持使用可选的第二个参数表示当前项的位置索引。

  ```js
  const parentMessage = ref('Parent')
  const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
  ```

  ```html
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
  ```

  `v-for` 变量的作用域和下面的 JavaScript 代码很类似：

  ```js
  const parentMessage = 'Parent'
  const items = [
    /* ... */
  ]x

  items.forEach((item, index) => {
    // 可以访问外层的 `parentMessage`
    // 而 `item` 和 `index` 只在这个作用域可用
    console.log(parentMessage, item.message, index)
  })
  ```

  注意 `v-for` 是如何对应 `forEach` 回调的函数签名的。实际上，你也可以在定义 `v-for` 的变量别名时使用解构，和解构函数参数类似：

  ```html
  <li v-for="{ message } in items">
    {{ message }}
  </li>
  
  <!-- 有 index 索引时 -->
  <li v-for="({ message }, index) in items">
    {{ message }} {{ index }}
  </li>
  ```

  对于多层嵌套的 `v-for`，作用域的工作方式和函数的作用域很类似。每个 `v-for` 作用域都可以访问到父级作用域：

  ```html
  <li v-for="item in items">
    <span v-for="childItem in item.children">
      {{ item.message }} {{ childItem }}
    </span>
  </li>
  ```

  你也可以使用 `of` 作为分隔符来替代 `in`，这也和 `JavaScript`的迭代器语法非常相似：

  ```js
  <div v-for="item of items"></div>
  ```

* **Kn.2：`v-for`与对象**

  你也可以使用 `v-for` 来遍历一个对象的所有属性。

  ```js
  const myObject = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
  })
  ```

  ```html
  <ul>
    <li v-for="value in myObject">
      {{ value }}
    </li>
  </ul>
  ```

  你也可以提供第二个参数表示属性名 (例如 key)：

  ```html
  <li v-for="(value, key) in myObject">
    {{ key }}: {{ value }}
  </li>

  ```

  第三个参数表示位置索引：

  ```html
  <!-- 注意: 当遍历一个对象时，顺序是依据 Object.keys() 的枚举顺序，由于不同的 JavaScript 引擎可能会有不同的实现，所以顺序可能会不一致。 -->
  <li v-for="(value, key, index) in myObject">
    {{ index }}. {{ key }}: {{ value }}
  </li>
  ```

* **Kn.3：在`v-for`里使用值范围**

  可以直接传给 `v-for` 一个整数值。在这种用例中，会将该模板基于 1...n 的取值范围重复多次。

  ```html
  <!-- 注意: 此处 n 的初值是从 1 开始而非 0。 -->
  <span v-for="n in 10">{{ n }}</span>
  ```

* **Kn.4：`<template>`上的`v-for`**

  与模板上的 v-if 类似，你也可以在 `<template>` 标签上使用 v-for 来渲染一个包含多个元素的块。例如：

  ```js
  <ul>
    <template v-for="item in items">
      <li>{{ item.msg }}</li>
      <li class="divider" role="presentation"></li>
    </template>
  </ul>
  ```

* **Kn.5：`v-for`与`v-if`**

  当它们同时存在于一个节点上时，`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量别名：

  ```html
  <!-- 这会抛出一个错误，因为属性 todo 此时没有在该实例上定义-->
  <li v-for="todo in todos" v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
  ```

  在外新包装一层 `<template>` 再在其上使用 `v-for` 可以解决这个问题 (这也更加明显易读)：

  ```js
  <template v-for="todo in todos">
    <li v-if="!todo.isComplete">
      {{ todo.name }}
    </li>
  </template>
  ```

* **Kn.6：通过 `key` 管理状态**

  Vue 默认按照“就地更新”的策略来更新通过 `v-for` 渲染的元素列表。
  当数据项的顺序改变时，`Vue` 不会随之移动 `DOM` 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。

  默认模式是高效的，但只适用于列表渲染输出不依赖子组件状态或者临时 DOM 状态 (例如表单输入值)。

  为了给 `Vue` 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个项目提供一个唯一的 `key attribute`：

  ```html
  <div v-for="item in items" :key="item.id">
    <!-- 内容 -->
  </div>
  ```

  当你使用 `<template v-for>` 时，key 应该被放置在这个 `<template>` 容器上：

  ```html
  <template v-for="todo in todos" :key="todo.name">
    <li>{{ todo.name }}</li>
  </template>
  ```

  推荐在任何可行的时候为 v-for 提供一个 key attribute，除非所迭代的 DOM 内容非常简单 (例如：不包含组件或有状态的 DOM 元素)，或者有意依赖默认行为来获得性能增益。

  key 绑定的值期望是一个基础类型的值，例如字符串或 number 类型。不要用对象作为 v-for 的 key。

* **Kn.7：组件上使用`v-for`**

  可以直接在组件上使用 `v-for`，和其他任何一般的元素没有区别 (别忘记提供一个 key)：

  ```html
  <my-component v-for="item in items" :key="item.id"></my-component>
  ```

  但是，这不会自动将任何数据传递给组件，因为组件有自己独立的作用域。
  为了将迭代后的数据传递到组件中，我们还是应该使用 prop：

  ```html
    <my-component
      v-for="(item, index) in items"
      :item="item"
      :index="index"
      :key="item.id"
    ></my-component>
  ```

  不自动将 `item` 注入组件的原因是，这会使组件与 v-for 的工作方式紧密耦合。
  明确其数据的来源可以使组件在其他情况下重用。

* **Kn.8：数组变化侦测**

  Vue 包装了一批侦听数组的变更方法，以至于这些方法可以触发视图更新。被包装的变更方法如下：`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`

  变更方法，顾名思义，就是会对调用它们的原数组进行变更。相对地，也有一些非变更方法，例如 `filter()`，`concat()` 和 `slice()`，这些都不会更改原数组，而总是返回一个新数组。当遇到的是非变更方法时，我们需要将旧的数组替换为新的：

  ```js
  // `item` 是一个数组的 ref
  items.value = item.values.filter((item) => item.message.match(/Foo/))
  ```

  你可能认为这将导致 Vue 丢弃现有的 DOM 并重新渲染整个列表——幸运的是，情况并非如此。
  Vue 实现了一些巧妙的方法来最大化对 DOM 元素的重用，因此用另一个包含部分重叠对象的数组来做替换，仍会是一种非常高效的操作。

* **Kn.9：展示过滤或排序后的结果**

  有时，我们希望显示数组经过过滤或排序后的内容，而不实际变更或重置原始数据。在这种情况下，你可以创建返回已过滤或已排序数组的计算属性。

  举个例子：

  ```js
  const numbers = ref([1, 2, 3, 4, 5])

  const evenNumbers = computed(() => {
    return numbers.value.filter((n) => n % 2 === 0)
  })
  ```

  ```html
  <li v-for="n in evenNumbers">{{ n }}</li>
  ```

  在计算属性不可行的情况下 (例如在多层嵌套的 v-for 循环中)，你可以使用以下方法：

  ```js
  const sets = ref([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10]
  ])

  function even(numbers) {
    return numbers.filter((number) => number % 2 === 0)
  }
  ```

  ```js
  <ul v-for="numbers in sets">
    <li v-for="n in even(numbers)">{{ n }}</li>
  </ul>
  ```

  在计算属性中使用 reverse() 和 sort() 请保持谨慎！这两个方法将变更原始数组，计算函数中不应该这么做。请在调用这些方法之前创建一个原数组的副本：

  ```js
  - return numbers.reverse()
  + return [...numbers].reverse()
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::