import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
  {
    text: '指南',
    link: '/guide/'
  },
  {
    text: '组件',
    link: '/components/overview'
  }
]

const sidebar: DefaultTheme.Sidebar = {
  '/guide': [
    {
      text: '指南',
      items: [
        { text: '组件库介绍', link: '/guide/' },
        { text: '快速开始', link: '/guide/quickstart' }
      ]
    }
  ],
  '/components': [
    {
      text: '组件总览',
      link: '/components/overview'
    },
    {
      text: '通用',
      items: [
        { text: 'Button 按钮', link: '/components/button' }
      ]
    }
  ]
}

export default defineConfig({
  title: 'DesignUI',
  description: '基于 vite React Typescript 组件库',
  lang: 'cn-ZH',
  base: '/',
  lastUpdated: true,
  themeConfig: {
    nav,
    sidebar
  }
})