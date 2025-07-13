<template>
    <div id="div-target">
   

                <el-card class="target-card-right" shadow="hover">
                    <h4>Target Detail</h4>
                    <el-row :gutter="2">
                        <el-button color="#626aef" @click="handleClick(1)">Weight</el-button>
                        <el-button color="#626aAf" @click="handleClick(2)">BMI</el-button>
                        <el-button color="#626aAf" @click="handleClick(3)">Calorie</el-button>
                    </el-row>
                    <el-row><el-card class="target-card-detail" shadow="hover">
                            <span class="class-span-call">{{ v_call }}</span>
                            <h2>70 kg</h2>
                            <el-steps :active="v_step" finish-status="success" process-status="process">
                                <el-step title="sept1" />
                                <el-step title="sept2" />
                                <el-step title="Step3" />
                                <el-step title="Step4" />
                                <el-step title="Step5" />
                                <el-step title="Step6" />
                            </el-steps>
                            <el-text class="mx-2" type="info" size="large"> 
                                {{targetJson.desc}}
                            </el-text>
                        </el-card> </el-row>
                    <el-row>
                        <el-card class="target-card-detail class-span-call" shadow="hover">
                            <h3>index analysis</h3>
                            <el-text class="mx-2" type="info" size="large">
                                {{targetJson.indexAnalysis}}
                            </el-text>
                            <el-divider />
                            <h3>Exercise suggestions</h3>
                            <el-text class="mx-2" type="info" size="large">
                                {{targetJson.exerciseSuggestions}}
                            </el-text>
                            <el-divider />
                            <h3>Dietary advice</h3>
                            <el-text class="mx-2" type="info" size="large">
                                {{targetJson.DietaryAdvice}}
                            </el-text>

                        </el-card>
                    </el-row>
                </el-card>
          
    </div>

</template>

<script setup>
import { ref,computed } from 'vue'
import tragetData from '@/data/target.json'


const v_step = ref(3);
const v_call = ref("Your weight:");
const targetName = ref('dome');
const targetJson = ref("");
const v_description = ref(targetJson.value.desc);
function getTargetObject(name) {
    return  tragetData.find(item=> item.targetName === name)|| {};
}

const handleClick = (index) => {
    switch (index) {
        case 1:
            v_call.value = "Your weight:";
            targetName.value = "weight";
            targetJson.value = getTargetObject(targetName.value);
         
            break;
        case 2:
            targetName.value = 'BMI';
            v_call.value = "Your BMI:";
            console.log(v_description.value);
            break;
        case 3:
            targetName.value = 'Calorie';
            break;
        default:
            targetName.value = 'weitht';
            break;
    }
    console.log(`点击了第${index}列`);
    // 这里可以执行你需要的操作
}

</script>

<style>
#div-target {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;

}

.target-list-row {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

}

.target-card-right .el-card__body>div {
    margin-bottom: 25px;
    /* 元素之间的垂直间距 */
}

.target-card-detail{
    width: 100%;
}

.target-card-right .el-card__body>div:last-child {
    margin-bottom: 0px;
    /* 最后一个元素不添加底部间距 */
}

.class-span-call {
    display: block;
    /* 让span独占一行 */
    text-align: left;
}
</style>