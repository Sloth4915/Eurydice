<template>
    <component :is="dialog ? 'UIDialog' : 'div'" class="qr-code" :class="{'panel col c': !dialog}" ref="dialog" closeable :onUserClose="cancel">
        <template v-if="data === null">You forgot to pass in data</template>
        <template v-else>
            <div class="title">Share with QR</div>
            <canvas ref="canvas" width="300" height="300"/>
            {{ qrIndex + 1 }} / {{ qrFrames.length }}
            <div class="f c row"> 
                <UIInput type="range" min="100" max="666" v-model="rate" @change="setRateInterval"/> 
                <div class="fps-counter"> {{ Math.round(1000/rate*10)/10 }} fps </div> 
            </div>
        </template>
    </component>
</template>

<style scoped>
    .fps-counter {
        width: 60px;
    }
    div.qr-code {
        width: min-content;
    }
</style>

<script>
    import { dataToFrames } from "qrloop";
    import QRCode from "qrcode";
    import UIDialog from "./UIDialog.vue";
    import LZString from 'lz-string';

    export default {
        props: {
            data: String || Object,
            dialog: {
                type: Boolean,
                default: true,
            },
            cancel: Function
        },
        data() {
            return {
                qrFrames: [],
                qrIndex: 0,
                
                rate: 333,
                rateInterval: -1
            }
        },
        mounted() {
            let data = this.data
            if (typeof data === "object") data = JSON.stringify(data)
            if (typeof data !== "string") throw new TypeError("FountainCode Component needs type String or Object")
            this.qrFrames = dataToFrames(LZString.compressToUTF16(data), 400)
            this.qrIndex = 0
            this.setRateInterval()
            this.$refs.dialog.show()
            
        },
        methods: {
            setRateInterval() {
                clearInterval(this.rateInterval)
                this.rateInterval = setInterval(() => {
                    this.qrIndex = (this.qrIndex + 1) % this.qrFrames.length
                    QRCode.toCanvas(this.$refs.canvas, this.qrFrames[this.qrIndex], {width: 300})
                }, this.rate)
            }
        },
        unmounted() {
            
        },
        components: { UIDialog }
    }
</script>