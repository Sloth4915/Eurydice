<template>
    <div class="f gap cy" v-if="type === 'expression'">
        <label>{{ label }}</label>
        <div class="expression f" v-if="Array.isArray(this.value)">
                <FormEditorExpressionEditor v-for="(item, index) in this.value" v-model="this.value[index]" type="expression"/>
        </div>
        <div class="expression f single" @mouseover="hovered = true" @mouseleave="hovered = false" v-else>
            <UIButton class="open nopadding" title="Add Before" v-show="hovered" @click="value = 'test'">+</UIButton>
            {{ value }}
            <UIButton class="open nopadding" title="See Options" v-show="hovered" @click="value = 'test'">˅</UIButton>
            <UIButton class="open nopadding" title="Add After" v-show="hovered" @click="value = 'test'">+</UIButton>
        </div>
    </div>
    <div v-else>
        {{ label }} ACTION
    </div>
</template>

<style scoped>
    .expression {
        border: 1px solid var(--outline);
        padding: 0.2rem;
        gap: 0.2rem;
        border-radius: 0.01rem;
    }
</style>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: "",
            },
            modelValue: Array,
            type: {
                default: "expression", // expression/action
            }
        },
        data() {
            return {
                hovered: false
            }
        },
        computed: {
            value: {
                get() {
                    return this.modelValue
                },
                set(value) {
                    this.$emit('update:modelValue', value)
                }
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