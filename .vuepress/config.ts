import { defineUserConfig } from 'vuepress';
import Theme from './theme';
import searchPlugin  from '@vuepress/plugin-search';

export default defineUserConfig({
  
  base: '/',
  title: "GoSweetSpot Freight API",
  description: "Freight API provides programmatic access to GSS functionality and content.",
  port: 3001,


  markdown: {
    headers: {
      level: [2, 3, 4, 5],
    },
  },

  theme: Theme,

  plugins: [
    searchPlugin ({
      locales: {
        '/': {
          placeholder: 'Search',
        },
      },
      maxSuggestions:5
    })
  ],
  
});
