<template>
    <div class="target-list-div">
          <el-card class="profile-card" shadow="hover">
        <h3 class="target-list-card-title">Target List</h3>
        <div class="transactions-list">
            <div class="transaction-item" v-for="(item, idx) in targetListData" :key="idx"  @click="clickToDetail">
                <div class="col-name">{{ item.name }}</div>
                <div class="col-priority" :class="item.priorityClass">{{ item.priority }}</div>
                <div class="col-budget">{{ item.budget }}</div>
                <el-icon><ArrowRight /></el-icon>
                
               
            </div>
        </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const targetListData = ref([
    { name: 'Weight', priority: 'Low', priorityClass: 'low', budget: '67kg' },
    { name: 'BMI', priority: 'Medium', priorityClass: 'medium', budget: '25.1' },
    { name: 'Calorie', priority: 'High', priorityClass: 'high', budget: '22.7' },
    { name: 'Body Fat', priority: 'Critical', priorityClass: 'critical', budget: '23.4' }, 
    { name: 'Idea Weight', budget: '60kg' } 
]);

const clickToDetail = () =>{
   console.log('1111')
}
</script>

<style scoped>
.target-list-div {
    margin-top: 10px;
}

.target-list-card-title {
    text-align: center;
    font-size: 1.25rem;
    margin-bottom: 12px;
}

.transactions-list {
    border-top: 1px solid #e5e7eb;
    padding-top: 18px;
}

.transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #e5e7eb;
}

.col-name,
.col-budget {
    flex: 1;
    text-align: left;
}

.col-priority {
    flex: 0.6;
    text-align: center;
    padding: 4px 4px;
    border-radius: 4px;
    color: white;
    margin-right: 20px;
}

.low {
    background-color: hsl(194, 93%, 70%);
}

.medium {
    background-color: #3bf43b;
}

.high {
    background-color: #ff6b6b;
}

.critical {
    background-color: #ff4d4f;
}
</style>