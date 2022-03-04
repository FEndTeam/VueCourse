# 模板语法

::: tip 目标
这一小节，我们的目标是掌握Vue中模板语法的使用

Vue 使用一种基于 HTML 的模板语法，使我们能够声明式地将其组件实例的数据绑定到呈现的 DOM 上。
所有的 Vue 模板都是语法上合法的 HTML，可以被符合规范的浏览器和 HTML 解析器解析。
:::

::: warning 步骤

1. 文本插值
2. 原始HTML
3. 使用JavaScript表达式
:::

::: info 体验

* **Kn.1：文本插值**

  最基本的数据绑定形式是文本插值，它使用的是“Mustache”(插值表达式)语法 (即双大括号)：

  ```html
  <span>Message: {{ msg }}</span>
  ```

  双大括号标签会被替换为相应组件实例中 msg property 的值。同时每次 msg property 更改时它也会同步更新。

* **Kn.2：原始HTML**

  双大括号将会将数据插值为纯文本，而不是 HTML。

  ```html
  <!-- rawHtml： <span style="color: red">This should be red.</span> -->
  <p>Using text interpolation: {{ rawHtml }}</p>
  ```

* **Kn.3：使用JavaScript表达式**

  Vue在所有的数据绑定中都支持完整的 JavaScript 表达式

  ```js

  {{ number + 1 }}
  
  {{ ok ? 'YES' : 'NO' }}
  
  {{ message.split('').reverse().join('') }}

   // <!-- 绑定在表达式中的方法在组件每次更新时都会被重新调用，因此不应该产生任何副作用，比如改变数据或触发异步操作。 -->
  <span>
  {{ formatDate(date) }}
  </span>
  // <!-- 可以在插值表达式中使用 Math 和 Date对象的方法 -->
  {{Math.PI}}

  {{Date.now()}}

  ```

  每个绑定仅支持单一表达式，所以下面的例子都是**无效**的：

  ```js
  // <!-- 这是一个语句，而非表达式 -->
  {{ var a = 1 }}
  
  // <!-- 条件控制同样不会工作，请使用三元表达式 -->
  {{ if (ok) { return message } }}
  ```

:::

::: danger 总结

* 【重点】

  * ⓵ 文本插值
  * ⓶ 原始HTML
  * ⓷ 使用JavaScript表达式

* 【难点】
  * ⓷ 使用JavaScript表达式
* 【注意点】
  * ⓷ 使用JavaScript表达式
:::
