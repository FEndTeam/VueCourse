# 列表渲染指令

::: tip Object
在原生DOM中，假设我们要把一组数据渲染到页面上，那么我们很可能会使用 数组的遍历方法，在遍历方法中，创建新的元素，给新的元素设置数组中的数据，然后把新创建的元素添加到DOM中，那么Vue中，我们该如何渲染 一组数据到页面上呢？ 就要使用 列表渲染指令`v-for`了
:::

::: warning Path

1. 渲染数组数据
2. 维护元素状态
3. 渲染对象数据
4. 在 `<template>` 中使用 `v-for`
5. `v-for` 与 `v-if` 一同使用
:::

::: info Experience

## 1. 渲染数组数据

渲染数组中的数据，我们要使用 `v-for`指令的固定写法`v-for=(item, index) in items` 其中，item代表数组中的元素，`index`代表元素的索引，`items`代表数组名称。 `item、index、items`都是变量，可以自定义。

```html
<!-- 假设在data中定义这样的数据:
  data() {
    return {
      items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
  }
 -->
<div id="app">
  <ul id="list">
    <li v-for="(item, index) in items">
      {{ index }} - {{ item.message }}
    </li>  
  </ul>
</div>
```

## 2. 维护元素状态

当 `Vue` 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。
但这种默认的性能优化策略，会导致有状态的列表无法被正确更新。
为了给 `Vue` 一个提示，以便它能跟踪每个节点的身份，从而在保证有状态的列表被正确更新的前提下，
提升渲染的性能。此时，需要为每项提供一个唯一的 `key` 属性。

```html
<!-- 假设在data中定义这样的数据:
  data() {
    return {
     todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
    }
  }
 -->
<div id="app">
  <ul id="list">
    <li v-for="(item, index) in todos" :key="item.id">
      {{ index }} - {{ item.title }}
    </li>  
  </ul>
</div>
```

## 3. 渲染对象数据

```html
<!-- 假设在data中定义这样的数据:
  data() {
    return {
      obj: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    }
  }
 -->
<div id="app">
  <ul>
    <li v-for="value in obj">
      {{ value }}
    </li>
  </ul>
</div>
```

## 4. 在 `<template>` 中使用 `v-for`

你也可以利用带有 `v-for` 的 `<template>` 来循环渲染一段包含多个元素的内容

```html
<!-- 假设在data中定义这样的数据:
  data() {
    return {
     todos: [
        {
          id: 1,
          title: 'Do the dishes'
        },
        {
          id: 2,
          title: 'Take out the trash'
        },
        {
          id: 3,
          title: 'Mow the lawn'
        }
      ],
    }
  }
 -->
<div id="app">
  <ul>
    <template v-for="item in todos" :key="item.id">
      <li>{{ item.title }}</li>
      <li class="divider" role="presentation"></li>
    </template>
  </ul>
</div>
```

## 5. `v-for` 与 `v-if` 一同使用

当它们处于同一节点，`v-if` 的优先级比 `v-for` 更高，这意味着 `v-if` 将没有权限访问 `v-for` 里的变量：

```html

<!-- 假设在data中定义这样的数据:
  data() {
    return {
      todos: [
        {
          id: 1,
          title: 'Do the dishes',
          isComplete: true
        },
        {
          id: 2,
          title: 'Take out the trash',
          isComplete: false
        },
        {
          id: 3,
          title: 'Mow the lawn',
          isComplete: true
        }
      ],
    }
  }
 -->
<!-- 这将抛出一个错误，因为“todo” property 没有在实例上定义 -->
<div id="app">
  <ul>
    <li  v-for="todo in todos" v-if="!todo.isComplete">{{ item.title }}</li>
  </ul>
</div>
```

可以把 `v-for` 移动到 `<template>` 标签中来修正：

```html
<template v-for="todo in todos" :key="todo.name">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

:::

::: danger Note

* 【重点】
  * 1. 渲染数组数据
  * 3. 在 `<template>` 中使用 `v-for`
* 【易错点】
  * 千万不要忘记在`v-for`指令渲染 数组元素的时候 添加 `key`属性
* 【面试题】
  * 你知道`Vue`中`key`的原理吗？说说你对它的理解？
  * 为什么`Vue`中的`v-if`和`v-for`不建议一起用?
:::
