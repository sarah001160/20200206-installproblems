<template>
<div>
    <div class="vld-parent">
        <loading :active.sync="isLoading"></loading>
    </div>

    <div class="text-right mt-4">
         <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button><!--點選此按鈕將會觸發#productModal-->
    </div>
    <table class="table mt-4">
       <thead>
           <tr>
               <th width="120">分類</th>
               <th>產品名稱</th>
               <th width="120">原價</th>
               <th width="120">售價</th>
               <th width="100">是否啟用</th>
               <th width="100">編輯</th>
           </tr>
       </thead>
       <tbody>
           <tr v-for="(item) in products" :key="item.id">
               <td>{{item.category}}</td>
               <td>{{item.item}}</td>
               <td class="text-right">
                   {{item.origin_price|currency}}
               </td>
               <td class="text-right">
                   {{item.price |currency}}
               </td>
               <td>
                   <span v-if="item.is_enabled" class="text-success">啟用</span>
                   <span v-else>未啟用</span>
               </td>
               <td>
                   <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
                   <button class="btn btn-outline-primary btn-sm">刪除</button>
               </td>
           </tr>
       </tbody>
    </table>
    <nav arial-label="Page navigation example">
        <ul class="pagination">
             <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                 <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page-1)">Previous</a>
             </li>
            <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page===page}">
                <a class="page-link" href="#" @click.prevent ="getProducts(page)">{{page}}</a>
            </li>
             <li class="page-it em" :class="{'disabled':!pagination.has_next}">
                 <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page+1)">Next</a>
            </li>
            <!-- <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li> --> 
        </ul>
    </nav>
    <!-- Modal 以下請到Bootstrap官網複製版型來使用https://getbootstrap.com/docs/4.4/components/modal/-->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                                <label for="image">輸入圖片網址</label>
                                <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
                            </div>
                            <div class="form-group">
                                <label for="customFile">或 上傳圖片
                                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                </label>
                                <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
                            </div>
                            <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"class="img-fluid" :src="tempProduct.imageUrl" alt="">
                        </div>
                        <div class="col-sm-8">
                            <div class="form-group">
                                <label for="title">標題</label>
                                <input type="text" class="form-control" id="title" v-model="tempProduct.title"  placeholder="請輸入標題">
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                     <label for="category">分類</label>
                                    <input type="text" class="form-control" id="category" v-model="tempProduct.category" placeholder="請輸入分類">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="price">單位</label>
                                    <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                     <label for="origin_price">原價</label>
                                    <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price" placeholder="請輸入原價">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="price">售價</label>
                                    <input type="number" class="form-control" id="price" v-model="tempProduct.price" placeholder="請輸入售價">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label for="description">產品描述</label>
                                <textarea type="text" class="form-control" id="description" v-model="tempProduct.description" placeholder="請輸入產品描述">
                                </textarea>
                            </div>
                            <div class="form-group">
                                <label for="content">說明內容</label>
                                <textarea type="text" class="form-control" id="content" v-model="tempProduct.content" placeholder="請輸入產品說明內容">
                                </textarea>
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1"
                                        :false-value="0" id="is_enabled">
                                        <label class="form-check-label" for="is_enabled">是否啟用</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
/*global $*/
//這裡必須會匯入jquery才能使用相關的bootstrap套件
import $ from 'jquery';
export default{
    data(){
        return{
            products:[],
            pagination:{},
            tempProduct: {},
            isNew: false,
            isLoading:false,
            status:{
                fileUploading:false,
            },
        }
    },
    methods:{
        getProducts(page=1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`; // 'http://localhost:3000/api/casper/products';
            const vm = this;
            console.log(process.env.APIPATH,process.env.CUSTOMPATH)
            vm.isLoading = true;//啟用getProduct時先啟用loading
            this.$http.get(api).then((response)=>{
            console.log(response.data);
            vm.isLoading = false;//getProduct完成以後關閉loading
            vm.products = response.data.products;
            vm.pagination = response.data.pagination;
            })
        },
       openModal(isNew, item) {
            if (isNew) {//如果isNew是true
                this.tempProduct = {}; //給一個空物件
                this.isNew = true;//並且變更isNew狀態為true
            } else {
                this.tempProduct = Object.assign({}, item); //objectassign是es6寫法;我不懂.有空再去查
                this.isNew = false;
            }
            $('#productModal').modal('show');
        },
        updateProduct() {
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`; // 'http://localhost:3000/api/casper/products';
            let httpMethod = 'post';
            const vm = this;
            if (!vm.isNew) {
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
                httpMethod = 'put';
            }
            console.log(process.env.APIPATH, process.env.CUSTOMPATH);
            this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
                console.log(response.data);
                if (response.data.success) {//如果data新增成功
                    $('#productModal').modal('hide');//modal收回去
                    vm.getProducts();//重新渲染介面
                } else {//反之data新增不成功
                    $('#productModal').modal('hide');//modal收回去
                    vm.getProducts();//重新渲染介面
                    console.log('新增失敗');//console顯示失敗訊息
                }
            // vm.products = response.data.products;
             });
        },
        delProduct(){
            const vm = this;
            const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
            this.$http.delete(url).then((response)=>{
            console.log(response,vm.tempProduct);
            $('#delProductModal').modal('hide');
            // vm.isLoading = false;
            this.getProducts();
            });
        },
        uploadFile(){
            console.log(this);
            const uploadedFile = this.$refs.files.files[0];
            const vm = this;
            const formData = new FormData();
            formData.append('file-to-update',uploadedFile);
            const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
            vm.status.fileUploading = true;//先跑true
            this.$http.post(url,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then((response)=>{
                console.log(response.data);
                vm.status.fileUploading = false;//當post跑完,再跑false
                if(response.data.success){
                // vm.tempProduct.imageUrl =response.data.imageUrl
                // console.log(vm.tempProduct);
                vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl);
                }else{
                     this.$bus.$emit('messsage:push',response.data.message,'danger');//錯誤訊息的回饋
                }
            })
        }
    },

    created(){//錯誤訊息的回饋
        this.getProducts();
        this.$bus.$emit('messsage:push','這裡是一段訊息','success');
    }    
}

</script>