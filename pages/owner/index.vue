<template>
  <section class="mainSection">
      <div class="content">
          <div class="rounded bg-white mb-3">
              <v-list-item >
                  <v-list-item-avatar color="orange">
                    <v-icon color="white">
                        mdi-car
                    </v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                      <v-list-item-title>
                          {{($auth.user.lname + ', ' + $auth.user.fname + ' ' + $auth.user.mname).toUpperCase()}}
                      </v-list-item-title> 

                      <v-list-item-subtitle>
                          <router-link to="/owner/violations">{{violations.length}} Violations</router-link>
                      </v-list-item-subtitle>
                  </v-list-item-content>
              </v-list-item>
          </div>

          <div class="bg-white rounded shadow-sm p-3">
              My car QR Code
              <hr>
              
              <div class="qr " :style="`background-image:url('${qr}')`">
                  
              </div>
          </div>
      </div>
  </section>
</template>

<script>

import QRCode from 'qrcode'

export default {
    middleware:['owner-auth'],
    data(){
        return {
            qr:''
        }
    },
    async asyncData({$axios, $auth}){
        let res = await $axios.post('/owner/violations', {ownerID:$auth.user._id})

        return {
            violations: res.data.violations
        }
    },
    methods:{
        async converToQR(){
            try{
                return await QRCode.toDataURL(this.$auth.user.serial_number + '')
            }catch(err){
                console.log(err)
                return ""
            }
        }
        
    },

    async mounted(){
        this.qr = await this.converToQR()
    }
}
</script>

<style scoped>
    .qr{
        background-repeat:no-repeat;
        background-position:center;
        background-size: 50%;
        width:100%;
        height:300px;
    }

    @media only screen and (max-width: 360px) {
        .qr{
            background-repeat:no-repeat;
            background-position:center;
            background-size: 100%;
            width:100%;
            height:300px;
        }
    }
</style>