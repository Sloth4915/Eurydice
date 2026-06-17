<template>
  <div class="navigation between fw cy">
    <h1 class="cursor" @click="navigateTo('/')">Eurydice</h1>

    <div class="f">
      <UIButton class="small" @click="toggleTheme">Theme</UIButton>
      <UIButton class="small" @click="navigateTo('/account')">Login</UIButton>
    </div>
  </div>
  <NuxtPage/>
</template>

<style scoped>
  .navigation {
    background-color: var(--primary);
    filter: drop-shadow(0px 0px 3px var(--secondary));
    padding: 0 0.5rem;
    height: 4rem;
  }
  .navigation div {
    display: flex;
    gap: 0.5rem;
    height: 80%;
  }
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