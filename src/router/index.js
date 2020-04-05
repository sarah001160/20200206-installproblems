import Vue from 'vue';
import VueRouter from 'vue-router';

//官方元件

// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';//新增Login的元件
import Dashboard from '@/components/Dashboard'; //新增Dashboard的元件
import products from '@/components/pages/products';//新增products的元件
import CustomerOrder from '@/components/pages/CustomerOrders';//新增CustomerOrder的元件
import Coupon from '@/components/pages/Coupon'; //新增coupon的元件



Vue.use(VueRouter);

export default new VueRouter ({
    // mode:'history',不建議使用;因為要搭配後端
    linkActiveClass:'active',
    routes:[
        {
            path:'*',//加入星號,可避免隨便亂輸入路徑進入空白頁面,這樣隨便亂入不好,所以這邊加入星號以後,路徑就算亂key畫面也不會亂入,會直接導回登入頁面
            redirect:'login',
        },
        // {
        //     name:'HelloWorld',
        //     path:'/',
        //     component:HelloWorld,
           
        // },
        {
            name:'Login',
            path:'/login', //新增login的路徑
            component:Login,//放元件的名稱(集中在components資料夾底下的vue檔案)
        },
        {
            path:'/admin',
            name:'Dashboard',
            component:Dashboard,
            children:[
                {
                    path:'products',
                    name:'products',
                    component:products,
                    meta:{requiresAuth:true},//需要登入才能看的頁面
                }
            ]
        },
        {
            path:'/',
            name:'Dashboard',
            component:Dashboard,
            children:[
                {
                    path:'Customer_order',
                    name:'CustomerOrder',
                    component:CustomerOrder,
                }
            ]
        },
        {
            path:'/',
            name:'Dashboard', //Dashboard的元件裡面要再增加子元件
            component:Dashboard,
            children:[ //子元件就是coupon元件
                {
                    path:'Coupon',
                    name:'Coupon',
                    component:Coupon,
                }
            ]
        },  
      
    ]
});