<template>
	<header >
		<div class="container">
			<div class="row m-0">
				<div class="col-lg-3 col-md-4 col-8 p-0">
					<div class="navbar-header">
						<a class="navbar-brand page-scroll" href="index.html">
							<img alt="hexan" src="@/assets/images/logo.png">
						</a>
					</div>
				</div>
				<div class="col-lg-9 col-md-8 col-4 p-0">
					<!-- <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle d-block d-lg-none d-xl-none" type="button"><i class="fa fa-bars"></i>
				        	</button> -->
					<div id="menu" class="navbar-collapse collapse">
						<ul class="nav navbar-nav">
							<li class="level">
								<!-- <a href="/" class="page-scroll nav-link" data-scroll>Home</a> -->
								 <router-link to="/" active-class="current">Home</router-link>
							</li>
							<li class="level">
								 <router-link to="/Dashboard" active-class="current">Dashboard</router-link>
							</li>
							<li class="level">
								<!-- <a href="/trend" class="page-scroll nav-link" data-scroll>trend</a> -->
								<router-link to="/trend" active-class="current">trend</router-link>
							</li>
							<li class="level">
								<!-- <a href="/test" class="page-scroll nav-link" data-scroll>Test</a> -->
								<router-link to="/test" active-class="current">test</router-link>
							</li>
						</ul>
					</div>
					<div id="div-login">
						<div v-if="isLoggedIn">

				
							<el-dropdown >
								<span class="user-caretBotton-class"
								>
									<span>
										<i class="fa fa-user" aria-hidden="true"></i> 
										{{ user?.email }}</span>
									<el-icon>
										<CaretBottom />
									</el-icon>
								</span>
								<template #dropdown >
									<el-dropdown-menu slot="dropdown" class="custom-dropdown-menu" >
										<!-- <el-dropdown-item @click="editProfile"><span > <el-icon><Edit /></el-icon>  EditProfile </span></el-dropdown-item> -->
										<el-dropdown-item @click="sginOut"> <span  class="logout-item" > SginOut </span></el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>

 




						</div>
						<a v-else @click="sginIn">Sign in</a>

					</div>
				</div>
			</div>
		</div>
	</header>
</template>


<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { CaretBottom } from '@element-plus/icons-vue'

const router = useRouter();
const authStore = useAuthStore()

const user = authStore.user

const isLoggedIn = computed(() => !!authStore.user)

// const isActive = (path) => router.path === path;

const sginIn = () => {
	router.push('/login');  // 跳转到登录页
};

const sginOut = () => {
	authStore.signOut();
	router.push('/login');
}


// const editProfile = () => {
// 	console.log('点击了修改个人信息')

// }

</script>

<style scoped>

.current {
  color: #fb4275; 
  
}


#div-login {
	position: absolute;
	right: -10px;
	top: 0px;
	padding: 7px 18px !important;
	/* display: inline-block; */
	/* text-transform: uppercase; */
	/* font-weight: 400; */
	color: #9146ff;
	font-size: 16px;
	/* position: relative; */
}

.user-caretBotton-class {
	color: #9146ff;
	font-size: 16px;
}

.el-dropdown-item {
  padding: 10px;
}
.logout-item {
  width: 220px;  /* 控制线条长度 */
  border-top: 1px solid #c0bdbd;
  text-align: center;
}
.custom-dropdown-menu {
  width: 220px; /* 设置下拉菜单宽度 */
  font-size: 15px; /* 设置字体大小 */

}

</style>