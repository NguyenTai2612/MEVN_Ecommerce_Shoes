<script>
import SliderShop from '@/components/SliderShop.vue'
import HeaderShop from '@/components/HeaderShop.vue'
import ProductService from '../services/Product.service'
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
import toastsVue from '../components/toasts.vue';
export default {
    data() {
        return {
            Products: [],
        }
    },
    components: {
        HeaderShop,
        SliderShop,
        toastsVue
    },
    computed: {
        ...mapState(useAuthStore, {
            currentUser: "user",
        }),
    },
    methods: {
        async retrieveProduct() {
            try {
                this.Products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveProduct();
    },
}
</script>
<template>
    <div class="header">
        <HeaderShop></HeaderShop>
    </div>
    <toastsVue></toastsVue>
    <div class="slider">
        <SliderShop></SliderShop>
    </div>
    <div style="margin: 20px 100px;">
        <div style="text-align: center; margin: 30px 0;" class="heading">
            <h3>Jordan</h3>
            <h6>Những sản phẩm từ Jordan bán chạy nhất</h6>
        </div>
        <div class="flex-row" style="margin:0 100px;">
            <div class="d-sm-flex flex-wrap justify-content-center" id="nike">
                <div class="card m-1" style="width: 18rem;" v-for="item in Products" v-show="item.categories === 'Jordan'">
                    <div class="wrapper-img">
                        <div class="image_slider">
                            <div class="image_item" v-for="img in item.img">
                                <img :src="img" class="card-img-top" alt="...">
                            </div>
                        </div>
                    </div>
                    <div class="card-body product">
                        <h5 class="card-title text-capitalize">{{ item.title }}</h5>
                        <h6 class="price">{{ item.price }}$</h6>
                        <router-link :to="{
                            name: 'details',
                            params: { id: item._id },
                        }">
                            <button type="button" class="btn btn-outline-dark">Mua hàng</button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin: 30px 0;" class="heading">
                <h3>Converse</h3>
                <h6>Những sản phẩm từ Converse mới nhất</h6>
            </div>
            <div class="d-sm-flex flex-wrap justify-content-center" id="adidas">
                <div class="card m-1" style="width: 18rem;" v-for="item in Products" v-show="item.categories === 'Converse'">
                    <div class="wrapper-img">
                        <div class="image_slider">
                            <div class="image_item" v-for="img in item.img">
                                <img :src="img" class="card-img-top" alt="...">
                            </div>
                        </div>
                    </div>
                    <div class="card-body product">
                        <h5 class="card-title text-capitalize">{{ item.title }}</h5>
                        <h6 class="price">{{ item.price }}$</h6>
                        <router-link :to="{
                            name: 'details',
                            params: { id: item._id },
                        }">
                            <button type="button" class="btn btn-outline-dark" @click="nextdetailsproduct">Mua hàng</button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin: 30px 0;" class="heading">
                <h3>Khác</h3>
                <h6>Những sản phẩm từ giá rẻ, phù hợp mọi nhu cầu.</h6>
            </div>
            <div class="d-sm-flex flex-wrap justify-content-center" id="other">
                <div class="card m-1" style="width: 18rem;" v-for="item in Products"
                    v-show="item.categories === 'Giày' || item.categories === 'Other'">
                    <div class="wrapper-img">
                        <div class="image_slider">
                            <div class="image_item" v-for="img in item.img">
                                <img :src="img" class="card-img-top" alt="...">
                            </div>
                        </div>
                    </div>
                    <div class="card-body product">
                        <h5 class="card-title text-capitalize">{{ item.title }}</h5>
                        <h6 class="price">{{ item.price }}$</h6>
                        <router-link :to="{
                            name: 'details',
                            params: { id: item._id },
                        }">
                            <button type="button" class="btn btn-outline-dark" @click="nextdetailsproduct">Mua hàng</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
    </div>
</template>
<style scoped>
.wrapper-img {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.image_slider {
    display: flex;
    transition: all .8s ease;

}

.image_slider:hover {
    transform: translateX(-100%);
}

.image_item {
    flex: 1 0 100%;
}
</style>