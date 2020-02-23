<template>
  <div id="app">
      <router-view></router-view>  <!--1預設的-->
    <!-- <a href="#" @click.prevent="signout">登出</a> -->
    

    <img src="./assets/logo.png">
    <!-- <HelloWorld/> -->
       <button type="button" class="btn btn-primary">Primary</button>
  </div>
</template>

<script>
export default {
name:'App',
created(){
    const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
    // const api = 'https://vue-course-api.hexschool.io/api/sarah/products';可以改成環境變數取得如上
    //API 伺服器路徑
    //所申請的API PATH
    console.log(process.env.APIPATH,process.env.CUSTOMPATH)
    this.$http.get(api).then((response)=>{
        console.log(response.data);
    })

},
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
