<template>
  <section style="z-index:100;" class=" overlay bg-success text-light text-center" data-aos="zoom-in" v-if="$store.state.g_loader">
      <div style="margin:20% 20%;">
          <v-img :src="require('@/static/svg-loaders/circles.svg')" />
            Please wait.. 
      </div>
  </section>
</template>

<script>
export default {
   
}
</script>

<style>

</style>