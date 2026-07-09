<template>
    <div :style="styles()" class="f c" @mousedown.prevent.stop="beginDrag('x', 'y', false)">
        <div class="dragPoint br align-end justify-end" ref="br" @mousedown.prevent.stop="beginDrag('width', 'height', false)"></div>
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
        cursor: move;
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
                width: 30,
                height: 20,
                x: 10,
                y: 20,
                dragDetails: null,
                snap: 5,
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
                    width: Math.round(this.width / this.snap) * this.snap + "%",
                    height: Math.round(this.height / this.snap) * this.snap + "%",
                    left: Math.round(this.x / this.snap) * this.snap + "%",
                    top: Math.round(this.y / this.snap) * this.snap + "%",
                }
            },
            mouseMove() {
                if (this.dragDetails === null) return
                this[this.dragDetails.xAttr] += (this.mouseX - this.dragDetails.mx) / this.getPhoneWidth() * this.dragDetails.inverted * 100
                this[this.dragDetails.yAttr] += (this.mouseY - this.dragDetails.my) / this.getPhoneHeight() * this.dragDetails.inverted * 100

                if (this.dragDetails.xAttr === "x") this.x = Math.max(Math.min(100 - this.width, this.x), 0)
                else if (this.dragDetails.xAttr === "width") this.width = Math.max(Math.min(100 - this.x, this.width), this.snap)
                if (this.dragDetails.yAttr === "y") this.y = Math.max(Math.min(100 - this.height, this.y), 0)
                else if (this.dragDetails.yAttr === "height") this.height = Math.max(Math.min(100 - this.y, this.height), this.snap)

                this.dragDetails.mx = this.mouseX
                this.dragDetails.my = this.mouseY
            },
            beginDrag(xAttr, yAttr, inverted) {
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
            }
        },
        inject: ["getPhoneWidth", "getPhoneHeight"]
    }
</script>