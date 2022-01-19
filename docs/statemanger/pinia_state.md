# Pinia中的state

::: tip Object
这一小节，我们的目标是掌握如何在Vue项目中使用Pinia来定义共享状态，并把状态展示在项目中
:::

::: warning Path

1. 声明state状态
2. 访问state状态
3. 重置state状态
4. 替换state状态
5. 订阅state状态
:::

::: info Experience

* **Kn. 1：声明state状态**

  ```js
  import { defineStore } from 'pinia'

  const useStore = defineStore('storeId', {
    // 推荐:
    state: () => {
      return {
        //格式:key: value
        counter: 0
      }
    },
  })
  ```

* **Kn. 2：访问state状态**

  ```js
  import { storeToRefs } from "pinia"
  import { usexxxxStore } from '../stores/xxxxStore'
  const { 解构出store中定义的书就 } = storeToRefs(usexxxxxStore());
  ```

* **Kn. 3：重置state状态**

  ```js
  const store = useStore()
  store.$reset()
  ```

* **Kn. 4：替换state状态**

  ```js
  store.$state = { counter: 666, name: 'Paimon' }
  // 或
  pinia.state.value = {}
  ```

* **Kn. 5：订阅state状态**

  ```js
  artStore.$subscribe((mutation, state) => {
    // import { MutationType } from 'pinia'
    mutation.type // 'direct' | 'patch object' | 'patch function'
    // same as cartStore.$id
    mutation.storeId // 'cart'
    // only available with mutation.type === 'patch object'
    mutation.payload // patch object passed to cartStore.$patch()

    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(state))
  })
  ```

:::

::: danger Note

* 【重点】
  * ⓵ 声明state状态
  * ⓶ 访问state状态
  * ⓷ 重置state状态
  * ⓸ 替换state状态

* 【难点】
  * ⓵ 订阅state状态
:::
