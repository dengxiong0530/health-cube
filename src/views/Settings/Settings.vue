<template>
    <div id="div-settings">
        <el-row type="flex" justify="center">
            <el-col 
                :xs="24" :xs-offset="0"
                :sm="20" :sm-offset="2"
                :md="16" :md-offset="4"
                :lg="16" :lg-offset="4"
                :xl="16" :xl-offset="4"
                
            >
                <el-card shadow="hover">
                    <Profile />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>

import Profile from '@/views/Settings/Profile.vue'
</script>
<style scoped>
#div-settings {
    /* margin-left: 20%; */
    margin-top: 120px;
    /* width: 80%; */

}
</style>