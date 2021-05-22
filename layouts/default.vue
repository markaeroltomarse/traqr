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
      this.userSB = !this.userSB
      
    }
  }
}
</script>

<style>
  
</style>
