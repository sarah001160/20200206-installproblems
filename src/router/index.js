import Vue from 'vue';
import VueRouter from 'vue-router';
//官方元件


import Home from '@/components/HelloWorld';
import Page from '@/components/pages/page';
import child from '@/components/pages/child';
import child2 from '@/components/pages/child2';
import child3 from '@/components/pages/child3';
import Menu from '@/components/pages/menu';


Vue.use(VueRouter);
export default new VueRouter ({
    // mode:'history',不建議使用;因為要搭配後端
    linkActiveClass:'active',
    routes:[
        {
            name:'首頁',
            path:'/index',
            component:Home,
        },
        {
            // name:'分頁', 因為底下children第一個卡片path路徑已經預設會出現在第一頁,故這一個name先註解掉,直接使用children的name
            path:'/page',
            // component:Page,
            components:{
                default:Page,
                menu:Menu
            }, 
            children:[
                {
                    name:'卡片1',
                    path:'',
                    component:child,
                },
                {
                    name:'卡片2',
                    path:'child2',
                    component:child2,
                },
                {
                    name:'卡片3',
                    path:'child3',
                    component:child3,
                },
            ],
        },
    ]
});