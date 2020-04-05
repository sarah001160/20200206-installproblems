// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay'; //匯入Loading套件
import 'vue-loading-overlay/dist/vue-loading.css';//已經改版了,沒有min.css
import VeeValidate from 'vee-validate';//新增套件vee-validate
// import zhTWValidate from 'vee-validate/dist/locale/zh_TW'//納入中文版本
import VueI18n from 'vue-i18n';

import 'bootstrap'; //匯入BS套件
import App from './App'; 
import router from './router';
import './bus'; //匯入bus.js
import currencyFilter from './filters/currency'; //匯入currency.js



axios.defaults.withCredentials = true;//使用cookie方式登入伺服器
Vue.config.productionTip = false

Vue.component('Loading',Loading);//啟用全域的元件
Vue.filter('currency', currencyFilter);

Vue.use(VueAxios,axios);


const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});

// VeeValidate.Validator.localize('zh_TW',zhTWValidate)//納入中文版

/* eslint-disable no-new */
new Vue({
  i18n,//veevalidate顯示中文版
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
router.beforeEach((to,from,next)=>{ //這是導航守衛
  console.log('to',to,'from',from,'next',next) //去哪一頁to,來自哪一頁from,next下一頁
  if(to.meta.requiresAuth){//meta.requiresAuth路由訊息
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