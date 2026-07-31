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