<script>
import FormloginVue from "../components/Formlogin.vue";
import toastsVue from "../components/toasts.vue";
export default {
  components: {
    FormloginVue,
    toastsVue
  },
};
</script>
<template>
  <toastsVue></toastsVue>
  <h1 style="margin-top: 100px ; margin-left: 100px;">Đăng Nhập</h1>
  <div class="h-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="https://www.centerklik.com/wp-content/uploads/2017/09/LoginPress-Login-Customizer.jpg" class="img-fluid"
            alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <FormloginVue></FormloginVue>
        </div>
      </div>
    </div>
  </div>
</template>
