<template>
    <div class="f gap cy" v-if="type === 'expression'">
        <label>{{ label }}</label>
        <UIButton @click="this.$refs.dialog.openPopup()">{{ stem }}</UIButton> {{ params }}
        <UIDialog closeable ref="dialog">
            <div class="row">
                <div class="col">
                    <UIButton :selected="popupPhase === 'values'" @click="popupPhase = 'values'">Values</UIButton>
                    <UIButton :selected="popupPhase === 'fields'" @click="popupPhase = 'fields'">Fields</UIButton>
                </div>
                <div class="col" v-show="popupPhase === 'values'">
                    <UIButton>Number</UIButton>
                    <UIButton>Bool</UIButton>
                    <UIButton>String</UIButton>
                    <UIButton>Tags</UIButton>
                    <UIButton>Tags</UIButton>
                </div>
            </div>
        </UIDialog>
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
            },
            restrictValuesTo: {
                type: Array || String,
                default: [FormExpression.ANY, FormExpression.NUM]
            },
        },
        data() {
            return {
                popupPhase: "values",
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
            },
            stem: {
                get() { return this.value[0] },
                set(value) { 
                    this.value[0] = value
                    // switch for setting params
                    this.$emit('update:modelValue', value)
                }
            },
            params: {
                get() { return this.value.slice(1) },
                set(value) { 
                    
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