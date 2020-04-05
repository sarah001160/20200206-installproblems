<template>
<div>
  <navbar/><!--navbar component-->
  <Alert></Alert><!--Alert component-->
  <div class="container-fluid mt-5">   
    <div class="row">
      <sidebar></sidebar>   
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</div>
</template>

<script>
import sidebar from './sidebar';
import navbar from './navbar';
import Alert from './AlertMessage';


export default{
components:{//匯入components資料夾裡面的sidebar及nabar元件
sidebar,
navbar,
Alert,

}
};
</script>