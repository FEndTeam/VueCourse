# 属性绑定

::: info Object
这一小节，我们的目标是掌握 Vue 中，普通属性的绑定方式以及特殊属性 class 和 style 的绑定方式
:::

::: tip Path

* 1. 普通属性的绑定
* 2. class 类的绑定
* 3. 样式属性的绑定
:::

::: warning Experience

## 普通属性的绑定

动态处理属性，使用的是`v-bind`指令

```html
<a v-bind:href="url变量">跳转</a>
<!-- 缩写 -->
<a :href="url变量">跳转</a>
```

示例如下:

```html
<template>
  <!-- 遇到变量，属性就添加冒号,下面三行代码是效果是一样的 -->
  <a v-bind:href="url">百度</a>
  <a :href="url">百度</a>
  <a :href="'https://www.baidu.com'">百度</a>
</template>
```

## class 类的绑定

### 类绑定对象语法

我们可以给 `:class (v-bind:class 的缩写)` 传递一个对象来动态切换 `class`：

```html
<!-- active 代码类名  -->
<!-- isActive 的值(true或false)决定了 active是否应用到该元素上 -->
<div :class="{ active: isActive }"></div>
```

### 类绑定数组语法

我们也可以给 `:class` 绑定一个数组来渲染多个 `CSS class`：

```html
<!-- 这里的activeClass 和 errorClass 是一个个的类名变量 -->
<div :class="[activeClass, errorClass]"></div>
```

## 样式属性的绑定

### 样式的对象语法

`:style` 支持绑定 JavaScript 对象值，对应的是 HTML 元素的 `style`属性：

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
```

```html
<div :style="styleObject"></div>
```

:::
