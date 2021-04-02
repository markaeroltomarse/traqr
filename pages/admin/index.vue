<template>
  <section class="mainSection">
      <div class="content">
          <div class="bg-white shadow-sm rounded p-2">
              <v-list-item>
                  <v-list-item-avatar>
                      <v-img src="https://findicons.com/files/icons/2799/flat_icons/128/admin_checkmark.png"/>
                  </v-list-item-avatar>
                  <v-list-item-content>
                      <v-list-item-content >
                      <v-list-item-title >
                          {{($auth.user.fname + ' ' + $auth.user.lname).toUpperCase()}}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-secondary">
                          {{($auth.user.userType).toUpperCase()}}
                      </v-list-item-subtitle>
                  </v-list-item-content>
                  </v-list-item-content>
              </v-list-item>
          </div>

          <div class="bg-white p-3 rounded shadow-sm my-2 " style="min-height:60vh;">
              <v-row>
                  <v-col>
                      <small>
                        <b>Officers</b>
                    </small>
                  </v-col>
                  <v-col class="text-right">
                      <v-btn to="/admin/newofficer" x-small color="primary">
                          <v-icon  small>
                            mdi-plus
                        </v-icon>
                      </v-btn>
                  </v-col>
              </v-row>

              <v-list nav dense>
                  <v-list-item-group color="success">
                      <v-list-item v-for="off in officers" :key="off._id">
                          <v-list-item-avatar color="dark">
                              <v-icon>
                                  mdi-police-badge
                              </v-icon>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title>
                                {{off.lname + ', ' + off.fname + ' ' + off.mname}}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                20 record
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
 middleware:['admin-auth'],
 async asyncData({$axios}){
     try{
         let res = await $axios.get('/officer/officers')
         return {
             officers:res.data.officers
         }
     }catch(err){
         console.log(err)
     }
 }
}
</script>

<style>

</style>