# KeepAlive

::: tip 目标
这一小节，我们的目标是掌握KeepAlive内置组件的使用
:::

::: warning 步骤

1. 基本使用
2. 包含 / 排除
3. 最大缓存实例
4. 缓存实例的生命周期
:::

::: info 体验

* **Kn.1：基本使用**

  在之前的组件基础章节中，我们已经介绍了动态组件的用法，即使用特殊的 `<component>` 元素：

  ```html
  <component :is="activeComponent" />
  ```

  默认情况下，一个正活跃的组件实例会在切走后被卸载。这会导致它丢失其中所有的状态变化。

  在切换时创建新的组件实例通常是有用的行为，但在这个例子中，我们是的确想要组件能在非活跃状态时保留它们的状态。
  要解决这个问题，我们可以将动态组件用 `<KeepAlive>` 这个内置组件进行包装：

* **Kn.2：包含 / 排除**

  默认情况下，`<KeepAlive>` 会不作区分地缓存它之中任何组件。
  但我们可以通过 include 和 exclude prop 来定制该行为。
  这两个 prop 的值都是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两个类型的一个数组：

  ```html
  <!-- 以英文逗号分隔的字符串 -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- 正则表达式（需使用 `v-bind`） -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- 数组（需使用 `v-bind`）-->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  匹配的根据是组件的 name 选项，所以要想通过 `KeepAlive` 有条件地缓存的组件必须显式声明一个 name 选项。

* **Kn.3：最大缓存实例**

  我们可以通过传入 max prop 来限制组件缓存的最大数量。
  当指定了 max 时，`<KeepAlive>` 会像一个 LRU 缓存：如果缓存实例的数量即将超过指定的最大数量，最近访问次数最少的缓存实例将被销毁，以便为新的实例腾出空间。

  ```html
  <KeepAlive :max="10">
    <component :is="activeComponent" />
  </KeepAlive>
  ```

* **Kn.4：缓存实例的生命周期**

  当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为不活跃状态而不是被卸载。
  当一个组件实例作为缓存树的一部分插入到 DOM 中时，它就是被重新恢复活跃了。

  一个持续存在的组件可以通过 `onActivated()` 和 `onDeactivated()` 注册相应的两个状态的生命周期钩子：

  ```html
  <script setup>
  import { onActivated, onDeactivated } from 'vue'

  onActivated(() => {
    // 在首次挂载、
    // 以及每次从缓存中重新被插入回 DOM 的时候调用
  })

  onDeactivated(() => {
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
  })
  </script>
  ```

  请注意：

  * onActivated 在组件挂载时也会调用，并且 onDectivated 在组件卸载时也会调用。
  * 这两个钩子不仅适用于 `<KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。

:::

::: danger 总结

* 【重点】
* 【难点】
* 【注意点】
:::
