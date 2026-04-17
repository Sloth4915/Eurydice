<template>
    <div class="fw cx col" v-if="account === null">
        <div class="panel col cx">
            <div class="cx gap fill-children">
                <UIButton :selected="login_mode == 'scout'" @click="login_mode = 'scout'">Scout Login</UIButton>
                <UIButton :selected="login_mode == 'team'" @click="login_mode = 'team'">Team Admin Login</UIButton>
            </div>
            <div class="col cy gap" v-if="login_mode == 'team'">
                Team Login
                <UIInput v-model="team" placeholder="Team Number"></UIInput>
                <UIInput v-model="password" placeholder="Password"></UIInput>
                <div class="cx gap fill-children">
                    <UIButton @click="create_team()">Create Account</UIButton>
                    <UIButton @click="login_team()">Log in</UIButton>
                </div>
            </div>
            <div class="col cy gap" v-else>
                Login to scout
                <UIInput v-model="team" placeholder="Team Number"></UIInput>
                <UIInput v-model="password" placeholder="Join Code"></UIInput>
                <UIButton @click="login_scouter()">Log in</UIButton>
            </div>
            {{ status_code }}
        </div>
    </div>
    <template v-else>

    </template>
</template>

<style scoped>
    .panel {
        width: 40%;
    }
</style>

<script>
    export default {
        props: {
            
        },
        data() {
            return {
                "login_mode": "scout",

                "team": "",
                "password": "",

                "join_code": "",

                "name_options": "",

                "status_code": -1,
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        },
        methods: {
            async create_team() {
                useCookie("admin_password").value = this.password
                let packet = await sendPacket(PacketTypes.CREATE_TEAM, {"team": parseInt(this.team)})
                console.log(packet.success)
            },
            async login_team() {
                await sendPacket(PacketTypes.TEST_CREDENTIALS_TEAM)
            },
            async login_scouter() {
                await sendPacket()
            }
        },
        inject: ["account"]
    }
</script>