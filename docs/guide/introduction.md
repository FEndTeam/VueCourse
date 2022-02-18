---
footer: false
---

# Introduction

:::info You are reading the documentation for Vue 3!

- Vue 2 documentation has been moved to [v2.vuejs.org](https://v2.vuejs.org/).
- Upgrading from Vue 2? Check out the [Migration Guide](https://v3-migration.vuejs.org/).
  :::

## What is Vue?

Vue (pronounced /vjuː/, like **view**) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.

Here is a minimal example:

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

### 夏明
