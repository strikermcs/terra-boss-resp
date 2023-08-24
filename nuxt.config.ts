// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Terra Boss Resp",
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
      ]
    },
  },
  css: ['~/assets/css/main.css'],
  imports: {
    dirs: ['stores']
  },
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
    '@element-plus/nuxt',
    
  ],
  devtools: { enabled: true },
  devServer: {
    port: 5000
  }
  // alias: {
  //   "~": "/",
  //   "@": "/",
  //   "assets": "/assets",
  //   "public": "/public"

  // }

})
