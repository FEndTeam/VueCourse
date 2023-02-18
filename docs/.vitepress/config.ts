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
      { text: '脚手架', link: '/falsework/introduction', activeMatch: '/falsework/' },
      { text: '路由管理', link: '/router/introduction', activeMatch: '/router/' },
      { text: '状态管理', link: '/state/introduction', activeMatch: '/state/' },
    ],
    sidebar: {
      // 基本语法
      '/syntax/': sidebarSyntax(),
      '/falsework/': sidebarFalsework(),
      '/router/': sidebarRouter(),
      '/state/': sidebarState()
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

/**
 * @name 基本语法
 * @returns 
 */
function sidebarSyntax() {
  return [
    {
      text: '概述',
      collapsible: true,
      items: [
        { text: '简介', link: '/syntax/introduction' },
        { text: '组件化', link: '/syntax/component' },
        { text: 'API风格', link: '/syntax/apistyle' },
        { text: 'setup函数', link: '/syntax/setupfn' },
      ]
    },
    {
      text: '指令',
      collapsible: true,
      items: [
        { text: '文本渲染', link: '/syntax/direct-text' },
        { text: '条件判断', link: '/syntax/direct-cond' },
        { text: '属性绑定', link: '/syntax/direct-prop' },
        { text: '事件绑定', link: '/syntax/direct-event' },
        { text: '表单处理', link: '/syntax/direct-form' },
      ]
    }
  ]
}

/**
 * @name 脚手架
 * @returns 
 */
function sidebarFalsework() {
  return [
    {
      text: '脚手架',
      collapsible: true,
      items: [
        { text: '基本介绍', link: '/falsework/introduction' }
      ]
    }
  ]
}

/**
 * @name 路由
 * @returns 
 */
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

/**
 * @name 状态管理
 * @returns 
 */
function sidebarState() {
  return [
    {
      text: '概述',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/state/introduction' },
      ]
    }
  ]
}

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