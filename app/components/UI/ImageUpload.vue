<template>
    <UIButton @click="upload">Upload {{ allowMultiple ? "Image(s)" : "Image"}}</UIButton>
    <template v-if="allowMultiple" v-for="img in value">
        <img :src="img">
    </template>
    <img v-else :src="value">
</template>

<style scoped>
    img {
        width: 50px;
        height: 20px;
    }
</style>

<script>
    export default {
        props: {
            allowMultiple: Boolean,
            deletable: {
                type: Boolean,
                default: false,
            },
            modelValue: {}
        },
        computed: {
            value: {
                get() {
                    return this.modelValue
                }
            }
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
            upload() {
                const { files, open, reset, onCancel, onChange } = useFileDialog({
                    accept: 'image/*', // Set to accept only image files
                    directory: false, // Select directories instead of files if set true
                    multiple: this.allowMultiple,
                })
                onChange((files) => {
                    let src
                    if (this.allowMultiple) src = []
                    for (let file of files) { 
                        const reader = new FileReader();
                        reader.onload = (a) => {
                            if (this.allowMultiple) src.push(a.target.result)
                            else src = a.target.result
                            this.$emit('update:modelValue', src)
                        };
                        reader.onerror = (error) => reject(error);
                        reader.readAsDataURL(file)
                    }
                })
                open()
            }
        },
    }
</script>