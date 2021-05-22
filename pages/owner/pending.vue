<template>
  <section class="mainSection">
      <div class="content">
          <div class="text-center bg-white p-5 rounded shaodw">
            <strong class="text-dark">{{$auth.user.lname.toUpperCase()}}, {{$auth.user.fname.toUpperCase()}}</strong>

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
        if(!$auth.loggedIn) return redirect('/')
    },
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

<style>

</style>