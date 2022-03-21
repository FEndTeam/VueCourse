# 组件基础

::: tip 目标
这一小节，我们的目标是掌握组件的基础知识
:::

::: warning 步骤

1. 组件介绍
2. 定义一个组件
3. 使用组件
4. 传递 props
5. 监听事件
6. 通过插槽来分配内容
7. 动态组件
8. DOM 模板解析注意事项
:::

::: info 体验

* **Kn.1：组件介绍**

  组件允许我们将 UI 划分为独立的、可重用的部分来思考。组件在应用程序中常常被组织成层层嵌套的树状结构：

  ![components](./images/components.png)

  这和我们嵌套 HTML 元素的方式类似，Vue 实现了自己的组件数据模型，使我们可以在每个组件内封装自定义内容与逻辑。
  Vue 同样也能很好地配合原生 Web Component。

* **Kn.2：定义一个组件**

  当使用构建步骤时，我们一般会将 Vue 组件定义在一个单独的 `.vue` 文件中，这被叫做单文件组件 (简称 SFC)：

  ```html
  <script setup>
  import { ref } from 'vue'

  const count = ref(0)
  </script>

  <template>
    <button @click="count++">You clicked me {{ count }} times.</button>
  </template>
  ```

  当不使用构建步骤时，一个 Vue 组件以一个包含 Vue 特定选项的 JavaScript 对象来定义：

  ```js
  import { ref } from 'vue'

  export default {
    setup() {
      const count = ref(0)
      return { count }
    },
    template: `
      <button @click="count++">
        You clicked me {{ count }} times.
      </button>`
    // 或者 `template: '#my-template-element'`
  }

  ```

  这里的模板是一个内联的 JavaScript 字符串，Vue 将会在运行时编译它。你也可以使用 ID 选择器来指向一个元素 (通常是原生的 `<template>` 元素)，Vue 将会使用其内容作为模板来源。

  上面的例子中定义了一个组件，并在一个 .js 文件里默认导出了它自己，但你也可以通过具名导出在一个文件中导出多个组件。

* **Kn.3：使用组件**

  要使用一个子组件，我们需要在父组件中导入它。
  假设我们把计数器组件放在了一个叫做 ButtonCounter.vue 的文件中，这个组件将会以默认导出的形式被暴露给外部。

  ```html
  <script setup>
  import ButtonCounter from './ButtonCounter.vue'
  </script>

  <template>
    <h1>Here is a child component!</h1>
    <ButtonCounter />
  </template>
  ```

  通过 `<script setup>`，导入的组件都在模板中直接可用。

  当然，你也可以全局地注册一个组件，使得它在当前应用中的任何组件上都可以使用，而不需要额外再导入。

  在单文件组件中，推荐为子组件使用 PascalCase 的标签名，以此来和原生的 HTML 元素作区分。
  虽然原生 HTML 标签名是不区分大小写的，但 Vue 单文件组件是可以在编译中区分大小写的。
  我们也可以使用 `/>` 来关闭一个标签。

  如果你是直接在 DOM 中书写模板 (例如原生 `<template>` 元素的内容)，模板的编译将服从于原生 HTML 的解析行为。
  在这种情况下，你应该需要使用 kebab-case 形式并显式地关闭这些组件的标签。

* **Kn.4：传递 props**

  如果我们正在构建一个博客，我们可能需要一个表示博客文章的组件。
  我们希望所有的博客文章分享相同的视觉布局，但有不同的内容。
  要实现这样的效果自然必须向组件中传递数据，例如每篇文章标题和内容，这就会使用到 props。

  Props 是一种特别的 attributes，你可以在组件上声明注册。
  要传递给博客文章组件一个标题，我们必须在组件的 props 列表上声明它，使用 defineProps 宏：

  ```html
  <!-- BlogPost.vue -->
  <script setup>
  defineProps(['title'])
  </script>

  <template>
    <h4>{{ title }}</h4>
  </template>
  ```

  `defineProps` 是一个仅 `<script setup>` 中可用的编译宏命令，并不需要显式地导入。
  声明的 props 会自动暴露给模板。
  defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props，因此我们在 JavaScript 中使用：

  ```js
  const props = defineProps(['title'])
  console.log(props.title)
  ```

  如果你没有使用 `<script setup>`，props 必须以 props 选项的方式声明，props 对象会作为 `setup()` 函数的第一个参数：

  ```js
  export default {
    props: ['title'],
      setup(props) {
      console.log(props.title)
    }
  }
  ```

  一个组件可以有任意多的 `props`，默认情况下，任何值都可以传递给任何 `prop`。

  当一个 prop 被注册后，可以像这样以自定义 attribute 的形式传递数据给它：

  ```js
  <BlogPost title="My journey with Vue" />
  <BlogPost title="Blogging with Vue" />
  <BlogPost title="Why Vue is so fun" />
  ```

  然而在某些应用中，你也许在父组件中有如下的一个博客文章数组：

  ```js
  const posts = ref([
    { id: 1, title: 'My journey with Vue' },
    { id: 2, title: 'Blogging with Vue' },
    { id: 3, title: 'Why Vue is so fun' }
  ])
  ```

  则可以使用 v-for 来渲染它们：

  ```html
  <BlogPost
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
  ```

* **Kn.5：监听事件**

  继续开发我们的 `<BlogPost>` 组件，我们会发现有时候需要与父组件进行交互。
  例如，要在此处实现 A11y 的需求，将博客文章的文字能够放大，而页面的其余部分仍使用默认字号。

  在父组件中，我们可以添加一个 `postFontSize ref` 来实现这个效果：

  ```js
  const posts = ref([
    /* ... */
  ])

  const postFontSize = ref(1)
  ```

  可以在模板中用来控制所有博客文章的字体大小：

  ```js
  <div :style="{ fontSize: postFontSize + 'em' }">
    <BlogPost
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
     />
  </div>
  ```

  现在，让我们给 `<BlogPost>` 组件添加一个按钮：

  ```html
  <!-- BlogPost.vue, 省略了 <script> -->
  <template>
    <div class="blog-post">
      <h4>{{ title }}</h4>
      <button>Enlarge text</button>
    </div>
  </template>
  ```

  这个按钮目前还没有做任何事情，我们想要点击这个按钮来告诉父组件它应该放大所有博客文章的文字。
  要解决这个问题，组件实例提供了一个自定义事件系统。
  父组件可以通过 `v-on` 或 `@`来选择性地监听子组件上抛的事件，就像监听原生 DOM 事件那样：

  ```js
  <BlogPost
    ...
    @enlarge-text="postFontSize += 0.1"
  />
  ```

  子组件可以通过调用内置的 `$emit` 方法，通过传入事件名称来抛出一个事件：

  ```html
  <!-- BlogPost.vue, 省略了 <script> -->
  <template>
    <div class="blog-post">
      <h4>{{ title }}</h4>
      <button @click="$emit('enlarge-text')">Enlarge text</button>
    </div>
  </template>
  ```

  因为有了 `@enlarge-text="postFontSize += 0.1"` 的监听，父组件会接收这一事件，从而更新 `postFontSize` 的值。

  我们可以通过 `defineEmits` 宏来选择性地声明需要抛出的事件：

  ```js
  <!-- BlogPost.vue -->
  <script setup>
    defineProps(['title'])
    defineEmits(['enlarge-text'])
  </script>
  ```

  这记录了一个组件发出的所有事件，并可选择对其进行验证。
  这还使得 Vue 避免了将它们作为原生事件监听器隐式地应用于子组件的根元素。

  和 defineProps 类似，defineEmits 仅可用于 `<script setup>` 之中，并且不需要导入，返回的 emit 函数可以被用于在 JavaScript 代码中抛出事件：

  ```js
  const emit = defineEmits(['enlarge-text'])
  emit('enlarge-text')
  ```

  如果你没有在使用 `<script setup>`，你可以通过`emits` 选项定义组件会抛出的事件。你可以从 `setup()` 函数的第二个参数，即 setup 上下文对象上访问到 emit 函数：

  ```js
  export default {
    emits: ['enlarge-text'],
    setup(props, ctx) {
      ctx.emit('enlarge-text')
    }
  }
  ```

* **Kn.6：通过插槽来分配内容**

  和 HTML 元素一样，像这样能够向组件中传递内容是非常有用的：

  ```html
  <AlertBox>
    Something bad happened.
  </AlertBox>
  ```

  这可以通过 Vue 的自定义 `<slot>` 元素来实现：

  ```html
  <template>
    <div class="alert-box">
      <strong>Error!</strong>
      <slot />
    </div>
  </template>

  <style scoped>
  .alert-box {
    /* ... */
  }
  </style>
  ```

  正如你上面所看到的，我们使用 `<slot>` 作为一个占位符，之后的内容就会放在这里。

* **Kn.7：动态组件**

  有的需求会想要在两个组件间来回切换，比如 Tab 界面：

  ```html
  <!-- currentTab 改变时组件也改变 -->
  <component :is="tabs[currentTab]"></component>
  ```

  在上面的例子中，被传给 :is 的值可以是以下几种：

  * ⓵ 被注册的组件名
  * ⓶ 导入的组件对象

  你也可以使用 is attribute 来创建一般的 HTML 元素。

  当使用 `<component :is="...">` 来在多个组件间作切换时，组件会在被切换掉后卸载。我们可以通过 `<KeepAlive>` 组件强制不活跃的组件仍然保持“存活”的状态。

* **Kn.8：DOM 模板解析注意事项**

  如果你想在 DOM 中直接书写 Vue 模板，Vue 则必须从 DOM 中获取模板字符串。
  因为浏览器的原生 HTML 解析行为，因此有一些需要注意的事项。

  * ⓵ 大小写区分

    HTML 标签和属性名称是不分大小写的，所以浏览器会把任何大写的字符解释为小写。
    这意味着当你使用 DOM 内的模板时，无论是 PascalCase 形式的组件名称、camelCase 形式的 prop 名称还是 v-on 的事件名称，都需要转换为相应等价的 kebab-case (短横线连字符) 形式：

    ```js
    // JavaScript 中的 camelCase
    const BlogPost = {
      props: ['postTitle'],
      emits: ['updatePost']
      template: `
        <h3>{{ postTitle }}</h3>
      `
    }
    ```

    ```html
    <!-- HTML 中的 kebab-case -->
    <blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
    ```

  * ⓶ 闭合标签

    我们在上面的例子中已经使用过了闭合标签 (self-closing tag)：

    ```html
    <MyComponent />
    ```

    这是因为 Vue 的模板解析器将 `/>` 作为标签关闭的标志，无关其类型。

    然而在 DOM 模板中，我们必须显式地写出关闭标签：

    ```html
    <my-component></my-component>
    ```

    这是由于 HTML 只允许一小部分特殊的元素省略其关闭标签，最常见的就是 `<input>` 和 `<img>`。
    对于其他的元素来说，如果你省略了关闭标签，原生的 HTML 解析器会认为开启的标签永远没有结束，用下面这个代码片段举个例子：

    ```js
    <my-component /> <!-- 我们想要在这里关闭标签... -->
    <span>hello</span>
    ```

    将被解析为：

    ```html
    <my-component>
      <span>hello</span>
    </my-component> <!-- 但浏览器会在这里关闭标签 -->
    ```

  * ⓷ 元素位置限制

    某些 HTML 元素对于放在其中的元素类型有限制，例如 `<ul>`，`<ol>`，`<table>` 和 `<select>`，相应的，某些元素仅在放置于特定元素中时才会显示，例如 `<li>`，`<tr>` 和 `<option>`。

    这将导致在使用带有此类限制元素的组件时出现问题。例如：

    ```html
    <table>
      <blog-post-row></blog-post-row>
    </table>
    ```

    自定义的组件 `<blog-post-row>` 将作为无效的内容被忽略，因而在最终呈现的输出中造成错误。
    我们可以使用特殊的 `is` attribute 作为一种解决方案：

    ```html
    <table>
      <tr is="vue:blog-post-row"></tr>
    </table>
    ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
