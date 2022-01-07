# 组件的方法

::: tip Object
这一小节，我们的目标是掌握如何在组件中定义一个可以修改数据的方法
:::

::: warning Path

1. 方法的声明
2. 方法的使用
:::

::: info Experience

* **Kn. 1：方法的声明**

  在Vue中，想要声明一个修改数据的方法，只需要在setup中像声明一个普通函数即可

  ```js
  setup() {
    let name = ref("张三")
    // 格式: 变量关键字 方法名 = ()=> {}
    let handlerName = ()=>{
      name.value = "王五"
    }
    return {
      name
    }
  }  
  ```

* **Kn. 2：方法的使用**

  如果想要直接调用，那么就使用调用函数的方式 `方法名()`
  如果想要在发生事件的时候调用，那么就在setup中导出即可...

  ```js
  setup() {
    let name = ref("张三")
    // 格式: 变量关键字 方法名 = ()=> {}
    let handlerName = ()=>{
      name.value = "王五"
    }
    
    handlerName();
    // 或
    return {
      name,
      handlerName
    }
  }  
  ```

:::

::: danger Note

* 【重点】

  * ⓵ 方法的声明
  * ⓶ 方法的使用

* 【注意点】

  * ⓵  现在只是简单的声明和使用方法,在后面还会再次说明方法的传参
:::
