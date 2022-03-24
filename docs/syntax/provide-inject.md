# 依赖注入

::: tip 目标
这一小节，我们的目标是掌握依赖注入的使用
:::

::: warning 步骤

1. Prop Drilling
2. Provide
3. 应用层 Provide
4. Inject
5. 配合响应性
6. 使用Symbol做注入名
:::

::: info 体验

* **Kn.1：Prop Drilling**

  通常情况下，当我们需要从父组件向子组件传递数据时，会使用 props。
  想象一下这样的结构：有一些多层级嵌套的组件，形成了一颗巨大的组件树，而某个深层的子组件需要一个较远的祖先组件中的部分内容。
  在这种情况下，如果仅使用 props 则必须将其沿着组件链逐级传递下去，这会非常麻烦：

  ![prop-drilling](./images/prop-drilling.11201220.png)

  这里的 `<Footer>` 组件可能其实根本不关心这些 props，但它仍然需要定义并将它们传递下去使得 `<DeepChild>` 能访问到这些 props，如果组件链路非常长，可能会影响到更多这条路上的组件。这一过程被称为“prop drilling”，这似乎不太好解决。

  为解决这一问题，可以使用 provide 和 inject。
  一个父组件相对于其所有的后代组件，会作为依赖提供者。
  任何后代的组件树，无论层级有多深，都可以注入由父组件提供给整条链路的依赖。

  ![provide-inject](./images/provide-inject.3e0505e4.png)

* **Kn.2：Provide**

  要为组件后代供给数据，需要使用到 `provide()` 函数：

  ```js
  <script setup>
    import { provide } from 'vue'
    provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
  </script>
  ```

  如果不使用 `<script setup>`，请确保 `provide(`) 是在 `setup()` 同步调用的：

  ```js
  import { provide } from 'vue'
  
  export default {
    setup() {
      provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
    }
  }
  ```

  `provide()` 函数接收两个参数。
  第一个参数被称为注入名，可以是一个字符串或是一个 `Symbol`。
  后代组件会注入名用来查找期望注入的值。
  一个组件可以多次调用 `provide()`，使用不同的注入名，注入不同的依赖值。

  第二个参数是供给的值，值可以是任意类型，包括响应式的状态，比如一个 ref：

  ```js
  import { ref, provide } from 'vue'

  const count = ref(0)
  provide('key', count)
  ```

  供给的响应式状态使后代组件可以由此和供给者建立响应式的联系。

* **Kn.3：应用层 Provide**

  除了供给一个组件的数据，我们还可以在整个应用层面做供给：

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  app.provide(/*注入名*/ 'message', /*值*/ 'hello!')
  ```

  应用级的供给在应用的所有组件中都可以注入。这在你编写插件时会特别有用，因为插件一般都不会使用组件形式来供给值。

* **Kn.4：Inject**

  要注入祖先组件供给的数据，需使用 `inject()` 函数：

  ```html
  <script setup>
  import { inject } from 'vue'

  const message = inject('message')
  </script>
  ```

  如果供给的值是一个 `ref`，注入进来的就是它本身，而不会自动解包。这使得被注入的组件保持了和供给者的响应性链接。

  同样的，如果没有使用 `<script setup>`，`inject()` 需要在 `setup()` 同步调用：

  ```js
  import { inject } from 'vue'
  
  export default {
    setup() {
      const message = inject('message')
      return { message }
    }
  }
  ```

  默认情况下，inject 假设传入的注入名会被某个祖先链上的组件提供。
  如果该注入名的确没有任何组件提供，则会抛出一个运行时警告。

  如果在供给的一侧看来属性是可选提供的，那么注入时我们应该声明一个默认值，和 props 类似：

  ```js
  // 如果没有祖先组件提供 "message"
  // `value` 会是 "这是默认值"
  const value = inject('message', '这是默认值')
  ```

  在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。
  为了避免在不使用可选值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：

  ```js
  const value = inject('key', () => new ExpensiveClass())
  ```

* **Kn.5：配合响应性**

  当使用响应式 `provide/inject` 值时，建议尽可能将任何对反应式状态的变更都保持在 `provider` 内部。
  这样可以确保 `provide` 的状态和变更操作都在同一个组件内，使其更容易维护。

  有的时候，我们可能需要在 injector 组件中更改数据。
  在这种情况下，我们推荐在 provider 组件内提供一个更改数据方法：

  ```html
  <!-- 在 provider 组件内 -->
  <script setup>
  import { provide, ref } from 'vue'
  
  const location = ref('North Pole')
  
  function updateLocation() {
    location.value = 'South Pole'
  }
  
  provide('location', {
    location,
    updateLocation
  })
  </script>
  ```

  ```html
  <!-- 在 injector 组件 -->
  <script setup>
  import { inject } from 'vue'

  const { location, updateLocation } = inject('location')
  </script>

  <template>
    <button @click="updateLocation">{{ location }}</button>
  </template>
  ```

  最后，如果你想确保从 `provide` 传过来的数据不能被 `injector` 的组件更改，你可以使用`readonly()`来包装提供的值。

  ```html
  <script setup>
  import { ref, provide, readonly } from 'vue'

  const count = ref(0)
  provide('read-only-count', readonly(count))
  </script>
  ```

* **Kn.6：使用Symbol做注入名**

  至此，我们已经了解了如何使用字符串作为注入名。
  但如果你正在构建大型的应用程序，包含非常多的依赖供给，或者你正在编写提供给其他开发者使用的组件库，建议最好使用 Symbol 来作为注入名以避免潜在的冲突。

  建议在一个单独的文件中导出这些注入名 Symbol：

  ```js
  // keys.js
  export const myInjectionKey = Symbol()
  ```

  ```js
    // 在供给方组件中
  import { provide } from 'vue'
  import { myInjectionKey } from './keys.js'

  provide(myInjectionKey, { /*
    要供给的数据
  */ });
  ```

  ```js
  // 注入方组件
  import { inject } from 'vue'
  import { myInjectionKey } from './keys.js'
  
  const injected = inject(myInjectionKey)
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
