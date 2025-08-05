<template>
	<section id="banner-part" class="menu-section main-banner">
		<div class="banner">
			<div class="banner-detail">
				<div class="container">
					<div class="row m-0">
						<div class="col-lg-6 p-0 fadeInLeft">
							<div class="banner-detail-inner" style="margin-bottom: 10px;">
								<h2 class="banner-title">Welcome to <span>healthcubes.top</span> </h2>
								<h3>Make health management simpler.</h3>
								<p>Easily track your weight and take control of your health rhythm —— Start right
									here.Spend 30 seconds each day recording your weight. The system will automatically
									calculate key indicators such as BMI and body fat percentage. There are also dynamic
									trend charts to visually show the changes, helping you clearly understand your fat -
									loss progress and adjust your plan in a timely manner.</p>
								<button @click="handleGetStarted" class="btn big-width btn-color">Get Started</button> 
							
							</div>
						</div>
						<div class="col-lg-6 p-0">
							<div class="banner-main-img">
							
								<div class="front-bg fadeInRight">
									<img src="@/assets/images/banner1.png" alt="healthcubes">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Site Services Block Start -->

	<section id="team-part" class="menu-section team-section ptb-100">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="heading-part mb-30 mb-sm-20 mb-xs-15">
						<span></span>
						<h2 class="main_title">Services</h2>
						<p>Log your weight daily in a snap. We’ll crunch the numbers to show your key health metrics—no
							math required.</p>
					</div>
				</div>
			</div>
			<div class="mb_-30">
			
				<el-row :gutter="30">
					<el-col class="one-row-col fade-in-item" :xs="20" :sm="12" :md="12" :lg="6" :xl="6">
						<!-- <div class="team-box mb-30"> -->
							<div class="s-thumb">
								<img src="@/assets/images/ss1.png" alt="HealthCubes">
							</div>
							<div class="s-detail">
								<h3 class="services-tital">Weight entry</h3>
								<!-- <span class="member-designation">Designer</span> -->
								<p>After entering the basic information, it only takes 10 seconds to record your weight for the day each time.</p>

							<!-- </div> -->
						</div>
					</el-col>
					<el-col class="one-row-col fade-in-item" :xs="20" :sm="12" :md="12" :lg="6" :xl="6">
						<!-- <div class="team-box mb-30"> -->
							<div class="s-thumb">
								<img src="@/assets/images/ss2.jpg" alt="HealthCubes">
							</div>
							<div class="s-detail">
								<h3 class="services-tital">Data conversion</h3>

								<p>We will convert the data you enter into standard formats, making it easier for you to understand and use.</p>

							<!-- </div> -->
						</div>
					</el-col>
					<el-col class="one-row-col fade-in-item" :xs="20" :sm="12" :md="12" :lg="6" :xl="6">
						<!-- <div class="team-box mb-30"> -->
							<div class="s-thumb">
								<img src="@/assets/images/ss3.jpg" alt="HealthCubes">
							</div>
							<div class="s-detail">
								<h3 class="services-tital">Weight trend</h3>

								<p>We will help you understand your weight changes over time through trend analysis, so you can make better decisions.</p>

							<!-- </div> -->
						</div>
					</el-col>
					<el-col class="one-row-col fade-in-item" :xs="20" :sm="12" :md="12" :lg="6" :xl="6">
						<!-- <div class="team-box mb-30"> -->
							<div class="s-thumb">
								<img src="@/assets/images/ss4.png" alt="HealthCubes">
							</div>
							<div class="s-detail">
								<h3 class="services-tital">Exercise suggestions</h3>
								<p>Based on your current physical condition, here are some suggestions for your reference.</p>

							</div>
						<!-- </div> -->
					</el-col>
				</el-row>
			
			</div>
		</div>
	</section>



	<!-- Digital Marketing start -->
	<section id="about-part" class="menu-section marketing position-r ptb-100">
		<div class="marketing-bg slideInRight"></div>
		<div class="container">
			<div class="row">
				<div class="col-lg-6 fadeInLeft">
					<div class="aboutus-detail pb-md-30">
						<div class="aboutus-detail-inner">
							<div class="heading-part mb-30 mb-sm-20 mb-xs-15">
								<span></span>
								<h2 class="main_title">The simplest weight record</h2>
							</div>
							<p>No complicated operations needed. Let the data be your powerful tool for fat loss and get
								closer to your ideal figure step by step. </p>
							<ul>
								<li>Log weight daily, no hassle. Perfect for busy health seekers.</li>
								<li>Auto - compute health stats. focus on feeling great.</li>
								<li>Clear trend graphs – see how far you’ve come, at a glance.</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-lg-6">
					<div class="marketing-img text-right text-md-center fadeInRight">
						
						<img src="@/assets/images/lv23.png" alt="HealthCubes">
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Digital Marketing end -->

	<!-- Price part start -->
	<!-- <div id="price-part" class="menu-section price-part pt-100">
		<div class="container">
			<div class="row">
				<div class="col-lg-5 fadeInLeft">
					<div class="price-detail">
						<div class="price-detail-inner">
							<div class="heading-part mb-30 mb-sm-20 mb-xs-15">
								<span></span>
								<h2 class="main_title">Choose Your Pricing plan.</h2>
							</div>
							<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
								Lorem ipsum Lorem ipsum dolor sit amet, hendrerit omittantur mel, es vidit eu lorem
								animal iracundia. Ius te altera essent incorrupte.</p>
						</div>
					</div>
				</div>
				<div class="col-lg-7">
					<div class="pricing-table mtb-30">
						<div class="row mlr_-10">
							<div class="col-12 col-md-6 plr-10 fadeInRight mb-sm-30">
								<div class="plan-detail animall">
									<div class="plan-heading">Free</div>
									<span class="plan-sub-title">All you may need</span>
									<h3 class="plan-price"><sub>$</sub>10<sub><span>Month</span></sub></h3>
									<ul class="plan-list">
										<li>Unlimited Domains</li>
										<li>100GB Storage</li>
										<li>Unlimited Email addresses</li>
									</ul>
									<a href="javascript:void(0)" class="btn btn-default-border">Get Started</a>
								</div>
							</div>
							<div class="col-12 col-md-6 plr-10 fadeInRight delay4">
								<div class="plan-detail animall active">
									<div class="plan-heading">Premium</div>
									<span class="plan-sub-title">All you may need</span>
									<h3 class="plan-price"><sub>$</sub>50<sub><span>Month</span></sub></h3>
									<ul class="plan-list">
										<li>Unlimited Domains</li>
										<li>100GB Storage</li>
										<li>Unlimited Email addresses</li>
									</ul>
									<a href="javascript:void(0)" class="btn btn-default-border">Free Trial</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> -->
	<!-- Price part end -->


	<!-- Our Team section strat -->


</template>


<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleGetStarted = () => {
  // 检查userId是否存在
  if (authStore.user && authStore.user.id) {
    // userId存在，跳转到仪表板
    router.push('/dashboard')
  } else {
    // userId不存在，跳转到登录页
    router.push('/login')
  }
}
</script>
<style scoped>
#banner-part {
	-top: 30px;
}


.services-tital {
	margin-bottom: 10px;
	margin-top: 10px;
}
.s-thumb {
	 height: 200px; /* 设置固定高度 */
	 overflow: hidden; /* 隐藏超出容器的部分 */
}
.s-thumb img {
	 height: 100%; /* 图片高度填满容器 */
	 width: 100%; /* 图片宽度填满容器 */
	object-fit: cover; /* 保持图片比例并填充容器 */
	opacity: 0; /* 初始透明度为0 */
	animation: fadeIn 0.8s forwards; /* 应用渐入动画 */
}

/* 渐入动画 */
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 鼠标悬停效果 */
.one-row-col {
	transition: transform 0.3s ease;
}

.one-row-col:hover {
	transform: translateY(-10px);
}

/* 为每个元素设置不同的动画延迟，创建层次感 */
.fade-in-item:nth-child(1) img {
	animation-delay: 0.1s;
}
.fade-in-item:nth-child(2) img {
	animation-delay: 0.2s;
}
.fade-in-item:nth-child(3) img {
	animation-delay: 0.3s;
}
.fade-in-item:nth-child(4) img {
	animation-delay: 0.4s;
}
/* .s-thumb { */
	/* height: 60%;  */

/* } */
</style>