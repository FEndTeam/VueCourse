# Pinia持久化

::: tip 目标
这一小节，我们的目标是学习使用插件 pinia-plugin-persist 实现数据持久化功能
:::

::: warning 步骤

1. 安装
2. 使用
3. 自定义 key
4. 持久化部分 state
:::

::: info 体验

* **Kn.1：安装**

  ```bash
  npm i pinia-plugin-persist --save
  ```

* **Kn.2：使用**

  ```js
  import { createPinia } from 'pinia'
  import piniaPluginPersist from 'pinia-plugin-persist'

  const store = createPinia()
  store.use(piniaPluginPersist)

  export default store
  ```

  接着在对应的 store 里开启 persist

  ```js
  export const useUserStore = defineStore({
    id: 'user',

    state: () => {
      return {
        name: '张三'
      }
    },

    // 开启数据缓存
    persist: {
      enabled: true
    }
  })
  ```

* **Kn.3：自定义 key**

  数据默认存在 `sessionStorage` 里，并且会以 `store` 的 `id` 作为 `key`。

  你也可以在 strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 localStorage。

  ```js
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_user',
        storage: localStorage,
      }
    ]
  }
  ```

* **Kn.4：持久化部分 state**

  默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。

  ```js
  state: () => {
    return {
      name: '张三',
      age: 18,
      gender: '男'
    }  
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['name', 'age']
      }
    ]
  }
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
