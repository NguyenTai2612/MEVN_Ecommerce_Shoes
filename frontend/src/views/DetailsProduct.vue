<script>
import HeaderShop from '@/components/HeaderShop.vue'
import ProductService from '../services/Product.service'
import CartService from '../services/Cart.service'
import toastsVue from '../components/toasts.vue'
import toastsjs from '../assets/js/toasts.js'
import { mapState } from 'pinia'
import { useAuthStore } from "@/stores/Auth.store";
export default {
    data() {
        return {
            detailproduct: [],
            cartitem: {
                userId: '',
                productId: this.$route.params.id,
                quantity: 1,
                title: "",
                img: "",
                price: "",
                size: "",
                color: "",
            },
            carts: [],
            toasts: {
                title: "Success",
                msg: "Thêm vào giỏ hàng thành công",
                type: "success",
                duration: 2000
            },
            sub_quantity: 1,
        }
    },
    computed: {
        ...mapState(useAuthStore, {
            currentUser: "user",
        }),
    },
    components: {
        HeaderShop,
        toastsVue
    },
    methods: {
        toastsjs,
        async getproduct() {
            try {
                this.detailproduct = await ProductService.get(this.$route.params.id);
                this.cartitem.title = this.detailproduct.title;
                this.cartitem.img = this.detailproduct.img[0];
                this.cartitem.price = this.detailproduct.price;
                this.cartitem.size = this.detailproduct.size;
                this.cartitem.color = this.detailproduct.color;
            } catch (error) {
                console.log(error);
            }
        },
        async getidcart() {
            this.cartitem.quantity = this.sub_quantity;
            var exitcart = false;

            try {
                this.carts = await CartService.get(this.currentUser._id);
                this.cartitem.userId = this.currentUser._id;
                this.carts.map((cartproduct) => {
                    if (cartproduct.productId == this.cartitem.productId) {
                        this.cartitem.quantity += cartproduct.quantity;
                        CartService.update(cartproduct._id, this.cartitem);
                        exitcart = true;
                        this.toastsjs();
                        setTimeout(() => {
                            this.$router.push({ name: 'CartShop' });
                        }, 1000);
                    }
                })
                if (exitcart === false) {
                    this.cartitem.userId = this.currentUser._id;
                    CartService.create(this.cartitem);
                    this.toastsjs();
                    setTimeout(() => {
                        this.$router.push({ name: 'CartShop' });
                    }, 1000);
                }
            } catch (error) {
                this.toasts.title = "Message",
                    this.toasts.msg = "Bạn chưa đăng nhập!",
                    this.toasts.type = "warn",
                    this.toasts.duration = 3000,
                    this.toastsjs();
                console.log(error);
            }
        },
    },
    created() {
        this.getproduct();
    },

}
</script>
<template>
    <HeaderShop></HeaderShop>
    <toastsVue></toastsVue>
    <div class="heading">
        <div class="title" style="background-color: #e9ecef;">
            <h2 class="text-dark text-capitalize" style="padding-left: 20px;">{{ detailproduct.title }}</h2>
        </div>
    </div>
    <div class="wrapper">
        <div class="details d-flex justify-content-between flex-wrap">
            <div class="img_product col">
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item" v-for="(img, index) in detailproduct.img"
                            :class="{ active: index == 0 }">
                            <img :src="img" class="d-block w-100" alt="..." style="border-radius: 8px ;">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class="info_product col" style="margin-left: 20px;">
                <h5 style="font-weight: 400;">Chi tiết sản phẩm:</h5>
                <span class="pricte text-danger fs-3 pb-4">{{ detailproduct.price }}$</span>
                <div class="size_product">
                    <h5>Size</h5>
                    <div class="list_btn_size">
                        <h6 class="text-secondary fs-5">{{ detailproduct.size }}</h6>
                    </div>
                </div>
                <div class="color_product">
                    <h5>Màu sắc</h5>
                    <div class="list_btn_color">
                        <h6 class="text-secondary fs-5">{{ detailproduct.color }}</h6>
                    </div>
                </div>
                <div class="quatitly-product">
                    <h5>Nhập số lượng</h5>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <input id="quantity" name="quantity" type="number" v-model="sub_quantity"
                            class="form-control form-control-sm fs-3" style="width:50px; border: none;" />
                    </div>
                </div>
                <div class="btn_product">
                    <button type="submit" class="btn btn-danger" style="width:150px;" @click="getidcart()">Đặt hàng</button>
                    <router-link to="/">
                        <button type="button" class="btn btn-danger" style="width:150px;">Trở về</button>
                    </router-link>
                </div>
            </div>
            <div class="describe_product col">
                <h4>Mô tả sản phẩm</h4>
                <p>{{ detailproduct.desc }}
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.btn_product {
    display: flex;
    justify-content: space-around;
}

.size_product,
.color_product {
    display: flex;
    flex-direction: column;
    max-width: 400px;
}

.list_btn_size,
.list_btn_color {
    margin: 0 10px;
    display: flex;
    flex-wrap: wrap;
}

.list_btn_size button,
.list_btn_color button {
    margin: 10px 5px;
}

.btn {
    width: 100px;
}

.wrapper {
    margin: 50px 100px;
}

.heading {
    margin: 0 100px;
}

.title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100px;
}
</style>