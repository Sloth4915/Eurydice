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
        font-size: 1rem;
        padding: 0 1rem;
    }

    button.small {
        font-size: 0.9rem;
        padding: 0.2rem;
    }

    [selected], .selected {
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