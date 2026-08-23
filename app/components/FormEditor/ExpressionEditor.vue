<template>
    <div class="f gap cy">
        <label>{{ label }}</label>
        <div :title="value.description" class="f expression">
            <UIButton @click.stop="this.$refs.dialog.openPopup()">
                <template v-if="value.showTitle">{{ value.name }}</template>
            </UIButton>
            <template v-for="elem in value.visualParams">
                <template v-if="typeof elem === 'string'">
                    <div>{{ elem }}</div>
                </template>
                <template v-else>
                    <ExpressionEditor v-model="value.params[elem]" :restrictValuesTo="whatTypesAreAllowedForThisChildParameter(value.paramTypes[elem])"/>
                </template>
            </template>
        </div>
        <UIDialog closeable ref="dialog">
            <div class="popup row gap">
                <div class="col">
                    Category
                    <UIButton :selected="popupPhase === 'values'" @click="popupPhase = 'values'">Values</UIButton>
                    <UIButton :selected="popupPhase === 'fields'" @click="popupPhase = 'fields'">Fields</UIButton>
                    <template v-for="(arr, name) in allowedExpressionFunctions">
                        <UIButton :selected="popupPhase === name" @click="popupPhase = name">{{ name }}</UIButton>
                    </template>
                </div>
                <div class="popup-divider"></div>
                <div class="col" v-show="popupPhase === 'values'">
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.NUM)">Number</UIButton>
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.BOOL)">Bool</UIButton>
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.STR)">String</UIButton>
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.TAGS)">Tags</UIButton>
                </div>
                <div class="col" v-show="popupPhase === 'fields'">
                    TODO: get list of options
                </div>
                <template v-for="(arr, name) in allowedExpressionFunctions">
                        <div class="col" v-show="popupPhase === name">
                            <template v-for="exp in arr">
                                <UIButton @click="value = exp">{{ exp.name }}</UIButton>
                            </template>
                        </div>
                </template>
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
        min-width: 2rem;
        min-height: 0.8rem;
    }
    .popup-divider {
        width: 1px;
        height: inherit;
        background-color: var(--secondary);
    }
</style>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: "",
            },
            modelValue: Object,
            restrictValuesTo: {
                type: [Array, Number],
                default: [FormExpression.NUM, FormExpression.BOOL, FormExpression.STR, FormExpression.TAGS, FormExpression.FIELD]
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
            allowedExpressionFunctions: {
                get() {
                    console.log("got exp functions")
                    let exps = getFormExpressions()

                    for (let folder in exps) {
                        let i = exps[folder].length
                        while(i--) {
                            if (!this.allowType(this.restrictValuesTo, exps[folder][i].returns)) exps[folder].splice(i, 1)
                        }
                        if (exps[folder].length === 0) delete exps[folder]
                    }

                    return exps
                }
            }
        },
        mounted() {
            console.log("aaa", this.allowedExpressionFunctions)
        },
        unmounted() {
            
        },
        methods: {
            allowType(filter, type) {
                if (!Array.isArray(filter)) filter = [filter]
                if (!Array.isArray(type)) type = [type]
                // TODO implement allowed params
                for (let x of filter) {
                    for (let y of type) {
                        console.log(x,y)
                        if (y == FormExpression.ALLOW_AS_PARAM_ALWAYS) return true
                        if (x == y) return true
                    }
                }
                return false
            },
            whatTypesAreAllowedForThisChildParameter(paramTypes) {
                if (!Array.isArray(paramTypes)) paramTypes = [paramTypes]
                let myOwnValueMustBeOfType = Array.isArray(this.restrictValuesTo) ? this.restrictValuesTo : [this.restrictValuesTo]

                let arr = []
                for (let param of paramTypes) {
                    if (param === FormExpression.ALLOWED_PARAMS) {
                        for (let restrictedType of myOwnValueMustBeOfType) {
                            if (!arr.includes(restrictedType)) arr.push(restrictedType)
                        }
                    }
                    else if (!arr.includes(param)) arr.push(param)
                }
                return arr
            }
        },
    }
</script>