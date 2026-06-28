<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style scoped>

</style>

<script>
  export default {
    data() {
      return {
        "account": null,
        "forms": {

        }
      }
    },
    mounted() {
      useHead({
        bodyAttrs: { 
          class: computed(() => this.$device.isMobileOrTablet ? "mobile" : "")
        }
      })
    },
    unmounted() {
      
    },
    methods: {
      toggleTheme() {
        useColorMode().value = useColorMode().value === "light" ? "dark" : "light"
      },
    },
    provide() {
      return {
        "account": this.account,
        "forms": this.forms
      }
    },
    setup() {
      
    }
  }
</script>