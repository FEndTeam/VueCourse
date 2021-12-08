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
        {
          text: 'Vue简介', children: [
            { text: 'Vue介绍', link: '/syntax/introduce' },
            { text: '基本使用', link: '/syntax/basicuse' },
          ],
        },
        {
          text: '指令系统', children: [
            { text: '指令系统介绍', link: '/syntax/directive' },
            { text: '数据渲染指令', link: '/syntax/data-directive' },
            { text: '条件渲染指令', link: '/syntax/condition-directive' },
            { text: '列表渲染指令', link: '/syntax/list-directive' },
            { text: '属性绑定指令', link: '/syntax/attribute-directive'},
            { text: '事件绑定指令', link: '/syntax/event-directive'},
            { text: '表单绑定指令', link: '/syntax/model-directive'},
            { text: '自定义的指令', link: '/syntax/custom-directive'},
          ],
        },
        {
          text: '组件系统', children: [
            { text: '组件系统介绍', link: '/syntax/component' },
            { text: '组件系统基础', link: '/syntax/basic' },
            // { text: '组件模板', link: '/syntax/template' },
            // { text: '组件状态', link: '/syntax/template' },
            // { text: '组件方法', link: '/syntax/template' },
            { text: '计算属性', link: '/syntax/computed' },
            { text: '侦听器', link: '/syntax/watch' },
            { text: '动效', link: '/syntax/template' },
            { text: '组件通信', link: '/syntax/template' },
            { text: '插槽', link: '/syntax/template' },
            { text: '生命周期', link: '/syntax/template' },
          ],
        }

      ]
    },

    {
      text: '脚手架',
      children: []
    },
    {
      text: '路由管理器',
      children: []
    },

    {
      text: '状态管理器',
      children: []
    },
    {
      text: '服务端渲染',
      children: []
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
