# 路由规则

::: tip 目标
这一小节，我们的目标是掌握路由规则的编写
:::

::: warning 步骤

1. 一级路由
2. 多级路由
3. 路由懒加载
:::

::: info 体验

* **Kn.1：一级路由**

  一级路由，顾名思义，就是在我们的项目地址后面，只有一级path，比如 `https://baidu.com/home` 这里的 home 就是一级路由。

  我们来看一下最基本的路由配置应该包含哪些字段：

  ```js
  const routes = [
    {
      path: '/',
      name: 'home',
      component:Home
    }
  ];
  ```

  path 是路由的访问路径，像上面说的，如果你的域名是 `https://baidu.com`， 配置为 `/home`，那么访问路径就是 `https://baidu.com/home`,一级路由的path都必须是以 / 开头，比如： /home、/setting；如果你的项目首页不想带上 home 之类的尾巴，只想要 `https://baidu.com` 这样的域名直达 ，其实也是配置一级路由，只需要把路由的 path 指定为 / 即可。

  name 是路由的名称，非必填，但是一般都会配置上去，这样可以很方便的通过 name 来代替 path 实现路由的跳转，因为像有时候你的开发环境和生产环境的路径不一致，或者说路径变更，通过 name 无需调整，但如果通过 path，可能就要修改很多文件里面的链接跳转目标了。

  component 是路由的模板文件，指向一个vue组件，用于指定路由在浏览器端的视图渲染.

* **Kn.2：多级路由**

  在Vue路由生态里，支持配置二级、三级、四级等多级路由，理论上没有上限，实际业务中用到的级数通常是三级到四级。

  这是一个简单的子路由示范：

  ```js
    const routes = [
      // 注意：这里是一级路由
      {
        path: '/lv1',
        name: 'lv1',
        component: Lv1
        // 注意：这里是二级路由
        children: [
          {
            path: 'lv2',
            name: 'lv2',
            component:Lv2 
            // 注意：这里是三级路由
            children: [
              {
                path: 'lv3',
                name: 'lv3',
                component: Lv3
              }
            ]
          }
        ]
      }
    ];
  ```

* **Kn.3：路由懒加载**

  路由在配置 同步组件 的时候，构建出来的文件都集中在一起，大的项目的文件会变得非常大，影响页面加载。

  所以Vue推出了 异步组件，可以把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样按需载入，很方便的实现路由组件的懒加载。

  ```js
  const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '@views/home.vue')
    }
  ];
  ```

:::
