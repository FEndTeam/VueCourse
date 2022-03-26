# 可组合函数

::: tip 目标
这一小节，我们的目标是掌握可组合函数的使用方法
:::

::: warning 步骤

1. 什么是“可组合函数”？
2. 鼠标跟踪器示例
3. 异步状态示例
4. 约定和最佳实践
5. 为更好的代码组织抽取可组合函数
:::

::: info 体验

* **Kn.1：什么是“可组合函数”？**

  在 Vue 应用的概念中，“可组合函数”是一个利用 Vue 组合式 API 来封装和复用有状态逻辑的函数。
  当构建前端应用时，我们常常需要复用公共任务的逻辑。
  例如为了在不同地方格式化时间而抽取一个可复用的函数。
  这个格式化函数封装了无状态的逻辑：它在接收一些输入后立刻返回所期望的输出。
  复用无状态逻辑的库有很多，诸如你可能听到过的 lodash 和 date-fns。

  相比之下，有状态逻辑负责管理会随时变化的状态。
  一个简单的例子是跟踪当前鼠标在页面中的位置。
  在真实应用中，它也可以是像触摸手势或与数据库的连接状态这样的更复杂的逻辑

* **Kn.2：鼠标跟踪器示例**

  如果我们要直接在组件中使用组合式 API 实现鼠标跟踪功能，它会是这样的：

  ```html
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'

  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))
  </script>

  <template>Mouse position is at: {{ x }}, {{ y }}</template>
  ```

  但是，如果我们想在多个组件中复用这个相同的逻辑呢？我们可以把这个逻辑以一个可组合函数的形式提取到外部文件中：

  ```js
  // mouse.js
  import { ref, onMounted, onUnmounted } from 'vue'

  // 按照惯例，可组合函数名以“use”开头
  export function useMouse() {
    // 被可组合函数封装和管理的状态
    const x = ref(0)
    const y = ref(0)

    // 可组合函数可以随时更改其状态。
    function update(event) {
      x.value = event.pageX
      y.value = event.pageY
    }

    // 一个可组合函数也可以挂靠在所属组件的生命周期上
    // 来启动和卸载副作用
    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    // 通过返回值暴露所管理的状态
    return { x, y }
  }
  ```

  下面是它在组件中使用的方式：

  ```html

  <script setup>
  import { useMouse } from './mouse.js'

  const { x, y } = useMouse()
  </script>

  <template>Mouse position is at: {{ x }}, {{ y }}</template>

  ```

  如你所见，核心逻辑一点都没有被改变，我们做的只是把它移到一个外部函数中去，并返回需要暴露的状态。
  和在组件中一样，你也可以在可组合函数中使用所有的组合式 API 函数。
  现在，在任何组件中都可以使用 useMouse() 功能了。

  然而更酷的一点是，你还可以嵌套多个可组合函数：一个可组合函数可以调用一个或多个其他的可组合函数。
  这使得我们可以像使用多个组件组合成整个应用一样，用多个较小且逻辑独立的单元来组合形成复杂的逻辑。
  实际上，这正是我们决定将实现了这一设计模式的 API 集合命名为组合式 API 的原因。

  举个例子，我们可以将添加和清除 DOM 事件监听器的逻辑放入一个可组合函数中：

  ```js
  // event.js
  import { onMounted, onUnmounted } from 'vue'

  export function useEventListener(target, event, callback) {
    // 如果你想的话，
    // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
    onMounted(() => target.addEventListener(event, callback))
    onUnmounted(() => target.removeEventListener(event, callback))
  }
  ```

  ```js
  // mouse.js
  import { ref } from 'vue'
  import { useEventListener } from './event'

  export function useMouse() {
    const x = ref(0)
    const y = ref(0)

    useEventListener(window, 'mousemove', (event) => {
      x.value = event.pageX
      y.value = event.pageY
    })

    return { x, y }
  }
  ```

  现在，useMouse() 可以被简化为：

* **Kn.3：异步状态示例**

  useMouse() 可组合函数没有接收任何参数，因此让我们再来看一个需要接收一个参数的可组合函数示例。
  在做异步数据请求时，我们常常需要处理不同的状态：加载中、加载成功和加载失败。

  ```html
    <script setup>
    import { ref } from 'vue'

    const data = ref(null)
    const error = ref(null)

    fetch('...')
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
    </script>

    <template>
      <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
      <div v-else-if="data">
        Data loaded:
        <pre>{{ data }}</pre>
      </div>
      <div v-else>Loading...</div>
    </template>
  ```

  同样，如果在每个需要获取数据的组件中都要重复这种模式，那就太繁琐了。
  让我们把它抽取成一个可组合函数：

  ```js
  // fetch.js
  import { ref } from 'vue'

  export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)

    fetch(url)
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))

    return { data, error }
  }
  ```

  现在我们在组件里只需要：

  ```js
  <script setup>
  import { useFetch } from './fetch.js'

  const { data, error } = useFetch('...')
  </script>
  ```

  `useFetch()` 接收一个静态的 URL 字符串作为输入，所以它只执行一次请求，然后就完成了。
  但如果我们想让它在每次 URL 变化时都重新请求呢？那我们可以让它同时允许接收 ref 作为参数：

  ```js
  // fetch.js
  import { ref, isRef, unref, watchEffect } from 'vue'

  export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)

    function doFetch() {
      // 在请求之前重设状态...
      data.value = null
      error.value = null
      // unref() 解包可能为 ref 的值
      fetch(unref(url))
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
    }

    if (isRef(url)) {
      // 若输入的 URL 是一个 ref，那么启动一个响应式的请求
      watchEffect(doFetch)
    } else {
      // 否则只请求一次
      // 避免监听器的额外开销
      doFetch()
    }

    return { data, error }
  }
  ```

  这个版本的 useFetch() 现在同时可以接收静态的 URL 字符串和 URL 字符串的 ref。
  当通过 isRef() 检测到 URL 是一个动态 ref 时，它会使用 watchEffect() 启动一个响应式的 effect。
  该 effect 会立刻执行一次，并在此过程中将 URL 的 ref 作为依赖进行跟踪。
  当 URL 的 ref 发生改变时，数据就会被重置，并重新请求。

* **Kn.4：约定和最佳实践**

  * ⓵ 命名

    可组合函数约定用驼峰命名法命名，并以“use”作为开头。

  * ⓶ 输入参数

    尽管其响应性不依赖 ref，可组合函数仍可接收 ref 参数。
    如果编写的可组合函数会被其他开发者使用，你最好在处理输入参数时兼容 ref 而不只是原始的值。
    unref() 工具函数会对此非常有帮助：

    ```js
    import { unref } from 'vue'

    function useFeature(maybeRef) {
      // 若 maybeRef 确实是一个 ref，它的 .value 会被返回
      // 否则，maybeRef 会被原样返回
      const value = unref(maybeRef)
    }
    ```

    如果你的可组合函数在接收 ref 为参数时会产生响应式 effect，请确保使用 watch() 显式地监听此 ref，或者在 watchEffect() 中调用 unref() 来进行正确的追踪。

  * ⓷ 返回值

    你可能已经注意到了，我们一直在可组合函数中使用 ref() 而不是 reactive()。
    我们推荐的约定是可组合函数始终返回一个 ref 对象，这样该函数在组件中解构之后仍可以保持响应性：

    ```js
    // x 和 y 是两个 ref
    const { x, y } = useMouse()
    ```

    从可组合函数返回一个响应式对象会导致在对象解构过程中丢失与可组合函数内状态的响应性连接。
    与之相反，ref 则可以维持这一响应性连接。

    如果你更希望以对象 property 的形式从可组合函数中返回状态，你可以将要返回的对象用 reactive() 包装，这样其中的 ref 会被自动解包，例如：

    ```js
    const mouse = reactive(useMouse())
    // mouse.x 链接到了原来的 x ref
    console.log(mouse.x)
    ```

    ```js
    Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
    ```

  * ⓸ 副作用

    在可组合函数中的确可以执行副作用 (例如：添加 DOM 事件监听器或者请求数据)，但请注意以下规则：

    * 如果你在一个应用中使用了服务器端渲染 (SSR)，请确保在后置加载的声明钩子上执行 DOM 相关的副作用。
    * 确保在 onUnmounted() 时清理副作用。

  * ⓹ 使用限制

    可组合函数在 `<script setup>` 或 `setup()` 钩子中，应始终被同步地调用。
    在某些场景下，你也可以在像 `onMounted()` 这样的生命周期钩子中使用他们。

    这些是 Vue 得以确定当前活跃的组件实例的条件。
    有能力对活跃的组件实例进行访问是必要的，以便：

    1. 可以在可组合函数中注册生命周期钩子
    2. 计算属性和监听器可以连接到当前组件实例，以便在组件卸载时处理掉。

* **Kn.5：为更好的代码组织抽取可组合函数**

  抽取可组合函数不仅是为了复用，也是为了代码组织。
  随着组件复杂度的增高，你可能会最终发现组件多得难以查询和理解。
  组合式 API 会给予你足够的灵活性，让你可以基于逻辑问题将组件代码拆分成更小的函数：

  ```js
  <script setup>
  import { useFeatureA } from './featureA.js'
  import { useFeatureB } from './featureB.js'
  import { useFeatureC } from './featureC.js'

  const { foo, bar } = useFeatureA()
  const { baz } = useFeatureB(foo)
  const { qux } = useFeatureC(baz)
  </script>
  ```

  在某种程度上，你可以将这些提取出的可组合函数看作是可以相互通信的组件范围内的服务。

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
