<template>
 <div class="hello"> 
         <router-view></router-view>
         <ul class="nav">
            <li class="nav-item">
                <router-link class="nav-link" to="/page/">卡片一</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/page/child2">卡片二</router-link>
             </li>
             <li class="nav-item">
                <router-link class="nav-link" to="/page/child3">卡片三</router-link>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="updatePath">切換到指定頁面</a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" @click.prevent="beforePath">回到前一頁</a>
            </li>
        </ul>
     
</div>
</template>
<script>
export default {
  data () {
    return {   }
  },
  methods:{
    updatePath(){
      this.$router.push('/page/child2')
    },
    beforePath(){
      this.$router.back()
    },

  },
}
</script>

