<template>
  <div id="not-found-page">
    <div class="wrap">
      <div class="logo">
        <h1>404</h1>
        <p> Sorry - File not Found!</p>
        <div class="sub">
          <p><a href="/"> Back to Home</a></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

</script>

<style scoped>


#not-found-page {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #f0f0f0; */
  background-color: #DAD6CC;
  margin-top: 105px;
}

body {
  font-family: 'Capriola', sans-serif;
  background: #DAD6CC;
}

.wrap {
  margin: 0 auto;
  width: 1000px;
  /* background-color: #f0f0f0; */
}



.logo h1 {
  font-size: 200px;
  color: #FF7A00;
  text-align: center;
  margin-bottom: 1px;
  text-shadow: 4px 4px 1px white;
  height: 110px;
}

.logo p {
  color: #B1A18D;
  font-size: 20px;
  margin-top: 1px;
  text-align: center;

}

.logo p span {
  color: lightgreen;
}

.sub a {
  color: #ff7a00;
  text-decoration: none;
  padding: 5px;
  font-size: 15px;
  font-family: arial, serif;
  font-weight: bold;
}


</style>