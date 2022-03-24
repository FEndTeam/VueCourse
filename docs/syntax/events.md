# 组件事件

::: tip 目标
这一小节，我们的目标是掌握 组件的事件的基本使用
:::

::: warning 步骤

1. 触发与监听事件
2. 事件参数
3. 声明触发的事件
4. 事件校验
5. 配合v-model使用
:::

::: info 体验

* **Kn.1：触发与监听事件**

  在组件的模板表达式中，可以直接使用 `$emit` 函数触发自定义事件 (例如：在 v-on 的处理函数中)：

  ```html
  <!-- MyComponent -->
  <button @click="$emit('someEvent')">click me</button>
  ```

  父组件可以通过 `v-on` (缩写为 `@`) 来监听事件：

  ```html
  <MyComponent @some-event="callback" />
  ```

  同样，组件的事件监听器也支持.once 修饰符：

  ```html
  <MyComponent @some-event.once="callback" />
  ```

  像组件与 prop 一样，事件的名字也提供了自动的转换。请注意，我们触发了一个以 camelCase 形式命名的事件，但在父组件中可以使用 kebab-case 形式来监听。与 prop 大小写格式一样，在模板中我们也推荐使用 kebab-case 形式来编写监听器。

* **Kn.2：事件参数**

  有时候我们会需要在触发事件时附带一个特定的值。举个例子，我们想要 `<BlogPost>` 组件来管理文本会缩放得多大。
  在这个场景下，我们可以给`$emit` 提供一个值作为额外的参数：

  ```html
  <button @click="$emit('increaseBy', 1)">
   Increase by 1
  </button>
  ```

  然后我们在父组件中监听事件，我们可以先简单写一个内联的箭头函数作为监听器，此时可以访问到事件附带的参数：

  ```html
  <MyButton @increase-by="(n) => count += n" />
  ```

  或者用一个方法来作为事件处理函数：

  ```html
  <MyButton @increase-by="increaseCount" />
  ```

  然后，可以从方法的第一个参数上取到这个值：

  ```js

  function increaseCount(n) {
    count.value += n
  }
  ```

* **Kn.3：声明触发的事件**

  组件要触发的事件可以显式地通过 `defineEmits()` 宏来声明。

  ```html
  <script setup>
    const emit = defineEmits(['inFocus', 'submit'])
  </script>
  ```

  返回的 `emit` 函数可以用来在 `JavaScript` 代码中触发事件。

  这个 `emits` 选项还支持对象语法，它允许我们对触发事件的参数进行验证：

  ```html
  <script setup>
  const emit = defineEmits({
    submit(payload) {
      // 通过返回值为 `true` 还是为 `false` 来判断
      // 验证是否通过
    }
  })
  </script>
  ```

* **Kn.4：事件校验**

  和对 `prop` 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。

  要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 `emit` 的内容，返回一个布尔值来表明事件是否合法。

  ```html
  <script setup>
  const emit = defineEmits({
    // 没有校验
    click: null,
  
    // 校验 submit 事件
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  })
  
  function submitForm(email, password) {
    emit('submit', { email, password })
  }
  </script>
  ```

* **Kn.5：配合v-model使用**

  自定义事件可以用来创建对应 `v-model` 的自定义输入：

  ```html
  <input v-model="searchText" />
  ```

  和下面这段代码是等价的：

  ```html
  <input
    :value="searchText"
    @input="searchText = $event.target.value"
  />
  ```

  当使用在一个组件上时，v-model 是这样做的：

  ```html
  <CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
  />
  ```

  为了使组件能像这样工作，内部的 `<input>` 组件必须：

  * 绑定 `value` attribute 到 `modelValue` prop
  * 输入新的值时在 `input` 元素上触发 `update:modelValue` 事件

  这里是相应的代码：

  ```html
  <!-- CustomInput.vue -->
  <script setup>
  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])
  </script>

  <template>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </template>
  ```

  现在 `v-model` 也可以在这个组件上正常工作了：

  ```html
  <CustomInput v-model="searchText" />
  ```

  另一种在组件内实现 `v-model` 的方式是使用一个可写的 `computed property` ，给出 `getter` 和 `setter`。
  `get` 方法需返回 `modelValue property` 而 `set` 方法需触发相应的事件：

  ```html
  <!-- CustomInput.vue -->
  <script setup>
  import { computed } from 'vue'

  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })
  </script>

  <template>
    <input v-model="value" />
  </template>
  ```

  * ⓵ v-model 的参数

    默认情况下，v-model 在组件上都是使用 modelValue 作为 prop，以 update:modelValue 作为对应的事件。我们可以通过给 v-model 指定一个参数来更改这些名字：

    ```html
    <MyComponent v-model:title="bookTitle" />
    ```

    在这个例子中，子组件应该有一个 title prop，并在变更时向父组件发射 update:title 事件：

    ```html
    <!-- MyComponent.vue -->
    <script setup>
    defineProps(['title'])
    defineEmits(['update:title'])
    </script>

    <template>
      <input
        type="text"
        :value="title"
        @input="$emit('update:title', $event.target.value)"
      />
    </template>
    ```

  * ⓶ 多个 v-model 绑定

    通过我们刚才在 [v-model 参数]小节中学到的，利用一个特定的 prop 和一个特定事件，可以在一个组件上创建多个 v-model 双向绑定：
    每一个 v-model 都会同步不同的 prop，而不需要在组件上写更多额外的选项：

    ```html
    <UserName
      v-model:first-name="firstName"
      v-model:last-name="lastName"
    />
    ```

    ```html
    <script setup>
    defineProps({
      firstName: String,
      lastName: String
    })

    defineEmits(['update:firstName', 'update:lastName'])
    </script>

    <template>
      <input
        type="text"
        :value="firstName"
        @input="$emit('update:firstName', $event.target.value)"
      />
      <input
        type="text"
        :value="lastName"
        @input="$emit('update:lastName', $event.target.value)"
      />
    </template>
    ```

  * ⓷ 处理 v-model 修饰符

    当我们在学习输入绑定时，我们知道了 v-model 有一些内置的修饰符，例如 .trim，.number 和 .lazy。
    然而在某些场景下，你可能想要添加自定义的修饰符。

    我们一起来创建一个自定义的修饰符 capitalize，它会自动将 v-model 绑定输入的字符串值第一个字母转为大写：

    ```html
    <MyComponent v-model.capitalize="myText" />
    ```

    要给组件的 v-model 添加修饰符，都可以通过 modelModifiers prop 在组件内访问到。在下面的例子中，我们会创建一个包含 modelModifiers prop 的组件，它的默认值是一个空对象：

    ```html
    <script setup>
      const props = defineProps({
        modelValue: String,
        modelModifiers: { default: () => ({}) }
      })

      defineEmits(['update:modelValue'])

      console.log(props.modelModifiers) // { capitalize: true }
    </script>

    <template>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </template>
    ```

    注意这里组件的 `modelModifiers prop` 包含了 `capitalize` 且其值为 `true`，因为它在模板中的 `v-model` 绑定上被使用了。

    此时和 `prop` 相关的已经准备完毕，我们可以开始检索 modelModifiers 对象的 key 并写一个处理函数来改变抛出事件附带的值。
    在下面的代码里我们就是在每次 `<input/>` 元素抛出 input 事件时执行大写首字母：

    ```html
    <script setup>
      const props = defineProps({
        modelValue: String,
        modelModifiers: { default: () => ({}) }
      })

      const emit = defineEmits(['update:modelValue'])

      function emitValue(e) {
        let value = e.target.value
        if (props.modelModifiers.capitalize) {
          value = value.charAt(0).toUpperCase() + value.slice(1)
        }
        emit('update:modelValue', value)
      }
    </script>

    <template>
      <input type="text" :value="modelValue" @input="emitValue" />
    </template>
    ```

    对于又有参数又有修饰符的 `v-model` 绑定，生成的 `prop` 名将是 arg + "Modifiers"。举个例子：

    ```html
    <MyComponent v-model:title.capitalize="myText">
    ```

    则相应的声明应该是：

    ```html
    const props = defineProps(['title', 'titleModifiers'])
    defineEmits(['update:title'])
    
    console.log(props.titleModifiers) // { capitalize: true }
    ```

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
  * 和原生 DOM 事件不太一样，组件触发的事件不会冒泡。你只能监听直接子组件触发的事件。
  * 所有传入 $emit() 的额外参数都会被直接传向监听器。
:::
