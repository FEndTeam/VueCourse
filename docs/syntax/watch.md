# watch 侦听器

::: tip Object
如果你理解computed计算属性，那么你应该知道，如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，那么一般使用computed,
但是，如果我要监测 data中定义的数据的变化 或 props 中数据的变化 怎么办呢？这时候就需要侦听器(watch)了。
:::

::: warning Path

1. 侦听器方法
2. 侦听器对象
3. 侦听器的特点
:::

::: info Experience

## 1. 侦听器方法

```js
 const app = Vue.createApp({
// 省略代码...
      watch: {
        // 该属性名一定要在data中声明
        // newVal 变化后的新值
        // oldVal 变化前的旧值
        "被侦听的属性名"(newVal, oldVal){
          console.log(newVal, oldVal)
        }
      }
// 省略代码...
   });
```

## 2. 侦听器对象

```js
 const vm = Vue.createApp({
// 省略代码...
      watch: {
        // 该属性名一定要在data中声明
        // newVal 变化后的新值
        // oldVal 变化前的旧值
        "被侦听的属性名": {
          handler(newVal,oldVal){

          },
          // 控制侦听器是否自动触发一次
          immediate: true,
          // 如果 watch 侦听一个对象, 若对象中的属性/// 值发生了变化,则无法被监听到
          // .此时需要使用deep 选项
          deep: true
        }
      }
// 省略代码...
   });
```

## 3. 侦听器的特点

* 侦听器的应用场景是计算的内容依赖一个属性的情况
* 侦听器不需要return
* watch中的参数可以得到侦听属性改变的最新结果
* watch可以监听异步的变动
* watch不会缓存数据

:::

::: danger Note

* 【重点】

  * 侦听器方法
  * 侦听器对象
  * 侦听器的特点

* 【易错点】
  * 侦听器方法
  * 侦听器对象

* 【面试题】
  * 分别简述computed和watch的区别并说明使用场景
:::
