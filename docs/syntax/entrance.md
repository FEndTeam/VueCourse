# 入口函数

::: tip 目标
这一小节，我们的目标是掌握 setup 函数的基本使用
:::

::: warning 步骤

1. setup 函数的执行时机以及 this 指向
2. setup 函数的返回值
3. setup 函数如何使用
:::

::: info 体验

* **Kn.1：setup 函数的执行时机以及 this 指向**

  `setup` 函数是一个新的组件选项，作为在组件中使用组合式 API 的入口

  `setup` 函数在任何生命周期函数之前执行，且函数内部 `this` 为 `undefined`，它不绑  定组件实例对象

  ```javascript
  export default {
    setup() {
      console.log(this) // 1. undefined
    },
    beforeCreate() {
      console.log("before create") // 2. before create
    },
  }
  ```

* **Kn.2：setup 函数的返回值**

  `setup` 函数的返回值为对象类型，对象中的属性可以在其他选项和模板中使用, 因为对象中的属性会被添加到组件实例对象中
  
  ```javascript
  export default {
    setup() {
      let name = "张三"
      let age = 20
      return { name, age }
    },
    beforeCreate() {
      console.log(this.name);
    },
  }
  ```
  
  ```html
  <template>{{ name }} | {{ age }}</template>
  ```

* **Kn.3：setup 函数如何使用**

  在 setup 方法中声明的变量虽然可以在模板中显示，但它不是响应式数据，就是说当数据更改后界面不会发生变化。
  
  ```javascript
  export default {
    setup() {
      let name = "张三"
      let age = 20
      const onClickHandler = () => {
        name = "李四"
        age = 30
      }
      return { name, age, onClickHandler }
    }
  }
  ```
  
  ```html
  <template>
    {{ name }} | {{ age }} 
      <button @click="onClickHandler">button</button>
  </template>
  ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
