# 事件绑定指令

::: tip Object
这一小节，我们的目标是掌握Vue中事件绑定指令的用法
:::

::: warning Path

1. 事件绑定
2. 事件传参
3. 事件修饰符
4. 按键修饰符

:::

::: info Experience

* **Kn. 1：事件绑定**

  在Vue中，我们通常使用 `v-on`指令为元素绑定事件，用法为 `v-on:click="methodName"` 或使用简写方式   `@click="methodName"`
  
  ```html
     <!-- 
       假设 data中 定义了以下数据
       methods: {
         handlerClick(){
           alert("按钮被点击了！！！")
         }
       }
       -->
    <div id="app">
      <button @click="handlerClick">Add 1</button>
      <p>The button above has been clicked {{ counter }} times.</p>
    </div>
  ```

* **Kn. 2：事件传参**

  如果想要给事件传递参数，那么只需要在事件调用的小括号中传入即可；
  如果想要访问原始的 DOM 事件对象，可以用特殊变量 $event 把它传入方法

  ```html
     <!-- 

       假设 methods 中 定义了以下方法
      methods: {
       handlerClick(name) {
         console.log(name);
       },
       handlerArgument(e){
         console.log(e)
       },
       handlerDouble(e, name){
         console.log(e, name)
       }
      }
       -->
    <div id="app">
        <div id="app">
        <!-- 普通参数 -->
        <button @click="handlerClick('Pinia')">Add 1</button>
        <!-- 事件对象 -->
        <button @click="handlerArgument">Add 2</button>
        <!-- 事件对象和普通参数 -->
        <button @click="handlerDouble($event, 'Pinia')">Add 3</button>
      </div>
    </div>
  ```

* **Kn. 3：事件修饰符**

  在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。
  尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
  为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。

  | 修饰符     | 作用                                                         |
  | ---------- | ------------------------------------------------------------|
  | `.stop`    | 阻止单击事件继续传播                                         |
  | `.prevent` | 提交事件不再重载页面                                         |
  | `.capture` | 添加事件监听器时使用事件捕获模式 (内部元素触发的事件先在此处理，然后才交由内部元素进行处理) |
  | `.self`    | 只当在 event.target 是当前元素自身时触发处理函数             |
  | `.once`    | 事件将只会触发一次                                        |

  ```html
  <!-- 阻止单击事件继续传播 -->
  <a @click.stop="doThis"></a>

  <!-- 提交事件不再重载页面 -->
  <form @submit.prevent="onSubmit"></form>

  <!-- 修饰符可以串联 -->
  <a @click.stop.prevent="doThat"></a>

  <!-- 只有修饰符 -->
  <form @submit.prevent></form>

  <!-- 添加事件监听器时使用事件捕获模式 -->
  <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
  <div @click.capture="doThis">...</div>

  <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div @click.self="doThat">...</div>
  ```

* **Kn. 4：按键修饰符**

  在监听**键盘事件**时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 或者 `@` 在监听键盘事件时添加按键修饰符：

  ```html
  <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
  <input @keyup.enter="submit" />
  ```

:::

::: danger Note

* 【重点】

  * ⓵ 事件绑定
  * ⓶ 事件传参
  * ⓷ 事件修饰符

* 【易错点】

  * ⓵ 事件修饰符，可以添加多个，但是在企业开发中，这样的需求并不多见

:::
