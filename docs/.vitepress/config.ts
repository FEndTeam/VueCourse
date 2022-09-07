export default {
  lang: 'en-US',
  title: 'Vue Course',
  description: 'Vue Technical Documentation',

  lastUpdated: true,

  themeConfig: {
    logo: '/images/hero.png',
    nav: [
      // 基本语法
      { text: '语法', link: '/syntax/introduction', activeMatch: '/syntax/' },
    ],
    sidebar: {
      // 基本语法
      '/syntax/': sidebarSyntax(),
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

function sidebarSyntax() {
  return [
    {
      text: '语法',
      collapsible: true,
      items: [
        { text: '基本介绍', link: '/syntax/introduction' },
        { text: '组件化', link: '/syntax/component' },
      ]
    }
  ]
}

// function sidebarScaffold() {
//   return [
//     {
//       text: '脚手架',
//       collapsible: true,
//       items: [
//         { text: '基本介绍', link: '/scaffold/introduction' },
//         { text: '简单使用', link: '/scaffold/quickstart' },
//       ]
//     }
//   ]
// }

// function sidebarRouter() {
//   return [
//     {
//       text: '路由',
//       collapsible: true,
//       items: [
//         { text: 'Introduction', link: '/router/introduction' },
//       ]
//     }
//   ]
// }

// function sidebarState() {
//   return [
//     {
//       text: '概述',
//       collapsible: true,
//       items: [
//         { text: '基本介绍', link: '/state/introduction' },
//       ]
//     }
//   ]
// }

// function sidebarSSR() {
//   return [
//     {
//       text: '服务器端渲染',
//       collapsible: true,
//       items: [
//         { text: 'Introduction', link: '/ssr/introduction' },
//       ]
//     }
//   ]
// }





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