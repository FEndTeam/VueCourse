# 表单输入绑定

::: tip 目标
这一小节，我们的目标是掌握表单控件的双向绑定方式, 在前端处理表单时，我们常常需要将表单输入框的内容同步给 JavaScript 中相应的变量。手
动连接值绑定和更改事件监听器可能会很麻烦：

```html
<input :value="text" @input="event => text = event.target.value">
```

`v-model` 指令帮我们简化了这一步骤：

```js
<input v-model="text">
```

:::

::: warning 步骤

1. 基本用法
2. 值绑定
3. 修饰符
:::

::: info 体验

* **Kn.1：基本用法**

  * ⓵ 文本

    ```js
    <p>Message is: {{ message }}</p>
    <input v-model="message" placeholder="edit me" />
    ```

  * ⓶ 多行文本

    注意插值表达式在 `<textarea>` 中将不会工作。请使用 `v-model` 来替代。

    ```js
    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>    
    ```

  * ⓷ 复选框

    单一的复选框，绑定的是布尔类型值：

    ```js
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>
    ```

    我们还可以将多个复选框绑定到同一个数组或集合的值：

    ```js
    const checkedNames = ref([])
    ```

    ```html
    <div>Checked names: {{ checkedNames }}</div>

    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>

    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>

    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    ```

    在这个例子中，checkedNames 数组将始终包含来自当前选中框的值。

  * ⓸ 单选按钮

    ```html
    <div>Picked: {{ picked }}</div>

    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>

    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>
    ```

  * ⓹ 选择器

    单个选择器的示例如下：

    ```html
    <div>Selected: {{ selected }}</div>

    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select
    ```

    多选 (值绑定到一个数组)：

    ```html

    <div>Selected: {{ selected }}</div>

    <select v-model="selected" multiple>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    ```

    选择器的选项可以使用 v-for 动态渲染：

    ```js
    const selected = ref('A')
    
    const options = ref([
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ])
    ```

    ```html
    <select v-model="selected">
      <option v-for="option in options" :value="option.value">
        {{ option.text }}
      </option>
    </select>

    <div>Selected: {{ selected }}</div>
    ```

* **Kn.2：值绑定**

  * ⓵ 概述

    对于单选按钮，复选框和选择器选项，`v-model` 绑定的值通常是静态的字符串 (或者对复选框是布尔值)：

    ```html
    <!-- `picked` 在被选择时是字符串 "a" -->
    <input type="radio" v-model="picked" value="a" />

    <!-- `toggle` 只会为 true 或 false -->
    <input type="checkbox" v-model="toggle" />

    <!-- `selected` 在第一项被选中时为字符串 "abc" -->
    <select v-model="selected">
      <option value="abc">ABC</option>
    </select>
    ```

    但有时我们可能希望将该值绑定到当前活动实例上的动态属性，那么可以使用 `v-bind` 来做到。
    此外使用 `v-bind` 还使我们可以将选项值绑定为非字符串类型。

  * ⓶ 复选框

    ```html
    <input
      type="checkbox"
      v-model="toggle"
      true-value="yes"
      false-value="no" />
    ```

    true-value 和 false-value 是 Vue 特有的 attributes 且仅会在 v-model 存在时工作。
    这里 toggle 属性的值会在选中时被设为 'yes'，取消选择时设为 'no'。
    你同样可以通过 v-bind 将其绑定为其他动态值：

    ```html
    <input
      type="checkbox"
      v-model="toggle"
      :true-value="dynamicTrueValue"
      :false-value="dynamicFalseValue" />
    ```

  * ⓷ 单选按钮

    ```html
    <input type="radio" v-model="pick" :value="first" />
    <input type="radio" v-model="pick" :value="second" />
    ```

    `pick`会在第一个按钮选中时被设为 `first`，在第二个按钮选中时被设为 `second`。

  * ⓸ 选择器选项

    v-model 同样也支持非字符串类型的值绑定！
    在上面这个例子中，当某个选项被选中，selected 会被设为该对象字面量值 { number: 123 }。

    ```html
    <select v-model="selected">
      <!-- 内联对象字面量 -->
      <option :value="{ number: 123 }">123</option>
    </select>
    ```

* **Kn.3：修饰符**

  * ⓵ `.lazy`

    默认情况下，`v-model` 会在每次 `input` 事件后更新数据 (IME composition 阶段的状态例外)。
    你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据：

    ```html
    <!-- 在 "change" 事件后同步更新而不是 "input" -->
    <input v-model.lazy="msg" />
    ```

  * ⓶ `.number`

    如果你想让用户输入自动转换为数字，你可以在 v-model 后添加 .number 修饰符来管理输入：

    ```html
    <input v-model.number="age" />
    ```

    如果该值无法被 `parseFloat()` 处理，那么将返回原始值。

    `number` 修饰符会在输入框有 `type="number"` 时自动应用。

  * ⓷ `.trim`

    如果你想要默认自动去除用户输入内容中两端的空格，你可以在 v-model 后添加 .trim 修饰符来管理输入：

    ```html
    <input v-model.trim="msg" />
    ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
