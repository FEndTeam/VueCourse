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
        { text: '快速开始', link: '/syntax/quick-start' },
        { text: '简单应用', link: '/syntax/simple-app' },
        { text: '模板语法', link: '/syntax/template-syntax' },
        { text: '响应式状态', link: '/syntax/reactivity-state' },
        { text: '响应式变量', link: '/syntax/reactive-variable' },
        { text: '计算属性', link: '/syntax/computed' },
      ]
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