<template>
    <input 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      class="custom-input"
      v-bind="$attrs"
    />
</template>

<style scoped>
    input {
        background-color: var(--primary);
        border: 2px inset var(--outline);
        border-radius: 4px;
    }

    input::placeholder {
        color: color-mix(in srgb, var(--font), var(--primary));
    }
</style>

<script>
    export default {
        props: ["modelValue"],
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