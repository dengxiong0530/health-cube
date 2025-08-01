<template>
    <div class="div-target-detail" ref="targetDetailDiv">

        <el-card class="target-card-right" shadow="hover">
            <h3>Target Detail</h3>
            <el-row :gutter="2">

                <el-button color="#626aAf" size="small" style="margin-bottom: 10px;"
                    @click="handleClick(getTargetStore('BMI'))">BMI</el-button>
                <el-button color="#626aAf" size="small" style="margin-bottom: 10px;"
                    @click="handleClick(getTargetStore('ABSI'))">ABSI</el-button>
                <el-button color="#626aAf" size="small" style="margin-bottom: 10px;"
                    @click="handleClick(getTargetStore('WHR'))">WHR</el-button>
                <el-button color="#626aAf" size="small" style="margin-bottom: 10px;"
                    @click="handleClick(getTargetStore('BodyFat'))">BodyFat</el-button>
                <el-button color="#626aAf" size="small" style="margin-bottom: 10px;"
                    @click="handleClick(getTargetStore('IdealWeight'))">IdealWeight</el-button>
                <!-- <el-button color="#626aAf" size="small"  style="margin-bottom: 10px;" @click="handleClick(getTargetStore('TargetHeartRate'))">TargetHeartRate</el-button> -->

            </el-row>
            <el-row><el-card class="target-card-detail" shadow="hover">
                    <span class="class-span-call">{{ v_call }}</span>
                    <h2 class="class-tag-value">{{ tagValue }}</h2>

                    <!-- <ProgressIndicator value="Normal" name="BMI" /> -->

                    <!-- <ProgressIndicator :value="tag" :name="targetName" /> -->
                    <ProgressIndicator v-if="tag" :value="tag" :name="targetName" />

                    <el-text class="target-dt-text" type="info" size="default">
                        {{ targetJson.desc }}
                    </el-text>
                </el-card> </el-row>
            <el-row v-if="tag">
                <el-card class="target-card-detail class-span-call" shadow="hover">
                    <h3>Indicator analysis</h3>
                    <el-text class="target-dt-text" type="info" size="default">

                        {{ targetJson.indexAnalysis[tag] }}
                    </el-text>
                    <el-divider />
                    <h3>Exercise suggestions</h3>
                    <el-text class="target-dt-text" type="info" size="default">
                        {{ targetJson.exerciseSuggestions[tag] }}
                    </el-text>
                    <el-divider />
                    <h3>Dietary advice</h3>
                    <el-text class="target-dt-text" type="info" size="large">
                        {{ targetJson.DietaryAdvice[tag] }}
                    </el-text>

                </el-card>
            </el-row>
        </el-card>

    </div>


</template>

<script setup>

import { ref, computed, onMounted, watch, nextTick } from 'vue'
import tragetData from '@/data/target.json'
import { useNavigationStore } from '@/stores/navigationStore';
import { useUserTargetStore } from '@/stores/userTargetStore'
import ProgressIndicator from '@/components/ProgressIndicator.vue';
const navigationStore = useNavigationStore();
const userTargetStore = useUserTargetStore();

const v_call = ref('Your BMI:');
const targetName = ref('BMI');
const targetJson = ref(getTargetObject(targetName.value));

const targetStore = ref(getTargetStore('Weight'));
const tag = ref(targetStore.value.tag);
const tagValue = ref(targetStore.value.tagValue);



function getTargetObject(name) {
    return tragetData.find(item => item.targetName === name) || {};
}

function getTargetStore(name) {
    return userTargetStore.targets.find(item => item.name === name) || {};
}

const handleClick = (item) => {

    targetName.value = item.name;
    tagValue.value = item.tagValue;
    tag.value = item.tag;
    targetJson.value = getTargetObject(targetName.value);
    // console.log(tag.value,targetName.value)

    switch (item.name) {
        // case 'Weight':
        //     v_call.value = "Your Weight:";
        //     break;
        case 'BMI':
            v_call.value = "Your BMI:";
            break;
        case 'ABSI':
            v_call.value = "Your A Body Shape Index:";
            break;
        case 'WHR':
            v_call.value = "Your Waist-to-Hip Ratio:";
            break;
        case 'IdealWeight':
            v_call.value = "Your Ideal Weight:";
            break;

        case 'TargetHeartRate':
            v_call.value = "Your Target Heart Rate:";
            break;
        case 'BodyFat':
            v_call.value = "Your Navy Body Fat:";
            break;
        default:
            v_call.value = "Your BMI:";

            break;
    }
    // console.log(`点击了第${item}列` );
    // 这里可以执行你需要的操作

}

const targetDetailDiv = ref(null);
const offset = -150;
const receiveList = () => {
    // handleClick(item);
    if (targetDetailDiv.value) {
        const targetPosition = targetDetailDiv.value.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// 监听导航状态变化
watch(
    () => navigationStore.shouldNavigate,
    (shouldNavigate) => {
        if (shouldNavigate) {
            // 获取传递的参数并执行方法
            const { selectedItem,isInit } = navigationStore;
            if (selectedItem !== null ) {
                 handleClick(selectedItem);
                 if(!isInit){
                    receiveList();
                 }
                // receiveList(selectedItem);
            }
            // 重置导航状态
            navigationStore.resetNavigation();
        }
    },
    { immediate: false }
);

// 组件挂载时检查是否有预传递的参数
onMounted(() => {
    if (navigationStore.shouldNavigate) {
        const { selectedItem,isInit } = navigationStore;
        if (selectedItem !== null) {
             handleClick(selectedItem);
            // receiveList(selectedItem);
              if(!isInit){
                    receiveList();
                 }
            navigationStore.resetNavigation();
        }
    }  
});

</script>

<style scoped>
.div-target-detail {
    margin-bottom: 10px;
}

.target-card-right .el-card__body>div {
    margin-bottom: 25px;
    /* 元素之间的垂直间距 */
}

.target-card-detail {
    width: 100%;
}


.target-dt-text {
    text-align: left;
}

.class-tag-value {
    text-align: center;
}
</style>