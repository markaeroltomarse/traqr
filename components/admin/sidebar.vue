<template>
  <section class="overlay">
      <div class="bg-dark p-3 text-light shadow" data-aos="fade-left">

          <div class="text-right">
              <v-btn @click="$emit('close')" fab small>
                  <v-icon>
                      mdi-close
                  </v-icon>
              </v-btn>
          </div>
          
          <v-list class="darky text-white my-5"  >
              <v-list-item >
                  <v-list-item-avatar>
                    <v-img src="https://findicons.com/files/icons/2799/flat_icons/128/admin_checkmark.png">

                    </v-img>
                  </v-list-item-avatar>
                  <v-list-item-content >
                      <v-list-item-title class="text-white">
                          {{($auth.user.fname + ' ' + $auth.user.lname).toUpperCase()}}
                      </v-list-item-title>
                      <v-list-item-subtitle class="text-secondary">
                          {{($auth.user.userType).toUpperCase()}}
                      </v-list-item-subtitle>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
          

          <div class="text-light p-3 text-center">
              Options
          </div>
          
            
          <div class="text-center px-3">
              <v-btn color="success" block rounded class="my-3" to="/admin/">
                  HOME
              </v-btn>

              <v-btn color="success" block rounded class="my-3" to="/admin/violations">
                  Violations Record
              </v-btn>

              <v-btn color="success" block rounded class="my-3" to="/admin/registered">
                  Pending Registered
              </v-btn>

              <hr>

              <v-btn color="success" block rounded class="my-3" to="/admin/scanqr">
                  Scan QR Code
              </v-btn>

              <v-btn color="light" block rounded class="my-3" @click="logout">
                  LOGOUT
              </v-btn>

              
          </div>
      </div>
  </section>
</template>

<script>
export default {
    methods:{
        logout(){
            console.log('DATA LOGGING OUT')
            console.log( this.$auth.$storage.getCookie(process.env.AUTH_KEY))
            this.$auth.$storage.setCookie(process.env.AUTH_KEY, null, false)
            this.$auth.logout()
        },
    }
}
</script>

<style scoped>
    .overlay{
        z-index: 50;
        
    }
    .overlay > div {
        width:20%;
        position:absolute;
        right:0;
        top: 0;
        height: 100%;
    }
    

    .darky {
        background-color: #2c3e50;
    }

    @media only screen and (max-width: 360px) {
      .overlay > div {
            width:70%;
            position:absolute;
            right:0;
            top: 0;
            height: 100%;
        }
    }
</style>