<template>
    <dialog ref="dialog" :class="{'holder': open}" @click.self="bgClick">
        <div class="panel f cy col" ref="panel">
            <slot/>
        </div>
    </dialog>
</template>

<style scoped>
    dialog {
        background: rgba(0,0,0,0.2);
        border: 0px;
        outline: 0px;
        backdrop-filter: blur(3px);
        max-width: 100vw;
        max-height: 100vh;
    }
    
</style>

<script>
    export default {
        props: {
            closeable: Boolean,
            onUserClose: Function
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
            /** Does showModal */
            show() {
                this.$refs.dialog.showModal()
                this.open = true
            },
            showModal() {
                this.$refs.dialog.showModal()
                this.open = true
            },
            close() {
                this.$refs.dialog.close()
                this.open = false
            },

            bgClick() {
                if (this.closeable) {
                    this.close()
                    if (typeof this.onUserClose === 'function') this.onUserClose()
                }
            }
        },
    }
</script>