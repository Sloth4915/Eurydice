<template>
    <div :style="styles()" class="f c" @mousedown="beginDrag('x', 'y', false)">
        <div class="dragPoint br" ref="br" @mousedown.stop="beginDrag('width', 'height', false)"></div>
    </div>
</template>

<style scoped>
    div {
        position: absolute;
        background-color: purple;
    }
    .dragPoint {
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        background-color: blue;
        cursor: move;
    }
    .tl {
        top: 0;
        left: 0;
    }
    .tr {
        top: 0;
        right: 0;
    }
    .bl {
        bottom: 0;
        left: 0;
    }
    .br {
        bottom: 0;
        right: 0;
    }
    .mid {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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