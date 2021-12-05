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
            { text: '数据渲染指令', link: '/syntax/data-directive' },
            // { text: '列表渲染指令', link: '/syntax/list-directive' },
            // { text: '指令-属性绑定', link: '/syntax/render-directive'},
            // { text: '指令-事件绑定', link: '/syntax/render-directive'},
            // { text: '指令-表单绑定', link: '/syntax/render-directive'},
            // { text: '指令-自定义', link: '/syntax/render-directive'},
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