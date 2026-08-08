<template>
    <div class="holder gap between"> 
        <div class="f col gap">
            <div class="panel edit-panel general">
                <div class='header cy'>Form Settings</div>
                <UIInput title="Form Name" v-model="name" placeholder="Form Name"/>
                Placeholder for layout select
            </div>
            <div class="panel edit-panel list">
                <div class='header cy between'>
                    Fields
                    <UIButton @click="addField">Add Field</UIButton>
                </div>
                <template v-for="field of fields">
                    <FormEditorListedField :field="field"/>
                </template>
            </div>
        </div>

        <div class="f col gap">
            <div class="panel edit-panel list">
                <div class="row header cy between">
                    Form Components
                    <UIButton @click="addComponent()">+</UIButton>
                </div>
                <template v-for="(component, index) of components">
                    <FormEditorListedComponent :container="this" :component="component" :index="index"/>
                </template>
            </div>
            <div class="panel edit-panel general">
                <FormEditorComponentSettings v-if="selectedComponent !== null" :component="selectedComponent"/>
                <template v-else>
                    <div class='header cy'>Component Settings</div>
                    Select a component
                </template>
            </div>
        </div>

        <div class="phone panel" ref="phone">
            <template v-for="(component, index) in components">
                <FormEditorComponent :component="component" :index="index"/>
            </template>
        </div>
    </div>
</template>

<style>

</style>

<style scoped>
    .edit-panel {
        width: 30vw;
        overflow: hidden;
    }
    .edit-panel.general {
        height: 30vh;
    }
    .edit-panel.list {
        height: 57vh;
        overflow-y: auto;
    }
    .edit-panel .header {
        position: sticky;
        background-color: var(--panel);
        height: 2.5rem;
        top: 0;
        transform: translateY(-0.75rem);
    }
    .phone {
        width: 100%;
        height: 100%;
        max-width: 30vw;
        max-height: 90vh;
        aspect-ratio: 9 / 19.5;
        object-fit: contain;
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
        outline: 4px solid var(--outline);
        background-color: var(--bg);
    }
</style>

<script>
    import { v4 as uuidv4 } from 'uuid'
    export default {
        props: {
            
        },
        data() {
            return {
                name: '',
                fields: [],
                components: [],

                timed: false,
                timedFields: [],

                layouts: {},

                selectedComponent: null,

                layout: "portrait",
                snap: 1,

                fieldId: 0,
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        },
        methods: {
            addComponent(to = this.components) {
                console.log("adding", to)
                to.push({
                    name: "Untitled Component",
                    type: "label",
                    value: "",
                    showIf: [["var", "a", "=", "const", "5"], "and", true],
                    layouts: {
                        portrait: {
                            x: 10,
                            y: 10,
                            width: 10,
                            height: 10,
                        }
                    },
                    id: uuidv4(),
                    selected: false,

                    fontSize: 1,
                    fontColor: "font",
                    bgColor: "panel",

                    labelText: "Label",
                    image: null,
                    onTap: [],
                    onDown: [],
                    onUp: [],
                    onChange: [],
                    components: [],
                })
                this.setSelectedComponent(to[to.length-1]) 
            },
            getComponent(id, container = this) {
                console.log(id, container)
                for (let comp of container.components) {
                    if (comp.id === id) return comp
                    else if (comp.type === "page") {
                        let result = this.getComponent(id, comp)
                        if (result !== null) return result
                    }
                }
                return null
            },
            getComponentContainer(id, container = this) {
                for (let comp of container.components) {
                    if (comp.id === id) return container
                    else if (comp.type === "page") {
                        let result = this.getComponent(id, comp)
                        if (result !== null) return comp
                    }
                }
                return null
            },
            forEachComponent(func, container = this) {
                for (let comp of container.components) {
                    if (comp.type === "page") {
                        this.forEachComponent(func, comp)
                    }
                    func(comp)
                }
            },

            addField() {
                this.fields.push({
                    name: "Unnamed Field",
                    type: "str",
                    value: "",
                    default: "",
                    options: "",
                    visualId: ((this.fieldId++)+"").padStart(3, "0"),
                    id: uuidv4()
                })
            }
        },
        provide() {
            return {
                getPhoneWidth: () => (this.$refs.phone.offsetWidth),
                getPhoneHeight: () => (this.$refs.phone.offsetHeight),
                snap: this.snap,
                getSelectedComponent: () => (this.selectedComponent),
                layout: this.layout,
                setSelectedComponent: (to) => {
                    this.selectedComponent = to
                    this.forEachComponent((comp) => {
                        comp.selected = comp.id === to.id
                    })
                },
                setComponent: (id,to) => {
                    let a = this.getComponent(id)
                    a = to
                },
                getComponentContainer: this.getComponentContainer,
                addComponent: this.addComponent
            }
        }
    }
</script>