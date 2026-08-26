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
            <UIButton class="small" @click="fields.splice(index, 1)">🗑️</UIButton>
            <div class="fill"/>
            {{ field.visualId }}
        </div>
        <div class="edit f cx col" :class="{open}, [field.type]">
            <template v-if="field.type == 'str'">
                <UIInput v-model="field.default" label="Default"></UIInput>
                <UIInput v-model="field.maxLength" label="Max Characters" max="2000" min="0" type="number"></UIInput>
            </template>
            <template v-else-if="field.type == 'int'">
                <UIInput v-model="field.default" label="Default" type="number" step="1" :min="field.min" :max="field.max"></UIInput>
                <div class="f">
                    <UIInput @change="changeType" v-model="enableMin" type="checkbox"></UIInput>
                    <UIInput :disabled="!enableMin" v-model="field.min" label="Min" step="1" type="number" :max="field.max"></UIInput>
                    <div class="fill"></div>
                    <UIInput @change="changeType" v-model="enableMax" type="checkbox"></UIInput>
                    <UIInput :disabled="!enableMax" v-model="field.max" label="Max" step="1" type="number" :min="field.min"></UIInput>
                </div>
                <UIInput v-model="field.step" label="Step" title="This is how much the value will increase/decrease by, by default." type="number" step="1" :min="field.min" :max="field.max"></UIInput>
            </template>
            <template v-else-if="field.type == 'dec'">
                <UIInput v-model="field.default" label="Default" type="number" :min="field.min" :max="field.max"></UIInput>
                <div class="f">
                    <UIInput @change="changeType" v-model="enableMin" type="checkbox"></UIInput>
                    <UIInput :disabled="!enableMin" v-model="field.min" label="Min" type="number" :max="field.max"></UIInput>
                    <div class="fill"></div>
                    <UIInput @change="changeType" v-model="enableMax" type="checkbox"></UIInput>
                    <UIInput :disabled="!enableMax" v-model="field.max" label="Max" type="number" :min="field.min"></UIInput>
                </div>
                <UIInput v-model="field.step" label="Step" title="This is how much the value will increase/decrease by, by default." type="number" :min="field.min" :max="field.max"></UIInput>
                <UIInput v-model="field.roundDigits" label="Rounding Digits" type="number" step="1" :min="0" :max="12"></UIInput>
            </template>
            <template v-else-if="field.type == 'bool'">
                <UIInput v-model="field.default" label="Default" type="checkbox"></UIInput>
            </template>
            <template v-else-if="field.type == 'tags'">
                <UIInput v-model="field.allowMultiple" label="Allow Selecting Multiple" type="checkbox"></UIInput>
                Tags may not have any defaults
                <UIButton @click="field.options.push('Unnamed Option ' + field.options.length)">Add Tag</UIButton>
                <div class="tags-list">
                    <div class="f" v-for="(tag, index) in field.options">
                        <UIInput v-model="field.options[index]"/> <UIButton @click="field.options.splice(index,1)">Remove</UIButton>
                    </div>
                </div>
                <div class="warn">{{ (field.options.filter((item, index) => field.options.indexOf(item) !== index)).length > 0 ? "Multiple tags have the same name, this may cause issues" : "" }}</div>
            </template>
            <template v-else-if="field.type == 'imgs'">
                <UIInput v-model="field.allowMultiple" label="Allow Multiple Images" type="checkbox"></UIInput>
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
        transition-timing-function: ease-out;
    }
    .edit.open.str {
        height: 4rem;
        max-height: 4rem;
    }
    .edit.open.int {
        height: 6rem;
        max-height: 6rem;
    }
    .edit.open.dec {
        height: 7rem;
        max-height: 7rem;
    }
    .edit.open.bool {
        height: 2rem;
        max-height: 2rem;
    }
    .edit.open.tags {
        height: 16rem;
        max-height: 16rem;
    }
    .tags-list {
        height: 10rem;
        overflow-y: scroll;
    }
    .edit.open.imgs {
        height: 2rem;
        max-height: 2rem;
    }
</style>

<script>
    export default {
        props: {
            field: Object,
            index: Number,
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
                    this.field.options = Array.isArray(this.field.options) ? this.field.options : []
                    this.field.allowMultiple = typeof this.field.allowMultiple === "boolean" ? this.field.allowMultiple : false
                }
                else if (this.field.type === "imgs") {
                    this.field.allowMultiple = typeof this.field.allowMultiple === "boolean" ? this.field.allowMultiple : false
                }
                console.log(this.field)
            }
        },
        inject: ["fields"]
    }
</script>