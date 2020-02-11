<template>
  <div id="app">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link active" :to="{name:'首頁'}">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/page">Page</router-link>
      </li> 
    </ul>
    <img src="./assets/logo.png">
    <!-- <HelloWorld/> -->
     <router-view name="menu"></router-view>  <!--2再增加一個-->
    <div class="container">
       <router-view></router-view>  <!--1預設的-->
    </div>
   
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
