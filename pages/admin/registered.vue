<template>
  <section class="mainSection">
      <p class="text-secondary my-3">Pending Registered</p>
      <registeredinfo v-on:refresh="fetchUser" v-on:close="viewOwner = false" :owner="owner" v-if="viewOwner"/>
      <v-list nav dense style="height:80vh;">
            <v-list-item-group>
                <v-list-item
                    @click="view(reg)"
                    v-for="reg in registered"
                    :key="reg._id"
                >
                    <v-list-item-avatar :color="reg.color">
                        
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{reg.lname.toUpperCase()}}, {{reg.fname.toUpperCase()}}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{reg.created}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                
            </v-list-item-group>
      </v-list>

      <p class="text-right">
          <small>Result: {{registered.length}}</small>
      </p>
  </section>
</template>

<script>

import registeredinfo from '@/components/officer/scannedowner'

export default {
    middleware:['admin-auth'],
    components:{registeredinfo},
    data(){
        return {
            owner:null,
            viewOwner:false
        }
    },
    async asyncData({$axios}){
        let res = await $axios.get('/officer/registered')

        const {registered} = res.data

        return {
            registered
        }
    },

    methods:{
        view(owner){
            this.owner = owner
            this.viewOwner = true
        },

        async fetchUser(){
            let res = await this.$axios.get('/officer/registered')

            const {registered} = res.data

            this.registered = registered
        }
    }
}
</script>

<style>

</style>