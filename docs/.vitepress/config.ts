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