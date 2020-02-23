// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'

axios.defaults.withCredentials = true;//使用cookie方式登入伺服器

Vue.config.productionTip = false

Vue.use(VueAxios,axios);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
router.beforeEach((to,from,next)=>{
  console.log('to',to,'from',from,'next',next) //
 if(to.meta.requiresAuth){
  //  console.log('這裡需要驗證')//當我從login頁面直接切換回首頁就應該出現"這裡需要驗證"在console.log中
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response)=>{ //用axios取代this.http,因為這邊是router而非元件內部
       console.log(response.data)
        if (response.data.success){
        //  vm.$router.push('/');
        next();
        }else{
          next({
            path:'/login',
          })
        }
    }); 
 }else{
  next();//加上這一句避免被倒守衛擋下來
 } 
  
  }); 