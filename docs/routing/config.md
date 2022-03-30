# 路由配置

::: tip 目标
这一小节，我们的目标是掌握 Vue Router的配置
:::

::: warning 步骤

1. 安装
2. 创建route文件
3. 挂载router
:::

::: info 体验

* **Step.1：安装**

```bash
npm install vue-router@4
```

* **Step.2：创建route文件**

```js
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About/About.vue')
    }
  ]
})


export default router

```

* **Step.3：挂载router**

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './route'

createApp(App).use(router).mount('#app')

```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
