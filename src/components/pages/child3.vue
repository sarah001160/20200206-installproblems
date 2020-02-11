<template>
 <div class="hello">
    <div class="card" style="width: 18rem;">
  <img src="https://images.unsplash.com/photo-1514328525431-eac296c01d82?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" class="card-img-top" alt="">
  <div class="card-body">
    <h5 class="card-title">Card3</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div>
</template>
<script>
export default {
  data () {
    return {};
  },
  created(){
    console.log(this.$route.params.id);
    const id =this.$route.params.id;
    this.$http.get('https://randomuser.me/api/').then((response)=>{
        console.log(response);
    });
  },
}
</script>

