# Props

::: tip 目标
这一小节，我们的目标是掌握Props的使用。
:::

::: warning 步骤

1. props声明
2. 传递props的细节
3. 单向数据流
4. prop校验
5. Boolean类型转换
:::

::: info 体验

* **Kn.1：props声明**

  组件需要显式声明 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute.
  在单文件组件中使用 `<script setup>` 时，`props` 可以使用 `defineProps()` 宏来定义：

  ```js
  <script setup>
  const props = defineProps(['foo'])

  console.log(props.foo)
  </script>
  ```

  在没有使用 `<script setup>` 的组件中，`props` 需使用 `props` 选项来定义：

  ```js
  export default {
    props: ['foo'],
    setup(props) {
      // setup() 将 props 作为第一个参数
      console.log(props.foo)
    }
  }
  ```

  请注意，传给 `defineProps()` 的参数和提供给 `props` 选项的值是相同的，两种声明方式背后其实使用的都是 props 选项。

  除了使用字符串数组来声明 props 外，还可以使用对象的形式：

  ```js
  // 使用 <script setup>
  defineProps({
    title: String,
    likes: Number
  })
  ```

  对于以对象形式声明中的每个属性，`key` 是 `prop` 的名称，而值应该是预期类型的构造函数。

  这不仅使你的组件自文档化，还同样在其他开发者使用到你的组件但传入了错误类型的 prop 时抛出警告。

* **Kn.2：传递props的细节**

  * ⓵ Prop 名字格式

    如果 `prop` 的名字很长，应使用 `camelCase` 形式，因为它们是合法的 JavaScript 标识符，可以直接在模板的表达式中引用，避免在作为属性 key 名时必须带引号。

    ```js
    defineProps({
      greetingMessage: String
    })
    ```

    ```html
    <span>{{ greetingMessage }}</span>
    ```

    从技术上来讲，你也可以在向子组件传递 props 时使用 camelCase 形式。而实际上为了和 HTML attribute 对齐，都会将其转为 kebab-case 形式：

    ```html
    <MyComponent greeting-message="hello" />
    ```

    一般情况下都会使用 PascalCase 作为组件标签名，因为这提高了模板的可读性，能很好地区分出 Vue 组件和原生 HTML 元素。
    然而这对于传递 props 来说收效却并不高，因此我们选择对其进行转换。

  * ⓶ 静态 vs. 动态 Props

    至此，你已经见过了很多像这样的静态值形式的 props：

    ```html
    <BlogPost title="My journey with Vue" />
    ```

    相应地还有使用 `v-bind` 或缩写 `:` 所动态绑定的 `props` 值：

    ```html
    <!-- 根据一个变量的值动态传入 -->
    <BlogPost :title="post.title" />

    <!-- 根据一个更复杂表达式的值动态传入 -->
    <BlogPost :title="post.title + ' by ' + post.author.name" />
    ```

  * ⓷ 传递不同的值类型

    在上述的两个例子中，我们只传入了字符串值，但实际上任何 类型的值都可以作为一个 prop。

    * Number

    ```html
    <!-- 虽然 `42` 是静态的值，我们还是需要使用 v-bind -->
    <!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
    <BlogPost :likes="42" />

    <!-- 根据一个变量的值动态传入 -->
    <BlogPost :likes="post.likes" />
    ```

    * Boolean

    ```html
    <!-- 仅写上 prop 但不传值，会隐式表达为 `true` -->
    <BlogPost is-published />
    
    <!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
    <!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
    <BlogPost :is-published="false" />
    
    <!-- 根据一个变量的值动态传入 -->
    <BlogPost :is-published="post.isPublished" />
    ```

    * Array

    ```html
    <!-- 虽然这个数组是静态不变的值，我们还是需要使用 v-bind -->
    <!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
    <BlogPost :comment-ids="[234, 266, 273]" />

    <!-- 根据一个变量的值动态传入 -->
    <BlogPost :comment-ids="post.commentIds" />
    ```

    * Object

    ```html
    <!-- 虽然这个对象字面量是静态不变的值，我们还是需要使用 v-bind -->
    <!-- 因为这是一个 JavaScript 表达式而不是一个字符串 -->
    <BlogPost
      :author="{
        name: 'Veronica',
        company: 'Veridian Dynamics'
      }"
     />

    <!-- 根据一个变量的值动态传入 -->
    <BlogPost :author="post.author" />
    ```

  * ⓸ 使用一个对象绑定多个 prop

    如果你想要将一个对象的所有属性都当作 `prop` 传入，你可以使用没有参数的 `v-bind`，即只是 `v-bind` 而非 `:prop-name`。例如，这里有一个 post 对象：

    ```html
    const post = {
      id: 1,
      title: 'My Journey with Vue'
    }
    ```

    以及下面的模板

    ```html
    <BlogPost v-bind="post" />
    ```

    而这实际上等价于：

    ```html
    <BlogPost :id="post.id" :title="post.title" />
    ```

* **Kn.3：单向数据流**

  所有的 prop 都遵循着**单向绑定原则**，prop 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递。
  这避免了子组件意外修改了父组件的状态，不然应用的数据流就会变得难以理解了。

  另外，每次父组件更新后，所有的子组件中的 props 都会被更新到最新值，这意味着你不应该在子组件中去更改一个 prop。
  若你这么做了，Vue 会在控制台上向你抛出警告：

  ```html
  const props = defineProps(['foo'])

  // ❌ 警告！prop 是只读的！
  props.foo = 'bar'
  ```

  想要更改 prop 通常都符合以下两种场景：

  * ⓵ prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。 在这种情况下，最好是新定义一个局部数据属性，从 props 上取初始值即可：

    ```js
    const props = defineProps(['initialCounter'])

    // 计数器只是将 props.initialCounter 作为初始值
    // 像下面这样做就使 prop 和后续更新无关了
    const counter = ref(props.initialCounter)
    ```

  * ⓶ prop 以原始的形式传入，但还需作转换。 在这种情况中，最好是基于该 prop 值定义一个计算属性：

    ```js
    const props = defineProps(['size'])

    // 该 prop 变更时计算属性也会自动更新
    const normalizedSize = computed(() => props.size.trim().toLowerCase())
    ```
  
  当对象或数组作为 prop 被传入时，虽然子组件无法更改 prop 绑定，但仍然可以更改对象或数组内部的值。这是因为 JavaScript 的对象和数组是按引用传递，而对 Vue 来说，阻止这样的改变不但非常昂贵，也不合理。

  这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响了父组件的状态，可能会使数据流在将来变得更难以推理。按照最佳实践来讲，你应该避免这样的更改，除非父子组件在设计上耦合得非常紧密。在大多数的用例场景中，子组件都应该抛出一个事件来通知父组件做出改变。

* **Kn.4：prop校验**

  这种更改的主要缺陷是它允许了子组件以某种不明显的方式影响了父组件的状态，可能会使数据流在将来变得更难以推理。
  按照最佳实践来讲，你应该避免这样的更改，除非父子组件在设计上耦合得非常紧密。
  在大多数的用例场景中，子组件都应该抛出一个事件来通知父组件做出改变。

  要描述对 prop 的校验，你可以向 defineProps() 宏提供一个带有 prop 校验的对象，而不是一个字符串数组，例如：

  ```js
  defineProps({
    // 基础类型检查
    // （给出 `null` 和 `undefined` 值则会跳过任何类型检查）
    propA: Number,
    // 多种可能的类型
    propB: [String, Number],
    // 必传，且为 String 类型
    propC: {
      type: String,
      required: true
    },
    // Number 类型的默认值
    propD: {
      type: Number,
      default: 100
    },
    // 对象类型的默认值
    propE: {
      type: Object,
      // 一个返回默认对象/数组值
      // 的工厂函数
      default() {
        return { message: 'hello' }
      }
    },
    // 自定义类型校验函数
    propF: {
      validator(value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // 函数类型的默认值
    propG: {
      type: Function,
      // 不像对象或数组的默认，这不是一个工厂函数。这会是一个用来作为默认值的函数
      default() {
        return 'Default function'
      }
    }
  })
  ```

  一些补充细节：
  * 所有 props 默认都是可选的，除非声明了 required: true。
  * 未传递的 prop 会有一个缺省值 undefined。
  * 如果声明了 default 值，那么在 prop 的值被解析为 undefined 时，无论 prop 是未被传递还是显式指明的 undefined，都会改为 default 值。
  * 当 prop 的校验失败后，Vue 会抛出一个控制台警告 (在开发模式下)。

  type 可以是下列这些原生构造器：`String`,`Number`,`Boolean`,`Array`,`Object`,`Date`,`Function`,`Symbol`。

* **Kn.5：Boolean类型转换**

  为了更贴近原生 boolean attributes 的行为，声明为 Boolean 类型的 props 有特别的类型转换规则。以带有如下声明的 `<MyComponent>` 组件为例：

  ```js
  defineProps({
    disabled: Boolean
  })
  ```

  该组件可以被这样使用：

  ```js
  <!-- 等同于传入 :disabled="true" -->
  <MyComponent disabled />

  <!-- 等同于传入 :disabled="false" -->
  <MyComponent />
  ```

  当需要一个 prop 在声明时允许多种类型时，应该像这样：

  ```js
  defineProps({
    disabled: [Boolean, Number]
  })
  ```

  无论声明类型的顺序如何，Boolean 类型的特殊转换规则都会被应用。

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
