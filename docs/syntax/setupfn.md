# setup 函数

::: info Object
这一小节，我们的目标是掌握setup入口函数的使用
:::

::: tip Path

1. 什么是 setup入口函数
2. setup的简洁语法

:::

::: warning Experience

## Kn.1：什么是 setup入口函数

`setup` 是一个新的组件选项，作为组件中使用组合API的起点。从组件生命周期来看，它的执行在组件实例创建之前`vue2.x的beforeCreate`执行。这就意味着在`setup`函数中 `this` 还不是组件实例，`this` 此时是 `undefined`在模版中需要使用的数据和函数，需要在 `setup` 返回。

演示代码：

```vue
<template>
  <div class="container">
    <h1 @click="say()">{{msg}}</h1>
  </div>
</template>
<script>
export default {
  setup () {
    console.log('setup执行了')
    console.log(this)
    // 定义数据和函数
    const msg = 'hi vue3'
    const say = () => {
      console.log(msg)
    }

    return { msg , say}
  },
  beforeCreate() {
    console.log('beforeCreate执行了')
    console.log(this)
  }
}
</script>
```

## Kn.2：setup的简洁语法

`<script setup>` 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。当同时使用 SFC 与组合式 API 时该语法是默认推荐。相比于普通的 `<script>` 语法，它具有更多优势：

- 更少的样板内容，更简洁的代码。
- 能够使用纯 TypeScript 声明 props 和自定义事件。
- 更好的运行时性能 (其模板会被编译成同一作用域内的渲染函数，避免了渲染上下文代理对象)。
- 更好的 IDE 类型推导性能 (减少了语言服务器从代码中抽取类型的工作)。

要启用该语法，需要在 `<script>` 代码块上添加 setup attribute：

```html
<script setup>
console.log('hello script setup')
</script>
```

里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>` 中的代码会在每次组件实例被创建的时候执行。

:::

::: danger Note

- 【重点】
- 【难点】
- 【注意点】
:::
