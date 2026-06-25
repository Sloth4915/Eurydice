<template>
    <div class="col c">
        <template v-if="data === null">You forgot to pass in data</template>
        <template v-else>
            <canvas ref="canvas" width="300" height="300"/>
            {{ qrIndex }} / {{ qrFrames.length }}
            <div class="f c row"> 
                <input type="range" min="50" max="500" v-model="rate" @change="setRateInterval"> 
                <div class="fps-counter"> {{ Math.round(1000/rate) }} fps </div> 
            </div>
        </template>
    </div>
</template>

<style scoped>
    .fps-counter {
        width: 60px;
    }
</style>

<script>
    import { dataToFrames } from "qrloop";
    import QRCode from "qrcode";
    export default {
        props: {
            data: String
        },
        data() {
            return {
                qrFrames: [],
                qrIndex: 0,
                
                rate: 350,
                rateInterval: -1
            }
        },
        mounted() {
            this.qrFrames = dataToFrames(this.data, 130)
            this.qrIndex = 0
            this.setRateInterval()
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
            
        }
    }
</script>