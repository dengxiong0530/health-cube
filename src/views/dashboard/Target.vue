<template>
    <div id="div-target">
        <el-row class='two-row' :gutter="20">
            <el-col class="one-row-col" :xs="24" :sm="8" :md="8" :lg="6" :xl="6" :offset="2">
                <el-card class="target-card-left" shadow="hover">
                    <h3>Recent Transactions</h3>
                    <el-table :data="transactions" style="width: 100%;">
                        <el-table-column prop="name" label="Name"></el-table-column>
                        <el-table-column prop="priority" label="Priority">
                            <template #default="scope">
                                <el-tag :type="getTagType(scope.row.priority)">{{ scope.row.priority }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="budget" label="Budget"></el-table-column>
                    </el-table>


                </el-card>
            </el-col>
            <el-col class="one-row-col" :xs="24" :sm="12" :md="12" :lg="14" :xl="16">

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
                            <el-text class="mx-2" type="info" size="large"> The results show a number of daily calorie
                                estimates
                                that can be used as a guideline
                                for how many
                                calories to consume each day to maintain, lose, or gain weight at a chosen
                                rate.</el-text>
                        </el-card> </el-row>
                    <el-row>
                        <el-card class="target-card-detail class-span-call" shadow="hover">
                            <h3>index analysis</h3>
                            <el-text class="mx-2" type="info" size="large">The results show a number of daily calorie
                                estimates
                                that can be used as a guideline
                                for how many
                                calories to consume each day to maintain, lose, or gain weight at a chosen
                                rate.</el-text>
                            <el-divider />
                            <h3>Exercise suggestions</h3>
                            <el-text class="mx-2" type="info" size="large">The results show a number of daily calorie
                                estimates
                                that can be used as a guideline
                                for how many
                                calories to consume each day to maintain, lose, or gain weight at a chosen
                                rate.</el-text>
                            <el-divider />
                            <h3>Dietary advice</h3>
                            <el-text class="mx-2" type="info" size="large">The results show a number of daily calorie
                                estimates
                                that can be used as a guideline
                                for how many
                                calories to consume each day to maintain, lose, or gain weight at a chosen
                                rate.</el-text>

                        </el-card>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script setup>
import { ref } from 'vue'

const v_step = ref(3);
const v_call = ref("Your weight:");

const handleClick = (index) => {
    console.log(`点击了第${index}列`);
    // 这里可以执行你需要的操作
}


const targetList = ref({
    height: 169,
    weight: 69,
})

const transactions = ref([
    {
        id: 1,
        assigned: { name: 'Sunil Joshi', role: 'Web Designer' },
        name: 'Elite Admin',
        priority: 'Low',
        budget: '$3.9'
    },
    {
        id: 2,
        assigned: { name: 'Andrew McDowland', role: 'Project Manager' },
        name: 'Real Homes WP Theme',
        priority: 'Medium',
        budget: '$24.5k'
    },
    {
        id: 3,
        assigned: { name: 'Christopher Jamil', role: 'Project Manager' },
        name: 'MedicalPro WP Theme',
        priority: 'High',
        budget: '$12.8k'
    },
    {
        id: 4,
        assigned: { name: 'Nirav Joshi', role: 'Frontend Engineer' },
        name: 'Hosting Press HTML',
        priority: 'Critical',
        budget: '$2.4k'
    }
])

const getTagType = (priority) => {
    switch (priority) {
        case 'Low': return 'primary'
        case 'Medium': return 'info'
        case 'High': return 'warning'
        case 'Critical': return 'danger'
        default: return 'default'
    }
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