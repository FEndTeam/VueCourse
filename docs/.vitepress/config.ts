export default {
  lang: 'en-US',
  title: 'Vue Doc',
  description: 'Vue3.x technical documentation',
  base: "/VueCourse",
  // markdown文件设置
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    // 设置文档所在的文件夹
    docsDir: 'docs',
    // 搜索插件
    algolia: {
      apiKey: 'c57105e511faa5558547599f120ceeba',
      indexName: 'vitepress'
    },
    // 顶部导航
    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'Config Reference',
        link: '/config/basics',
        activeMatch: '^/config/'
      }
    ],
    // 侧边栏导航
    sidebar: {
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: "基础语法",
      children: [
        { text: '基本介绍', link: '/syntax/introduction' },
        { text: '使用风格', link: '/syntax/use-style' },
        { text: '快速开始', link: '/syntax/quick-start' },
        { text: '入口函数', link: '/syntax/entrance' },
        { text: '响应式状态', link: '/syntax/reactivity-state' },
        { text: '响应式变量', link: '/syntax/reactive-variable' },
        { text: '模板语法', link: '/syntax/template-syntax' }, 
        { text: '计算属性', link: '/syntax/computed' }, 
        { text: '类与样式绑定', link: '/syntax/class-and-style' },
        { text: '条件渲染', link: '/syntax/conditional' },
        { text: '列表渲染', link: '/syntax/list' },
        { text: '事件处理', link: '/syntax/event-handling' },
        { text: '表单输入绑定', link: '/syntax/forms' },
        
        { text: '侦听器', link: '/syntax/watchers' },
        { text: '生命周期', link: '/syntax/lifecycle' },
        { text: '模板ref', link: '/syntax/template-refs' },
        { text: '组件基础', link: '/syntax/component-basics' },
        { text: '组件注册', link: '/syntax/registration' },
        { text: 'Props', link: '/syntax/props' },
        { text: '组件事件', link: '/syntax/events' },
        { text: '透传attribute', link: '/syntax/attrs' },
        { text: '插槽', link: '/syntax/slots' },
        { text: '依赖注入', link: '/syntax/provide-inject' },
        { text: '异步组件', link: '/syntax/async-component' }
      ]
    },
    {
      text: "脚手架"
    },
    {
      text: "路由管理"
    },
    {
      text: "状态管理"
    },
    {
      text: "服务端渲染"
    },
  ]
}

/** 
⓵
⓶
⓷
⓸
⓹
⓺
⓻
⓼
⓽
⓾
*/