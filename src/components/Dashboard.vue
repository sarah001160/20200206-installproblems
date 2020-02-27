<template>
<div>
  
<navbar/>
<div class="container-fluid">
  <div class="row">
      <sidebar></sidebar>
   
    <main></main>
     <router-view></router-view>
   

   
  </div>
</div>

</div>
</template>

<script>
import sidebar from './sidebar';
import navbar from './navbar';

export default{
component:{
sidebar,
navbar,
}
};
</script>