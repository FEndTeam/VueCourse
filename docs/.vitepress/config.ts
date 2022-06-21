export default {
  lang: 'en-US',
  title: 'Vue Course',
  description: 'Vue Technical Documentation',

  lastUpdated: true,

  themeConfig: {
    // nav: nav(),

    sidebar: {
      '/': sidebarGuide(),
      // '/config/': sidebarConfig()
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

// function nav() {
//   return [
//     { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide/' },
//     // { text: 'Configs', link: '/config/introduction', activeMatch: '/config/' },
//   ]
// }

function sidebarGuide() {
  return [
    {
      text: '基础语法',
      collapsible: true,
      items: [
        { text: '基本介绍', link: '/syntax/introduction' },
      ]
    },
    {
      text: '脚手架',
      collapsible: true,
      items: [
        { text: '基本介绍', link: '/scaffold/introduction' },
      ]
    }
  ]
}

// function sidebarConfig() {
//   return [
//     {
//       text: 'Config',
//       items: [
//         { text: 'Introduction', link: '/config/introduction' },
//         { text: 'App Configs', link: '/config/app-configs' },
//         { text: 'Theme Configs', link: '/config/theme-configs' },
//         { text: 'Frontmatter Configs', link: '/config/frontmatter-configs' }
//       ]
//     }
//   ]
// }
