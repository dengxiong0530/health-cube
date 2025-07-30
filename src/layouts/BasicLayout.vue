<template>
   <div id="basic-layout">
    <el-container> 
    <el-header> <Header/> </el-header>
    <el-main><router-view /> </el-main>
    <!-- <el-main> <CookiesConsent/></el-main> -->
    <el-footer> <Footer/></el-footer>
   
    </el-container>
  
    
   
    

    </div>

</template>

<style scoped>




</style>

<script setup>
import Header from '@/views/Header.vue'
import Footer from '@/views/Footer.vue'
import CookiesConsent from '@/components/CookiesConsent.vue'
</script>