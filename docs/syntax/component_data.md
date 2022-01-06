# 组件数据

::: tip Object
这一小节，我们的目标是掌握如何在组件中定义数据并显示在模板中
:::

::: warning Path

1. setup入口函数
2. 声明简单类型数据
3. 声明复杂类型数据
:::

::: info Experience

* **Kn.1：setup入口函数**

  setup函数是一个新的组件选项。作为在组件内使用Composition API的入口点，
  在Vue中，setup是最先执行的函数

  ```js
    // 创建 根组件
    app.component('App', {
      template: '#tmpl',
      setup(){
        console.log("我是setup函数")
      }
    })  
  ```

* **Kn.2：声明简单类型数据**

  在Vue中声明简单类型数据，我们使用ref方法，ref 的作用就是将一个原始数据类型（primitive data type）转换成一个带有响应式特性的数据类型，原始数据类型共有7个，分别是： String、Number、BigInt、Boolean、Symbol、Null、Undefined

  * ⓵ 在script标签中 通过 `Vue顶级对象`解构出`ref方法`

    ```html
    <body>
      <!-- 省略代码... -->
      <script>
        // 创建 Vue 应用
        let app = Vue.createApp({});
        let { ref } = Vue;
     // 创建 根组件
        app.component('App', {
          template: '#tmpl'
        })
        // 把 app 挂载到 id 为 app的元素上
        app.mount('#app');
      </script>

    </body>
    ```

  * ⓶ 在 setup入口函数 调用ref方法来声明简单类型数据

    ```html
    <body>
    <!-- 省略代码... -->
      <script>
        // 创建 Vue 应用
        let app = Vue.createApp({});
        let { ref } = Vue;
        // 创建 根组件
        app.component('App', {
          template: '#tmpl',
          setup() {
            let name = ref("张三")
          }
        })

        // 把 app 挂载到 id 为 app的元素上
        app.mount('#app');
      </script>

    </body>
    ```

  * ⓷ 在 setup入口函数中 return 出声明的数据

    ```js
    app.component('App', {
      template: '#tmpl',
      setup() {
        let name = ref("张三")

        return {
          name
        }
      }
    })
    ```

* **Kn.3：声明复杂类型数据**

  在Vue中提供了一个方法：reactive 来赋予对象(Object) 响应式的特性，那么我们可以使用reactive方法来声明复杂数据...

  * ⓵ 在script标签中 通过 `Vue顶级对象`解构出`reactive方法`

    ```html
    <body>
      <!-- 省略代码... -->
      <script>
        // 创建 Vue 应用
        let app = Vue.createApp({});
        let { reactive } = Vue;
     // 创建 根组件
        app.component('App', {
          template: '#tmpl'
        })
        // 把 app 挂载到 id 为 app的元素上
        app.mount('#app');
      </script>

    </body>
    ```

  * ⓶ 在 setup入口函数 调用ref方法来声明简单类型数据

    ```html
    <body>
    <!-- 省略代码... -->
      <script>
        // 创建 Vue 应用
        let app = Vue.createApp({});
        let { reactive } = Vue;
        // 创建 根组件
        app.component('App', {
          template: '#tmpl',
          setup() {
            let person = reactive({
              name: "李四",
              age: 28,
              hobby: ['篮球','足球','乒乓球']
            })
          }
        })

        // 把 app 挂载到 id 为 app的元素上
        app.mount('#app');
      </script>

    </body>
    ```

  * ⓷ 在 setup入口函数中 return 出声明的数据

    ```js
    app.component('App', {
      template: '#tmpl',
      setup() {
            let person = reactive({
              name: "李四",
              age: 28,
              hobby: ['篮球','足球','乒乓球']
            })

        return {
          person
        }
      }
    })
    ```

:::

::: danger Note

* 【重点】

  * ⓵ 声明简单类型数据
  * ⓶ 声明复杂类型数据

* 【注意点】
  * ⓵ 在vue中使用ref的值，不用通过.value获取
  * ⓶ 在js中使用ref的值，必须通过.value获取
  * ⓷ ref本质也是reactive，ref(obj)等价于reactive({value: obj})

:::
