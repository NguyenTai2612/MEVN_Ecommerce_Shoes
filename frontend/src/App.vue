<script>
  import FooterShop from '@/components/FooterShop.vue'
  export default {
    data(){
      
    },
    components:{
      FooterShop
    }
  }
</script>

<template>
      <div class="main">
           <router-view />
      </div>
      <div class="footer">
          <FooterShop></FooterShop>
      </div>
</template>

<style>
  .main{
    width: 100%;
    height: 100%;
  }
</style>
