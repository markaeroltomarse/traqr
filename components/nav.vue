<template>
  <nav class="bg-dark text-light ">
      <v-row>
          <v-col>
              <span class="logo">TraQR</span>
          </v-col>
          <v-col class="text-right">
            <v-icon @click="$emit('openSB')" size="50px" color="white" v-if="$auth.loggedIn">
                mdi-menu
            </v-icon>
          </v-col>
      </v-row>
  </nav>
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
    .logo{
        font-size:30px;
        font-weight: bolder;
    }

    nav{
        position: fixed;
        top:0;
        left:0;
        width:100%;
        z-index: 10;
        padding:0.5em 30%;
        z-index: 1000;
    }

    @media only screen and (max-width: 360px) {
      nav{
          position: fixed;
          top:0;
          left:0;
          width:100%;
          z-index: 10;
          padding:0.5em 1em;
      }
  }
</style>