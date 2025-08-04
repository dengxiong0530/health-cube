<template>
    <div class="target-list-div">
        <el-card class="profile-card" shadow="hover">
            <!-- <h3 class="target-list-card-title">Target List</h3> -->
            <div class="transactions-list">

                <div class="transaction-item" v-for="(item, idx) in targetListData" :key="idx"
                    @click="clickToDetail(item, $event)">
                    <div class="col-name">{{ item.name }}</div>
                    <div class="col-priority" :style="{ backgroundColor: targetColors[item.tagClass] }">{{ item.tagName
                    }}</div>
                    <div class="col-budget">{{ item.tagValue }}</div>
                    <el-icon>
                        <ArrowRight />
                    </el-icon>


                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/userStore'
import { HealthCalculator } from '@/utils/HealthCalculator';
import { useNavigationStore } from '@/stores/navigationStore';
import { useUserTargetStore } from '@/stores/userTargetStore'
import { targetColors } from '@/constants/colors'

const userDataStore = useUserStore();
// const weight = computed(() => userDataStore.userInfoStore?.weight || 0)
const userInfoStore = computed(() => userDataStore?.userInfoStore || {})

const userTargetStore = useUserTargetStore();

const updateTarget = (item) => {

    userTargetStore.upsetTargetStore(item);
};

const navigationStore = useNavigationStore();



const clickToDetail = (item, event) => {
    // console.log(item, event);
    //  console.log(item,weight);
    navigationStore.navigateToB(item, false);

}


const targetListData = computed(() => {


    const healthCalculator = new HealthCalculator(
        userInfoStore.value.height,
        userInfoStore.value.weight,
        userInfoStore.value.age,
        userInfoStore.value.gender,
        userInfoStore.value.waist,
        userInfoStore.value.hip,
        userInfoStore.value.neck

    )
    const bmiResult = healthCalculator.getBmi();
    const absiResult = healthCalculator.getABSI();
    const whrResult = healthCalculator.getWaistToHip();

    const idealWeightResult = healthCalculator.getIdealWeight();
    // const heartRateResult = healthCalculator.getHeartRate();



    const navyBodyFatResult = healthCalculator.getNavyBodyFat();


    // updateTarget({ name: 'Weight', tag: 'Underweight', tagClass: 'low', tagValue: userInfoStore.value.weight });
    updateTarget(bmiResult);
    updateTarget(absiResult);
    updateTarget(whrResult);
    updateTarget(idealWeightResult);
    // updateTarget(heartRateResult);
    updateTarget(navyBodyFatResult);



    // clickToDetail(bmiResult); //更新数据后刷新detail页面
    navigationStore.navigateToB(bmiResult, true);
    return [
        bmiResult, absiResult, whrResult, navyBodyFatResult, idealWeightResult,
    ]

});





// onMounted(() => {
//     loadData();
// })

// const loadData = () => {
//     console.log(targetListData)
// }



</script>

<style scoped>
.target-list-div {
    /* margin-top: 10px; */
    margin-bottom: 25px;
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

/* 
.lowLess {
    background-color: #64abf3;
}

.low {
    background-color: #1E90FF;
}

.medium {
    background-color: #32CD32;
}

.high {
    background-color: #FFA500;
}

.obese {
    background-color: #FF0000;
} */
</style>