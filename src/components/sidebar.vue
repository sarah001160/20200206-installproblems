<template><!--左側的列表 元件--->
    <div>
       
     <div class="sidebar-sticky">
       

        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">
               <i class="fas fa-box-open"></i><!--這個是fontawesome的圖示-->
                產品列表
            </router-link>
          </li>
          <li>
              <router-link class="nav-link" to="/Coupon">
              優惠卷
              </router-link>
          </li>
         
        </ul>

         <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/customer_order" class="nav-link">
              模擬訂單
            </router-link>
          
            
          </li>
        
         
        </ul>
      </div>

    </div>
</template>