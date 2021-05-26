<template>
  <section class="mainSection">
      <div class="content">
          <div class="text-center bg-white p-5 rounded shaodw">
            <strong class="text-dark">{{fullname()}}</strong>

            <p><small class="text-secondary">Your account is pending, wait it to approve the authorized system.</small></p>

            <v-btn color="success" @click="logout">
                Logout
            </v-btn>
          </div>
      </div>
  </section>
</template>

<script>
export default {
    async asyncData({redirect, $auth}){
        try{
            if(!$auth.loggedIn) return redirect('/')
        }catch(err){
            console.log(err)
        }
    },
    methods:{
        logout(){
            
            this.$auth.$storage.setCookie(process.env.AUTH_KEY, null, false)
            this.$auth.logout()
        },

        fullname(){
            try{
                return (this.$auth.user.lname + ', ' + this.$auth.user.fname).toUpperCase()
            }catch(err){
                return '...'
            }
        }
    }
}
</script>

<style>

</style>