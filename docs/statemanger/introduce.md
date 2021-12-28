# 简介

::: tip Object
这一小节，我们的目标是了解Vue项目中的状态管理解决方案--Pinia
:::

::: warning Path

1. 为什么要使用状态管理库
2. Pinia是什么
3. Pinia和Vuex的异同点
:::

::: info Experience

* **Kn. 1：为什么要使用状态管理库**

  * ⓵ 能有效分离 UI 层和数据处理层
  * ⓶ 帮助前端应用结构化数据
  * ⓷ 有效控制状态的变化
  * ⓸ 处理同步与异步
  * ⓹ 实现一些日志打印，热加载，时间旅行，同构应用等功能

* **Kn. 2：Pinia是什么**

  Pinia是一个用于 Vue 的轻量级状态管理库，类似于 Vuex， 是Vue项目中的其中一种状态管理方案，它易于学习，和Vuex的API极其相似。

* **Kn. 3：Pinia和Vuex的异同点**

  * ⓵ 都是 Vue 的状态管理相关的库，Pinia和Vuex效率都非常高
  * ⓶ Vuex使用的范围广，稳定性好，适合大型、高复杂度的项目
  * ⓷ Vuex支持调试
  * ⓸ Pinia有完整的TypeScript支持，且体积极其轻巧
  * ⓹ Pinia允许开发者建立多个Store，不使用模块嵌套
  * ⓺ Pinia使用Actions更新State或处理异步任务，删除了Mutations
  * ⓻ Pinia使用的范围晓，稳定性弱，且步支持调试，适合中小型、低复杂度的项目
:::

::: danger Note

* 【重点】

  * ⓵ 为什么要使用状态管理库
  * ⓶ Pinia是什么
  * ⓷ Pinia和Vuex的异同点
:::
