# 快速开始

这一小节，我们来学习Vue的两种使用方式

## Kn.1 通过`script`标签直接引用

请直接复制下面的代码到一个 HTML 文件中，并在浏览器中打开它：

```html
<script src="https://unpkg.com/vue@3"></script>

<div id="app">{{ message }}</div>

<script>
  // 创建 Vue 应用
  let app = Vue.createApp({
     data() {
      return {
        message: 'Hello Vue!'
      }
    }
  });
  // 把 app 挂载到 id 为 app的元素上
  app.mount('#app');
</script>
```

## Kn.2 通过脚手架创建项目

* ⓵ 在命令中输入执行`vite`的命令

```bash
npm create vite@latest
```

* ⓶ 在命令中输入项目名称

```bash
? Project name: » vite-project
```

* ⓷ 选择前端框架

```bash
? Select a framework: » - Use arrow-keys. Return to submit.
>   vanilla
    vue
    react
    preact
    lit
    svelte
```

* ⓸ 选择项目中是否使用ts

```bash
? Select a variant: » - Use arrow-keys. Return to submit.
>   vue
    vue-ts
```

* ⓹ 进入项目目录，下载依赖并启动项目

```bash

Done. Now run:

  cd vite-project
  npm install
  npm run dev
```
