import Vue from 'vue';
import VueRouter from 'vue-router';
//官方元件

// import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import products from '@/components/pages/products';
import CustomerOrder from '@/components/pages/CustomerOrders';


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
            
      
    ]
});