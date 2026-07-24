<template>
    <div class="f cy component-container">
        <UIButton class="edit-button" title="Edit" @click="this.open = !this.open">✎</UIButton>
        <UIDropdown v-model="field.type">
            <option value="str">String</option>
            <option value="int">Integer</option>
            <option value="dec">Decimal</option>
            <option value="bool">Boolean</option>
            <option value="tags">Tags</option>
            <option value="imgs">Images</option>
        </UIDropdown>
        <UIInput v-model="field.name"/>
    </div>
</template>

<style>
    .move-component-buttons button {
        font-size: 0.5rem;
        padding: 0 0.5rem;
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
            field: Object
        },
        data() {
            return {
                open: false,
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        },
        methods: {
            
        },
    }
</script>