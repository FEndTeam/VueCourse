# 计算属性

::: tip Object
这一节，我们的目标是 学习计算属性的使用。为什么要学习它呢，下面我们来看一个案例,在开发中，我们总是会和时间打交道，但是我们获取到的时间数据，有可能不是我们想要的格式，
这时候，有的人就会写一个专门用来格式化时间的方法，对数据进行格式化。难道你想把这个格式化时间的方法放到模板中吗？
:::

::: warning Path

1. 计算属性的概念
2. 计算属性中的缓存
3. 计算属性中的 `getter` 和 `setter`
4. computed的特点
:::

::: info Experience

## 1. 计算属性的概念

计算属性，顾名思义，用来计算出一个值的**属性**。
调用这个值时，不需要加括号，可以直接当属性用。

* computed是计算属性，事实上和和data对象里的数据属性**在使用上是同一类的**
* 你在取用的时候，用this.fullName去取用，就和取data一样（不要当成函数调用！！）

```html
<body>
  <!-- 希望 Vue 能够控制下面的这个 div，帮我们在把数据填充到 div 内部 -->
  <div id="app">{{ fullName }}</div>
  
  <script>
    // 2. 创建 Vue 的实例对象
    const vm = Vue.createApp({
      // data 对象就是要渲染到页面上的数据
      data() {
       return {
        firstName: 'Yeung',
        lastName: 'WanLum'
       }
      },
      computed: {
        fullName() {
          return  this.firstName + this.lastName 
        }
      }
    });
    // 通过vm(view model)把 username渲染到id为app的元素中
    vm.mount('#app');
  </script>
</body>
```

以上 computed中声明的fullName就是一个回调函数， 它在初始化数据和其他 data 属性数据发生变化时自动调用，将返回值作为属性值。
这时，如果你改变姓和名的数据，最后全名数据也会随之改变。

## 2. 计算属性中的缓存

计算属性中的缓存是指，在页面中多次获取计算属性的属性值，如果相关的 data 属性数据没有发生改变，则会调取缓存中的数据，从而提高性能。
这也是计算属性和 methods 属性的不同也是优势之处

```html
<body>
  <!-- 希望 Vue 能够控制下面的这个 div，帮我们在把数据填充到 div 内部 -->
  <div id="app">
    <p>{{ fullName }}</p>
    <p>{{ fullName }}</p>
    <p>{{ fullName }}</p>
  </div>

  <script>
    // 2. 创建 Vue 的实例对象
    const vm = Vue.createApp({
      // data 对象就是要渲染到页面上的数据
      data() {
        return {
          firstName: 'Yeung',
          lastName: 'WanLum'
        }
      },
      computed: {
        fullName() {
          console.log("fullName被调用了");
          return this.firstName + this.lastName
        }
      }
    });
    // 通过vm(view model)把 username渲染到id为app的元素中
    vm.mount('#app');
  </script>
</body>
```

上面的代码，fullName在p标签中多次获取值，fullName对应的方法只会在初始化数据时调用一次，之后只要依赖的firstName和LastName不变，那么每次都会
获取缓存中的fullName的值

## 3. 计算属性中的 `getter` 和 `setter`

在computed计算属性中，我们是如何获取计算后的结果的呢？其实在computed计算属性的方法中，有两个方法，`set`方法和`get`方法，俗称Setter和Getter，
而我们在获取计算后的结果的时候，都调用的是getter方法。下面我们来介绍一下这两个方法

```js
 // 2. 创建 Vue 的实例对象
    const vm = Vue.createApp({
      // ...省略代码
      computed: {
        fullName() {
          return  this.username + lastName 
        }
      },
      // 上面的代码也可以写成如下形式,只不过，如果只是为了获取值，我们简化为上述代码:
      // computed: {
      //   fullName() {
      //     get(){
      //       return  this.username + lastName 
      //     }
      //   }
      // }
    });
    // 通过vm(view model)把 username渲染到id为app的元素中
    vm.mount('#app');
```

现在，我们知道了，通过firstName和LastName可以通过计算属性得到全名，但是如果我想通过 输入全名，得到 firstName和LastName怎么办呢？
这时候就需要computed计算属性的方法中的Setter方法了

```js
// ...省略代码
computed: {
  fullName: {
    get () {
      return  this.firstName + lastName 
    },
    set (value) {
      // 得到fullName的值，并把该值用空格分隔
      const names = value.split(' ');
      // 把分隔好的数组结果，通过索引 0 拿到 firstName
      this.firstName = names[0];
      // 把分隔好的数组结果，通过索引 1 拿到 lastName
      this.lastName = names[1];
    }
  }
}
```

所以，set方法的用处是什么呢？ 就是用于监视档期那属性值的变化，当属性值发生了改变时自动调用，同步更新相关的其他属性的值。

## 4. computed的特点

* computed 监控的数据在 data 中没有声明
* computed 不支持异步，当 computed 中有异步操作时，无法监听数据的变化
* computed 具有缓存，页面重新渲染，值不变时，会直接返回之前的计算结果，不会重新计算
* 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，一般使用 computed
* computed 计算属性值是函数时，默认使用get方法。如果属性值是属性值时，属性有一个 get 和 set 方法，当数据发生变化时会调用 set 方法。

:::

::: danger Note

* 【重点】

  * 计算属性的概念
  * 计算属性中的缓存
  * computed的特点

* 【难点】

  * 计算属性中的 `getter` 和 `setter`

* 【易错点】

  * 计算属性中的 `getter` 和 `setter`
:::
