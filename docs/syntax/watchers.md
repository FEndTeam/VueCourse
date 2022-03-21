# 侦听器

::: tip 目标
这一小节，我们的目标是掌握侦听器的用法
:::

::: warning 步骤

1. 基本示例
2. 深层侦听器
3. `watchEffect()`
4. 回调的刷新时机
5. 停止侦听器
:::

::: info 体验

* **Kn.1：基本示例**

  计算属性允许我们声明性地计算推导值。
  然而，在有些情况下，为了应对一些状态的变化，我们需要运行些“副作用”：例如更改 DOM，或者根据异步操作的结果，去修改另一处的状态
  在组合式 API 中，我们可以使用 watch 函数在每次响应式状态发生变化时触发回调函数：

  ```html
  <script setup>
  import { ref, watch } from 'vue'

  const question = ref('')
  const answer = ref('Questions usually contain a question mark. ;-)')

  // 可以直接侦听一个 ref
  watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.indexOf('?') > -1) {
      answer.value = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        answer.value = (await res.json()).answer
      } catch (error) {
        answer.value = 'Error! Could not reach the API. ' + error
      }
    }
  })
  </script>

  <template>
    <p>
      Ask a yes/no question:
      <input v-model="question" />
    </p>
    <p>{{ answer }}</p>
  </template>
  ```

  `watch` 的第一个参数可以是不同形式的“来源”：它可以是一个 `ref` (包括计算属性)、一个响应式对象、一个 `getter` 函数、或多个来源组成的数组：

  ```js
  const x = ref(0)
  const y = ref(0)

  // 单个 ref
  watch(x, (newX) => {
    console.log(`x is ${newX}`)
  })

  // getter 函数
  watch(
    () => x.value + y.value,
    (sum) => {
      console.log(`sum of x + y is: ${sum}`)
    }
  )

  // 多个来源组成的数组
  watch([x, () => y.value], ([newX, newY]) => {
    console.log(`x is ${newX} and y is ${newY}`)
  })
  ```

  注意，你不能侦听响应式对象的 property，例如:

  ```js
  const obj = reactive({ count: 0 })

  // 这不起作用，因为你是向 watch() 传入了一个 number
  watch(obj.count, (count) => {
    console.log(`count is: ${count}`)
  })
  ```

  而是用 getter 函数：

  ```js
  // 提供一个 getter 函数
  watch(
    () => obj.count,
    (count) => {
      console.log(`count is: ${count}`)
    }
  )
  ```

* **Kn.2：深层侦听器**

  直接给 `watch()` 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发：

  ```js
  const obj = reactive({ count: 0 })

  watch(obj, (newValue, oldValue) => {
    // 在嵌套的 property 变更时触发
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // 因为它们是同一个对象！
  })

  obj.count++
  ```

  这不同于返回响应式对象的 `getter` 函数：只有在 `getter`函数返回不同的对象时，才会触发回调：

  ```js
  watch(
    () => state.someObject,
    () => {
      // 仅当 state.someObject 被替换时触发
    }
  )
  ```

  然而，在上面的例子里，你可以显式地加上 `deep` 选项，强制转成深层侦听器：

  ```js
  watch(
    () => state.someObject,
    (newValue, oldValue) => {
      // 注意：`newValue` 此处和 `oldValue` 是相等的
      // *除非* state.someObject 被整个替换了
    },
    <!-- 谨慎使用 因为深度侦听需要遍历被侦听对象中的所有嵌套的 property，当用于大型数据结构时，开销很大 -->
    { deep: true }
  )
  ```

* **Kn.3：`watchEffect()`**

  `watch()`是懒执行的：仅在侦听源变化时，才会执行回调。
  
  但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调，或者说要积极地执行回调。
  举个例子，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。我们可以这样写：

  ```js
  const url = ref('https://...')
  const data = ref(null)

  async function fetchData() {
    const response = await fetch(url.value)
    data.value = await response.json()
  }

  // 立即获取
  fetchData()
  // ...再侦听 url 变化
  watch(url, fetchData)
  ```

  这段代码还可以用 watchEffect 函数 来简化。
  watchEffect() 会立即执行一遍回调函数，如果这时函数产生了副作用，Vue 会自动追踪副作用的依赖关系，自动分析出响应源。
  上面的例子可以重写为：

  ```js
  watchEffect(async () => {
    const response = await fetch(url.value)
    data.value = await response.json()
  })
  ```

  这个例子中，回调会立即执行。
  在执行期间，它会自动追踪 url.value 作为依赖（近似于计算属性）。
  每当 url.value 变化时，回调会再次执行。

* **Kn.4：回调的刷新时机**

  当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

  默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

  如果想在侦听器回调中能访问被 Vue 更新之后的DOM，你需要指明 flush: 'post' 选项：

  ```js
  watch(source, callback, {
    flush: 'post'
  })

  watchEffect(callback, {
    flush: 'post'
  })
  ```

  后置刷新的 `watchEffect()` 有个更方便的别名 watchPostEffect()：

  ```js
  import { watchPostEffect } from 'vue'

  watchPostEffect(() => {
    /* 在 Vue 更新后执行 */
  })
  ```

* **Kn.5：停止侦听器**

  在 `setup()` 或 `<script setup>` 中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。
  因此，在大多数情况下，你无需关心怎么停止一个侦听器。

  一个关键点是，侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。
  如下方这个例子

  ```js
  <script setup>
  import { watchEffect } from 'vue'

  // 它会自动停止
  watchEffect(() => {})

  // ...这个则不会！
  setTimeout(() => {
    watchEffect(() => {})
  }, 100)
  </script>
  ```

  要手动停止一个侦听器，请调用 `watch` 或 `watchEffect` 返回的函数：

  ```js
  const unwatch = watchEffect(() => {})

  // ...当该侦听器不再需要时
  unwatch()
  ```

  注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。
  如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：

  ```js
  // 需要异步请求得到的数据
  const data = ref(null)

  watchEffect(() => {
    if (data.value) {
      // 数据加载后执行某些操作...
    }
  })

  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
