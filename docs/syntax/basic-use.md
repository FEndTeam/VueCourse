# 基本使用

::: tip Object
这一小节，我们的目标是掌握如何使用Vue来创建应用
:::

::: warning Path

1. 在`head`标签内引入 `Vue` 库文件
2. 在`script`标签中创建vue实例
3. 在body中创建一个元素`div`,把vue实例挂载到`div`上
:::

::: info Experience

* **Step. 1：** 在`head`标签内引入 `Vue` 库文件

```html
<head>
  <!-- 省略代码... -->
  <script src="./lib/vue@next.js"></script>
</head>
```

* **Step. 2：** 在body中创建一个元素`div`

```html
<body>
  <!-- 挂载元素 -->
  <div id="app"></div> 
</body>
```

* **Step. 2：** 在`script`标签中创建vue实例,并挂载到`div`上

```html
<body>
  <!-- 省略代码... -->
  <script>
    // 创建 Vue 应用
    let app = Vue.createApp({});
    // 把 app 挂载到 id 为 app的元素上
    app.mount('#app');
  </script>
</body>
```

:::

::: danger Note

* 【重点】
  1. 在`head`标签内引入 `Vue` 库文件
  2. 在`script`标签中创建vue实例
  3. 在body中创建一个元素`div`,把vue实例挂载到`div`上

:::
