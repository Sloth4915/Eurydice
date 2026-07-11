<template>
    <div class="navigation between fw cy">
        <h1 class="cursor" @click="navigateTo('/')">Eurydice</h1>

        <div class="f">
        <UIButton class="small" @click="toggleTheme">Theme</UIButton>
        <UIButton class="small" @click="navigateTo('/account')">Login</UIButton>
        </div>
    </div>
    <slot/>
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
        props: {
            
        },
        data() {
            return {
                
            }
        },
        mounted() {
            // TODO replace buttons with NuxtLinks
        },
        unmounted() {
            
        },
        methods: {
            toggleTheme() {
                useColorMode().preference = useColorMode().value === "light" ? "dark" : "light"
            },
        },
    }
</script>