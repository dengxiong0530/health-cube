<template>
	<header id="header">
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
				        	<div id="menu" class="navbar-collapse collapse" >
				                <ul class="nav navbar-nav">
					                <li class="level">
					                  	<a href="/" class="page-scroll nav-link" data-scroll>Home</a>
					                </li>
					                <li class="level">
					                  	<a href="/Dashboard" class="page-scroll nav-link" data-scroll>Dashboard</a>
					                </li>
					                <li class="level">
					                  	<a href="/trend" class="page-scroll nav-link" data-scroll>trend</a>
					                </li>
					                <li class="level">
					                  	<a href="/test" class="page-scroll nav-link" data-scroll>Test</a>
					                </li>  
					                <!-- <li class="level">
					                  	<a href="blog.html" class="page-scroll nav-link">Blog</a>
					                </li> -->
					                <!-- <li class="level">
					                  	<a href="#contact-part" class="page-scroll nav-link" data-scroll>Conatct</a>
					                </li> -->
                                    
				                </ul>
								 
				            </div>
							<div id="div-login">
								<div v-if="isLoggedIn">
								    <!-- <a  class="btn btn-color"  @click="sginOut" > Sign out</a> -->
									 <span><i class="fa fa-user" aria-hidden="true"></i> {{ user?.email}}</span>  <a @click="sginOut"> Sign out</a>
								</div>
									<a  v-else    @click="sginIn"  >Sign in</a>
									
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
const router = useRouter();
const authStore = useAuthStore()

const user = authStore.user

const isLoggedIn = computed(() => !!authStore.user)

const sginIn = () => {
  router.push('/login');  // 跳转到登录页
};

const sginOut =() =>{
	authStore.signOut();
	router.push('/login');
}

</script>

<style scoped>

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

</style>