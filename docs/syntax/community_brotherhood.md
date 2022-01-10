# 兄弟组件通信

::: tip Object
这一小节，我们的目标是掌握兄弟组件间的通信，掌握它之后，我们可以做到把存在于某一组件中的数据传递给它的兄弟组件
:::
为了达成以上目标，我们需要学习哪些内容呢？主要有以下四方面
::: warning Path

1. 事件总线简介
2. 事件总线使用

:::

::: info Experience

* **Kn. 1：事件总线简介**

  事件总线也被称为EventBus，在Vue中可以使用 EventBus 来作为组件传递数据的桥梁的，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件。

* **Kn. 2：事件总线使用**

  * ⓵ 事件总线的创建

    你需要做的只是引入 Vue 并导出它的一个实例（在这种情况下，我称它为 EventBus ）。实质上它是一个不具备 DOM 的组件，它具有的仅仅只是它实例方法而已，因此它非常的轻便。

    ```js
    const eventBus = new Vue();

    // 或
    // Bus.js
    // import Vue from 'vue'
    // export const EventBus = new Vue();
    
    // 或
    // Vue.prototype.$EventBus = new Vue()
    ```

  * ⓶ 发布事件

    ```js
    eventBus.$emit('emit事件名'，数据)
    ```

  * ⓷ 订阅事件

    ```js
    eventBus.$on("emit事件名", callback(payload,…)) 
    ```

  * ⓸ 移除事件

    ```js
    eventBus.$off('emit事件名', 回调函数)
    ```

:::

::: danger Note

* 【重点】
* 【难点】
* 【注意点】
* 【面试题】
:::
