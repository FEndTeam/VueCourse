# 组件注册

::: tip 目标
这一小节，我们的目标是掌握组件注册的方法,
一个 Vue 组件需要被“注册”使得 Vue 在渲染模板时能找到其实现。有两种方式来注册组件：**全局注册**和**局部注册**。
:::

::: warning 步骤

1. 全局注册
2. 局部注册
3. 组件命名格式
:::

::: info 体验

* **Kn.1：全局注册**

  我们可以使用 app.component() 方法，让组件在当前 Vue 应用中全局可用。

  ```js
  app.component(
    // 注册的名字
    'MyComponent',
    // 组件的实现
    {
      /* ... */
    }
  )
  ```

  如果使用单文件组件，你可以注册被导入的 `.vue` 文件：

  ```js
  import MyComponent from './App.vue'

  app.component('MyComponent', MyComponent) 
  ```

  `app.component()` 方法可以被链式调用：

  ```js
  app
    .component('ComponentA', ComponentA)
    .component('ComponentB', ComponentB)
    .component('ComponentC', ComponentC)
  ```

  全局注册的组件可以在此应用的任意组件的模板中使用：

  ```html
  <!-- 这在当前应用的任意组件中都可用 -->
  <ComponentA/>
  <ComponentB/>
  <ComponentC/>
  ```

  所有的子组件也可以使用全局注册的组件，这意味着这三个组件也都可以在彼此内部使用。

* **Kn.2：局部注册**

  虽然十分方便，但全局注册有以下几个短板：

  * ⓵ 全局注册使构建系统无法移除未使用的组件(也叫“tree-shaking”)。如果你全局注册了一个组件，却一次都没有使用，它仍然会出现在最终的构建产物中。

  * ⓶ 全局注册在大型项目中使项目的依赖关系变得不那么明确。在父组件中使用子组件时，很难定位子组件的实现。这可能会影响未来长期的可维护性，类似于使用过多的全局变量。

  局部注册将注册组件的可用性限定在当前组件的范围内。它使依赖关系更加明确，并且对 tree-shaking 更加友好。

  当你在单文件组件中使用了 `<script setup>`，导入的组件会自动进行局部注册：

  ```js
  <script setup>
    import ComponentA from './ComponentA.vue'
  </script>

  <template>
    <ComponentA />
  </template>
  ```

  如果不使用 `<script setup>`，你需要使用 `components` 选项：

  ```js
  import ComponentA from './ComponentA.js'

  export default {
    components: {
      ComponentA
    },
    setup() {
      // ...
    }
  }
  ```

  对于每个 `components` 对象里的属性，它们的 `key` 名就是注册的组件名，而值就是相应组件的实现。

  请注意：局部注册组件在后代组件中并不可用。

* **Kn.3：组件命名格式**

  在整个指引中，我们都使用 PascalCase 作为组件名的注册格式，这是因为：
  * ⓵ PascalCase 是合法的 JavaScript 标识符。这使得在 JavaScript 中导入和注册组件都很容易，同时 IDE 也能提供较好的自动补全。

  * ⓶ `<PascalCase />` 在模板中更明显地表明了这是一个 Vue 组件，而不是原生 HTML 元素。同时也能够将 Vue 组件和自定义元素 (web components) 区分开来。

  在单文件组件和内联字符串模板中，我们都推荐这样做。
:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::