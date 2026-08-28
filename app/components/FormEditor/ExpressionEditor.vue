<template>
    <div class="f gap cy">
        <!--Label for overall expression type-->
        <label v-if="label">{{ label }}</label>

        <!--Display-->
        <div :title="value.name + ' - ' + value.description" class="f expression" :class="{'color': (nest % 2) === 0}">
            <!--Values need special handling-->
            <template v-if="type == 'value'">
                <template v-if="value.name == 'NumValue'">
                    <UIButton @click.stop="this.$refs.dialog.openPopup()">Num</UIButton>
                    <div class="parameters f"><UIInput type="number" v-model="value.value"/></div>
                </template>
                <template v-if="value.name == 'BoolValue'">
                    <UIButton @click.stop="this.$refs.dialog.openPopup()">Bool</UIButton>
                    <div class="parameters f"><UIInput type="checkbox" v-model="value.value"/></div>
                </template>
                <template v-if="value.name == 'StrValue'">
                    <UIButton @click.stop="this.$refs.dialog.openPopup()">Str</UIButton>
                    <div class="parameters f"><UIInput type="text" v-model="value.value"/></div>
                </template>
                <template v-if="value.name == 'TagsValue'">
                    <UIButton @click.stop="this.$refs.dialog.openPopup()">Tags</UIButton>
                    <div class="parameters f">
                        <template v-for="(tag, index) of value.value">
                            <UIInput class="small" v-model="value.value[index]"/>
                            <UIButton class="small" @click="value.value.splice(index, 1)">🗑️</UIButton>
                        </template>
                        <UIButton class="small" @click="value.value.push('')">+</UIButton>
                    </div>
                </template>
            </template>
            <!--Non-values-->
            <template v-else>
                <UIButton @click.stop="this.$refs.dialog.openPopup()">
                    <template v-if="value.showTitle">{{ value.name }}</template>
                    <template v-else>Change</template>
                </UIButton>
                <div class="parameters f gap f-wrap" v-if="value.visualParams.length">
                    <template v-for="elem in value.visualParams">
                        <template v-if="typeof elem === 'string'">
                            <div class="f c">{{ elem }}</div>
                        </template>
                        <template v-else>
                            <ExpressionEditor v-model="value.params[elem]" :restrictValuesTo="whatTypesAreAllowedForThisChildParameter(value.paramTypes[elem])" :nest="nest+1"/>
                        </template>
                    </template>
                </div>
            </template>
        </div>

        <!--Popup to select expression-->
        <UIDialog closeable ref="dialog">
            <div class="popup row gap">
                <div class="col">
                    Category
                    <UIButton :selected="popupPhase === 'values'" @click="popupPhase = 'values'">Values</UIButton>
                    <UIButton :selected="popupPhase === 'fields'" @click="popupPhase = 'fields'" v-show="allowType(restrictValuesTo, [FormExpression.NUM, FormExpression.BOOL, FormExpression.STR, FormExpression.TAGS, FormExpression.FIELD])">Fields</UIButton>
                    <UIButton :selected="popupPhase === 'context'" @click="popupPhase = 'context'" v-show="allowType(restrictValuesTo, [FormExpression.NUM, FormExpression.BOOL, FormExpression.STR, FormExpression.TAGS])">Context</UIButton>
                    <template v-for="(arr, name) in allowedExpressionFunctions">
                        <UIButton :selected="popupPhase === name" @click="popupPhase = name">{{ name }}</UIButton>
                    </template>
                </div>
                <div class="popup-divider"></div>
                <div class="col" v-show="popupPhase === 'values'">
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.NUM)" @click="value = new FormExpressionValue(FormExpression.NUM, 0)">Number</UIButton>
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.BOOL)" @click="value = new FormExpressionValue(FormExpression.BOOL, false)">Bool</UIButton>
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.STR)" @click="value = new FormExpressionValue(FormExpression.STR, '')">String</UIButton>
                    <UIButton v-show="allowType(restrictValuesTo, FormExpression.TAGS)" @click="value = new FormExpressionValue(FormExpression.TAGS, [])">Tags</UIButton>
                </div>
                <div class="col" v-show="popupPhase === 'fields'">
                    TODO: Field Select (also figure out how is that going to be represented in code)
                </div>
                <div class="col" v-show="popupPhase === 'context'">
                    TODO: Context Select (also figure out how is that going to be represented in code)
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
        padding: 0.4rem;
        gap: 0.3rem;
        border-radius: 0.5rem;
        min-width: 2rem;
        min-height: 0.8rem;
        background-color: var(--panel);
    }
    .expression.color {
        background-color: var(--secondary);
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
            nest: {
                default: 1,
            }
        },
        data() {
            return {
                popupPhase: "values",
                // Value of an expression with type value
                valueValue: ""
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
            },
            type: {
                get() {
                    return this.value.type
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