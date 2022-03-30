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
        { text: '生命周期', link: '/syntax/lifecycle' },
        { text: '侦听器', link: '/syntax/watchers' },
        { text: '组件基础', link: '/syntax/component-basics' },
        { text: '组件注册', link: '/syntax/registration' },
        { text: 'Props', link: '/syntax/props' },
        { text: '模板ref', link: '/syntax/template-refs' },
        { text: '组件事件', link: '/syntax/events' },
        { text: '透传attribute', link: '/syntax/attrs' },
        { text: '插槽', link: '/syntax/slots' },
        { text: '依赖注入', link: '/syntax/provide-inject' },
        { text: '异步组件', link: '/syntax/async-component' },
        { text: '可组合函数', link: '/syntax/composables' },
        { text: '自定义指令', link: '/syntax/custom-directives' },
        { text: '插件', link: '/syntax/plugins' },
        { text: 'Transition', link: '/syntax/transition' },
        { text: 'TransitionGroup', link: '/syntax/transition-group' },
        { text: 'KeepAlive', link: '/syntax/keep-alive' },
        { text: 'Teleport', link: '/syntax/teleport' },
      ]
    },
    {
      text: "脚手架"
    },
    {
      text: "路由管理",
      children: [
        { text: '路由概念', link: '/routing/notion' },
        { text: '路由实现', link: '/routing/accomplish' },
        { text: '基本介绍', link: '/routing/introduction' },
        { text: '路由配置', link: '/routing/config' },
        { text: '路由规则', link: '/routing/rule' },
        { text: '路由渲染', link: '/routing/render'},
        { text: '获取路由信息', link: '/routing/information'},
        { text: '操作路由', link: '/routing/operation'},
        { text: '路由跳转', link: '/routing/jump'}
      ]
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