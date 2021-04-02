<template>
  <section class="mainSection">
      <violationdiv v-if="violation != null" :violation="violation" v-on:close="violation = null" />
      <div class="content">
          <p class="text-secondary m-2">
              <b>Violations</b> <br>
              <small>
                  All violations recorded by officers. 
              </small>
          </p>

          <div class="bg-white shadow-sm">
              <div class="p-2 border-bottom">
                  <v-text-field
                    dense
                    label="Search violator name or VC"
                    append-icon="mdi-account-search"
                    clearable
                    class="m-2"
                    @keyup="searchVio"
                    v-model="search"
                  />

                  <div style="height:60vh; overflow-y:scroll;">
                      <v-list nav dense>
                          <v-list-item-group color="primary">
                              <v-list-item v-for="vio in violations" :key="vio._id">
                                  <v-list-item-action color="warning">
                                      <v-icon>
                                          mdi-car-outline
                                      </v-icon>
                                  </v-list-item-action>

                                  <v-list-item-content>
                                      <v-list-item-title>
                                          {{vio.penalty}} PHP | VC: {{vio.violation_code}}
                                      </v-list-item-title>

                                      <v-list-item-subtitle>
                                          {{(vio.owner.lname + ' ' + vio.owner.fname + ' ' + vio.owner.mname).toUpperCase()}}
                                      </v-list-item-subtitle>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                      <v-icon small @click="violation = vio">
                                        mdi-dots-vertical
                                    </v-icon>
                                  </v-list-item-action>
                              </v-list-item>
                          </v-list-item-group>
                      </v-list>
                  </div>

                  
              </div>
          </div>
      </div>
  </section>
</template>

<script>

import violationdiv from '@/components/officer/ticketinfo'
export default {
    middleware:['admin-auth'],
    data(){
        return {
            violation:null,
            search:''
        }
    },
    components:{
        violationdiv
    },
    async asyncData({$axios, $auth}){
        try{
            let res = await $axios.get('/officer/violations')

            return {
                violations:res.data.violations,
                violations2:res.data.violations
            }
        }catch(err){
            console.log(err)
        }
    },
    methods:{
        searchVio(){
            if(this.search == '') return this.violations = this.violations2

            this.violations = JSON.parse(JSON.stringify(this.violations2)).filter(v => {
                return (v.owner.lname.toLowerCase()).includes(this.search.toLowerCase()) ||
                (v.owner.fname.toLowerCase()).includes(this.search.toLowerCase()) ||
                (v.violation_code == this.search) 
            })
        }
    },
    
}
</script>

<style>

</style>