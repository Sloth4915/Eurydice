<template>
    <div class="holder col" v-if="account === null">
        <div class="panel gap col">
            <div class="cy fill-children gap">
                <UIButton @click="option = 'organization'" :selected="option==='organization' ? true : null">Organization</UIButton>
                <UIButton @click="option = 'scouter'" :selected="option==='scouter' ? true : null">Scouter</UIButton>
            </div>
            
            <div class="cy fill-children gap" v-if="option==='organization'">
                <UIButton @click="action = 'create'" :selected="action==='create' ? true : null">Create Account</UIButton>
                <UIButton @click="action = 'login'" :selected="action==='login' ? true : null">Login</UIButton>
            </div>
        </div>

        <div class="panel cy col fill-children">
            <template v-if="action === 'create' && option === 'organization'">
                <UIInput v-model="email" label="Email" type="email"/>
                <UIInput v-model="team" label="Team #" @blur="team_change"/> {{ team_name }}
                <UIInput v-model="pass" label="Password" type="password"/>
                <UIInput v-model="pass_confirm" label="Confirm Password" type="password"/>
                <UIButton @click="create_organization">Create Organization</UIButton>
                <Error :code="error"/>
            </template>
            <template v-else-if="action === 'login' && option === 'organization'">
                <UIInput v-model="email" label="Email" type="email"/>
                <UIInput v-model="team" label="Team #" @blur="team_change"/> {{ team_name }}
                <UIInput v-model="pass" label="Password" type="password"/>
                <UIButton @click="login_organization">Login to Organization</UIButton>
                <Error :code="error"/>
            </template>
            <template v-else-if="action === 'login' && option === 'scouter'">
                Test
            </template>
        </div>
    </div>
    <template v-else>

    </template>
</template>

<style scoped>
    .panel {
        min-width: 40vw;
        width: max(75vw, 30rem);
        max-width: 90vw;
    }
</style>

<script>
    export default {
        props: {
            
        },
        data() {
            return {
                option: "organization",
                action: "login",

                email: "spartronics4915@gmail.com",
                team: "4915",
                team_name: "",
                pass: "password",
                pass_confirm: "password",

                error: ""
            }
        },
        mounted() {
            
        },
        unmounted() {
            
        },
        methods: {
            async create_organization() {
                if (this.email === "" || this.team === "" || this.pass === "" || this.pass_confirm === "" && this.team_exists) {
                    this.error = StatusCodes.MISSING_FIELDS
                    return
                }
                if (this.pass !== this.pass_confirm) {
                    this.error = StatusCodes.PASSWORD_DOESNT_MATCH
                    return
                }
                let result = await sendPacket(PacketTypes.CREATE_ORGANIZATION, {
                    email: this.email,
                    team: parseInt(this.team),
                    password: this.pass,
                })
                this.error = result.status
                if (result.status === StatusCodes.SUCCESS) {
                    console.log(this.team, this.pass)
                    navigator.credentials.create(new PasswordCredential({password: {id: this.team, password: this.pass, name: this.team}}))
                }
            },
            async login_organization() {
                if (this.email === "" || this.team === "" || this.pass === "") {
                    this.error = StatusCodes.MISSING_FIELDS
                    return
                }
                let result = await sendPacket(PacketTypes.LOGIN_ORGANIZATION, {
                    email: this.email,
                    team: parseInt(this.team),
                    password: this.pass,
                })
                console.log(result)
                this.error = result.status
                if (result.status === StatusCodes.SUCCESS) {
                    
                }
            },
            async team_change() {
                this.team_exists = null
                console.log("aaa")
                let packet = await sendPacket(PacketTypes.TBA_REQUEST, {suburl: "/team/frc"+this.team})
                if (packet.status === StatusCodes.SUCCESS) {
                    this.team_name = packet.data.nickname
                    this.team_exists = true
                    console.log(this.team_name, packet)
                } else {
                    this.team_name = "Team does not exist"
                    this.team_exists = false
                }
            }
        },
        inject: ["account"]
    }
</script>