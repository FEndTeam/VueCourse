# 基本使用

::: tip Object
这一小节，咱们的目标是能使用`Vue`独立定义数据，并且把数据渲染在模板上
:::

::: warning Path

1. 在`head`标签内引入 `Vue` 库文件
2. 在`body`标签中,创建挂载元素和模板
3. 在`script`标签中，创建`Vue`实例
4. 在配置对象中的`data`属性里，声明数据
5. 把`Vue`实例挂载到挂载元素上
:::

::: info Experience

* **Step. 1：** 在`head`标签内引入 `Vue` 库文件

```html
<script src="https://unpkg.com/vue@next"></script>
```

* **Step. 2：** 在`body`标签中,创建挂载元素和模板

```html
  <div id="app">{{ msg }}</div>
```

* **Step. 3：** 在`script`标签中，创建`Vue`实例

```js
  // 创建Vue实例
  const vm = Vue.createApp({});
```

* **Step. 4：** 在配置对象中的`data`属性里，声明数据

```js
  const vm = Vue.createApp({
     data(){
      return {
        // 声明数据 msg
        msg: "WanLum will study at sunday"
      }
    }
  });
```

* **Step. 5：** 把`Vue`实例挂载到挂载元素上

```js
vm.mount('#app');
```

:::

::: danger Note

* 【重点】

**Step. 3：** 在`script`标签中，创建`Vue`实例

**Step. 4：** 在配置对象中的`data`属性里，声明数据

* 【难点】
* 【易错点】
* 【面试题】

为什么在声明数据的时候，data是函数并且要返回一个对象？

`vm.mount('#app')`中的mount做了什么工作？挂载元素必须是通过`id`吗？

:::