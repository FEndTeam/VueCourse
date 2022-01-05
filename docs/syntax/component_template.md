# 组件模板

::: tip Object
这一小节，我们的目标是 掌握如何在组件中声明组件的HTML即模板(template)
:::

::: warning Path

1. 使用template配置项声明模板
2. 使用x-template声明模板
:::

::: info Experience

* **Kn. 1：使用template配置项声明模板**

  ```js
  app.component('App', {
    template: `
    <div>Hello Vue</div>
    <Children/>
    `,
    components: {
      Children: {
        template: "<h2>我是某一个组件的局部组件</h2>"
      }
    }
  })
  ```

* **Kn. 2：使用x-template声明模板**

  * ⓵ 在页面中声明 x-template模板

    ```html
    <script type="text/x-template" id="模板id">
      <!-- 这里写html代码或组件 -->
    </script>    
    ```

  * ⓶ 在组件中通过id使用x-template模板

    ```js
    app.component('组件名', {
      template: '#模板id'
    })
    ```

:::

::: danger Note

* 【重点】
  * ⓵ 使用template配置项声明模板
  * ⓶ 使用x-template声明模板
* 【注意点】
  * ⓵ 使用x-template的时候，模板id要添加`#`号
:::
