<template>
  <section class="mainSection">
      <div class="content">
         

        <v-alert
            v-for="inv in invalids"
            :key="inv"
            dense
            text
            type="error"
        >
            {{inv}}
        </v-alert>

        <div class="shadow-sm bg-white rounded p-3 text-center" v-if="submitted" >

            <center>
                <v-img :src="require('@/static/submitted.svg')" width="150px"/>
            </center>
            You are now registered! <br>

            <b>
                 {{(owner.lname + ', ' + owner.fname + ' ' + owner.mname).toUpperCase()}}
            </b>
            <hr>
            <v-btn small to="/" color="success">
                Home
            </v-btn>

        </div>
        <v-stepper
                v-else
                v-model="e6"
                vertical
            >
            <v-stepper-step
                :complete="e6 > 1"
                step="1"
                @click="e6 > 1 ? e6 = 1 : null"
            >
            Owner infomation
            <small>Summarize if needed</small>
            </v-stepper-step>

            <v-stepper-content step="1">
            <form @submit.prevent="submit1" >
                <v-row>
                    <v-col>
                        <v-text-field
                            dense
                            label="Last name"
                            required
                            v-model="owner.lname"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            dense
                            label="First name"
                            required
                            v-model="owner.fname"
                        />
                    </v-col>

                    <v-col cols="2">
                        <v-text-field
                            dense
                            label="Middle name"
                            required
                            v-model="owner.mname"
                        />
                    </v-col>
                </v-row>

                <v-text-field
                    dense
                    label="Address"
                    required
                    v-model="owner.address"
                />

                <v-select
                    :items="['MALE', 'FEMALE']"
                    label="Gender"
                    dense
                    v-model="owner.gender"
                ></v-select>

                    <!-- @click="e6 = 2" -->
                <v-btn
                    type="submit"
                    small
                    color="success"
                    
                >
                    Continue
                </v-btn>
                <v-btn text to="/" small>
                    Cancel
                </v-btn>
            </form>
            
            </v-stepper-content>

            <v-stepper-step
                :complete="e6 > 2"
                step="2"
                @click="e6 > 2 ? e6 = 2 : null"
            >
                Vehicle information
            </v-stepper-step>

            <v-stepper-content step="2">
                <form @submit.prevent="submit2">
                    <v-select
                        :items="['M: vehicles carrying passengers', 'N: vehicles carrying goods', 'L: 2- and 3-wheel vehicles and quadricycles', 'T: agricultural and forestry tractors and their trailers']"
                        label="Vehicle category"
                        dense
                        v-model="owner.v_category"
                    ></v-select>

                    <v-select
                        :items="['GASOLINE', 'DIESEL', 'LPG', 'ETHANOL', 'Compressed Natural Gas']"
                        label="Type of fuel"
                        dense
                        v-model="owner.type_fuel"
                    ></v-select>
                    
                    <v-select
                        :items="['SEDAN', 'COUPE', 'HATCHBACK', 'Minivan/Van', 'Truck', 'Station Wagon', 'Convertible', 'SUV/MUV']"
                        label="Type of body"
                        dense
                        v-model="owner.type_body"
                    ></v-select>


                     <v-text-field
                        type="text"
                        dense
                        label="Series"
                        required
                        v-model="owner.series"
                    />

                    <v-color-picker
                        dot-size="30"
                        swatches-max-height="200"
                        hide-inputs
                        mode="hexa"
                        v-model="owner.color"
                    ></v-color-picker>

                    <v-text-field
                        :value="owner.color"
                        type="text"
                        dense
                        label="Color"
                        readonly
                        required
                    />

                    <hr>

                    <v-text-field
                        type="number"
                        dense
                        label="Plate Number"
                        required
                        outlined
                        v-model="owner.plate_number"
                    />

                    <v-text-field
                        type="number"
                        dense
                        label="Serial/Chassis Number"
                        required
                        outlined
                        v-model="owner.serial_number"
                    />

                    
                    <!-- @click="e6 = 3" -->
                    <v-btn
                        color="success"
                        type="submit"
                    >
                        Continue
                    </v-btn>
                    <v-btn text to="/">
                        Cancel
                    </v-btn>
                </form>
            
            </v-stepper-content>

            <v-stepper-step
                :complete="e6 > 3"
                step="3"
                @click="e6 > 3 ? e6 = 3 : null"
            >
                Account information
            </v-stepper-step>

            <v-stepper-content step="3">
            
                <form @submit.prevent="submit3" enctype="multipart/form-data">
                    
                    <v-text-field
                        type="email"
                        dense
                        label="Email"
                        required
                        outlined
                        v-model="owner.email"
                    />
                    
                    <hr>
                    
                    <v-text-field
                        type="password"
                        dense
                        label="Password"
                        required
                        outlined
                        v-model="passagain"
                    />

                    <v-text-field
                        type="password"
                        dense
                        label="Password again"
                        required
                        outlined
                        v-model="owner.password"
                        :background-color="owner.password == passagain & owner.password != '' ? 'success' : null"
                        :disabled="passagain == ''"
                    />
                    
                    <div class="license-img" :style="{backgroundImage:`url('${imgSelected}')`}">

                    </div>

                    <v-btn small color="primary" @click="$refs.licenseimg.click()">
                        Upload Driver License (image)
                    </v-btn>

                    <input type="file" @change="selectedFile" hidden ref="licenseimg">
                    
                    <hr>
                    <!-- @click="e6 = 4" -->
                    <v-btn
                        color="success"
                        type="submit"
                    >
                        Submit
                    </v-btn>
                    <v-btn text to="/">
                        Cancel
                    </v-btn>
                </form>
            </v-stepper-content>
        </v-stepper>
      </div>
  </section>
</template>

<script>




export default {
    
    data () {
      return {
        e6: 1,
        passagain:'',
        owner:{
            email:'',
            password:'',
            fname:'',
            lname:'',
            mname:'',
            address:'',
            plate_number:null,
            serial_number:null,
            type_fuel:'DIESEL',
            type_body:'SEDAN',
            series:'',
            color:'red',
            driverlicenseimg:null,
        },

        submitted:false,
        invalids:[],


        driverlicenseimg:'',

        selectedFileimg:null,
        imgSelected:'',

        
      }
    },
    mounted(){
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
       
    },

    methods:{
        
        submit1(){
            this.e6 = 2
        },

        submit2(){
            this.e6 = 3
        },

        selectedFile(event){
            this.invalids = []
            console.log(event.target.files[0])
            this.selectedFileimg = null
            this.imgSelected = ''
            try{
                let allowedimg = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
                if(!allowedimg.includes('image/'+event.target.files[0].name.split('.').pop())) return this.invalids.push('File is not an image') 
                if(event.target.files[0].size > 600000) return this.invalids.push('Image size is too big!')
                
                this.selectedFileimg = event.target.files[0]
                this.imgSelected = URL.createObjectURL(event.target.files[0])
            }catch(err){
                console.log(err)
            }
        },

        async submit3(){
            this.e6 = 4

            this.$store.commit("G_LOADER", true)
            this.invalids = []
            
            if(this.owner.password != this.passagain) {
                this.$store.commit("G_LOADER", false)
                return this.invalids.push('Password must be match')
            }
            
            
            if(this.selectedFileimg == null){
                this.$store.commit("G_LOADER", false)
                return this.invalids.push('Please Select Or insert your License Driver image')
            }

            const licenseimg = new FormData()
            licenseimg.append('licenseimg', this.selectedFileimg)
            
            const extensionName = this.selectedFileimg.name.split('.').pop()

            this.owner.driverlicenseimg = '.' + extensionName

            this.$axios.post('/owner/new', this.owner)
            .then(async res => {
                this.$store.commit("G_LOADER", false)

                if(!res.data.result) {
                    return this.invalids = res.data.invalids
                }
                // console.log("owner information", res.data)
                // let resfile = await this.$axios.post('/owner/singleupload?filename='+res.data.filename, licenseimg)
                this.invalids = res.data.invalids
                console.log(this.invalids)
                

                const filename = res.data.filename
                
                this.uploadImage(filename + this.owner.driverlicenseimg)
                // if(resfile.data.result) {
                //     this.submitted = true
                //     return 
                // }

                this.submitted = true
                //     return 

                
            })
            .catch(err => {
                console.log(err)
                this.$store.commit("G_LOADER", false)
            })
        },

        uploadImage(filename){
            alert(this.selectedFileimg.type)
            console.log('FILETYPE FIREBASE', this.selectedFileimg.type)
            const ref = this.$store.state.firebase.storage().ref()

            const file = this.$refs.licenseimg.files[0]

            console.log('FILE FIREBASE', file)
            const metadata = {
                contentType:this.selectedFileimg.type
            }

            const task = ref.child(filename).put(file, metadata)

            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log("URL", url)
                
            })
        },
        
    },

    
}
</script>

<style scoped>
    .license-img {
        width: 50%;
        height: 170px;
        background-position: center;
        background-color: #f2f2f2;
        background-repeat: no-repeat;
        background-size: 100%;
        border:1px solid silver;
        border-radius: 5px;
        margin:1em 0px;
    }


    @media only screen and (max-width: 360px) {
        .license-img {
            width: 100%;
            
        }
        
    }
</style>