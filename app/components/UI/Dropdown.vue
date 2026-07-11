<template>
    <div class="gap f row cy">
        <label v-if="typeof label !== 'undefined'" :for="id">
            {{ label }}
        </label>
        <select :value="modelValue" 
                @input="$emit('update:modelValue', $event.target.value)" 
                class="custom-input"
                :id="id"
                :placeholder="label ?? ''"
                v-bind="$attrs">
            <slot/>
        </select>
    </div>
</template>

<style scoped>
    select, option {
        background-color: var(--primary);
        border: 2px inset var(--outline);
        border-radius: 4px;
        font-size: 1.1rem;
    }

    label {
        font-size: 1.15rem;
    }

    select::placeholder {
        color: color-mix(in srgb, var(--font), var(--primary));
    }
</style>

<script>
    export default {
        props: ["modelValue", "label"],
        data() {
            return {
                id: useId()
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        },
        methods: {
            
        },
    }
</script>