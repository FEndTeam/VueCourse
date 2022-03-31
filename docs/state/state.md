# 操作State

::: tip Object
这一小节，我们的目标是掌握如何在Vue项目中使用Pinia来定义共享状态，并把状态展示在项目中
:::

::: warning Path

1. 声明state状态
2. 访问state状态
3. 修改state状态
4. 订阅state状态
:::

::: info Experience

* **Kn.1：声明state状态**

  ```js
  import { defineStore } from 'pinia'

  // 第一个参数为store名称，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。
  // 将返回的函数命名为 use... 是跨可组合项的约定，以使其符合你的使用习惯。
  export const useCartStore = defineStore('cartStore', {
    // other options...
    state: () => ({
      // 在这里写状态
      counter: 0
    })
  })
  ```

* **Kn.2：访问state状态**

  ```js
  import { useCartStore } from "./stores/cartStore"
  // 为了从 Store 中提取属性同时保持其响应式，您需要使用storeToRefs()。 它将为任何响应式属性创建 refs。
  import { storeToRefs } from 'pinia'
 
  const { counter } = storeToRefs(useCartStore());

  ```

* **Kn.3：修改state状态**

  在pinia中，不仅可以向Vuex中让store中的方法修改状态，还可以有三种方式修改状态数据，但是在**组件中**个人最推荐的是使用$patch方法的回调函数来修改数据

  ```js
  cartStore.$patch((state) => {
    state.items.push({ name: 'shoes', quantity: 1 });
    state.hasChanged = true;
    state.counter++;
  })
  ```

* **Kn.4：订阅state状态**
  
  可以通过 `store` 的 `$subscribe()` 方法查看状态及其变化,与常规的 `watch()` 相比，使用 `$subscribe()` 的优点是 `subscriptions` 只会在 `patches` 之后触发一次。

  ```js
  cartStore.$subscribe((mutation, state) => {
    // 每当它发生变化时，将整个状态持久化到本地存储
    localStorage.setItem('cart', JSON.stringify(state))
  })
  ```

:::

::: danger Note

* 【重点】
  * ⓵ 声明state状态
  * ⓶ 访问state状态

* 【难点】
  * ⓵ 订阅state状态
:::
