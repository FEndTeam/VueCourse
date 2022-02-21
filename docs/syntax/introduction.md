---
footer: true
---

# 简介 {#introduction}

:::info 你正在阅读的是 Vue 3 的文档！

- Vue 2 中文文档已被迁移至 [v2.cn.vuejs.org](https://v2.cn.vuejs.org/)。
- 想从 Vue 2 升级？请参考[迁移指南](https://v3-migration.vuejs.org/)。
:::

## 什么是 Vue？ {#what-is-vue}

Vue (发音为 /vjuː/，类似 **view**) 是一款用于构建用户界面的 JavaScript 框架。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助你高效地开发用户界面，无论任务是简单还是复杂。

下面是一个最基本的示例：

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

```vue-html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```
