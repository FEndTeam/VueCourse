# 获取路由信息

::: tip 目标
这一小节，我们的目标是使用 route 获取路由信息
:::

::: warning 步骤

1. 导入路由组件
2. 定义路由变量
3. 读取路由信息
:::

::: info 体验

* **Step.1：导入路由组件**

  ```js
  import { useRoute } from 'vue-router'
  ```

* **Step.2：定义路由变量**

  刚刚导入的 useRoute 是一个函数，需要在 setup 里定义一个变量来获取路由信息。

  ```js
  const route = useRoute();
  ```

* **Step.3：读取路由信息**

  接下来就可以通过定义好的变量 route 去获取当前路由信息了。

  当然，如果要在 template 里使用路由，记得把 route 在 setup 里return出去。

  ```js
    // 获取路由名称
  console.log(route.name);

  // 获取路由参数
  console.log(route.params.id);
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
