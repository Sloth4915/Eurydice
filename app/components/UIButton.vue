<template>
    <button class="cursor" v-bind="$attrs">
        <slot/>
    </button>
</template>

<style>
    button {
        background-color: var(--primary);
        border: 2px inset var(--outline);
        border-radius: 4px;
    }

    [selected='true'], .selected {
        background-color: var(--secondary);
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
            
        },
        unmounted() {
            
        }
    }
</script>