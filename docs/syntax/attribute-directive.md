# 属性绑定指令

::: tip Object
这一节，我们的目标是 使用 属性绑定指令来绑定 `HTML attribute`,为什么要这么做呢？我们来看看下面的代码：

```html
<!-- 假设有如下的 data 数据：
data: {
  return {
    aSlide: [
      {
        id: 1,
        src: 'https://img.gexing.me/uploads/allimg/180709/1-1PF9143224a5.jpg'
      },
      {
        id: 2,
        src: 'https://img.gexing.me/uploads/allimg/180709/1-1PF9143223396.jpg'
      },
      {
        id: 3,
        src: 'https://img.gexing.me/uploads/allimg/180709/1-1PF9143223642.jpg'
      },
      {
        id: 4,
        src: 'https://img.gexing.me/uploads/allimg/170814/1-1FPZ95TH22.jpg'
      }
    ]
  }
}
 -->

<div id="app">
  <a>
    <img src="https://img.gexing.me/uploads/allimg/170814/1-1FPZ95TH22.jpg">
  </a>
</div>

```

 我们想把以上图片渲染到页面上怎么办呢？

:::

::: warning Path

1. 绑定一般属性
2. 绑定class属性
3. 绑定style属性
:::

::: info Experience

## 1. 绑定一般属性

如果需要为元素的`html attribute`动态绑定属性值，则需要用到 v-bind 属性绑定指令，写法为: `v-bind:属性名="属性值"`,简写为`:属性名="属性值"`

```html
<div id="app">
  <a v-for="item in aSlide" :key="item.id">
    <img :src="item.src">
  </a>
</div>
```

## 2. 绑定class属性

* **对象语法：**

```html
<!-- 假设有如下的 data 数据：
data(){
  return {
    isActive: true,
  }
}
 -->
 <!-- 下面的语法表示 当isActive为true时，active这个类名 存在，否则不存在 -->
<div v-bind:class="{ active: isActive }"></div>
```

* **数组语法：**

```html
<!-- 假设有如下的 data 数据：
data(){
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
 -->
 <!-- 下面的语法 -->
<div v-bind:class="[activeClass, errorClass]"></div>
<!-- 数组中的对象语法 -->
<div :class="[{ active: isActive }, errorClass]"></div>
<!-- 渲染为:  -->
<div class="active text-danger"></div>
```

## 3. 绑定style属性

* **对象语法：**

```html
<!-- 假设有如下的 data 数据：
data(){
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
-->
<div v-bind:style="styleObject"></div>
```

* **数组语法：**

```html
<!-- 假设有如下的 data 数据：
data(){
  return {
      baseStyles: {
      color: 'red',
      fontSize: '13px'
    },
    overridingStyles:{
      margin: '40px',
      height: '500px'
    }
  }
}
-->
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

:::

::: danger Note

* 【重点】

  1. 绑定一般属性
  2. 绑定class属性

* 【难点】
  1. 绑定class属性
  
* 【易错点】
  * `CSS property` 名用驼峰式 (`camelCase`) 或短横线分隔 (`kebab-case`，记得用引号括起来) 来命名

:::
