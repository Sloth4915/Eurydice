<template>
    <template v-if="component.type === 'page'" v-for="(component, index) in component.components">
        <FormEditorComponent :component="component" :index="index"/>
    </template>
    <div v-else :style="styles()" class="component f c" :class="{selected: component.selected}" @mousedown.prevent.stop="beginDrag('x', 'y', false)">
        <div class="dragPoint br align-end justify-end" ref="br" @mousedown.prevent.stop="beginDrag('width', 'height', false)"></div>
        
            
        <template v-if="component.type === 'label'">
            <img v-if="component.image !== null" :src="component.image">
            <div class="content f c">{{ component.labelText }}</div>
        </template>
        <template v-else-if="component.type === 'button'">
            <img v-if="component.image !== null" :src="component.image">
            <div class="content f c">{{ component.labelText }}</div>
        </template>
        <template v-else>
            a {{ component.type }} called "{{ component.name }}"
        </template>
    </div>
</template>

<style scoped>
    div.component {
        position: absolute;
        overflow: hidden;
    }
    div.component.selected {
        border: 4px solid var(--outline);
    }
    .dragPoint {
        position: absolute;
        width: 1rem;
        height: 1rem;
        cursor: nwse-resize;
        bottom: 0;
        right: 0;
        font-size: 1rem;
        padding: 0;
        background: linear-gradient(315deg, var(--font) 0%, var(--font) 50%, transparent 50%, transparent 100%);
        z-index: 1000;
    }
    img {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .content {
        z-index: 0;
        line-break: normal;
        color: inherit;
    }
</style>

<script>
    export default {
        props: {
            component: Object
        },
        setup() {
            const { x, y } = useMouse({ type: 'client' });

            return {
                mouseX: x,
                mouseY: y,
            };
        },
        data() {
            return {
                dragDetails: null,
            }
        },
        mounted() {
            console.log(useMouse())
            watch([useMouse().x, useMouse().y], this.mouseMove)
            useEventListener(document, ["mouseleave", "mouseup"], this.endDrag)
        },
        unmounted() {
            
        },
        methods: {
            styles() {
                return {
                    width: Math.round(this.component.layouts[this.layout].width / this.snap) * this.snap + "%",
                    height: Math.round(this.component.layouts[this.layout].height / this.snap) * this.snap + "%",
                    left: Math.round(this.component.layouts[this.layout].x / this.snap) * this.snap + "%",
                    top: Math.round(this.component.layouts[this.layout].y / this.snap) * this.snap + "%",
                    "background-color": "var(--"+this.component.bgColor+")",
                    "font-size": this.component.fontSize + "rem",
                    "color": "var(--"+this.component.fontColor+")",
                }
            },
            mouseMove() {
                if (this.dragDetails === null) return
                this.component.layouts[this.layout][this.dragDetails.xAttr] += (this.mouseX - this.dragDetails.mx) / this.getPhoneWidth() * this.dragDetails.inverted * 100
                this.component.layouts[this.layout][this.dragDetails.yAttr] += (this.mouseY - this.dragDetails.my) / this.getPhoneHeight() * this.dragDetails.inverted * 100

                if (this.dragDetails.xAttr === "x") this.component.layouts[this.layout].x = Math.max(Math.min(100 - this.component.layouts[this.layout].width, this.component.layouts[this.layout].x), 0)
                else if (this.dragDetails.xAttr === "width") this.component.layouts[this.layout].width = Math.max(Math.min(100 - this.component.layouts[this.layout].x, this.component.layouts[this.layout].width), this.snap)
                if (this.dragDetails.yAttr === "y") this.component.layouts[this.layout].y = Math.max(Math.min(100 - this.component.layouts[this.layout].height, this.component.layouts[this.layout].y), 0)
                else if (this.dragDetails.yAttr === "height") this.component.layouts[this.layout].height = Math.max(Math.min(100 - this.component.layouts[this.layout].y, this.component.layouts[this.layout].height), this.snap)

                this.dragDetails.mx = this.mouseX
                this.dragDetails.my = this.mouseY
            },
            beginDrag(xAttr, yAttr, inverted) {
                this.setSelectedComponent(this.component)
                this.dragDetails = {
                    xAttr,
                    yAttr,
                    inverted: inverted ? -1 : 1,
                    mx: this.mouseX,
                    my: this.mouseY
                }
            },
            endDrag() {
                this.dragDetails = null
                this.component.layouts[this.layout] = {
                    width: Math.round(this.component.layouts[this.layout].width / this.snap) * this.snap,
                    height: Math.round(this.component.layouts[this.layout].height / this.snap) * this.snap,
                    x: Math.round(this.component.layouts[this.layout].x / this.snap) * this.snap,
                    y: Math.round(this.component.layouts[this.layout].y / this.snap) * this.snap,
                }
            }
        },
        inject: ["getPhoneWidth", "getPhoneHeight", "snap", "setSelectedComponent", "setComponent", "layout"]
    }
</script>