# 文本渲染

::: info Object
这一小节，我们的目标是掌握Vue中文本渲染指令的用法
:::

::: tip Path

1. `v-text`指令
2. 插值表达式
3. `v-html`指令
:::

::: warning Experience

## Kn.1：`v-text`指令

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

## Kn.2：插值表达式

  vue 提供的插值表达式语法，专门用来解决 `v-text` 会覆盖默认文本内容的问题。
  这种语法的专业名称是插值表达式(英文名为:Mustache)。

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

## Kn.3：`v-html`指令

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
* 【难点】
* 【注意点】
:::
