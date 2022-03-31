# 操作Action

::: tip 目标
这一小节，我们的目标是掌握Pinia中Action的使用
:::

::: warning 步骤

1. 声明action
2. 访问action
3. 访问其他store中的action
4. 订阅action
:::

::: info 体验

* **Kn.1：声明action**

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
      dbCounter(state){
        return state.counter * 2;
      }
    },

    actions: {
        // 任何数量的参数，返回一个 Promise 或者不返回
        setCounter(num) {
          // 你可以直接改变状态
          this.counter +=num;
        },
    },
  })

  ```

* **Kn.2：访问action**

  ```js
  import { useCartStore } from "./stores/cartStore"
  const cartStore = useCartStore();
  ```

  ```html
  <button @click="cartStore.setCounter(5)">按钮</button>
  ```

* **Kn.3：访问其他store中的action**

  ```js
  import { useAuthStore } from './auth-store'

  export const useSettingsStore = defineStore('settings', {
    state: () => ({
      // ...
    }),
    actions: {
      async fetchUserPreferences(preferences) {
        const auth = useAuthStore()
        if (auth.isAuthenticated) {
          this.preferences = await fetchPreferences()
        } else {
          throw new Error('User must be authenticated')
        }
      },
    },
  })
  ```

* **Kn.4：订阅action**

  可以使用 store.$onAction() 订阅 action 及其结果。

  ```js
  const unsubscribe = cartStore.$onAction(
    ({
      name, // action 的名字
      store, // store 实例
      args, // 调用这个 action 的参数
      after, // 在这个 action 执行完毕之后，执行这个函数
      onError, // 在这个 action 抛出异常的时候，执行这个函数
    }) => {
      console.log(store);
      // 记录开始的时间变量
      const startTime = Date.now()
      // 这将在 `store` 上的操作执行之前触发
      console.log(`Start "${name}" with params [${args.join(', ')}].`)

      // 如果 action 成功并且完全运行后，after 将触发。
      // 它将等待任何返回的 promise
      after((result) => {
        console.log(
          `Finished "${name}" after ${
            Date.now() - startTime
          }ms.\nResult: ${result}.`
        )
      })

      // 如果 action 抛出或返回 Promise.reject ，onError 将触发
      onError((error) => {
        console.warn(
          `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
        )
      })
    }
  )
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
