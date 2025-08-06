import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ICPS",
  description: "Interpreter, Compiler, Precompiler, Shell.",
  base: "/icps_site/",
  head: [
    ['link', { rel: 'icon', href: '/icps_site/logo.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/github.com/naga272/icps_site' }
    ]
  }
})
