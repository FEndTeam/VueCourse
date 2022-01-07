# 数据渲染指令

::: tip Object
这一小节，我们的目标是掌握Vue中数据渲染指令的用法及区别
:::

::: warning Path

1. `v-text`指令
2. 插值表达式
3. `v-html`指令
:::

::: info Experience

* **Kn. 1：`v-text`指令**

  `v-text`指令，用来渲染DOM元素的文本内容，类似于JavaScript中的`el.innerText = value`

  ```html
    <!-- 
    假设 data中 定义了以下数据
    data(){
      return {
        username: "Pinia",
        gender: '<b>男</b>',
        age: 18
      }
    }
    -->
    <div id="app">
      <p v-text="username"></p>
      <p v-text="gender">性别</p>
      <div v-text="age"></div>
    </div> 
  ```

* **Kn. 2：插值表达式`{{}}`**

  vue 提供的 `{{ }}` 语法，专门用来解决 `v-text` 会覆盖默认文本内容的问题。
  这种 `{{ }}` 语法的专业名称是插值表达式(英文名为:Mustache)。

  ```html
    <!-- 
    假设 data中 定义了以下数据
    data(){
       return {
         username: "Pinia",
         gender: '<b>男</b>',
         age: 18
       }
     }
    -->
    
    <div id="app">
      <p>{{username}}</p>
      <p>{{gender}}</p>
      <p>年龄: {{age + 2}}</p>
    </div>
  ```

* **Kn. 3：`v-html`指令**

  以上两个指令，都不能解析标签，如果要把包含 HTML 标签的字符串渲染为页面的 HTML 元素， 需要用到 v-html 这个指令。

  ```html
    <!-- 

    假设 data中 定义了以下数据
    data(){
      return {
        username: "Pinia",
        gender: '<b>男</b>',
        age: 18
      }
    }
    -->
    <div id="app">
      <p v-html="username"></p>
      <p v-html="gender">性别</p>
      <div v-html="age">年龄: {{age + 2}}</div>
    </div>
  ```

:::

::: danger Note

* 【重点】
  
  * ⓵ 牢记`v-text`指令和 `v-html`指令的用法
  * ⓶ 牢记 `v-text`指令和 `v-html`指令以及`{{}}`插值表达式的区别

* 【易错点】
  * ⓵ 插值表达式中能进行哪些运算？只要不是语句，其他都可以。
:::
