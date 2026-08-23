<template>
    <button class="cursor" :class="{selected}" v-bind="$attrs">
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
        min-height: 0.9rem;
    }

    button.small {
        font-size: 0.9rem;
        padding: 0.2rem;
    }

    .selected {
        background-color: var(--secondary);
    }

    button:disabled {
        background-color: var(--panel-secondary);
    }

    button.nopadding {
        padding: 0;
    }
</style>

<script>
    export default {
        props: {
            selected: Boolean,
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