<template>
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
    <div class="component-position f gap between">
        <UIDropdown label="🗚" title="Font Size Character" v-model="component.fontSize">
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
    <template v-if="component.type === 'label'">
        <UIInput v-model="component.labelText" label="Label Text"/>
        <UIImageUpload :allowMultiple="false" v-model="component.image" :deletable="true"/>
    </template>
</template>

<style>
    .component-position input {
        width: 50px !important; 
        max-width: 50px !important;
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
                
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        },
        methods: {
            
        },
        inject: ["snap", "layout"]
    }
</script>