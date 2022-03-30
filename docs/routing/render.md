# 路由渲染

::: tip 目标
这一小节，我们的目标是掌握路由的渲染
:::

::: warning 步骤

1. 基础渲染
2. 带有全局公共组件渲染
3. 部分路由全局，部分路由带公共组件
:::

::: info 体验

* **Kn.1：基础渲染**

  所有路由组件，要在访问后进行渲染，都必须在父级组件里带有 `<router-view />` 标签
  `<router-view />` 在哪里，路由组件的代码就渲染在哪个节点上。
  一级路由的父级组件，当然就是 src 下的 App.vue。

  最简单的基础格式，就是 template 里面直接就是 `<router-view />`，整个页面就是路由组件。

  ```html
  <template>
    <router-view />
  </template> 
  ```

* **Kn.2：带有全局公共组件渲染**

  比如有全站统一的页头、页脚，只有中间区域才是路由。

  ```html
  <template>
    <!-- 全局页头 -->
    <Header />

    <!-- 路由 -->
    <router-view />

    <!-- 全局页脚 -->
    <Footer />
  </template>
  ```

* **Kn.3：部分路由全局，部分路由带公共组件**

  比如大部分页面都需要有侧边栏，但登录页、注册页不能带。

  ```html
  <template>
    <!-- 登录 -->
    <Login v-if="route.name === 'login'" />

    <!-- 注册 -->
    <Register v-else-if="route.name === 'register'" />

    <!-- 带有侧边栏的其他路由 -->
    <div v-else>
      <!-- 固定在左侧的侧边栏 -->
      <Sidebar />

      <!-- 路由 -->
      <router-view />
    </div>
  </template>
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
