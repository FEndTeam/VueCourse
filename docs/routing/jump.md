# 路由跳转

::: tip 目标
这一小节,我们的目标是掌握路由跳转的方式
:::

::: warning 步骤

1. 基础跳转
2. 带参数的跳转
3. 不生成 a 标签
:::

::: info 体验

* **Kn. 1：基础跳转**

  最基础的用法就是把它当成一个 target="_self" 的a标签使用，但无需重新刷新页面，因为是路由跳转，它的体验和使用 router 去进行路由导航的效果完全一样。

  ```html
  <template>
    <router-link to="/home">首页</router-link>
  </template>
  ```

  等价于 router 的 push：

  ```js
  router.push({
    name: 'home'
  })
  ```

* **Kn. 2：带参数的跳转**

  使用 router 的时候，可以轻松的带上参数去那些有id的内容页、用户资料页、栏目列表页等等。

  用 push 的写法是：

  ```js
  router.push({
    name: 'article',
    params: {
      id: 123
    }
  })
  ```

  同理，在 router-link 里应该怎么写：

  ```html
  <template>
    <router-link
      class="link"
      :to="{
        name: 'article',
        params: {
          id: 123
        }
      }"
    >
      这是文章的标题
    </router-link>
  </template>
  ```

* **Kn. 3：不生成 a 标签**

  router-link 默认是被转换为一个 a 标签，但根据业务场景，你也可以把它指定为生成其他标签，比如 span 、 div 、 li 等等，这些标签因为不具备 href 属性，所以在跳转时都是通过 click 事件去执行。

  vue3 中需要通过 custom 和 v-slot 的配合来渲染为其他标签。

  ```html
  <template>
    <router-link
      to="/home"
      custom
      v-slot="{ navigate }"
    >
      <span
        class="link"
        @click="navigate"
      >
        首页
      </span>
    </router-link>
  </template>
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
