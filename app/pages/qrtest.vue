<template>
    <UIButton @click="qrExport">qr export data</UIButton>
    <UIButton @click="qrImport">read qr</UIButton>
    <template v-if="phase === 'export'">
        <FountainCode :data="testingData"/>
    </template>
    <template v-else-if="phase === 'import'">
        import {{ data }}
        <QrcodeStream
            @error="error"
            @detect="detect"
            class="qrStream"
        />
    </template>
</template>

<style>
    canvas {
        width: 400px;
        height: 400px;
    }
    .qrStream {
        max-width: 400px;
    }
</style>

<script>
    import {
        parseFramesReducer,
        areFramesComplete,
        framesToData,
        progressOfFrames,
        currentNumberOfFrames 
    } from "qrloop";
    import { Buffer } from "buffer"
    export default {
        props: {
            
        },
        data() {
            return {
                phase: '',
                data: '',

                testingData:  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu efficitur eros. Quisque nec orci sit amet nulla mattis aliquet eu nec lectus. Suspendisse consectetur non tortor et tristique. Aliquam feugiat, dolor et commodo luctus, neque magna lobortis nisi, in tempus lorem odio ut augue. Vivamus eu leo molestie, feugiat elit in, feugiat lacus. Mauris fermentum volutpat nisl sollicitudin consequat. Donec fermentum sem sed est sollicitudin congue. Pellentesque ac congue lacus. Nam mauris libero, semper a suscipit sed, auctor quis ante. Maecenas scelerisque congue auctor. Vivamus hendrerit mi sit amet ultricies venenatis. Curabitur non mauris in elit iaculis efficitur ut sed turpis.

Fusce pulvinar vehicula eros, non tincidunt massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sem erat, congue sed dui in, dignissim iaculis magna. Donec non mauris eu orci malesuada vulputate tristique mattis mauris. Vivamus tincidunt sodales lacus, nec eleifend orci suscipit dignissim. Integer dapibus ex eu tristique pellentesque. Pellentesque semper, orci a varius convallis, lorem ante eleifend nisl, in placerat felis ipsum finibus lorem. Duis ut felis lectus. Maecenas at iaculis ante. Curabitur turpis est, interdum sed erat id, ultrices pretium urna. Vestibulum placerat congue eros. Aenean a elit ac ipsum condimentum blandit egestas in erat. Sed cursus bibendum arcu, eu sodales erat rutrum faucibus.

Fusce sed vehicula leo, et euismod velit. In blandit malesuada convallis. Etiam vitae tortor tincidunt, mollis purus ac, dignissim lacus. Proin at mi quis sapien facilisis condimentum sed non risus. In ultrices molestie orci, in semper neque laoreet sed. Curabitur at imperdiet enim. Aenean mollis fermentum ultrices. Donec eget dui vel nibh ultricies varius eu at orci. Donec tempus elit tellus. Nunc dignissim fringilla justo, sed consequat erat varius vel. Praesent id pretium velit, at sagittis dolor. Duis ut varius dui. Proin tristique erat ut metus euismod mollis. Nullam imperdiet lorem in efficitur sollicitudin. Sed mattis, turpis vitae porttitor tristique, turpis nulla finibus nisl, in vehicula lorem lacus vel nibh.

Morbi venenatis ex ac eros sollicitudin molestie. Nam augue nisl, sodales a elit eget, sodales pharetra nunc. Vivamus quis finibus mauris. Vestibulum sit amet convallis eros, quis placerat purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pulvinar placerat lacus, vitae semper sem. Sed mollis dui quis mollis blandit. Duis iaculis tellus id risus malesuada auctor. Curabitur ac dictum magna. Etiam auctor molestie metus ac efficitur. Sed consectetur commodo eros, non tempor neque bibendum sit amet.

Quisque quis justo vel libero maximus blandit. Donec blandit dui ac libero mattis consectetur. Quisque euismod faucibus sapien, eu sagittis enim. Nam sit amet cursus nisl, et tempus libero. Etiam id massa ante. Sed id tellus ut neque ornare lobortis. Nam varius, dui rutrum vulputate volutpat, ante odio tincidunt ex, eu condimentum ante lectus sit amet dolor. Sed tellus elit, varius id pellentesque vitae, viverra ac nisl. Nunc nec semper orci, congue sagittis lorem. Cras ullamcorper dolor nec lobortis malesuada. Etiam quis nulla eu erat elementum iaculis sit amet at turpis.` 

            }
        },
        mounted() {
        },
        unmounted() {
            
        },
        methods: {
            qrExport() {
                this.phase = 'export'
            },
            qrImport() {
                this.qrFrames = null
                this.phase = 'import'
            },
            detect(a) {
                this.qrFrames = parseFramesReducer(this.qrFrames, a[0].rawValue)
                
                if (areFramesComplete(this.qrFrames)) {
                    console.log("scanning done!")
                    console.log(this.qrFrames)
                    console.log(framesToData(this.qrFrames).toString())
                } else try { this.data = currentNumberOfFrames(this.qrFrames)} catch { this.data = "Error. Try again" }
            },
            error(a) {
                console.error(a)
            }
        }
    }
</script>