<template>
    <div class="holder between"> 
        <div class="f col">
            <div class="panel">
                form settings
            </div>
            <div class="panel">
                fields
            </div>
            <div class="panel">
                component list
            </div>
            <div class="panel">
                component settings
            </div>
        </div>
        <div class="phone panel" ref="phone">
            <FormEditorComponent/>
            <FormEditorComponent/>
        </div>
    </div>
</template>

<style scoped>
    .phone {
        width: 100%;
        height: 100%;
        max-width: 30vw;
        max-height: 90vh;
        aspect-ratio: 9 / 19.5;
        object-fit: contain;
        position: relative;
        top: 0;
        left: 0;
        overflow: hidden;
    }
</style>

<script>
    export default {
        props: {
            
        },
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        },
        methods: {
            
        },
        provide() {
            return {
                getPhoneWidth: () => (this.$refs.phone.offsetWidth),
                getPhoneHeight: () => (this.$refs.phone.offsetHeight)
            }
        }
    }
</script>