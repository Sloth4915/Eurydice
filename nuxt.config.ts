// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/google-fonts'],
  css: ["~/assets/global.css"],
  app: {
    head: {
      title: "Eurydice",
      meta: [
        { name: 'description', content: 'A scouting app by Spartronics 4915' }
      ]
    }
  },
  googleFonts: {
    families: {
      Raleway: true,
    }
  }
})