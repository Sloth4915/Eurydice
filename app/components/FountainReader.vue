<template>
    <UIDialog ref="dialog" closeable :onUserClose="cancel">
        <template v-if="!done">
            <div class="title">Scan QR Codes</div>
            <div class="streamHolder">
                <QrcodeStream
                    @error="error"
                    @detect="detect"
                />
            </div>
            <div class="header">{{ Math.round(data * 10000)/100 }}%</div>
            <div class="subscript">If your device's camera is bad, you may need to lower the FPS on the device that is sharing data.</div>
        </template>

        <template v-else>
            <textarea>{{ data }}</textarea>
        </template>
    </UIDialog>
</template>

<style scoped>
    dialog {
        position: absolute;
        top: 0;
        left: 0;
    }
    dialog::backdrop {
        filter: blur(2px);
    }
    .streamHolder {
        width: max(60vw, 200px);
        height: max(60vh, 200px);
        border-radius: 1rem;
        overflow: hidden;
    }
</style>

<script>
    import {
        parseFramesReducer,
        areFramesComplete,
        framesToData,
        progressOfFrames,
    } from "qrloop";
    export default {
        props: {
            callback: Function,
            cancel: Function
        },
        data() {
            return {
                qrFrames: null,
                done: false,
                data: null,
            }
        },
        mounted() {
            this.$refs.dialog.show()
        },
        unmounted() {
            
        },
        methods: {
            detect(a) {
                this.qrFrames = parseFramesReducer(this.qrFrames, a[0].rawValue)
                if (areFramesComplete(this.qrFrames)) {
                    this.done = true
                    this.data = (framesToData(this.qrFrames).toString())
                    if (typeof this.callback === "function") this.callback(data)
                } else this.data = progressOfFrames(this.qrFrames)
            },
            error(a) {
                console.error(a)
            }
        },
    }
</script>