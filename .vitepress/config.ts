import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
import type { Config } from '@vue/theme'
import { UserConfig } from 'vitepress'

const nav = [
  {
    text: 'Docs',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      {
        text: 'Migration from Vue 2',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: 'About',
    activeMatch: `^/about/`,
    items: [
      {
        text: 'The Documentary',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
 
]

export const sidebar = {
  '/syntax/': [
    {
      text: '基础语法',
      items: [
        { text: '基本介绍', link: '/syntax/introduction' },
        { text: '快速开始', link: '/syntax/quick-start'}
      ]
    }
  ],
  // '/scaffold/': [
  //   {
  //     text: '脚手架',
  //     items: [
  //       { text: '基本介绍',  },
  //       { text: '快速开始', }
  //     ]
  //   }
  // ],
}

export default defineConfigWithTheme<Config>({
  extends: baseConfig as () => UserConfig<Config>,

  lang: 'en-US',
  base:"/VueCourse",
  title: 'Vue.js',
  description: 'Vue.js - The Progressive JavaScript Framework',
  srcDir: 'docs',
  scrollOffset: 'header',

  head: [
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://sponsors.vuejs.org'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        defer: ''
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    ],

    editLink: {
      repo: 'https://github.com/FEndTeam/VueCourse/docs',
      text: 'Edit this page on GitHub'
    },

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Copyright © 2014-${new Date().getFullYear()} Yeung WanLum`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})
