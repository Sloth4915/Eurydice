<template>
    <div class="f gap cy" v-if="type === 'expression'">
        <label>{{ label }}</label>
        <div class="expression f">
            <template v-if="Array.isArray(this.value)" v-for="(item, index) in this.value">
                <FormEditorExpressionEditor v-model="this.value[index]" type="expression"/>
            </template>
            <template v-else>
                {{ value }}
            </template>
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
                
            }
        },
        computed: {
            value: {
                get() {
                    return this.modelValue
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