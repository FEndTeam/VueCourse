# 插槽

::: tip 目标

:::

::: warning 步骤

1. 插槽内容与插口
2. 渲染作用域
3. 默认内容
4. 具名插槽
5. 动态插槽名
6. 作用域插槽
7. 具名作用域插槽
:::

::: info 体验

* **Kn.1：插槽内容与插口**

  我们已经学习过组件能够接收任意类型的 JavaScript 值作为 props，但组件要如何接收模板内容呢？在某些场景中，我们可能想要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段。

  举个例子，这里有一个 `<FancyButotn>` 组件，可以像这样使用：

  ```html
  <FancyButton>
    Click me! <!-- 插槽内容 -->
  </FancyButton>
  ```

  而 `<FancyButton>` 的模板是这样的：

  ```html
  <button class="fancy-btn">
    <slot></slot> <!-- 插槽插口 -->
  </button>
  ```

  `<slot>`元素是一个插槽的插口，指出了父元素提供的插槽内容在哪里被渲染。

  ![插槽](./images/slots.dbdaf1e8.png)

  最终渲染出的 DOM 是这样：

  ```html
  <button class="fancy-btn">
    Click me!
  </button>
  ```

  `<FancyButton>` 通过插槽承担了渲染 `<button>` 这个外壳（以及相应的样式）的职责，而内部的内容由父元素提供。

  通过和下面的 JavaScript 函数作对比，来以另一种方式理解插槽：

  ```js
  // 父元素传入插槽内容
  FancyButton('Click me!')

  // FancyButton 在自己的模板中渲染插槽内容
  function FancyButton(slotContent) {
    return (
      `<button class="fancy-btn">
        ${slotContent}
      </button>`
    )
  }
  ```

  除了文本以外，插槽内容还可以是任意合法的模板内容。
  例如我们可以传入多个元素，甚至是组件：

  ```html
  <FancyButton>
    <span style="color:red">Click me!</span>
    <AwesomeIcon name="plus" />
  </FancyButton>
  ```

  使用插槽后，`<FancyButton>` 组件的扩展性、可复用性都增强了。现在可以在不同位置给其传入不同插槽内容使其各自渲染不同内容，同时还保证都具有相同的外部样式。

* **Kn.2：渲染作用域**

  插槽内容可以访问到父组件的数据，因为插槽内容本身也是父组件模板的一部分。举个例子：

  ```html
  <span>{{ message }}</span>
  <FancyButton>{{ message }}</FancyButton>
  ```

  这里的两个 {{ message }} 插值表达式渲染的内容都是一样的。

* **Kn.3：默认内容**

  我们也经常会遇到外部没有提供任何内容的情况，此时为插槽提供一个默认的内容来渲染就很有必要。比如在 `<SubmitButton>` 组件中：

  ```html
  <button type="submit">
    <slot></slot>
  </button>
  ```

  如果外部没有提供任何插槽内容，我们可能想在 `<button>` 中渲染“Submit”这个单词。
  要让其成为默认内容，需要将其写在 `<slot>` 标签之间：

  ```html
  <button type="submit">
    <slot>
      Submit <!-- 默认内容 -->
    </slot>
  </button>
  ```

  当我们在父组件中使用 `<SubmitButton>` 但不提供任何插槽内容：

  ```html
  <SubmitButton />
  ```

  那么将渲染出下面这样的 DOM 结构，包含默认的“Submit”单词：

  ```html
  <button type="submit">Submit</button>
  ```

  但如果我们提供了别的内容给插槽：

  ```html
  <SubmitButton>Save</SubmitButton>
  ```

  那么渲染的 DOM 会是提供的插槽内容：

  ```html
  <button type="submit">Save</button>
  ```

* **Kn.4：具名插槽**

  有时一个组件中可能会有多个插槽的插口。举个例子，在一个 `<BaseLayout>` 组件中，有如下这样的模板：

  ```html
  <div class="container">
    <header>
      <!-- 标题内容放这里 -->
    </header>
    <main>
      <!-- 主要内容放这里 -->
    </main>
    <footer>
      <!-- 底部内容放这里 -->
    </footer>
  </div>
  ```

  对于这种场景，`<slot>` 元素可以有一个特殊的 `attribute name`，可以是一个独一无二的标识符，用来区分各个插槽，确定每一处最终会渲染的内容：

  ```html
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
  ```

  没有提供 name 的 `<slot>` 插口会隐式地命名为“default”。

  在父组件中使用到 `<BaseLayout>` 时，我们需要给各个插槽传入内容，为了模板片段让各入各门、各寻其所。此时就需要用到具名插槽了：

  要为具名插槽传入内容，我们需要使用一个含 `v-slot` 指令的 `<template>` 元素，并将目标插槽的名字传给该指令：

  ```html
  <BaseLayout>
    <template v-slot:header>
      <!-- header 插槽的内容放这里 -->
    </template>
  </BaseLayout>
  ```

  `v-slot` 有对应的简写 #，因此 `<template v-slot:header>` 可以简写为 `<template #header>`。
  其意思就是“将这部分模板片段传入子组件的 `header` 插槽中”。

  ![named-slots](./images/named-slots.4142caa6.png)

  下面我们给出完整的、向 `<BaseLayout>` 传递插槽内容的代码，指令均使用的是缩写形式：

  ```html
  <BaseLayout>
    <template #header>
      <h1>Here might be a page title</h1>
    </template>

    <template #default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </BaseLayout>
  ```

  当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容。
  所以上面也可以写成：

  ```html
  <BaseLayout>
    <template #header>
      <h1>Here might be a page title</h1>
    </template>

    <!-- 隐式的默认插槽 -->
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </BaseLayout>
  ```

  现在 `<template>` 元素中的所有内容都将被传递到相应的插槽。最终渲染出的 HTML 如下：

  ```html
  <div class="container">
    <header>
      <h1>Here might be a page title</h1>
    </header>
    <main>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </main>
    <footer>
      <p>Here's some contact info</p>
    </footer>
  </div>
  ```

* **Kn.5：动态插槽名**

  动态指令参数在 v-slot 上也是有效的，即可以定义下面这样的动态插槽名：

  ```html
  <base-layout>
    <template v-slot:[dynamicSlotName]>
      ...
    </template>

    <!-- 缩写为 -->
    <template #[dynamicSlotName]>
      ...
    </template>
  </base-layout>
  ```

  注意这里的表达式和动态指令参数受相同的语法限制。

* **Kn.6：作用域插槽**

  在上面的渲染作用域中我们讨论到，插槽的内容无法访问到子组件的状态。

  然而在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。
  
  要做到这一点，我们需要一种方法来让子组件在渲染时将一部分数据提供给插槽。

  我们也确实有办法这么做！可以像对组件传递 `prop` 那样，向一个插槽的插口上传递 `attribute`：

  ```html
  <!-- <MyComponent> 的模板 -->
  <div>
    <slot :text="greetingMessage" :count="1"></slot>
  </div>
  ```

  当需要接收插槽 prop 时，默认插槽和具名插槽的使用方式有一些小区别。
  下面我们将先展示默认插槽如何接受 prop，通过子组件标签上的 v-slot 指令，直接接收到了一个插槽 prop 对象：

  ```html
  <MyComponent v-slot="slotProps">
    {{ slotProps.text }} {{ slotProps.count }}
  </MyComponent>
  ```

  ![scoped-slots](./images/scoped-slots.1c6d5876.svg)

  子组件传入插槽的 props 作为了 v-slot 指令的值，可以在插槽内的表达式中访问。

  你可以将作用域插槽类比为一个传入子组件的函数。子组件会将相应的 prop 作为参数去调用它：

  ```js
  MyComponent({
    // 类比默认插槽，将其想成一个函数
    default: (slotProps) => {
      return `${slotProps.text} ${slotProps.count}`
    }
  })

  function MyComponent(slots) {
    const greetingMessage = 'hello'
    return (
      `<div>${
        // 在插槽函数调用时传入 props
        slots.default({ text: greetingMessage, count: 1 })
      }</div>`
    )
  }
  ```

  实际上，这已经和作用域插槽的最终代码编译结果、以及手动编写渲染函数时使用作用域插槽的方式非常类似了。

  v-slot="slotProps" 可以类比这里的函数签名，和函数的参数类似，我们也可以在 v-slot 中使用解构：

  ```html
  <MyComponent v-slot="{ text, count }">
    {{ text }} {{ count }}
  </MyComponent>
  ```

* **Kn.7：具名作用域插槽**

  具名作用域插槽的工作方式也是类似的，插槽 props 可以作为 v-slot 指令的值被访问到：v-slot:name="slotProps"。当使用缩写时是这样：

  ```html
  <MyComponent>
    <template #header="headerProps">
      {{ headerProps }}
    </template>

    <template #default="defaultProps">
      {{ defaultProps }}
    </template>

    <template #footer="footerProps">
      {{ footerProps }}
    </template>
  </MyComponent>
  ```

  向具名插槽中传入 props：

  ```html
  <slot name="header" message="hello"></slot>
  ```

  注意插槽上的 name 是由 Vue 保留的，不会作为 props 传递给插槽。因此最终 headerProps 的结果是 `{ message: 'hello' }`。

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
  * 任何父组件模板中的东西都只被编译到父组件的作用域中；而任何子组件模板中的东西都只被编译到子组件的作用域中。
:::
