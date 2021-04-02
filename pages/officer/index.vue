<template>
  <section class="mainSection">
      <scanned v-on:close="owner = null" v-if="owner != null" :owner="owner"/>
      <div class="content">
          <div class="scan-content">
              <div class="scan-div ">
                <div class="border">
                    <div>
                        <qrcode-stream v-if="scannow"  @decode="onDecode" @init="onInit" class="qr-cam">
                            <v-btn fab small @click="switchCamera">
                                <v-icon>
                                    mdi-camera-switch-outline
                                </v-icon>
                            </v-btn>
                        </qrcode-stream>
                    </div>
                </div>
              </div>

              <div class="scan-result text-center">
                <div class="text-center ">
                    <v-btn :color="scannow ? 'error' : 'success'" rounded @click="scannow = !scannow">
                        {{scannow ? 'STOP SCAN' : 'START SCAN'}}
                        <v-icon>
                            mdi-qrcode
                        </v-icon>
                    </v-btn>
                </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script>

import scanned from '@/components/officer/scannedowner'

export default {
    middleware:['officer-auth'],
    components:{
        scanned
    },
    data(){
        return {
            camera: 'rear',

            noRearCamera: false,
            noFrontCamera: false,
            scannow:false,
            owner:null,
            err:''
        }
    },
    mounted(){
        
    },
    methods:{
        async onDecode(serial_number){
            //alert(decodeString)
            let res = await this.$axios.post('/officer/findowner', {serial_number})
            this.scannow = false
            if(!res.data.result){
                return this.err = 'No owner found'
            }

            this.owner = res.data.owner
            
        },

        switchCamera () {
            switch (this.camera) {
                case 'front':
                    if(this.noRearCamera) return alert("No rear camera")
                    this.camera = 'rear'
                break
                case 'rear':
                    if(this.noFrontCamera) return alert("No front camera")
                    this.camera = 'front'
                break   
            }
        },

        async onInit (promise) {
            try {
                const { capabilities } = await promise
                console.log('capa', capabilities)
            } catch (error) {
                const triedFrontCamera = this.camera === 'front'
                const triedRearCamera = this.camera === 'rear'

                const cameraMissingError = error.name === 'OverconstrainedError'

                if (triedRearCamera && cameraMissingError) {
                    this.noRearCamera = true
                }

                if (triedFrontCamera && cameraMissingError) {
                    this.noFrontCamera = true
                }

                console.error(error)
            }
        }
    }
}
</script>

<style scoped>
    .scan-div{
         margin:0px auto;
         
         position:relative;
         padding:5% 15%;
    }

    

    .scan-div > div > div{
        
        min-height: 20vh;
        border:5px solid rgba(14, 160, 99, 0.521);
        
    }

    /* .scan-div > div > div > .qr-cam{
        
        
    } */

    canvas{
        border-radius:30px;
    }

    .scan-result{
        background-color:rgba(4, 201, 86, 0.329);
        min-height: 100vh;
        border-radius: 40px;
        padding:1em;
        margin: 5% 0px;

    }

    .scan-result > div{
       
        position:absolute;
        margin-top:-30px;
        
       
        width:38vw;
    }

    @media only screen and (max-width: 360px) {
        .scan-result > div{
        
            position:absolute;
            margin-top:-30px;
            width:90vw;
        }
        
    }
</style>