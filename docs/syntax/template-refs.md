# 模板 ref

::: tip 目标
这一小节，我们的目标是掌握 模板 Ref的使用方法

:::

::: warning 步骤

1. 基本介绍
2. 访问模板`ref`
3. `v-for` 中的`ref`
4. 函数型`ref`
5. 组件上的`ref`
:::

::: info 体验

* **Kn.1：基本介绍**

  虽然 Vue 的声明性渲染模型为你抽象了大部分对 DOM 的直接操作，但在某些情况下，我们仍然需要直接访问底层 DOM 元素。要实现这一点，我们可以使用特殊的 ref attribute：

  ```html
  <input ref="input">
  ```

  `ref` 是一个特殊的 attribute，和 v-for 章节中提到的 key 类似。
  它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。
  这可能很有用，比如说在组件挂载时编程式地聚焦到一个 input 元素上，或在一个元素上初始化一个第三方库。

* **Kn.2：访问模板`ref`**

  为了通过组合式 API 获得该模板 ref，我们需要声明一个同名的 ref：

  ```html
  <script setup>
  import { ref, onMounted } from 'vue'

  // 声明一个 ref 来存放该元素的引用
  // 必须和模板 ref 同名
  const input = ref(null)

  onMounted(() => {
    input.value.focus()
  })
  </script>

  <template>
    <input ref="input" />
  </template>
  ```

  如果不使用 `<script setup>`，需确保从 `setup()` 返回 `ref`：

  ```html
  export default {
    setup() {
      const input = ref(null)
      // ...
      return {
        input
      }
    }
  }
  ```

  注意，你只可以在组件挂载后才能访问 `ref`。
  如果你想在模板中的表达式上访问 `input`，在初次渲染时会是`null`。
  这是因为在初次渲染前这个元素还压根不存在呢！

  如果你正试图观察一个模板 ref 的变化，确保考虑到 ref 的值为 null 的情况：

  ```js
  watchEffect(() => {
    if (input.value) {
      input.value.focus()
    } else {
      // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
    }
  })
  ```

* **Kn.3：`v-for` 中的`ref`**

  当 ref 在 v-for 中使用时，相应的 ref 中包含的值是一个数组，它将在元素被挂载后填充：

  ```html
  <script setup>
  import { ref, onMounted } from 'vue'

  const list = ref([
    /*...*/
  ])

  const itemRefs = ref([])

  onMounted(() => console.log(itemRefs.value))
  </script>

  <template>
    <ul>
      <li v-for="item in list" ref="itemRefs">
        {{ item }}
      </li>
    </ul>
  </template>
  ```

***Kn.4：函数型`ref`**

  除了使用字符串值作名字，ref attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。函数接受该元素引用作为第一个参数：

  ```html
  <input :ref="(el) => { /* 将 el 分配给 property 或 ref */ }">
  ```

  如果你正在使用一个动态的 :ref 绑定，我们也可以传一个函数。
  当元素卸载时，这个 el 参数会是 null。
  你当然也可以使用一个方法而不是内联函数。

* **Kn.5：组件上的`ref`**

  ref 也可以被用在一个子组件上。此时 ref 中引用的是组件实例：

  ```html
  <script setup>
  import { ref, onMounted } from 'vue'
  import Child from './Child.vue'
  
  const child = ref(null)
  
  onMounted(() => {
    // child.value 是 <Child /> 组件的实例
  })
  </script>
  
  <template>
    <Child ref="child" />
  </template>
  ```

  如果一个子组件使用的是选项式 API 或没有使用 `<script setup>`，被引用的组件实例和该子组件的 this 完全一致，这意味着父组件对子组件的每一个属性和方法都有完全的访问权。这使得在父组件和子组件之间创建紧密耦合的实现细节变得很容易，当然也因此，应该只在绝对需要时才使用组件引用。大多数情况下，你应该首先使用标准的 props 和 emit 接口来实现父子组件交互。

  有一个例外的情况，使用了 `<script setup>` 的组件时默认私有的：一个父组件无法访问到一个使用了 `<script setup>` 的子组件中的任何东西，除非子组件在其中通过 defineExpose 宏显式暴露：

  ```html
  <script setup>
  import { ref } from 'vue'

  const a = 1
  const b = ref(2)

  defineExpose({
    a,
    b
  })
  </script>
  ```

  当父组件通过模板 ref 获取到了该组件的实例时，得到的实例类型为 `{ a: number, b: number }`(ref 都会自动解包，和一般的实例一样)。

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
