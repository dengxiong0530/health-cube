<template>
	<header>
		<div class="container">
			<div class="row m-0">
				<div class="col-lg-3 col-md-4 col-8 p-0">
					<div class="navbar-header">
						<a class="navbar-brand page-scroll" href="/">
							<img alt="hexan" src="@/assets/images/logo.png">
						</a>
					</div>
				</div>
				<div class="col-lg-9 col-md-8 col-4 p-0">
					<!-- <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle d-block d-lg-none d-xl-none" type="button"><i class="fa fa-bars"></i>
				        	</button> -->
					<div id="menu" class="navbar-collapse collapse" v-if="!isMobile">
						<ul class="nav navbar-nav">
							<li class="level">
								<!-- <a href="/" class="page-scroll nav-link" data-scroll>Home</a> -->
								<router-link to="/" active-class="current" @click="handleNavClick"
									:class="{ 'click-feedback': isNavClicked }">Home</router-link>
							</li>
							<li class="level">
								<router-link to="/dashboard" active-class="current" @click="handleNavClick"
									:class="{ 'click-feedback': isNavClicked }">Dashboard</router-link>
							</li>
							<li class="level">
								<!-- <a href="/trend" class="page-scroll nav-link" data-scroll>trend</a> -->
								<router-link to="/trend" active-class="current" @click="handleNavClick"
									:class="{ 'click-feedback': isNavClicked }">trend</router-link>
							</li>
							<li class="level">
								<!-- <a href="/test" class="page-scroll nav-link" data-scroll>Test</a> -->
								<router-link to="/Settings" active-class="current" @click="handleNavClick"
									:class="{ 'click-feedback': isNavClicked }">Settings</router-link>
							</li>
						</ul>
					</div>

					<div class="mobile-nav" v-if="isMobile">
						<el-dropdown>
							<span class="user-caretBotton-class">
								<el-icon style="font-size: 38px; color: #409EFF">
									<Menu />
								</el-icon>
							</span>
							<template #dropdown>
								<el-dropdown-menu slot="dropdown" class="mobile-custom-dropdown-menu">
									<el-dropdown-item><router-link to="/" active-class="current" @click="handleNavClick"
											:class="{ 'click-feedback': isNavClicked }">Home</router-link></el-dropdown-item>
									<el-dropdown-item><router-link to="/dashboard" active-class="current"
											@click="handleNavClick" :class="{ 'click-feedback': isNavClicked }">
											Dashboard
										</router-link></el-dropdown-item>

										<el-dropdown-item><router-link to="/trend" active-class="current"
											@click="handleNavClick" :class="{ 'click-feedback': isNavClicked }">
											Trend
										</router-link></el-dropdown-item>

									<el-dropdown-item><router-link to="/settings" active-class="current"
											@click="handleNavClick" :class="{ 'click-feedback': isNavClicked }">
											Settings
										</router-link></el-dropdown-item>

								</el-dropdown-menu>
							</template>
						</el-dropdown>

					</div>







					<div id="div-login">
						<div class="class-user-login" v-if="isLoggedIn">


							<el-dropdown>
								<!-- <span class="user-caretBotton-class">
									<span>
										<i class="fa fa-user" aria-hidden="true"></i>
										{{ user?.email }}
									</span>
									<el-icon>
										<CaretBottom />
									</el-icon>
								</span> -->
								<el-avatar> <el-icon>
										<User />
									</el-icon> </el-avatar>


								<template #dropdown>
									<el-dropdown-menu slot="dropdown" split-button="true" class="custom-dropdown-menu">
										<el-dropdown-item><span class="dropdown-item-user"> Welcome User: <br> {{
											user?.email }} <br> </span></el-dropdown-item>
										<!-- <el-dropdown-item  ><span> <el-icon>
													<UserFilled />
												</el-icon> Edit User </span></el-dropdown-item> -->


										<el-dropdown-item> <router-link to="/settings" active-class="current">
												<span><el-icon>
														<Setting />
													</el-icon> Settings </span>
											</router-link>
										</el-dropdown-item>

										<el-dropdown-item @click="sginOut"> <el-icon>
												<SwitchButton />
											</el-icon> SginOut
										</el-dropdown-item>

										<!-- <el-dropdown-item @click="sginOut"> <span class="logout-item"> <el-icon>
													<SwitchButton />
												</el-icon> SginOut
											</span></el-dropdown-item> -->
									</el-dropdown-menu>
								</template>
							</el-dropdown>
						</div>
						<a v-else @click="sginIn"> <el-icon>
								<User />
							</el-icon> Sign in</a>

					</div>
				</div>
			</div>
		</div>
	</header>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth';
import { Menu, Setting, SwitchButton, User, UserFilled } from '@element-plus/icons-vue';
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();

// 使用computed属性确保user是响应式的
const user = computed(() => authStore.user);

const isLoggedIn = computed(() => !!authStore.user);

// const isActive = (path) => router.path === path;
const isMobile = ref(false);

const checkScreenSize = () => {
	isMobile.value = window.innerWidth < 900;
};

// 导航方法
const navigateTo = (path) => {
	router.push({ name: path });
};

const isNavClicked = ref(false);
const handleNavClick = () => {
	isNavClicked.value = true;
	setTimeout(() => {
		isNavClicked.value = false;
	}, 200);
};

// 监听窗口大小变化
onMounted(() => {
	checkScreenSize();
	window.addEventListener('resize', checkScreenSize);
});

// 组件卸载时移除监听器
watch(() => isMobile.value, (newVal) => {
	// 可以在这里添加切换动画逻辑
});

// 清理
onBeforeUnmount(() => {
	window.removeEventListener('resize', checkScreenSize);
});

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
.header-container {
	position: relative;
	/* 设置相对定位，使z-index生效 */
	z-index: 100;
	/* 设置较高的z-index，确保Header在其他内容之上 */
}

.current {
	color: #fb4275;

}

.click-feedback {
	background-color: #ffe5ec;
	transition: background-color 0.2s;
}

.class-user-login {
	margin-top: -10px;
}

#div-login {
	position: absolute;
	right: 0px;
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
	width: 220px;
	/* 控制线条长度 */
	border-top: 2px solid #c0bdbd;
	text-align: center;
	margin-top: 10px;
}

.dropdown-item-user {
	width: 220px;
	border-bottom: 2px solid #c0bdbd;
	margin-bottom: 10px;
}

.custom-dropdown-menu {
	width: 220px;
	/* 设置下拉菜单宽度 */
	font-size: 15px;
	/* 设置字体大小 */
	padding: 10px 5px;

}

.mobile-custom-dropdown-menu {
	width: 150px;
	/* 设置下拉菜单宽度 */
	font-size: 15px;
	/* 设置字体大小 */
}

.mobile-nav .el-dropdown {
	height: 100%;
	margin-top: 0px;

}
</style>