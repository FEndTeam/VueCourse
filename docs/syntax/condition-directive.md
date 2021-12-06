# 条件渲染指令

::: tip Object
在 DOM 中，总是有一些 数据 是在某些条件为 真 或 假的时候，才会显示的，而有的时候，鼠标移入显示，移出隐藏，类似于这样的需求，在Vue中如何做呢？就需要条件渲染指令啦，接下来我们学习一下它的语法...
:::

::: warning Path

1. `v-if/v-else-if/v-else`指令
2. `v-show`指令
:::

::: info Experience

## 1. `v-if/v-else-if/v-else`指令

`v-if/v-else-if/v-else`指令用来辅助开发者按需控制 虚拟DOM 是否被编译为真实DOM。
这三个指令中 `v-if` 相当于 `DOM` 中的 单分支条件语句 可以单独使用
`v-else` 相当于`DOM`中的 双分支条件语句 要配合`v-if`使用
`v-else-if`相当于`DOM`中的 多分支条件语句 要配合`v-if`使用

```html
  <!-- 
   假设 data中 定义了以下数据
   data(){
     return {
       type: 'A'
     }
   }
   -->
  <div id="app">
    <div v-if="type === 'A'">优秀</div>
    <div v-else-if="type === 'B'">良好</div>
    <div v-else-if="type === 'C'">一般</div>
    <div v-else>差</div>
  </div>
```

## 2. `v-show`指令

`v-show`指令用来辅助开发者按需控制DOM的样式`display:none`或者`display:block`

```html
  <!-- 
   假设 data中 定义了以下数据
   data(){
     return {
       flag: false
     }
   }
   -->
  <div id="app">
    <p v-show="flag">我是被 v-show 控制的元素</p>
    <p v-show="!flag">我也是被 v-show 控制的元素</p>
  </div>
```

:::

::: danger Note

* 【重点】

  * `v-if/v-else-if/v-else`指令 控制元素是否显示的特点

  * `v-show`指令控制元素显示和隐藏的特点

* 【易错点】

  * 在指令中，比如`v-show=""`后面的双引号，仅仅代表这是属性的值，不代表数据类型是字符串

* 【面试题】`v-if` 和 `v-show` 的异同点

  * `v-if` 和 `v-show` 都能实现元素的显示隐藏
  * `v-show` 只是简单的控制元素的 `display` 属性，而 `v-if` 才是条件渲染（条件为真，元素将会被渲染，条件 为假，元素会被销毁）；
  * `v-show` 有更高的首次渲染开销，而 `v-if` 的首次渲染开销要小的多；
  * `v-if` 有更高的切换开销，`v-show` 切换开销小
  * `v-if` 有配套的 `v-else-if` 和 `v-else`，而 `v-show` 没有
  * `v-if` 可以搭配 `template` 使用，而 `v-show` 不行
:::
