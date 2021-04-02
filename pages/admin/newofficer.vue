<template>
  <section class="mainSection bg-light">
      <div class="overlay" style="z-index:20;" v-if="message">
          <div class="rounded bg-white shadow p-5 " data-aos="zoom-in">
              <b>New officer added successfuly.</b> 
              <div class="text-right mt-4">
                  <v-btn small @click="message = false" >
                      Continue
                  </v-btn>
                  <v-btn to="/admin" color="success" small>
                      View all officers
                  </v-btn>
              </div>
              
          </div>
      </div>
      <div class="content" >
          <div class="border bg-white  p-3" style="border-radius:10px;" data-aos="fade-down">
              <div class="w-100 text-center bg-success text-light p-2" style="border-radius:40px;">
                  NEW OFFICER
              </div>

              <v-alert
                v-for="inv in invalids"
                :key="inv"
                dense
                text
                type="error"
                class="my-2"
            >
                {{inv}}
            </v-alert>

              <form @submit.prevent="submit">
                  <small><b>Email:</b></small>
                  <v-text-field
                    type="email"
                    required
                    outlined
                    dense
                    color="dark"
                    clearable
                    v-model="officer.email"
                  />

                  <small><b>Password:</b></small>
                  <v-text-field
                    outlined
                    required
                    dense
                    color="dark"
                    clearable
                    v-model="officer.password"
                    type="password"
                  />
                  <v-text-field
                    type="password"
                    outlined
                    required
                    dense
                    color="dark"
                    v-model="confirmpass"
                    label="Confirm password"
                    :disabled="officer.password == ''"
                    :append-outer-icon="confirmpass == officer.password & officer.password != '' ? 'mdi-shield-check' : 'mdi-shield-remove'"
                  />
                    
                  <hr>
                  <small><b>Last name:</b></small>
                  <v-text-field
                    outlined
                    required
                    dense
                    color="dark"
                    clearable
                    v-model="officer.lname"
                  />
                  
                  <small><b>First name</b></small>
                  <v-text-field
                    outlined
                    dense
                    color="dark"
                    clearable
                    v-model="officer.fname"
                  />

                  <small><b>Middle name:</b></small>
                  <v-text-field
                  required
                    outlined
                    dense
                    color="dark"
                    clearable
                    v-model="officer.mname"
                  />

                  <small><b>Gender</b></small>
                  <v-select
                    :items="['Male', 'Female']"
                    dense
                    outlined
                    v-model="officer.gender"
                  ></v-select>


                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="officer.birthday"
                        label="Birthday"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        dense
                        required
                    ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="date"
                        
                        class="mt-4"
                        color="success"
                        scrollable
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="modal = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(date)"
                    >
                        OK
                    </v-btn>
                    </v-date-picker>
                </v-dialog>

                <div class="text-right">
                    <v-btn to="/admin">
                        Cancel
                    </v-btn>
                    <v-btn type="submit" color="success">
                        Submit
                    </v-btn>
                </div>
              </form>
          </div>
      </div>
  </section>
</template>

<script>
export default {
    middleware:['admin-auth'],
    data: () => ({
      date:new Date().toISOString().substr(0, 10),
      confirmpass:'',
      message:false,
      officer:{
          birthday: '',
          lname:'',
          fname:'',
          mname:'',
          password:'',
          email:'',
          gender:'Male',
          
      },
      menu: false,
      modal: false,
      
      invalids:[]
      
    }),
   
    methods:{
        submit(){
            console.log(this.officer)
            this.invalids = []
            this.$store.commit('G_LOADER', true)

            if(this.officer.password != this.confirmpass) {
                this.$store.commit('G_LOADER', false)
                return this.invalids.push('Password must be match')
            }

            this.$axios.post('/officer/newofficer', {data:this.officer})
            .then(res => {
                
                this.$store.commit('G_LOADER', false)

                if(!res.data.result) return this.invalids = res.data.invalids

                this.message = true
            })
            .catch(err => {
                this.$store.commit('G_LOADER', false)
                console.log(err)
            })
        }
    },
    watch:{
        date(val){
            this.officer.birthday = val
        }
    }
    
}
</script>

<style scoped>
    .overlay > div{
        margin:30% 1%; 
    }

    @media only screen and (max-width: 360px) {
        .overlay{
            padding:1em;
        }
        
    }
</style>