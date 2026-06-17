<template>
    <UIButton @click="ping">Ping</UIButton>
</template>

<style scoped>
    
</style>

<script>
    export default {
        props: {
            
        },
        data() {
            return {
                
            }
        },
        methods: {
            async ping() {
                console.log(await sendPacket(PacketTypes.TBA_REQUEST, {"suburl": "teams/1"}))
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        },
    }
</script>