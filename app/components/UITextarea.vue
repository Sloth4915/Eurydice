<template>
    <div class="gap f row cy">
        <textarea 
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)" 
            class="custom-input"
            :id="id"
            :placeholder="label ?? ''"
            v-bind="$attrs"
        />
    </div>
</template>

<style scoped>
    textarea {
        background-color: var(--primary);
        border: 2px inset var(--outline);
        border-radius: 4px;
        font-size: 1.1rem;
    }

    textarea {
        font-size: 1.15rem;
    }

    textarea::placeholder {
        color: color-mix(in srgb, var(--font), var(--primary));
    }
</style>

<script>
    export default {
        props: ["modelValue"],
        data() {
            return {
                id: useId()
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        }
    }
</script>