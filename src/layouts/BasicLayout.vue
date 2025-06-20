<template>
   <div id="basic-layout">
    <Header/> 
    <router-view />
    <Footer/>
    

    </div>

</template>

<style scoped>

</style>

<script setup>
import Header from '@/views/Header.vue'
import Home from '@/views/Home.vue'
import Footer from '@/views/Footer.vue'
</script>