<template>
  <div class="navigation between fw cy">
    <h1 class="cursor" @click="navigateTo('/')">Eurydice</h1>

    <div class="f">
      <UIButton @click="toggleTheme">Theme</UIButton>
      <UIButton @click="navigateTo('/account')">Login</UIButton>
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
      
    },
    unmounted() {
      
    },
    methods: {
      toggleTheme() {
        useColorMode().value = useColorMode().value === "light" ? "dark" : "light"
      },
      ping() {

      }
    },
    provide() {
      return {
        "account": this.account,
        "forms": this.forms
      }
    }
  }
</script>