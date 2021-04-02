<template>
  <v-app class="mainFont bg-light">
    <navs v-on:openSB="ownerSB = true"/>
    <ownerSidebar v-on:close="ownerSB = false" v-if="$auth.loggedIn && $auth.user.userType == 'owner' && ownerSB"/>
    <officerSidebar v-on:close="ownerSB = false" v-if="$auth.loggedIn && $auth.user.userType == 'officer' && ownerSB"/>
    <adminSidebar v-on:close="ownerSB = false" v-if="$auth.loggedIn && $auth.user.userType == 'admin' && ownerSB"/>
    
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
      ownerSB:false
    }
  },
  components:{
    navs, gloader, ownerSidebar, officerSidebar, adminSidebar
  }
}
</script>
