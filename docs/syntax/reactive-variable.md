# 响应式变量

::: tip 目标
这一小节，我们的目标是学习响应式变量
:::

::: warning 步骤

1. 定义响应式变量
2. ref 在模板中的解包
3. ref 在响应式对象中的解包
4. 响应性语法糖
:::

::: info 体验

* **Kn.1：定义响应式变量**

  为了解决 reactive() 带来的限制，我们提供了另一个 ref() 方法来帮我们创建响应式的 ref，它可以装载任何值类型

  ```js
  import { ref } from 'vue'

  const count = ref(0)
  ```

  `ref()` 从参数中获取到值，将其包装为一个带`.value`属性的对象：

  ```js
  const count = ref(0);
  
  console.log(count) // { value: 0 }
  console.log(count.value) // 0
  
  count.value++
  console.log(count.value) // 1
  ```

  和响应式对象的属性类似，**ref 的 .value 属性也是响应式的**。**同时，当值为对象类型时，会用 reactive() 自动转换它的 .value**。

  一个包含对象类型值的 ref 可以响应式地替换整个对象：

  ```js
  const objectRef = ref({ count: 0 })

  // 这是响应式的替换
  objectRef.value = { count: 1 }
  ```

  `ref` 被传递给函数或是从一般对象上被解构时，不会丢失响应性

  ```js
  const obj = {
    foo: ref(1),
    bar: ref(2)
  }

  // 该函数接收一个 ref
  // 需要通过 .value 取值
  // 但它会保持响应性
  callSomeFunction(obj.foo)

  // 仍然是响应式的
  const { foo, bar } = obj
  ```

  `ref()` 使我们能创造一种对任何值的 "引用" 并能够不丢失响应性地随意传递。
  这个功能非常重要，因为它**经常用于将逻辑提取到 组合函数** 中。

* **Kn.2：ref 在模板中的解包**

  当 `ref` 在模板中作为顶层 `property` 被访问时，它们会被自动“解包”，所以不需要使用 `.value`。

  ```html
  <script setup>
  import { ref } from 'vue'

  const count = ref(0)

  function increment() {
    count.value++
  }
  </script>

  <template>
    <button @click="increment">
      {{ count }} <!-- no .value needed -->
    </button>
  </template>
  ```

  请注意，解包过程仅作用于顶层 property，访问深层级的 ref 则不会解包

  ```js
  const object = { foo: ref(1) }
  {{ object.foo }} <!-- 无法自动解包 -->
  ```

* **Kn.3：ref 在响应式对象中的解包**

  当一个 ref 作为一个响应式对象的 property 被访问或更改时，它会自动解包，因此会表现得和一般的 property 一样：

  ```js

  const count = ref(0)
  const state = reactive({
    count
  })

  console.log(state.count) // 0

  state.count = 1
  console.log(count.value) // 1

  ```

  如果将一个新的 ref 赋值给响应式对象某个已经为 ref 的属性，那么它会替换掉旧的 ref

  ```js
  const otherCount = ref(2)

  state.count = otherCount
  console.log(state.count) // 2
  // 原来的 ref 现在已经和 state.count 脱去联系
  console.log(count.value) // 1
  ```

* **Kn.4：响应性语法糖（实验）**

  不得不对 ref 使用 .value 是一个受限于 JavaScript 语言限制的缺点。
  不过在编译期间，自动在合适的位置上添加上 .value 可以改进开发体验。
  Vue 提供了一个语法糖，可以在编译时作相应转换，使得我们可以像这样书写上面的计数器示例

  ```html
  <script setup>
  let count = $ref(0)

  function increment() {
    // no need for .value
    count++
  }
  </script>

  <template>
    <button @click="increment">{{ count }}</button>
  </template>
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
