<template>
    <section class="mainSection">
        <div class="content rouded bg-white py-3">
            <div class="bg-success text-light text-center m-3 p-2" style="border-radius:30px; font-size:20px;">
                My Violations
            </div>

            <div style="height:70vh; overflow-y:scroll;">
                <v-list navd dense>
                    <v-list-item-group nav >
                        <v-list-item v-for="vio in violations" :key="vio._id">
                            <v-list-item-avatar color="warning">
                                <v-icon>
                                    mdi-car-off
                                </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                
                                <v-list-item-title>
                                    {{vio.penalty.toLocaleString()}} PHP | VC: {{vio.violation_code}}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{vio.created}}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    middleware:['owner-auth'],
    async asyncData({$axios, $auth}){
        let res = await $axios.post('/owner/violations', {ownerID:$auth.user._id})

        return {
            violations: res.data.violations
        }
    }
}
</script>

<style>

</style>