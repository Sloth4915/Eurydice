<template>
    <div class='header cy between'>
        Component Settings
        <UIDropdown v-model="option">
            <option value="visuals" :disabled="component.type == 'page' ? true : null">Visuals</option>
            <option value="behaviour">Behaviour</option>
        </UIDropdown>
    </div>
    <div class="f col gap" v-show="option == 'visuals'">
        <div class="component-position f gap between">
            <div class="f gap">
                <UIInput title="Component x as a percent of whole" 
                            label="X" 
                            type="number" 
                            v-model="component.layouts[this.layout].x" 
                            :step="snap" 
                            min="0"
                            :max="100-component.layouts[this.layout].width"
                            />
                <UIInput title="Component y as a percent of whole" 
                            label="Y" 
                            type="number" 
                            v-model="component.layouts[this.layout].y" 
                            :step="snap" 
                            min="0"
                            :max="100-component.layouts[this.layout].height"
                            />
            </div>
            <div class="f gap">
                <UIInput title="Component width as a percent of whole" 
                            label="W" 
                            type="number" 
                            v-model="component.layouts[this.layout].width" 
                            :step="snap" 
                            :min="snap"
                            :max="100-component.layouts[this.layout].x"
                            />
                <UIInput title="Component height as a percent of whole" 
                            label="H" 
                            type="number" 
                            v-model="component.layouts[this.layout].height" 
                            :step="snap" 
                            :min="snap"
                            :max="100-component.layouts[this.layout].y"
                            />
            </div>
        </div>
        <div class="f col gap between styling-selections">
            <UIDropdown label="🗚 Font Size" title="Font Size Character" v-model="component.fontSize">
                <option value="0.5">Microscopic</option>
                <option value="0.8">Tiny</option>
                <option value="0.9">Small</option>
                <option value="1">Normal</option>
                <option value="1.3">Big</option>
                <option value="1.5">Bigger</option>
                <option value="2">Large</option>
                <option value="2.5">Huge</option>
                <option value="3">Massive</option>
                <option value="4">Elephant</option>
            </UIDropdown>
            <UIDropdown label="Font" title="Font Color" v-model="component.fontColor">
                <optgroup label="Eurydice">
                    <option value="panel">BG Default</option>
                    <option value="font">Font Default</option>
                    <option value="primary">Theme Primary</option>
                    <option value="secondary">Theme Secondary</option>
                    <option value="outline">Theme Outline</option>
                </optgroup>
                <optgroup label="Colors">
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                    <option value="cyan">Cyan</option>
                    <option value="blue">Blue</option>
                    <option value="magenta">Magenta</option>
                    <option value="purple">Purple</option>
                    <option value="lilac">Lilac</option>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="gray">Gray</option>
                    <option value="pink">Pink</option>
                    <option value="brown">Brown</option>
                    <option value="transparent">Transparent</option>
                </optgroup>
            </UIDropdown>
            <UIDropdown label="BG" title="Background Color" v-model="component.bgColor">
                <optgroup label="Eurydice">
                    <option value="panel">BG Default</option>
                    <option value="font">Font Default</option>
                    <option value="primary">Theme Primary</option>
                    <option value="secondary">Theme Secondary</option>
                    <option value="outline">Theme Outline</option>
                </optgroup>
                <optgroup label="Colors">
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                    <option value="cyan">Cyan</option>
                    <option value="blue">Blue</option>
                    <option value="magenta">Magenta</option>
                    <option value="purple">Purple</option>
                    <option value="lilac">Lilac</option>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="gray">Gray</option>
                    <option value="pink">Pink</option>
                    <option value="brown">Brown</option>
                    <option value="transparent">Transparent</option>
                </optgroup>
            </UIDropdown>
        </div>
        <UIInput v-model="component.labelText" label="Label Text" v-if="['label','button','dropdown','shortText','longText','number','photo','draw'].includes(component.type)"/>
        <UIImageUpload :allowMultiple="false" v-model="component.image" :deletable="true" v-if="['label','button','draw'].includes(component.type)"/>
    </div>
    <div class="f col gap" v-show="option == 'behaviour'">
        <FormEditorExpressionEditor label="Show If" v-model="component.showIf"/>
        <template v-if="component.type === 'button'">
            <FormEditorExpressionEditor label="On Tap" type="action" v-model="component.onTap"/>
            <FormEditorExpressionEditor label="On Down" type="action" v-model="component.onDown"/>
            <FormEditorExpressionEditor label="On Up" type="action" v-model="component.onUp"/>
        </template>
        <template v-else-if="component.type === 'dropdown'">
            <FormEditorExpressionEditor label="On Change" type="action" v-model="component.onChange"/>
        </template>
        <template v-else-if="component.type === 'draw'">
            To select a background image, to to the "Visuals" tab.
        </template>
    </div>
</template>

<style>
    .component-position input {
        width: 50px !important; 
        max-width: 50px !important;
    }
    .styling-selections select {
        min-width: 8rem;
    }
</style>

<style scoped>
    
</style>

<script>
    export default {
        props: {
            component: Object
        },
        data() {
            return {
                option: "visuals",
            }
        },
        mounted() {
            watch(() => this.component.id, this.onComponentChange)
            watch(() => this.component.type, this.onComponentChange)
        },
        unmounted() {
            
        },
        methods: {
            onComponentChange() {
                if (this.component.type === "page") this.option = "behaviour"
            }
        },
        inject: ["snap", "layout"]
    }
</script>