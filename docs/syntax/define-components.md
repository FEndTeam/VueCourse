# 声明组件

::: tip Object
这一小节,我们的目标掌握 Vue 中组件的定义,在 Vue 中,组件是基石,如果不能掌握它,那么就不能使用 Vue 来开发应用了...
:::

::: warning Path

1. 全局组件的声明和使用
2. 局部组件的声明和使用
:::

::: info Experience

* **Kn. 1：全局组件的声明和使用**
  * 声明

  ```js
   app.component('组件名称', {
       template: `
       <div>Hello Vue</div>
       `,
   })
  ```

  * 使用

  ```html
  <div id="app">
    <组件名称></组件名称>
    <!-- 或 -->
    <组件名称/>
  </div> 
  ```

* **Kn. 2：局部组件的声明和使用**

  * 声明和使用

  ```js
  app.component('某组件', {
      template: `
      <Children/>
      `,
      components: {
        Children: {
          template: "<h2>局部组件</h2>"
        }
      }
  })
  ```

:::

::: danger Note

* 【重点】
  1. 全局组件的声明和使用
  2. 局部组件的声明和使用

* 【易错点】

  1. 组件的名称全部使用大驼峰命名法,且名称不能冲突

* 【案例】
:::
