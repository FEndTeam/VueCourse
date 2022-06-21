export default {
  lang: 'en-US',
  title: 'Vue Course',
  description: 'Vue Technical Documentation',

  lastUpdated: true,

  themeConfig: {
    nav: nav(),

    sidebar: {
      '/syntax/': sidebarSyntax(),
      '/scaffold/': sidebarScaffold(),
      '/router/':sidebarRouter(),
      '/state/':sidebarState(),
      '/ssr/':sidebarSSR(),
      '/plugin/':sidebarPlugin(),
    },

    editLink: {
      pattern: 'https://github.com/VueProjectCourse/HRManagerSystem/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/VueProjectCourse/HRManagerSystem' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present WanLum Yeung'
    },
  }
}

function nav() {
  return [
    // 基本语法
    { text: 'Syntax', link: '/syntax/introduction', activeMatch: '/syntax/' },
    // 脚手架
    { text: 'Scaffold', link: '/scaffold/introduction', activeMatch: '/scaffold/' },
    // 路由管理
    { text: 'Router', link: '/router/introduction', activeMatch: '/router/' },
    // 状态
    { text: 'State', link: '/state/introduction', activeMatch: '/state/' },
    // 服务器端渲染
    { text: 'SSR', link: '/ssr/introduction', activeMatch: '/ssr/' },
    // 插件
    { text: 'Plugin', link: '/plugin/introduction', activeMatch: '/plugin/' },
  ]
}

function sidebarSyntax() {
  return [
    {
      text: '基础语法',
      collapsible: true,
      items: [
        { text: '基本介绍', link: '/syntax/introduction' },
      ]
    }
  ]
}

function sidebarScaffold() {
  return [
    {
      text: '脚手架',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/scaffold/introduction' },
      ]
    }
  ]
}

function sidebarRouter() {
  return [
    {
      text: '路由',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/router/introduction' },
      ]
    }
  ]
}

function sidebarSSR() {
  return [
    {
      text: '服务器端渲染',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/ssr/introduction' },
      ]
    }
  ]
}

function sidebarState() {
  return [
    {
      text: '状态管理',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/state/introduction' },
      ]
    }
  ]
}


function sidebarPlugin() {
  return [
    {
      text: '常用插件',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/plugin/introduction' },
      ]
    }
  ]
}