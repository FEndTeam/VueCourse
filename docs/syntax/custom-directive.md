# 自定义的指令

::: tip Object
这一节，我们的目标是 学习如何自定义一个类似于 `v-text`这样的指令？为什么要学习它呢？前面咱们已经学习了很多指令了，但是那些指令有可能无法帮助我们开发项目中的一些需求，比如: 图片懒加载、权限校验、输入框防抖等等...你就会发现没有这样的指令，那怎么办呢？
:::

::: warning Path

1. 什么是指令
2. 指令的使用方式
3. 注册全局指令
4. 注册局部指令
5. 指令的配置项
6. 常见的自定义指令

:::

::: info Experience

## 1. 什么是指令

指令 (Directives) 是带有 v- 前缀的特殊属性

作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

## 2. 指令的使用方式

```text
//会实例化一个指令，但这个指令没有参数 
`v-xxx`

// -- 将值传到指令中
`v-xxx="value"`  

// -- 将字符串传入到指令中，如`v-html="'<p>内容</p>'"`
`v-xxx="'string'"` 

// -- 传参数（`arg`），如`v-bind:class="className"`
`v-xxx:arg="value"` 

// -- 使用修饰符（`modifier`）
`v-xxx:arg.modifier="value"` 
```

## 3. 注册全局指令

`app.directive()`第一个参数是指令的名字（不需要写上v-前缀），第二个参数可以是对象数据，也可以是一个指令函数

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()  // 页面加载完成之后自动让输入框获取到焦点的小功能
  }
})
```

## 4. 注册局部指令

```js
let app = Vue.createApp({
  directives: {
    // 指令的定义
    focus: {

      inserted: function (el) {
        el.focus() // 页面加载完成之后自动让输入框获取到焦点的小功能
      }
    }
  }
})
// 或者
app.component("home", {

  directives: {
    // 指令的定义
    focus: {
      inserted: function (el) {
        el.focus() // 页面加载完成之后自动让输入框获取到焦点的小功能
      }
    }
}
})
```

## 5. 指令的配置项

* 钩子函数

  * `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置

  * `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)

  * `update`：所在组件的 `VNode` 更新时调用，但是可能发生在其子 `VNode` 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新

  * `componentUpdated`：指令所在组件的 `VNode` 及其子 `VNode` 全部更新后调用

  * `unbind`：只调用一次，指令与元素解绑时调用

* 所有的钩子函数的参数：

  * `el`：指令所绑定的元素，可以用来直接操作 `DOM`
  * `binding`：一个对象，包含以下 `property`：
    * `name`：指令名，不包括 `v-` 前缀。
    * `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 2。
    * `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
    * `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 "1 + 1"。
  * `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 "foo"。
  * `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`
  * `vnode`：`Vue` 编译生成的虚拟节点
* `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用

## 6. 常见的自定义指令

**输入框防抖**:

```js
// 1.设置v-throttle自定义指令
Vue.directive('throttle', {
  bind: (el, binding) => {
    let throttleTime = binding.value; // 防抖时间
    if (!throttleTime) { // 用户若不设置防抖时间，则默认2s
      throttleTime = 2000;
    }
    let cbFun;
    el.addEventListener('click', event => {
      if (!cbFun) { // 第一次执行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, throttleTime);
      } else {
        event && event.stopImmediatePropagation();
      }
    }, true);
  },
});
// 2.为button标签设置v-throttle自定义指令
// <button @click="sayHello" v-throttle>提交</button>
```

:::

::: danger Note

* 【重点】

  * 注册全局指令
  * 注册局部指令

* 【难点】

  * 指令的配置项

* 【易错点】

  * 注册全局指令
  * 注册局部指令

* 【面试题】
  1. 你有写过自定义指令吗？自定义指令的应用场景有哪些？
:::
