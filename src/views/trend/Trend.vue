<template>
    <div id="div-trend">
        <el-row :gutter="30">
            <el-col :sm="20" :md="10" :lg="8" :xl="6">
                <AddWeight />

            </el-col>

            <el-col :sm="20" :md="14" :lg="14" :xl="14"  >
                <WeightTrend />
            </el-col>



        </el-row>

    </div>

</template>

<script setup>
import WeightTrend from '@/views/trend/WeightTrend.vue'
import AddWeight from '@/views/trend/AddWeight.vue'


</script>

<style scoped>
#div-trend {
    margin-top: 120px;
    margin-left: 9%; 
}
</style>