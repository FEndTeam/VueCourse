# 操作Getter

::: tip 目标
这一小节，我们的目标是掌握Pinia中Getter的使用
:::

::: warning 步骤

1. 声明getter
2. 访问getter
3. 访问其他getter
4. 访问其他store中的getter
5. 参数传递给getter
:::

::: info 体验

* **Kn.1：声明getter**

  ```js
  import { defineStore } from 'pinia'

  // 第一个参数为store名称，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。
  // 将返回的函数命名为 use... 是跨可组合项的约定，以使其符合你的使用习惯。
  export const useCartStore = defineStore('cartStore', {
    // other options...
    state: () => ({
      // 在这里写状态
      counter: 0
    }),
    getters: {
    // 在这里写计算属性
      dbCount(state){
        return state.counter * 2;
      }
    },
  })
  ```

* **Kn.2：访问getter**

  ```html
  <script setup>
  import { useCartStore } from "./stores/cartStore"
  // 为了从 Store 中提取属性同时保持其响应式，您需要使用storeToRefs()。 它将为任何响应式属性创建 refs。
  import { storeToRefs } from 'pinia'

  const { counter } = storeToRefs(useCartStore());
  </script>
  ```

* **Kn.3：访问其他getter**

  ```js
  import { defineStore } from 'pinia'

  // 第一个参数为store名称，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。
  // 将返回的函数命名为 use... 是跨可组合项的约定，以使其符合你的使用习惯。
  export const useCartStore = defineStore('cartStore', {
    // other options...
    state: () => ({
      // 在这里写状态
      counter: 0
    }),
    getters: {
    // 在这里写计算属性
      dbCount(state){
        return state.counter * 2;
      },
      // 在这个getter中访问该store中的其他getter
      doubleCountPlusOne() {
      // 自动完成 ✨
        return this.doubleCount + 1
      },
    },
  })
  ```

* **Kn.4：访问其他store中的getter**

  ```js
   getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
  ```

* **Kn.5：参数传递给getter**

  Getters 只是幕后的 computed 属性，因此无法向它们传递任何参数。
  但是，您可以从 getter 返回一个函数以接受任何参数

  ```js
  export const useStore = defineStore('main', {
    getters: {
      getUserById: (state) => {
        return (userId) => state.users.find((user) => user.id === userId)
      },
    },
  })
  ```

  并在组件中使用

  ```html

  <script>
  export default {
    setup() {
      const store = useStore()

      return { getUserById: store.getUserById }
    },
  }
  </script>

  <template>
    <p>User 2: {{ getUserById(2) }}</p>
  </template>
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
