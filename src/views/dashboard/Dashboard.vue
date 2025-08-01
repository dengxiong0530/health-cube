<template>
  
        <div id='dashbord' class="center-sm">

            <el-row class='one-row' :gutter="55">
                <el-col class="one-row-col" :xs="20" :sm="20" :md="8" :lg="8" :xl="8">
                    <BmiChart />
                </el-col>
                <el-col class="one-row-col" :xs="20" :sm="20" :md="16" :lg="16" :xl="16">
                    <PensonalCard />
                </el-col>
                <!-- <el-col :span="8" class="one-row-col"><el-card style="max-width: 100%"></el-card> </el-col> -->
            </el-row>

            <el-row class='two-row' :gutter="55">
                <el-col class="one-row-col" :xs="20" :sm="20" :md="8" :lg="8" :xl="8">


                    <TargetList />
                    <!-- <PersonalDetails /> -->

                    <el-card shadow="hover" class="custom-warning-card">
                        <h4><el-icon class="warning-icon">
                                <WarningFilled />
                            </el-icon> Disclaimer</h4>
                        <!-- <span class="disclaimer-text">
                    The health indicators provided by this calculator are for informational purposes only and do not substitute for professional medical advice. Please consult a healthcare professional before making any health interventions. Users assume all risks associated with the information obtained from this tool.
                </span>
             -->


                        <div class="disclaimer-content">
                            <span class="disclaimer-text">
                                Health metrics from this calculator are for <strong>informational use only</strong>
                                and <strong>not a substitute for professional medical advice</strong>.
                                Consult a licensed healthcare provider before making health decisions.
                                We assume <strong>no liability</strong> for outcomes based on these results.
                            </span>
                        </div>


                    </el-card>



                </el-col>
                <el-col class="one-row-col" :xs="20" :sm="20" :md="16" :lg="16" :xl="16">

                    <TargetDetails />



                </el-col>
            </el-row>

        </div>
 
</template>

<style scoped>




.disclaimer-alert {
    margin: 1rem 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
}

.disclaimer-content {
    line-height: 1.5;
    color: #444;
    font-size: 0.9rem;
}

.disclaimer-content strong {
    color: #e53935;
}

#dashbord {
    margin-top: 80px;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    margin-left: 7%;
    margin-right: 7%
}


.info {
    flex: 1;
}

.name {
    margin: 0;
    font-size: 20px;
}

.title {
    margin-top: 5px;
    font-size: 14px;
    font-weight: normal;
}

.content {
    padding: 10px 20px;
}

.activity-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.label {
    flex: 1;
    margin-left: 10px;
}

.count {
    background-color: #409eff;
    color: white;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 12px;
}

/* .footer {
    display: flex;
    justify-content: space-around;
    padding: 10px 20px;
} */

.follow-button {
    background-color: #ff6a00;
    border-color: #ff6a00;
}

.message-button {
    background-color: #409eff;
    border-color: #409eff;
}

.custom-warning-card {
    background-color: #f7f4ed;
    transition: background-color 0.3s ease;
}

.custom-warning-card:hover {
    background-color: #eddab1;
}

.warning-icon {
    color: #ffc107;
    margin-right: 8px;
}

.disclaimer-text {
    font-size: 13px;
}
</style>


<script setup>



import TargetList from '@/views/dashboard/TargetList.vue'
import TargetDetails from '@/views/dashboard/TargetDetail.vue'
import BmiChart from '@/views/dashboard/BmiChart.vue'
import PensonalCard from '@/views/dashboard/PensonalCard.vue'







</script>
