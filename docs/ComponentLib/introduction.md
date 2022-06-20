# [Element-UI] 介绍

## Step.1 打开官网

```bash
https: //www.wanwanlasdf.com
```

## Step.2 输入网址

> 目标: 了解代理对象的使用方式

什么是数据响应式?

数据驱动视图, 即数据和视图进行绑定, 当数据发生变化后, 视图自动更新.

如何实现数据响应式?

实现数据响应式的核心在于监听数据的变化, 当数据发生变化后, 执行视图更新操作.

Vue3 使用代理对象监听数据变化.

创建对象的代理对象, 从而实现对对象操作的拦截和自定义.

```javascript
// person 对象, 源数据对象
const person = { name: "张三", age: 20 };
// p 对象, person 对象的代理对象
// 对 p 对象进行的所有操作都会映射到 person 对象
const p = new Proxy(person, {});
// 查询代码对象
console.log(p); // Proxy { name: "张三", age: 20 }
// 修改代理对象中的 name 属性
p.name = "李四";
// 输出源数据对象中的 name 属性
console.log(person.name); // 李四
// 删除代理对象中的 age 属性
delete p.age;
// 输出源数据对象中的 age 属性
console.log(person.age); // undefined
// 在代理对象中增加 sex 属性
p.sex = "男";
// 输出源数据对象中的 sex 属性
console.log(person.sex);
```

```javascript
// person 对象, 源数据对象
const person = {
  name: "张三",
  age: 20,
  brand: { group: { title: "宝马" } },
};
// p 对象, person 对象的代理对象
// 对 p 对象进行的所有操作都会映射到 person 对象
const p = new Proxy(person, {
  get(target, property) {
    console.log("拦击到了获取操作");
    return target[property];
  },
  set(target, property, value) {
    console.log("拦截到了设置或者新增操作");
    target[property] = value;
  },
  deleteProperty(target, property) {
    console.log("拦截到了删除操作");
    return delete target[property];
  },
});

// console.log(p.name);
// p.name = "李四";
// delete p.name;
// p.sex = "男";
// proxy 代理的是整个对象, 不论对象层级有多深, 都可以进行拦截.
console.log(p.brand.group.title);

console.log(person);
```
