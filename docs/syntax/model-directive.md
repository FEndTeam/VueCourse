# 表单绑定指令

::: tip Object
这一节，我们的目标是 使用 表单绑定指令(`v-model`也叫双向绑定指令)，收集表单的数据。为什么要学习这个指令呢？ 在前端开发中，总是免不了要收集用户的数据，传递给后端，让后端去处理。但是如果我们使用 DOM 中学习的知识，收集用户数据发送给后端的话，要一个个的获取元素并且获取它们的`value`还要拼接字符串。非常的麻烦，那么 Vue 是如何做这件事情的呢？
:::

::: warning Path

1. 使用 `v-model` 绑定 单行文本
2. 使用 `v-model` 绑定 多行文本
3. 使用 `v-model` 绑定 复选框
4. 使用 `v-model` 绑定 单选框
5. 使用 `v-model` 绑定 选择框
6. lazy修饰符的使用
7. trim修饰符的使用
8. number修饰符的使用

:::

::: info Experience

## 1. 使用 `v-model` 绑定 单行文本

```html
<!-- 
   假设 data中 定义了以下数据
   data(){
     return {
      message: ''
     }
   }
   -->
<input v-model="message" placeholder="edit me" />
<p>Message is: {{ message }}</p>
```

## 2. 使用 `v-model` 绑定 多行文本

```html
<!-- 
   假设 data中 定义了以下数据
   data(){
     return {
      message: ''
     }
   }
   -->
<textarea v-model="message" placeholder="add multiple lines"></textarea>
<br />
<p style="white-space: pre-line;">{{ message }}</p>


```

## 3. 使用 `v-model` 绑定 复选框

```html
<!-- 
   假设 data中 定义了以下数据
   data(){
     return {
      checkedNames: ''
     }
   }
   -->

<div id="app">
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
  <br />
  <span>Checked names: {{ checkedNames }}</span>
</div>
```

## 4. 使用 `v-model` 绑定 单选框

```html

<!-- 
   假设 data中 定义了以下数据
   data(){
     return {
      picked: ''
     }
   }
   -->
<div id="app">
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  <br />
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  <br />
  <span>Picked: {{ picked }}</span>
</div>
```

## 5. 使用 `v-model` 绑定 选择框

```html
<!-- 
   假设 data中 定义了以下数据
   data(){
     return {
      selected: ''
     }
   }
   -->
  
<div id="app">
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option value="a">A</option>
    <option value="b">B</option>
    <option value="c">C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

## 6. lazy修饰符的使用

在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步，你可以添加 lazy 修饰符，从而转为在 change 事件之后进行同步

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" />
```

## 7. trim修饰符的使用

如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符

```html
<input v-model.trim="msg" />
```

## 8. number修饰符的使用

如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符

```html
<input v-model.number="age" type="text" />
```

:::

::: danger Note

* 【重点】

  1. 使用 `v-model` 绑定 单行文本
  2. 使用 `v-model` 绑定 多行文本
  3. 使用 `v-model` 绑定 复选框
  4. 使用 `v-model` 绑定 单选框
  5. 使用 `v-model` 绑定 选择框

* 【易错点】
  3. 使用 `v-model` 绑定 复选框
  4. 使用 `v-model` 绑定 单选框
  5. 使用 `v-model` 绑定 选择框

* 【面试题】
  1. 请说明 `v-model`的实现原理
  2. 请说明 你对双向绑定的理解
:::
