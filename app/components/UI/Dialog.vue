<template>
    <dialog ref="dialog" :class="{'holder': open, popup: popup, normal: !popup}" :style="{top: y + 'px', left: x + 'px'}">
        <div class="panel f cy col" ref="panel">
            <slot/>
        </div>
    </dialog>
</template>

<style scoped>
    dialog {
        border: 0;
        outline: 0;
        max-width: 100vw;
        max-height: 100vh;
    }
    dialog.normal {
        background: rgba(0,0,0,0.2);
        backdrop-filter: blur(3px);
    }
    dialog.popup {
        margin: 0;
        position: absolute;
        max-width: fit-content;
        max-height: fit-content;
        outline: none;
        background: none;
    }
    dialog.popup .panel {
        border: 1px solid var(--font);
    }
</style>

<script>
    const { x, y } = useMouse({type: 'client'})
    export default {
        props: {
            closeable: Boolean,
            onUserClose: Function,
        },
        data() {
            return {
                open: false,

                popup: false,
                x: 0,
                y: 0,
            }
        },
        mounted() {
            onClickOutside(this.$refs.panel, event => {
                this.close()
                if (typeof this.onUserClose === 'function') this.onUserClose()
            })
        },
        unmounted() {
            
        },
        methods: {
            openPopup() {
                this.$refs.dialog.show()
                this.popup = true
                this.open = true
                console.log(x,y)
                this.x = x.value + 0
                this.y = y.value + 0
            },
            /** Does showModal */
            show() {
                this.$refs.dialog.showModal()
                this.popup = false
                this.open = true
            },
            showModal() {
                this.$refs.dialog.showModal()
                this.popup = false
                this.open = true
            },
            close() {
                this.$refs.dialog.close()
                this.open = false
            },
        },
        directives: ["click-outside"]
    }
</script>