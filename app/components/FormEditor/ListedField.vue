<template>
    <div class="f cx col field-container">
        <div class="f">
            <UIButton class="edit-button" :class="{selected: open}" title="Edit" @click="open = !open">✎</UIButton>
            <UIDropdown @change="changeType" v-model="field.type">
                <option value="str">String</option>
                <option value="int">Integer</option>
                <option value="dec">Decimal</option>
                <option value="bool">Boolean</option>
                <option value="tags">Tags</option>
                <option value="imgs">Images</option>
            </UIDropdown>
            <UIInput v-model="field.name"/>
        </div>
        <div class="edit f cx col" :class="{open}">
            <template v-if="field.type == 'str'">
                <UIInput v-model="field.default" label="Default"></UIInput>
                <UIInput v-model="field.maxLength" label="Max Characters" max="2000" min="0" type="number"></UIInput>
            </template>
            <template v-else-if="field.type == 'int'">
                <UIInput v-model="field.default" label="Default" type="number" :min="field.min" :max="field.max"></UIInput>
                <div class="f">
                    <UIInput @change="changeType" v-model="enableMin" type="checkbox"></UIInput>
                    <UIInput :disabled="!enableMin" v-model="field.min" label="Min" step="1" type="number" :max="field.max"></UIInput>
                    <div class="fill"></div>
                    <UIInput @change="changeType" v-model="enableMax" type="checkbox"></UIInput>
                    <UIInput :disabled="!enableMax" v-model="field.max" label="Max" step="1" type="number" :min="field.min"></UIInput>
                </div>
                <UIInput v-model="field.step" label="Step" title="This is how much the value will increase/decrease by, by default." type="number" :min="field.min" :max="field.max"></UIInput>
            </template>
        </div>
    </div>
</template>

<style>
    .field-container {
        margin-bottom: 0.5rem;
    }
    .field-container .edit-button {
        padding-left: 0;
        padding-right: 0;
    }
    .fill {
        min-width: 2rem;
    }
</style>

<style scoped>
    .field-container {
        border: 1px solid var(--outline);
        border-radius: 0.5rem;
        padding: 0.5rem;
    }
    select {
        width: 100px;
    }
    .edit {
        height: 0rem;
        max-height: 0;
        overflow-y: hidden;
        transition: 200ms max-height, 200ms height;
    }
    .edit.open {
        height: 6rem;
        transition-timing-function: ease-out;
        max-height: 6rem;
    }
</style>

<script>
    export default {
        props: {
            field: Object
        },
        data() {
            return {
                open: false,
                enableMin: false,
                enableMax: false,
            }
        },
        mounted() {
            this.changeType()
        },
        unmounted() {
            
        },
        methods: {
            changeType() {
                if (this.field.type === "str") {
                    this.field.default = typeof this.field.default === "string" ? this.field.default : ""
                    this.field.maxLength = this.field.maxLength ?? 1000
                }
                else if (this.field.type === "int") {
                    this.field.default = isNaN(parseInt(this.field.default)) ? 0 : parseInt(this.field.default) 
                    this.field.min = this.enableMin ? (isNaN(parseInt(this.field.min)) ? 0 : Math.round(this.field.min)) : null
                    this.field.max = this.enableMax ? (isNaN(parseInt(this.field.max)) ? 0 : Math.round(this.field.max)) : null
                    this.field.step = !isNaN(parseInt(this.field.step)) ? 1 : Math.round(this.field.step)
                }
                else if (this.field.type === "dec") {
                    this.field.default = isNaN(parseFloat(this.field.default)) ? 0 : parseFloat(this.field.default) 
                    this.field.min = this.enableMin ? (isNaN(parseFloat(this.field.min)) ? 0 : Math.round(this.field.min)) : null
                    this.field.max = this.enableMax ? (isNaN(parseFloat(this.field.max)) ? 0 : Math.round(this.field.max)) : null
                    this.field.step = !isNaN(parseFloat(this.field.step)) ? 1 : this.field.step
                    this.field.roundDigits = this.field.roundDigits ?? 2
                }
                else if (this.field.type === "bool") {
                    this.field.default = typeof this.field.default === "boolean" ? this.field.default : false
                }
                else if (this.field.type === "tags") {

                }
                else if (this.field.type === "imgs") {

                }
                console.log(this.field)
            }
        },
    }
</script>