<template>
    <div class="f cy component-container">
        <div class="nesting-indicator"/>
        <UIButton class="edit-button" title="Edit" :class="{selected: component.selected}" @click="setSelectedComponent(component)">✎</UIButton>
        <div class="move-component-buttons f col">
            <UIButton :disabled="index === 0" @click="moveUp">▲</UIButton>
            <UIButton :disabled="index === getComponentContainer(component) - 1" @click="moveDown">▼</UIButton>
        </div>
        <UIDropdown v-model="component.type">
            <option value="page">Page</option>
            <option value="label">Label</option>
            <option value="button">Button</option>
            <option value="dropdown">Dropdown</option>
            <option value="shortText">Short Text Input</option>
            <option value="longText">Multiline Text Input</option>
            <option value="number">Number Input</option>
            <option value="photo">Photo</option>
            <option value="draw">Draw</option>
        </UIDropdown>
        <UIInput v-model="component.name"/>
    </div>
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
        background-color: var(--outline);
    }
</style>

<script>
    export default {
        props: {
            component: Object,
            index: Number,
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
            moveUp() {
                console.log(this.getComponentContainer(this.component.id))
            },
            moveDown() {

            }
        },
        inject: ["setSelectedComponent", "setComponent", "layout", "getComponentContainer"]
    }
</script>