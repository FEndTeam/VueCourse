# 配置Pinia

::: tip Object
这一小节，我们的目标是掌握如何在Vue项目中配置Pinia,为之后管理Vue中的共享数据做铺垫
:::

::: warning Path

1. 安装Pinia
2. 在项目入口文件中，挂载Pinia
3. 在src目录创建stores文件夹并创建JavaScript文件
4. 在JavaScript文件中声明Store
5. 在组件中引入Store
:::

::: info Experience

* **Step. 1：安装Pinia**

  ```bash
  yarn add pinia
  # or with npm
  npm install pinia
  ```

* **Step. 2：在项目入口文件中，挂载Pinia**

  ```js
  // 导入Pinia包 解构createPinia方法
  import { createPinia } from 'pinia'
  // 在app上使用 createPinia() 挂载
  app.use(createPinia())
  ```

* **Step. 3：在src目录创建stores文件夹并创建JavaScript文件**

  ```text
  /src/stores/xxxx.js
  ```

* **Step. 4：在JavaScript文件中声明Store**

  ```js
  import { defineStore } from 'pinia'

  // useStore could be anything like useUser, useCart
  // the first argument is a unique id of the store across your application
  export const useXxxx = defineStore('xxxx', {
    // other options...
  })
  ```

* **Step. 5：在组件中引入Store**

  ```js
  // 引入Store文件
  import { useXxxx } from '@/stores/xxxx'
  // 引入 storeToRefs
  import { storeToRefs } from 'pinia'
  export default defineComponent({
    setup() {
      const store = useXxxx()
      const { xxxx, xxxx } = storeToRefs(store)
    },
  })
  ```

:::

::: danger Note

* 【重点】
  * ⓵ 安装Pinia
  * ⓶ 在项目入口文件中，挂载Pinia
  * ⓷ 在src目录创建stores文件夹并创建JavaScript文件
  * ⓸ 在JavaScript文件中声明Store

* 【难点】

  * ⓶ 在项目入口文件中，挂载Pinia
  * ⓸ 在JavaScript文件中声明Store

:::
