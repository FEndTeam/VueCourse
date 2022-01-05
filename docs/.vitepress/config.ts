export default {
  lang: 'en-US',
  title: 'Vue Doc',
  description: 'Vue3.x technical documentation',
  base: "/VueCourse",
  // markdown文件设置
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // 设置文档所在的文件夹
    docsDir: 'docs',
    // 是否展示 可编辑文档
    editLinks: true,
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
        { text: '简单介绍', link: '/syntax/introduce'},
        { text: '基本结构', link: '/syntax/basic-use'},
        { text: '组件化', children: [
          { text: '组件概述', link: '/syntax/component_overview'},
          { text: '全局组件', link: '/syntax/component_global'},
          { text: '局部组件', link: '/syntax/component_partial'},
        ]},
        { text: '组件模板', link: '/syntax/component_template'},
      ]
    },

    {
      text: '脚手架',
      children: [
        { text: '脚手架简介', link: '/scaffold/introduce'},
        { text: '项目创建', link: '/scaffold/create-project'},
        { text: '路径别名', link: '/scaffold/alis'},
      ]
    },
    {
      text: '路由管理器',
      children: [
        { text: '单页面应用', link: '/routermanger/single-page-application'},
        { text: '路由简单实现', link: '/routermanger/concept-principle-of-routing'},
        { text: 'VueRouter简介', link: '/routermanger/introduce'},
      ]
    },
    {
      text: '状态管理器',
      children: [
        {
          text: '概述',
          link: '/statemanger/pinia_introduce'
        },
        {
          text: '配置Pinia',
          link: '/statemanger/pinia_config'
        },
      ]
    },
    {
      text: '服务端渲染',
      children: [
        {
          text: '概述',
          link: '/serverrender/introduce'
        },
      ]
    }
  ]
}

// 历史的发展
// 单页面应用
// 介绍Vue
// 组件
// 组件的data -->
// 组件的模板 --> 模板里面的指令
// 组件的方法 -->
// 组件的计算属性
// 组件的侦听器
// 组件的插槽
// 组件的生命周期
// 组件之间的通信
// 组件的动效
