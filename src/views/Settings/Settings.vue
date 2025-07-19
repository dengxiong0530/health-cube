<template>
    <div id = "div-settings"> 

 <!-- <PersonalDetails/> -->
  <el-card>
 <Profile/>
 </el-card>
    </div>


</template>
<script setup>
import PersonalDetails from '@/views/dashboard/PersonalDetails.vue'
import Profile from '@/views/Settings/Profile.vue'
</script>
<style scoped>

#div-settings {
    margin-left: 20%;
    margin-top: 120px;
    width: 60%;

}

</style>