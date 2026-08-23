<template>
    <div class="f gap cy">
        <label>{{ label }}</label>
        <UIButton @click="this.$refs.dialog.openPopup()">temporary open popup</UIButton>
        <UIDialog closeable ref="dialog">
            <div class="row">
                <div class="col">
                    <UIButton :selected="popupPhase === 'values'" @click="popupPhase = 'values'">Values</UIButton>
                    <UIButton :selected="popupPhase === 'fields'" @click="popupPhase = 'fields'">Fields</UIButton>
                    <!-- TODO: loop through formexpression pages, find all that have children functions that fit type requirements -->
                </div>
                <div class="col" v-show="popupPhase === 'values'">
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.NUM)">Number</UIButton>
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.BOOL)">Bool</UIButton>
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.STR)">String</UIButton>
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.TAGS)">Tags</UIButton>
                </div>
                <div class="col" v-show="popupPhase === 'fields'">
                    get list of options
                </div>
            </div>
        </UIDialog>
    </div>
</template>

<style scoped>
    .expression {
        border: 1px solid var(--outline);
        padding: 0.2rem;
        gap: 0.2rem;
        border-radius: 0.01rem;
        min-height: 0.5rem;
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
        },
        mounted() {
            
        },
        unmounted() {
            
        },
        methods: {
            allowType(filter, type) {
                if (!Array.isArray(filter)) filter = [filter]
                if (!Array.isArray(type)) type = [type]
                for (let x of filter) {
                    for (let y of type) {
                        if (y == FormExpression.ALLOW_AS_PARAM_ALWAYS) return true
                        if (x == y) return true
                    }
                }
                return false
            }
        },
    }
</script>