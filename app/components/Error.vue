<template>
    <div v-if="code !== StatusCodes.SUCCESS && code !== '' && code !== null && typeof code !== 'undefined'" class="bold">
        {{ getError(code) }}
    </div>
</template>

<style scoped>
    div {
        color: var(--error);
    }
</style>

<script>
    export default {
        props: ["code"],
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        }
    }
</script>