<template>
<div>
  
<navbar/>
<div class="container-fluid">
   
  <div class="row">
    <sidebar></sidebar>   
    <main role="main">
      <router-view></router-view>
    </main>
  </div>
</div>

</div>
</template>

<script>
import sidebar from './sidebar';
import navbar from './navbar';


export default{
components:{//匯入components資料夾裡面的sidebar及nabar元件
sidebar,
navbar,

}
};
</script>