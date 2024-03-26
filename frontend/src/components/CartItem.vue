<script>
    export default{
        data(){
            return{
                products:[],
            }
        },
        props:{
            refeshlistcart:Function,
            carts:Array,
        },
        emit:[
            "deleted:cartIndex"
        ],
        methods:{
        deletedcart(index){
            this.$emit("deleted:cartIndex",index);
        },
    },
}
</script>
<template>
   <div class="row mb-4 d-flex justify-content-between align-items-center" 
            v-for="(item,index) in carts">
          <div class="col-md-2 col-lg-2 col-xl-2">
            <img
                :src="item.img"
                class="img-fluid rounded-3" alt="Cotton T-shirt">
            </div>
            <div class="col-md-6 col-lg-6 col-xl-6">
                <h6 class="text-muted">{{item.title}}</h6>
                    <div>
                        <span class="text-muted">Màu sắc :<span>{{item.color}}</span></span>
                        <br>
                        <span class="text-muted">Kích Thước :<span>{{item.size}}</span></span>
                        <br>
                        <span class="text-muted">Số lượng :<span>{{item.quantity}}</span></span>
                      </div>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0 price">{{item.price *item.quantity}}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <button type="button" @click="deletedcart(index)" class="text-muted btn btn-exit"><i class="bi bi-x-square text-danger"></i></button>
            </div>
            <hr class="my-4">          
    </div>        
</template>