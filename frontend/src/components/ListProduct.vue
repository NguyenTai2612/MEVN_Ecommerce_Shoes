<script>
import ProductService from "../services/Product.service";
import toastjs from "../assets/js/toasts";
    export default{
        data(){
            return{
                toasts:{
                    title:"",
                    msg:"",
                    type:"",
                    duration:0
                 },
            }
        },   
        props:{
            products:Array,
            refeshlist:Function,
            activeIndex: { type: Number, default: -1 },
        },
	emits: ["update:activeIndex"],
        methods:{
            toastjs,
            async delproduct(id){
                try{
                    await ProductService.delete(id);
                    this.refeshlist();
                    this.toasts.title = "Success",
                    this.toasts.msg="Đã xóa sản phẩm",
                    this.toasts.type = "success",
                    this.toasts.duration=2000
                    this.toastjs();
                }catch(error){
                    console.log(error);
                    this.toasts.title = "Warning",
                    this.toasts.msg="Bạn chưa đăng nhập hoặc bạn không phải ADMIN",
                    this.toasts.type = "warn",
                    this.toasts.duration=2000
                    this.toastjs();
                }
            },
            updateActiveIndex(index) {
			this.$emit("update:activeIndex", index);
		    },
        }
    }
</script>
<template>
        <ul class="list-group">
        <li 
			class="list-group-item product-item d-flex justify-content-between" 
			v-for="(product, index) in products"
			:key="product._id"
            @click="updateActiveIndex(index)"
		>
			<span>{{product.title}}</span>
            <button class="btn btn-outline-danger btn-sm" @click="delproduct(product._id)">X</button>
		</li>
        </ul>
</template>
<style scoped>
    .list-group-item:hover{
        background-color: #0d6efd;
        color: azure;
    }
</style>