# 条件判断

::: info Object
这一小节，我们的目标是掌握条件判断指令的用法
:::

::: tip Path

1. `v-if/v-else-if/v-else`指令
2. `v-show`指令
3. `v-show`指令和`v-if`指令的区别

:::

::: warning Experience

## Kn.1：`v-if/v-else-if/v-else`指令

  `v-if/v-else-if/v-else`指令用来辅助开发者按需控制 虚拟DOM 是否被编译为真实DOM。这三个指令中 `v-if` 相当于 `DOM` 中的 单分支条件语句 可以单独使用，`v-else` 相当于`DOM`中的 双分支条件语句 要配合`v-if`使用，`v-else-if`相当于`DOM`中的 多分支条件语句 要配合`v-if`使用

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

## Kn. 2：`v-show`指令

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

## Kn. 3：`v-show`指令和`v-if`指令的区别

* `v-if` 和 `v-show` 都能实现元素的显示隐藏
* `v-show` 只是简单的控制元素的 `display` 属性，而 `v-if` 才是条件渲染（条件为真，元素将会被渲染，条件 为假，元素会被销毁）；
* `v-show` 有更高的首次渲染开销，而 `v-if` 的首次渲染开销要小的多；
* `v-if` 有更高的切换开销，`v-show` 切换开销小
* `v-if` 有配套的 `v-else-if` 和 `v-else`，而 `v-show` 没有
* `v-if` 可以搭配 `template` 使用，而 `v-show` 不行
:::

::: danger Note

* 【重点】
* 【难点】
* 【注意点】
:::
