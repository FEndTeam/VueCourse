# 事件处理

::: tip 目标
这一小节，我们的目标是掌握事件处理的相关知识
:::

::: warning 步骤

1. 监听事件
2. 内联事件处理器
3. 方法事件处理器
4. 在内联处理器中调用方法
5. 在内联处理器中方法事件参数
6. 事件修饰符
7. 按键修饰符
8. 鼠标按键修饰符
:::

::: info 体验

* **Kn.1：监听事件**

  你可以使用 `v-on` 指令 (简写为 `@`) 来监听 DOM 事件和运行 JavaScript 代码。
  用法：`v-on:click="methodName"` 或 `@click="handler"`。

  事件处理器的值可以是：

  * ⓵ 内联事件处理器： 事件被触发时执行的内联 JavaScript 语句 (与 onclick 类似) 。

  * ⓶ 方法事件处理器： 一个组件的属性名、或对某个方法的访问。

* **Kn.2：内联事件处理器**

  内联事件处理器通常用于简单场景，例如：  

  ```js
  const count = ref(0)
  ```

  ```html
  <button @click="count++">Add 1</button>
  <p>Count is: {{ count }}</p>
  ```

* **Kn.3：方法事件处理器**

  随着事件处理器的逻辑变得愈发复杂，内联代码方式变得不够灵活。
  因此 v-on 也可以接受一个方法名或对某个方法的调用。

  举个例子：

  ```js
  const name = ref('Vue.js')

  function greet(event) {
    alert(`Hello ${name.value}!`)
    // `event` 是 DOM 原生事件
    if (event) {
      alert(event.target.tagName)
    }
  }
  ```

  ```html
  <!-- `greet` 是上面定义过的方法名 -->
  <button @click="greet">Greet</button>
  ```

  方法作事件处理器会自动接收原生 DOM 事件并触发执行。在上面的例子中，我们能够通过被触发事件的 event.target.tagName 访问到该 DOM 元素。

* **Kn.4：在内联处理器中调用方法**

  模板编译器会通过检查 `v-on` 的值是否是合法的 `JavaScript` 标识符或属性访问来断定是何种形式的事件处理器。
  举个例子，`foo`、`foo.bar` 和 `foo['bar']` 会被视为方法事件处理器，而 `foo()` 和 `count++` 会被视为内联事件处理器。

   除了直接绑定方法名，你还可以在内联事件处理器中调用方法。这允许我们向方法传入自定义参数以代替原生事件：

  ```js
  function say(message) {
    alert(message)
  }
  ```

  ```html
  <button @click="say('hello')">Say hello</button>
  <button @click="say('bye')">Say bye</button>
  ```

* **Kn.5：在内联处理器中方法事件参数**

  有时我们需要在内联事件处理器中访问原生 DOM 事件。
  你可以向该处理器方法传入一个特殊的 $event 变量，或者使用内联箭头函数：

  ```html
  <!-- 使用特殊的 $event 变量 -->
  <button @click="warn('Form cannot be submitted yet.', $event)">
    Submit
  </button>
  
  <!-- 使用内联箭头函数 -->
  <button @click="(event) => warn('Form cannot be submitted yet.', event)">
    Submit
  </button>
  ```

  ```js
  function warn(message, event) {
    // `这里可以访问 DOM 原生事件`
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
  ```

* **Kn.6：事件修饰符**

  在处理事件时调用 `event.preventDefault()` 或 `event.stopPropagation()` 是很常见的。
  尽管我们可以直接在方法内调用，但如果方法能更专注于数据逻辑而不用去处理 DOM 事件的细节会更好。

  为解决这一问题，Vue 为 v-on 提供了事件修饰符。修饰符是用点表示的指令后缀。
  `.stop`、`.prevent`、`.self`、`.capture`、`.once`、`.passive`。

  ```html
  <!-- 单击事件将停止传递 -->
  <a @click.stop="doThis"></a>
  
  <!-- 提交事件将不再重新加载页面 -->
  <form @submit.prevent="onSubmit"></form>
  
  <!-- 修饰语可以使用链式书写 -->
  <a @click.stop.prevent="doThat"></a>
  
  <!-- 也可以只有修饰符 -->
  <form @submit.prevent></form>
  
  <!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
  <!-- 例如：事件处理器不来自子元素 -->
  <div @click.self="doThat">...</div>
  ```

  `.capture`，`.once`，和 `.passive` 修饰符与原生 `addEventListener` 事件相同:

  ```html
  <!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
  <!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
  <div @click.capture="doThis">...</div>
  
  <!-- 点击事件最多被触发一次 -->
  <a @click.once="doThis"></a>
  
  <!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
  <!-- 以防其中包含 `event.preventDefault()` -->
  <div @scroll.passive="onScroll">...</div>
  ```

  `.passive` 修饰符一般用于触摸事件的监听器，可以用来改善移动端设备的滚屏性能。

  请勿同时使用 .passive 和 .prevent，因为 .prevent 会被忽略并且你的浏览器可能会抛出警告。

* **Kn.7：按键修饰符**

  在监听键盘事件时，我们经常需要检查特定的按键。Vue 允许在 `v-on` 或 `@` 监听按键事件时添加按键修饰符。

  ```html
  <!-- 仅在 `key` 为 `Enter` 时调用 `vm.submit()` -->
  <input @keyup.enter="submit" />

  ```

  你可以直接使用 `KeyboardEvent.key` 暴露的按键名称作为修饰符，但需要转为 `kebab-case` 形式。

  ```html
  <input @keyup.page-down="onPageDown" />
  ```

  在上面的例子中，仅会在 `$event.key` 为 `'PageDown'` 时调用事件处理。

  Vue 为一些常用的按键提供了别名：`.enter`、`.tab`、`.delete` (捕获“Delete”和“Backspace”两个按键)、`.esc`、`.space`、`.up`、`.down`、`.left`、`.right`。

  你可以使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发。

  举个例子：

  ```html
  <!-- Alt + Enter -->
  <input @keyup.alt.enter="clear" />

  <!-- Ctrl + 点击 -->
  <div @click.ctrl="doSomething">Do something</div>
  ```

* **Kn.8：鼠标按键修饰符**

  `.left`、`.right`、`.middle`、这些修饰符将处理程序限定为由特定鼠标按键触发的事件。
:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
