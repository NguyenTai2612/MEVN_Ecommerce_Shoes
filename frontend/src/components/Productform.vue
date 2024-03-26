<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default{
      props:{
          product: { type: Object, required: true },
          resetAfterSubmit: { type: Boolean, default: false },
      }
      ,
     data() {
        const productform = yup.object().shape({
            name: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(5, "Tên phải ít nhất 5 ký tự."),
             img: yup
            .string()
            .required("Hình ảnh phải có giá trị."),
            price: yup
            .string()
            .required("Giá sản phẩm phải có giá trị."),
            description: yup
            .string()
            .required("Mô tả sản phẩm phải có giá trị.")
            .min(5, "Tên phải ít nhất 5 ký tự."),
            category: yup
            .string()
            .required("Loại sản phẩm phải có giá trị."),
            size: yup
            .string()
            .required("Kích thước sản phẩm phải có giá trị."),
            color: yup
            .string()
            .required("Màu sắc sản phẩm phải có giá trị."),
            });
            return {
            productLocal:this.product,
            productform,
            }
        },
    components:{
      Form,
      Field,
      ErrorMessage
    },
    emits:['submit:product'],
    methods:{
      addImge(){
        document.querySelector("#imgproduct2").style.display = "block";
      },
      submitproduct(){
          this.$emit('submit:product',this.productLocal);
          	if (this.resetAfterSubmit) {
				    this.$refs.contactForm.resetForm();
			  }
      },
    }
  }
</script>
<template>
<div class="wrapper">
    <Form :validation-schema="productform"  @submit="submitproduct" >
      <div class="form-group">
        <label for="nameproduct">Name</label>
        <Field type="text" class="form-control" id="nameproduct" name="name" placeholder="Enter name product" v-model="productLocal.title" />
        <ErrorMessage name="name" class="text-danger" />
      </div>
    <div class="form-group">
        <label for="imgproduct">Image</label>
        <div style="display: flex; flex-direction: row;">
        <Field type="text" class="form-control" id="imgproduct" name="img" placeholder="Enter link product image" v-model="productLocal.img[0]"/>
        <i class="bi bi-file-plus btn_img-add" @click="addImge()"></i>
        </div>
        <input type="text" class="form-control" id="imgproduct2" placeholder="Enter link product image" name="img" style="display:none; margin: 10px 0;" v-model="productLocal.img[1]">
          <ErrorMessage name="img" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="priceproduct">Price</label>
        <Field type="number" class="form-control" id="priceproduct" name="price" placeholder="Enter product price" v-model="productLocal.price" />
        <ErrorMessage name="price" class="text-danger"  />
      </div>
      <div class="form-group">
        <label for="nameproduct">Product Description</label>
        <Field type="text" class="form-control" id="nameproduct" name="description"  placeholder="Enter product description" v-model="productLocal.desc"/>
          <ErrorMessage name="description" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="categoryproduct">Category</label>
        <Field type="text" class="form-control" id="categoryproduct" name="category" placeholder="Enter product categrogy" v-model="productLocal.categories"/>
          <ErrorMessage name="category" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="sizeproduct">Size</label>
        <Field type="text" class="form-control" id="sizeproduct" name="size" placeholder="Enter product size" v-model="productLocal.size"/>
          <ErrorMessage name="size" class="text-danger" />
      </div>
       <div class="form-group">
        <label for="colorproduct">Color</label>
        <Field type="text" class="form-control" id="colorproduct" name="color"  placeholder="Enter product color" v-model="productLocal.color"/>
          <ErrorMessage name="color" class="text-danger" />
      </div>
      <button type="submit" class="btn btn-primary">Lưu</button>
       <router-link to="/admin" style="margin: 10px;">
            <button class="btn btn-danger">Trở về</button>
        </router-link>
      <br>
    </Form>
</div>
</template>
<style scoped>
.wrapper{
    margin: 50px 200px;
}
.btn_img-add{
 font-size: 30px; 
 color: dodgerblue;
}
</style>