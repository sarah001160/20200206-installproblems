<template>
  <div>
    <loading :active.sync="isLoading"></loading><!--這是讀取的效果-->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
             :style="{backgroundImage: `url(${item.imageUrl})`}"><!--錢字號跟大括號是es6插入變數的方法-->
          </div>
          <div class="card-body">
           <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
             <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
            <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
        <div class="card-footer d-flex">
            <button @click="getProduct(item.id)" type="button" class="btn btn-outline-secondary btn-sm">
               <i class="fas fa-spinner fa-spin" v-if="status.loadingItem.id === item.id"></i>
               查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
               @click="addtoCart(item.id)">
               <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
     </div>
    </div>

    <div class="my-5 row justify-content-center"><!--購物車列表-->
      <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
           <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id" v-if="cart.carts"><!---為何要加入v-if??-->
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                  <!--要記得刪除時,帶入item的id-->
                  <i class="far fa-trash-alt"></i>
               </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <!-- <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div> -->
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
           <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total"><!--當finaltotal不等於carttotal價錢時,才會顯示以下程式碼-->
              <td colspan="3" class="text-right text-success">折扣價</td> <!--優惠以後的價錢-->
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
      </table>
      <div class="input-group input-group-sm mb-3">
            <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠卷
              </button>
            </div>
      </div> 
    </div>
     
     
     
      <!--這裡要插入表單--> 
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-validate="'required|email'"
            :class="{'is-invalid': errors.has('email')}"
            v-model="form.user.email" placeholder="請輸入 Email" >
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first('email') }}
          </span>
        </div>
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            :class="{'is-invalid': errors.has('name')}"
           v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
          <span class="text-danger" v-if="errors.has('name')">{{errors.has('name')}}</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel"
          v-model="form.user.tel" placeholder="請輸入電話"  v-validate="'required'">
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input class="form-control" name="address"
            :class="{'is-invalid': errors.has('address')}"
            id="useraddress" v-model="form.user.address" v-validate="'required'"
            placeholder="請輸入地址">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name="" id="" class="form-control" cols="30" rows="10"
            v-model="form.message" v-validate="'required'"></textarea>
        </div>

        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>

  </div>

</template>
<script>
import $ from 'jquery';

export default {
  data() {
    return {
      products: [],
      product:{},//存放modal的資料
      status:{
        loadingItem:'',//loadingItem存放的值是產品的id,判斷哪一個產品正在讀取中
      },
      //這邊要建立form,去看課程
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:'',
      },
      cart:{},
      isLoading:false,
      coupn_code:'',
    }
  },
  methods: {
    getProducts() {
      const vm = this;
     const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {//get讀取api資料後再執行.then()的內容
        vm.products = response.data.products;//去console.log看資料結構,才知道products是誰
       console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id){//沒有s
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;//讀取中的商品id
      this.$http.get(url).then((response) => {
         vm.product = response.data.product;//去console.log裡面看資料結構,就能得知product是誰
         $('#productModal').modal('show');
      console.log(response);
      vm.status.loadingItem = '';
      });
    },
     addtoCart(id, qty = 1) {//es6預設值,若函式沒有帶數量,則會自動代1
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;//購物車的api
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart }).then((response) => {//將讀取中的商品id,寫入購物車的api
        console.log(response);
        vm.status.loadingItem = '';//讀取中的商品id清空
        vm.getCart();
        $('#productModal').modal('hide');//關閉modal
      });
    },
    getCart(){
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;//購物車的api
      vm.isLoading = true;//讀取中的圈圈
      this.$http.get(url).then((response) => {//讀取購物車api資料後再執行.then()內容
        // vm.products = response.data.products;
        vm.cart = response.data.data; //cart{}的內容為console.log裡面資料結構中的data裡面的data{}
        console.log(response);
        vm.isLoading = false; //關閉讀取的圈圈
      });
    },
    removeCartItem(id){
      const vm = this;
      const url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then((response)=>{//送出刪除的行為delete
        vm.getCart();//重新渲染畫面
        vm.isLoading = false;
      })
    },
    addCouponCode(){
      const vm = this;
      const url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code:vm.coupon_code,
      }
      vm.isLoading = true;
      this.$http.post(url,{data:coupon}).then((response)=>{
        console.log(response);
        vm.getCart();//重新渲染畫面
        vm.isLoading = false;
      });
    },
    createOrder(){
      const vm = this;
      const url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order= vm.form;
     // vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: order }).then((response) => {
            console.log('訂單已建立', response);
            vm.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log('欄位不完整');
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>