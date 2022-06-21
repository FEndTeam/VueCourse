export default {
  lang: 'en-US',
  title: 'Vue Course',
  description: 'Vue Technical Documentation',

  lastUpdated: true,

  themeConfig: {
    logo: '/images/hero.png',
    nav: nav(),
    sidebar: {
      '/syntax/': sidebarSyntax(),
      '/falsework/': sidebarScaffold(),
      '/router/': sidebarRouter(),
      '/state/': sidebarState(),
      '/ssr/': sidebarSSR(),
      '/plugin/': sidebarPlugin(),
      '/hrms/': sidebarHrms(),
    },

    editLink: {
      pattern: 'https://github.com/FEndTeam/VueCourse/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/FEndTeam/VueCourse' }
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
    { text: '基础语法', link: '/syntax/introduction', activeMatch: '/syntax/' },
    // 路由管理
    { text: '路由',    link: '/router/introduction', activeMatch: '/router/' },
    // 状态管理
    { text: '状态管理', link: '/state/introduction', activeMatch: '/state/' },
    // 服务器端渲染
    { text: '服务器端渲染', link: '/ssr/introduction', activeMatch: '/ssr/' },
    // 插件
    { text: '常见插件', link: '/plugin/introduction', activeMatch: '/plugin/' },
    // 脚手架
    { text: '脚手架',  link: '/scaffold/introduction', activeMatch: '/scaffold/' },
    // 项目实战 
    {
      text: '实战项目', items: [
        { text: '人力资源管理系统', activeMatch: '/hrms/', link: '/hrms/introduction' },
      ]
    },
  ]
}

function sidebarSyntax() {
  return [
    {
      text: '简介',
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
        { text: '[vite]快速入门', link: '/scaffold/vite-quickstart' },
        { text: '基本介绍', link: '/scaffold/introduction' },
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

function sidebarState() {
  return [
    {
      text: '状态管理',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/state/introduction' },
        { text: "[vuex]introduction", link: '/state/vuex-introduction' }
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

function sidebarHrms() {
  return [
    {
      text: '前期准备',
      collapsible: true,
      items: [
        { text: '项目介绍', link: '/hrms/introduction' },
      ]
    },
    {
      text: '后期优化',
      collapsible: true,
      items: [
        { text: 'youhua', link: '/hrms/youhua' },
      ]
    }
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