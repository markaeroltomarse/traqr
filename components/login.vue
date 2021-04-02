<template>
  <section class="overlay">
      <div class="bg-light p-3 rounded shadow mt-5" data-aos="zoom-in">
          <div class="text-center p-5 " v-if="loader">
              <v-progress-circular
                indeterminate
                color="success"
                
              />

              <p>Please wait..</p>
          </div>
          <div v-else>
              <v-row class="mb-5">
              <v-col class="pt-5">
                  <span class="header-title">WELCOME TO LOGIN</span>
              </v-col>
              <v-col class="text-right">
                  <v-btn @click="$emit('close')" fab small color="white" elevation="false">
                    <v-icon>
                        mdi-close
                    </v-icon>
                  </v-btn>
              </v-col>
          </v-row>

          <form @submit.prevent="submit">
              <v-text-field
                type="email"
                color="success"
                filled
                outlined
                clearable
                append-icon="mdi-account"
                dense
                v-model="login.email"
                required
              />

              <v-text-field
                type="password"
                color="success"
                filled
                outlined
                clearable
                append-icon="mdi-lock"
                dense
                v-model="login.password"
                required
              />

              

              <v-btn type="submit" color="success" block >
                  LOGIN
              </v-btn>

              <p class="text-center text-danger">
                  <small>{{err}}</small>
              </p>
              <v-container
                    class="px-0"
                    fluid
                >
                    <v-checkbox
                    v-model="rememberme"
                    :label="`Remember me`"
                    ></v-checkbox>
                </v-container>
          </form>
          </div>
      </div>
  </section>
</template>

<script>
export default {
    data(){
        return {
            err:'',
            login:{
                email:'',
                password:''
            },
            rememberme:false,
            loader:false
        }
    },  
    methods:{
        async submit(){
            this.loader = true
            this.err = ''
            try{
                let res = await this.$axios.post('/auth/login', this.login)
                
                if(res.data.result){
                    this.$auth.setUser(res.data.user)
                    this.$auth.$storage.setCookie(process.env.AUTH_KEY, res.data.user, false)
                    return this.$router.replace({path:'/'+res.data.user.userType})
                }
                this.loader = false
                this.err = res.data.msg
                //alert(JSON.stringify(res.data))
            }catch(err){
                this.loader = false
                this.err = 'Something wrong'
                alert(err)
                console.log(err)
            }

            
        },
        
    }
}
</script>

<style scoped>
    .overlay{
        padding:5% 40%;
        z-index: 20;
    }

    .header-title{
        font-size:14px;
        font-weight: bold;
    
    }

    @media only screen and (max-width: 360px) {
      .overlay{
            padding:5%;
            z-index: 20;
        }

        .header-title{
            font-size:14px;
            font-weight: bold;
        
    }
    }
</style>