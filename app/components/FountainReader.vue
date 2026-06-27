<template>
    <UIDialog ref="dialog" closeable :onUserClose="cancel">
        <template v-if="!done">
            <div class="title">Scan QR Codes</div>
            <div class="streamHolder">
                <video ref="cameraFeed"></video>
            </div>
            <div class="header">{{ Math.round(data * 10000)/100 }}%</div>
            <div class="subscript">If your device's camera is bad, you may need to lower the FPS on the device that is sharing data.</div>
        </template>

        <template v-else>
            <div class="title">Does this look right?</div>
            <UITextarea :model-value="data" rows="15" cols="50"/>
            <UIButton @click="() => callback(data)">Confirm</UIButton>
            <div class="subscript">Click outside this box to cancel</div>
        </template>
    </UIDialog>
</template>

<style scoped>
    video {
        width: 100%;
        height: 100%;

    }
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
    import jsQR from "jsqr";
    import {
        parseFramesReducer,
        areFramesComplete,
        framesToData,
        progressOfFrames,
    } from "qrloop";
    import LZString from 'lz-string';

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
                scanner: null,
                animationId: null,
            }
        },
        mounted() {
            this.$refs.dialog.show()

            this.startScanning()
        },
        unmounted() {
            cancelAnimationFrame(this.animationId)
        },
        methods: {
            startScanning() {
                let video = this.$refs.cameraFeed
                let ctx = this
                navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
                    video.srcObject = stream;
                    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
                    video.play();
                    ctx.tick()
                });
            },
            detect(a) {
                this.qrFrames = parseFramesReducer(this.qrFrames, a.data)
                if (areFramesComplete(this.qrFrames)) {
                    this.done = true
                    this.data = LZString.decompressFromUTF16(framesToData(this.qrFrames).toString())
                    cancelAnimationFrame(this.animationId)
                } else this.data = progressOfFrames(this.qrFrames)
            },
            tick() {
                let video = this.$refs.cameraFeed
                let ctx = this
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    setTimeout(() => {
                        let canvas = new OffscreenCanvas(video.videoWidth, video.videoHeight).getContext("2d")
                        canvas.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
                        let img = canvas.getImageData(0,0,1000,1000)
                        let code = jsQR(img.data, img.width, img.height)
                        if (code) {
                            ctx.detect(code)
                        }
                    },1)
                }
                this.animationId = requestAnimationFrame(this.tick)
            }
        },
    }
</script>