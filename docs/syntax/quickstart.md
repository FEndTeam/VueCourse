# 快速开始

这一小节，我们主要学习如何快速使用 Vue 开发一个超级简单的应用`Hello World`

::: warning Path

1. 新建html文件，并在文件中引入vue文件
2. 在body标签中，创建应用挂载容器
3. 在script标签中，创建Vue应用
4. 把Vue应用挂载到应用挂载容器中
5. 在Vue应用中，声明数据状态
6. 在应用挂载容器中，展示数据状态
:::

## Step.1 新建html文件，并在文件中引入vue文件

```html
<script src="https://unpkg.com/vue@3"></script>
```

## Step.2 在body标签中，创建应用挂载容器

```html
<div id="app"></div>
```

## Step.3 在script标签中，创建Vue应用

```js
// 创建 Vue 应用
let app = Vue.createApp();
```

## Step.4 把Vue应用挂载到应用挂载容器中

```js
// 把 app 挂载到 id 为 app的元素上
app.mount('#app');
```

## Step.5 在Vue应用中，声明数据状态

```js
// 创建 Vue 应用
let app = Vue.createApp({
  setup(){
    let message ="Hello World";
    return {
      message
    }
  }
});
```

## Step.6 在应用挂载容器中，展示数据状态

```js
<div id="app">{{ message }}</div>
```
