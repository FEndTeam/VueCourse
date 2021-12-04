export default {
  lang: 'en-US',
  title: 'Vue Doc',
  description: 'Vue3.x technical documentation',
  base: "/VueCourse",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    docsDir: 'docs',

    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',

    // custom containers
    // tip: '提示',
    // warning: '注意',
    // danger: '警告',
    // info: "引用",

    // 404 page
    notFound: [
      '这里什么都没有',
      '我们怎么到这来了？',
      '这是一个 404 页面',
      '看起来我们进入了错误的链接',
    ],
    backToHome: '返回首页',

    algolia: {
      apiKey: 'c57105e511faa5558547599f120ceeba',
      indexName: 'vitepress'
    },
    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Config Reference',
        link: '/config/basics',
        activeMatch: '^/config/'
      }
    ],
    sidebar: {
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: "Vue简介",
      children: [
        { text: '1. Vue介绍', link: '/optionsAPI/introduce/index' },
        { text: '2. Vue基本使用', link: '/optionsAPI/introduce/basicuse' },
        // 框架和库的区别
        // MVVM
      ]
    },
    {
      text: "指令系统",
      link: '/optionsAPI/directive/overview',
      children: [
        { text: '1. 内容渲染指令', link: '/optionsAPI/directive/content' },
        { text: '2. 条件渲染指令', link: '/optionsAPI/directive/condition' },
        { text: '3. 列表渲染指令', link: '/optionsAPI/directive/list' },
        { text: '4. 属性绑定指令', link: '/optionsAPI/directive/property' },
        { text: '5. 事件绑定指令', link: '/optionsAPI/directive/event' },
        { text: '6. 双向绑定指令', link: '/optionsAPI/directive/bilateral' },
        { text: '7. 自定义指令', link: '/optionsAPI/directive/customize' },
      ]
    },
    {
      text: "组件系统",
      link: '/optionsAPI/component/overview',
      children: [
        { text: '1. 组件基础', link: '/optionsAPI/component/basic' },
        { text: '2. 组件状态', link: '/optionsAPI/component/data' },
        { text: '3. 组件方法', link: '/optionsAPI/component/methods' },
        { text: '4. 计算属性', link: '/optionsAPI/component/computed' },
        { text: '5. 侦听器', link: '/optionsAPI/component/watch' },
        { text: '6. 动效', link: '/optionsAPI/component/effect' },
        { text: '7. 组件通信', link: '/optionsAPI/component/communicate' },
        { text: '8. 插槽', link: '/optionsAPI/component/slot' },
        { text: '9. 生命周期', link: '/optionsAPI/component/lifecycle' }
      ]
    },
    {
      text: 'Vite脚手架',
      children: [
        { text: '1. Vite介绍', link: '/Vite/introduce' },
        { text: '2. 基本使用', link: '/Vite/basicuse' }
      ]
    },
    {
      text: '路由管理器',
      children: [

      ]
    },

    {
      text: '状态管理器',
      children: [

      ]
    },
    {
      text: 'Nuxt',
      children: [
        { text: '1. Nuxt介绍', link: '/Nuxt/introduce' }
      ]
    }
  ]
}