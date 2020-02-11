<template>
 <div class="hello">
     <div class="card" style="width: 18rem;">
         <!-- <router-link to="/page/">卡片一</router-link>
         <router-link to="/page/child2">卡片二</router-link>
         <router-link to="/page/child3">卡片三</router-link> -->
         <router-view></router-view>
     </div>
</div>
</template>
<script>
export default {
  data () {
    return {   }
  }
}
</script>

