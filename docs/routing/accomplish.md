# 路由实现

::: tip 目标
这一小节，我们的目标是掌握路由的简单实现,以此来理解VueRouter的简单实现
:::

::: warning 步骤

1. 创建Home、About、NotFound组件
2. 声明路由规则
3. 获取url地址的hash
4. 监听hashchange事件
5. 计算当前视图
6. 渲染模板

:::

::: info 体验

* **Step.1：创建Home、About、NotFound组件**

```js
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
```

* **Step.2：声明路由规则**

```js
const routes = {
  '/': Home,
  '/about': About
}
```

* **Step.3：获取url地址的hash**

```js
const currentPath = ref(window.location.hash)
```

* **Step.4：监听hashchange事件**

```js
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
```

* **Step.5：计算当前视图**

```js
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
```

* **Step.6：渲染模板**

```html
<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
