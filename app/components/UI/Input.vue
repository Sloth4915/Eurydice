<template>
    <div class="gap f row cy">
        <label v-if="typeof label !== 'undefined'" :for="id">
            {{ label }}
        </label>
        <input 
            v-if="type === 'checkbox'"
            :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)" 
            class="custom-input"
            :id="id"
            :placeholder="label ?? ''"
            :type="type"
            v-bind="$attrs"
        />
        <input 
            v-else
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" 
            class="custom-input"
            :class="[type]"
            :id="id"
            :placeholder="label ?? ''"
            :type="type"
            v-bind="$attrs"
        />
    </div>
</template>

<style scoped>
    input {
        background-color: var(--primary);
        border: 2px inset var(--outline);
        border-radius: 4px;
        font-size: 1.1rem;
    }
    input.text {}
    input.number {
        width: 70px;
    }
    input:disabled {
        background-color: var(--panel);
        text-decoration: line-through;
    }

    label {
        font-size: 1.15rem;
    }

    input::placeholder {
        color: color-mix(in srgb, var(--font), var(--primary));
    }
</style>

<script>
    export default {
        props: ["modelValue", "label", "type"],
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