<template>
    <div class="f cy component-container">
        <div v-for="i in nest" class="nesting-indicator"/>
        <UIButton class="edit-button" title="Edit" :class="{selected: component.selected}" @click="setSelectedComponent(component)">✎</UIButton>
        <div class="move-component-buttons f col">
            <UIButton :disabled="index === 0" @click="moveUp">▲</UIButton>
            <UIButton :disabled="index === container.components.length - 1" @click="moveDown">▼</UIButton>
        </div>
        <UIDropdown v-model="component.type">
            <option value="page">Page</option>
            <option value="label" :disabled="component.components.length !== 0">Label</option>
            <option value="button" :disabled="component.components.length !== 0">Button</option>
            <option value="dropdown" :disabled="component.components.length !== 0">Dropdown</option>
            <option value="shortText" :disabled="component.components.length !== 0">Short Text Input</option>
            <option value="longText" :disabled="component.components.length !== 0">Multiline Text Input</option>
            <option value="number" :disabled="component.components.length !== 0">Number Input</option>
            <option value="photo" :disabled="component.components.length !== 0">Photo</option>
            <option value="draw" :disabled="component.components.length !== 0">Draw</option>
        </UIDropdown>
        <UIInput v-model="component.name"/>
        <UIButton class="small" v-show="this.component.type === 'page'" @click="addComponent(this.component.components)">+</UIButton>
        <div class="square c" :style="styles()" v-show="['label','button','dropdown','shortText','longText','number'].includes(this.component.type)">🗚</div>
        <UIButton class="small" @click="container.components.splice(index, 1)">🗑️</UIButton>
    </div>
    <template v-if="this.component.type === 'page'" v-for="(comp, index) in this.component.components">
        <FormEditorListedComponent :component="comp" :index="index" :nest="nest + 1" :container="component"/>
    </template>
</template>

<style>
    .move-component-buttons button {
        font-size: 0.5rem;
        padding: 0 0.5rem;
    }
    .component-container .edit-button {
        padding-left: 0;
        padding-right: 0;
    }
    select {
        width: 100px;
    }
</style>

<style scoped>
    .component-container {
        max-height: 2.4rem;
        overflow: hidden;
        padding: 0.5rem 0;
    }
    .nesting-indicator {
        height: 2.4rem;
        width: 4px;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        background-color: var(--outline);
    }
    .square {
        height: 1.5rem;
        width: 1.5rem;
        border: 1px solid var(--outline);
        border-radius: 0.5rem;
    }
</style>

<script>
    export default {
        props: {
            container: Object,
            component: Object,
            index: Number,
            nest: {
                default: 0,
            }
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
            styles() {
                return {
                    "background-color": "var(--"+this.component.bgColor+")",
                    "font-size": this.component.fontSize + "rem",
                    "color": "var(--"+this.component.fontColor+")",
                }
            },
            moveUp() {
                [this.container.components[this.index - 1], this.container.components[this.index]] = [this.container.components[this.index], this.container.components[this.index - 1]]
            },
            moveDown() {
                [this.container.components[this.index], this.container.components[this.index + 1]] = [this.container.components[this.index + 1], this.container.components[this.index]]
            }
        },
        inject: ["setSelectedComponent", "setComponent", "layout", "getComponentContainer", "addComponent"]
    }
</script>