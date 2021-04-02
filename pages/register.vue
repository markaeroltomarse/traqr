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
            
                <form @submit.prevent="submit3">
                    
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
            color:'red'
        },

        submitted:false,
        invalids:[]
      }
    },

    methods:{
        submit1(){
            this.e6 = 2
        },

        submit2(){
            this.e6 = 3
        },

        submit3(){
            this.e6 = 4

            this.$store.commit("G_LOADER", true)
            this.invalids = []
            
            if(this.owner.password != this.passagain) {
                this.$store.commit("G_LOADER", false)
                return this.invalids.push('Password must be match')
            }

            this.$axios.post('/owner/new', this.owner)
            .then(res => {
                this.$store.commit("G_LOADER", false)

                if(res.data.result) {
                    this.submitted = true
                    return 
                }
                
                this.invalids = res.data.invalids
                console.log(this.invalids)
            })
            .catch(err => {
                console.log(err)
                this.$store.commit("G_LOADER", false)
            })
        },


        
    }
}
</script>

<style>

</style>