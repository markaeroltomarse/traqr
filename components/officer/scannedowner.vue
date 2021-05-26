<template>
  <section class="overlay bg-light" data-aos="fade-up">

    <section class="imgzoom overlay text-center" v-if="imgzoom">
        <v-img :src="image" @dblclick="imgzoom = false"/>
        <v-btn small @click="imgzoom = false">
            Close
        </v-btn>
    </section>
    <div class="bg-white rounded shadow-sm rounded p-3 " style="margin-bottom:5em;">

        <v-btn small fab style="float:right;" @click="$emit('close')">
            <v-icon small >
                mdi-close
            </v-icon>
        </v-btn>
        <div class="bg-success text-light text-center p-2 " style="border-radius:30px; font-size:25px;">
            Information
        </div>
        <hr>
        
        <p><b>Owner information</b></p>
        
        <div class="license-img" :style="{backgroundImage:`url('${image}')`}" @click="imgzoom = true">

        </div>

        <v-text-field
            rounded
            outlined
            color="black"
            label="Full name"
            readonly
            dense
            :value="`${owner.lname}, ${owner.fname} ${owner.mname}`.toUpperCase()"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Gender"
            readonly
            dense
            v-model="owner.gender"
        />

        <p><b>Vehicle information</b></p>
        
        <v-text-field
            rounded
            outlined
            color="black"
            label="Plate number"
            readonly
            dense
            v-model="owner.plate_number"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Serial/Chassis Number"
            readonly
            dense
            v-model="owner.serial_number"
        />

        <div class="border mb-2"></div>

        <v-text-field
            rounded
            outlined
            color="black"
            label="Vehicle Category"
            readonly
            dense
            v-model="owner.v_category"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Type of fuel"
            readonly
            dense
            v-model="owner.type_fuel"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Type of Body"
            readonly
            dense
            v-model="owner.type_body"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Series"
            readonly
            dense
            v-model="owner.series"
        />

        <v-text-field
            rounded
            outlined
            color="black"
            label="Color"
            readonly
            dense
            v-model="owner.color"
        />

        <div class="p-5 shadow-sm rounded  border" :style="`background-color:${owner.color};`">
            
        </div>
        <hr>
        
        <v-btn block color="primary" v-if="$auth.user.userType == 'admin'" @click="approve">
            Approve Registration
        </v-btn>
        
        <form @submit.prevent="submit" v-if="$auth.user.userType == 'officer'">
            <v-text-field
                rounded
                outlined
                color="black"
                label="Violation Code"
                v-model="violation.violation_code"
                dense
                required
            />

            <v-text-field
                type="number"
                rounded
                outlined
                color="black"
                label="Penalty"
                required
                dense
                v-model="violation.penalty"
            />

            <div class="text-center my-3">
                <v-btn type="submit" color="success" rounded small>
                    Save violation
                </v-btn>
            </div>
        </form>
        
    </div>
  </section>
</template>

<script>
export default {
    
    data(){
        return {
            violation:{
                ownerID:'',
                violation_code:'',
                penalty:'',
                from:''
            },
            scansound:null,
            imgzoom:false,
            image:''
        }
    },
    props:{
        owner:{
            type:Object,
            
        }
    },

    created(){
        this.retrieveImg(this.owner.driverlicenseimg)
    },
    methods:{
        async submit(){

            this.violation.ownerID = this.owner._id
            this.violation.from = this.$auth.user._id
            console.log(this.violation)
            this.$store.commit('G_LOADER', true)

            let res = await this.$axios.post('/officer/newviolation', this.violation)
        
            this.$store.commit('G_LOADER', false)
            
            if(res.data.result){
                this.$emit('close')
            }
        },

        async approve(){
            this.$store.commit("G_LOADER", true)
            try{
                let res = await this.$axios.post('/officer/approveowner', {_id:this.owner._id})

                this.$store.commit("G_LOADER", false)
                this.$emit('close')
                this.$emit('refresh')
            }catch(err){
                alert('Connection time out')
            }
        },

        async retrieveImg(filename){
            // Create a reference to the file we want to download
            const ref = this.$store.state.firebase.storage().ref()
            var retrieve = ref.child(filename);


            const image = ''
            // Get the download URL
            let res = await retrieve.getDownloadURL()
            console.log('RES FIREBASE', res)

            this.image = res

            
        }


        
    },
 
}
</script>

<style scoped>
    .overlay{
        z-index:100;
        
        overflow-y: scroll;
        
    }

    .imgzoom{
        padding:5% 10%;
    }

    .license-img {
        width: 50%;
        height: 170px;
        background-position: center;
        background-color: #f2f2f2;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border:1px solid silver;
        border-radius: 5px;
        margin:1em 0px;
    }

    @media only screen and (max-width: 360px) {
        .license-img {
            width: 100%;
            
        }
        .overlay{
            padding:1em 0px;
            height: 100vh;
        }
        
        .imgzoom{
            padding:30% 0%;
            
        }
        
    }

    
</style>