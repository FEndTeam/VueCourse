# 操作路由

::: tip 目标
这一小节，我们的目标是使用 router 操作路由
:::

::: warning 步骤

1. 导入路由组件
2. 定义路由变量
3. 操作路由
:::

::: info 体验

* **Step.1：导入路由组件**

  ```js
  import { useRouter } from 'vue-router'
  ```

* **Step.2：定义路由变量**

  和 useRoute 一样， useRouter 也是一个函数，需要在 setup 里定义一个变量来获取路由信息。

  ```js
  const router = useRouter();
  ```

* **Step.3：操作路由**

  接下来就可以通过定义好的变量 route 去获取当前路由信息了。

  当然，如果要在 template 里使用路由，记得把 route 在 setup 里return出去。

  ```js
    // 跳转首页

  router.push({
    name: 'home'
  })

  // 返回上一页
  router.back();
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
