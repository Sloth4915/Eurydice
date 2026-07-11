<template>
    <div :style="styles()" class="f c" @mousedown.prevent.stop="beginDrag('x', 'y', false)">
        <div class="dragPoint br align-end justify-end" ref="br" @mousedown.prevent.stop="beginDrag('width', 'height', false)"></div>
        {{ component.name }}
    </div>
</template>

<style scoped>
    div {
        position: absolute;
        background-color: var(--panel);
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