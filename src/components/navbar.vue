<template><!---頁面最上方的導覽列 有登出的按鈕-->
   <div>
        <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
        <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
             <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
        </ul>
</nav>
   </div>
</template>

<script>
export default{
    name:'Navbar',
    methods:{
        signout(){
            const vm =this;
            const url = `${process.env.APIPATH}/logout`;
            this.$http.post(url).then((response)=>{
                console.log(response.data)
                if(response.data.success){//確定登出之後
                    vm.$router.push('/signin');//就會把頁面轉為signin的頁面
                }
            })
        }
    }
}
</script>