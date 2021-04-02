<template>
  <section class="mainSection">

      <violationdiv v-if="violation != null" :violation="violation" v-on:close="violation = null" />


      <div class="content">
          <div class="bg-white border rounded shadow-sm ">
              <div class="p-3 border-bottom">
                  <b>Previous scans</b>
              </div>

              

              <div style="overflow-y:scroll; height:70vh;">
                  <v-list nav dense>
                      <v-list-item-group color="success">
                          <v-list-item v-for="vio in violations" :key="vio._id">
                              <v-list-item-avatar color="warning">
                                  <v-icon color="white">
                                      mdi-ticket-confirmation
                                  </v-icon>
                              </v-list-item-avatar>

                              <v-list-item-content>
                                  <v-list-item-title>
                                      {{vio.created}}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                      {{(vio.owner.lname + ', ' + vio.owner.fname + ' ' + vio.owner.mname).toUpperCase()}}
                                  </v-list-item-subtitle>
                              </v-list-item-content>
                              <v-list-item-avatar>
                                  <v-icon @click="violation = vio">
                                      mdi-dots-vertical
                                  </v-icon>
                              </v-list-item-avatar>
                          </v-list-item>
                      </v-list-item-group>
                  </v-list>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import violationdiv from '@/components/officer/ticketinfo'

export default {
    middleware:['officer-auth'],
    components:{
        violationdiv
    },
    data(){
        return {
            violation:null
        }
    },

    async asyncData({$axios, $auth}){
        try{
            let res = await $axios.post('/officer/mypreviousscan', {_id:$auth.user._id})
            console.log(res)
            return {
                violations:res.data.violations
            }
        }catch(err){
            console.log(err)
        }
    }
    
}
</script>

<style>

</style>