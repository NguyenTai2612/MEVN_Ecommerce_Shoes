<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import AuthService from "../services/Auth.service";
    import toast from "../assets/js/toasts";
    import toastsVue from "../components/toasts.vue";
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
            toastsVue
        },
        data() {
        const Logupform = yup.object().shape({
            name: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(2, "Tên phải ít nhất 2 ký tự."),
            email: yup
            .string()
            .required("Email phải có giá trị.")
            .email("E-mail không đúng.")
            .max(50, "E-mail tối đa 50 ký tự."),
           pwd: yup
            .string()
            .required("Mật khẩu phải có giá trị.")
            });
            return {
            Logupform,
            message:"Đăng ký thành công",
            usernew:{
                username:"",
                email:"",
                password:"",
            },
            toasts:{
              title:"",
              msg:"",
              type:"",
              duration:0
                 },
            };
        },
        methods:{
          toast,
            async postuser(){
                try{
                  await AuthService.createsignup(this.usernew);
                   this.toasts.title="Success",
                  this.toasts.msg="Đăng ký thành công",
                  this.toasts.type="success",
                  this.toasts.duration=2000
                  this.toast();
                  setTimeout(()=>{
                    this.$router.push({name:"login"});
                  },2000);
                }catch(erorr){
                  console.log(erorr);
                  this.toasts.title="Faild",
                  this.toasts.msg="Thông tin bạn nhập đã được dùng",
                  this.toasts.type="error",
                  this.toasts.duration=2000
                  this.toast();
                }
            }
        }
    };
</script>

<template>
<toastsVue></toastsVue>
<section class="text-center text-lg-start">
  <div class="container py-4">
    <div class="row g-0 align-items-center">
      <div class="col-lg-6 mb-5 mb-lg-0">
        <div class="card cascading-right" style="
            background: hsla(0, 0%, 100%, 0.55);
            backdrop-filter: blur(30px);
            ">
          <div class="card-body p-5 shadow-5 text-center">
            <h2 class="fw-bold mb-5">Sign up</h2>
            <Form :validation-schema="Logupform">
              <div class="form-outline mb-4">
                 <label class="form-label" for="name">Name Account</label>
                 <Field 
                        id="name"
                        name="name"
                        type="text"
                        class="form-control"
                        v-model="usernew.username"
                    />
                    <ErrorMessage name="name" class="text-danger"/> 
              </div>
                <div class="mb-4">
                  <label class="form-label" for="email">Email</label>
                  <div class="form-outline">
                      <Field 
                        id="email"
                        name="email"
                        type="email"
                        class="form-control"
                        v-model="usernew.email"
                    />
                    <ErrorMessage name="email" class="text-danger" /> 
                  </div>
                </div>
              <div class="form-outline mb-4">
                <label class="form-label" for="pwd">Password</label>
                    <Field 
                        id="pwd"
                        name="pwd"
                        type="password"
                        class="form-control"
                        v-model="usernew.password"
                    />
                    <ErrorMessage name="pwd" class="text-danger" /> 
              </div>
              <div class="form-check d-flex justify-content-center mb-4">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                <label class="form-check-label" for="form2Example33">
                  Subscribe to our newsletter
                </label>
              </div>
              <!-- Submit button -->
              <button type="button" class="btn btn-primary btn-block mb-4" @click="postuser()">
                Sign up
              </button>
              <p>Nếu bạn đã có tài khoản hãy<router-link to="/login"> Đăng nhập</router-link></p>
               <!-- <p>{{message}}</p> -->
              <!-- Register buttons -->
              <div class="text-center">
                <p>or sign up with:</p>
                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="bi bi-facebook"></i>
                </button>
                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="bi bi-google"></i>
                </button>
                <button type="button" class="btn btn-link btn-floating mx-1">
                 <i class="bi bi-twitter"></i>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div class="col-lg-6 mb-5 mb-lg-0">
        <img src="https://png.pngtree.com/png-vector/20220622/ourlarge/pngtree-sign-up-button-click-app-icon-png-image_5254779.png" class="w-60 rounded-4 shadow-4"
          alt="..." />
      </div>
    </div>
  </div>
  <!-- Jumbotron -->
</section>
<!-- Section: Design Block -->
</template>
 <style scoped  >
    .cascading-right {
      margin-right: -50px;
    }
    @media (max-width: 991.98px) {
      .cascading-right {
        margin-right: 0;
      }
    }
  </style>
