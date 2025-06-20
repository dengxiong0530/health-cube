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
					                <!-- <li class="level">
					                  	<a href="#about-part" class="page-scroll nav-link" data-scroll>About</a>
					                </li>
					                <li class="level">
					                  	<a href="#price-part" class="page-scroll nav-link" data-scroll>Pricing</a>
					                </li>
					                <li class="level">
					                  	<a href="#team-part" class="page-scroll nav-link" data-scroll>Team</a>
					                </li> -->
					                <!-- <li class="level">
					                  	<a href="blog.html" class="page-scroll nav-link">Blog</a>
					                </li> -->
					                <!-- <li class="level">
					                  	<a href="#contact-part" class="page-scroll nav-link" data-scroll>Conatct</a>
					                </li> -->
                                    
				                </ul>
								 
				            </div>
							<div id="div-login">
									<a  class="btn btn-color" @click="goToLogin" >Login</a>
							</div>
						</div>
					</div>
				</div>
			</header>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  console.log("跳转页面")
  router.push('/login');  // 跳转到登录页
};


</script>

<style scoped>

#div-login {
	position: absolute;
	right: -10px;
	top: -10px;
}

</style>