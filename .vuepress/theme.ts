import { hopeTheme } from "vuepress-theme-hope";
import {sidebarConfig } from "./sidebar/index";

export default hopeTheme({
  hostname: "https://api.gosweetspot.com",
  iconAssets: "iconify",
  docsBranch: "dev",
  docsDir: "/docs/",
  editLink: false,
  navbar: false,
  locales: {
    "/": {
      navbar: [],
      sidebar: sidebarConfig,
      displayFooter: false,
    }
  },

  sidebarIcon: true,

  plugins: {
    activeHeaderLinks: false,
    copyright: {
      license: "AGPL-3.0",
    },
    copyCode: {},
    mdEnhance: {
      demo: true,
      align: true,
      card: true,
      chart: true,
      codetabs: true,
      container: true,
      echarts: true,
      footnote: true,
      gfm: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      mathjax: true,
      mark: true,
      mermaid: true,
      tabs: true,
      tasklist: true,
      vPre: true,
    },

    prismjs: {
      light: "one-dark",
      dark: "nord",
    },

    sitemap: true,

  },

});
