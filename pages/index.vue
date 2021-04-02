<template>
  <section class="mainSection">
    <login v-if="isLogin" v-on:close="isLogin = false"/>
    <div class="content">
      <div class="p-5 text-center">
        <v-img :src="require('@/static/img1.svg')"/>
        <h3>Ticketing System</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus vel quo, alias placeat maxime labore.</p>
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
