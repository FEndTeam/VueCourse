# 局部组件

::: tip Object
这一小节，我们的目标是掌握局部组件的声明和使用
:::

::: warning Path

1. 局部组件的声明
2. 局部组件的注册
3. 局部组件的使用
4. 局部组件的特点
:::

::: info Experience

* **Kn. 1：局部组件的声明**

  可以使用 app.component(TagName,options)定义全局组件

  ```js
    const ComponentA = {
      /* ... */
    }
    const ComponentB = {
      /* ... */
    }
    const ComponentC = {
      /* ... */
    }
  ```

* **Kn. 2：局部组件的注册**

  ```js
  const app = Vue.createApp({
    components: {
      'component-a': ComponentA,
      'component-b': ComponentB
    }
  })
  // 或
  const ComponentA = {
    /* ... */
  }

  const ComponentB = {
    components: {
      'component-a': ComponentA
    }
    // ...
  }
  ```

* **Kn. 3：局部组件的使用**

  组件可以直接在id为app的元素中使用，也可以在其他组件中嵌套使用

  ```html
      <!-- 双标签 -->
      <组件名称></组件名称>
      <!-- 或单标签 -->
      <组件名称/>
  ```

* **Kn. 4：局部组件的特点**

  * ⓵ 局部组件必须要注册
  * ⓶ 局部组件在哪个组件中注册就在哪个组件中使用
  * ⓷ 注意局部注册的组件在其子组件中不可用
:::

::: danger Note

* 【重点】
  * ⓵ 局部组件的声明
  * ⓶ 局部组件的注册
  * ⓷ 局部组件的使用
  * ⓸ 局部组件的特点
:::
