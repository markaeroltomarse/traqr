<template>
  <v-app class="mainFont bg-light">
    <navs v-on:openSB="openSB"/>
    <ownerSidebar v-on:close="userSB = false" v-if="$auth.loggedIn && $auth.user.userType == 'owner' && userSB "/>
    <officerSidebar v-on:close="userSB = false" v-if="$auth.loggedIn && $auth.user.userType == 'officer' && userSB"/>
    <adminSidebar v-on:close="userSB = false" v-if="$auth.loggedIn && $auth.user.userType == 'admin' && userSB"/>
    
    <gloader/>
    <nuxt/>
  </v-app>
</template>

<script>
import navs from '@/components/nav.vue'
import ownerSidebar from '@/components/owner/sidebar'
import officerSidebar from '@/components/officer/sidebar'
import adminSidebar from '@/components/admin/sidebar'

import gloader from '@/components/global-loader.vue'
export default {
  head() {
      return {
      script: [
          { src: 'https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js' },
          { src:"https://www.gstatic.com/firebasejs/8.6.2/firebase-storage.js" },
      ]
      }
    },
  mounted(){
    this.initFirebase()
  },
  data () {
    return {
      userSB:false
    }
  },
  components:{
    navs, gloader, ownerSidebar, officerSidebar, adminSidebar
  },

  methods:{
    openSB(){
      this.userSB =!this.userSB
      
    },
    initFirebase(){
        var firebaseConfig = {
            apiKey: "AIzaSyB4LG47vklJ8doNBF02_0gk08-3HXhsAkw",
            authDomain: "vue-fire-99351.firebaseapp.com",
            databaseURL: "https://vue-fire-99351.firebaseio.com",
            projectId: "vue-fire-99351",
            storageBucket: "vue-fire-99351.appspot.com",
            messagingSenderId: "764707827854",
            appId: "1:764707827854:web:674f12c1b691b034d4d9df",
            measurementId: "G-ZYPW8VZHFZ"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        this.$store.state.firebase = firebase
        console.log('FIREBASE MOUNTED', this.$store.state.firebase)
    },
  }
}
</script>

<style>
  
</style>
