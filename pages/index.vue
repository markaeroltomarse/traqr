<template>
  <section class="mainSection">
    <login v-if="isLogin" v-on:close="isLogin = false"/>
    <div class="content">
      <div class="p-5 text-center">
        <v-img :src="require('@/static/img1.svg')"/>
        <br>
        <h3>Violation Ticketing System</h3>
        <p class="text-secondary">MMDA Online Application for road violator with QR Code.</p>
        <v-btn small block color="success mb-2" @click="isLogin = true">
          LOGIN
        </v-btn>
        
        <v-btn to="register" small block >
          REGISTER 
          <v-icon>
            mdi-car-arrow-right
          </v-icon>
        </v-btn>
      </div>


    </div>
  </section>
</template>

<script>

import login from '@/components/login'
export default {
  data(){
    return {
      isLogin:false
    }
  },
  components: {
    login
  }
}
</script>

<style scoped>

</style>
