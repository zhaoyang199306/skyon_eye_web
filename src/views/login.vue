<template>
  <div class="login" :style="{backgroundImage: 'url(' + coverImgUrl + ')'}">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form el-col-24" >
<!--        <img  v-if="logo" :src="logo">-->
      <el-form-item class="el-col-24">
        <img  v-if="logo" :src="logo" class="el-col-4" style="width:200px;margin-top: 12px;margin-left: 54px">
      </el-form-item>
      <el-form-item prop="username" class="el-col-24">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="el-col-24">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;color: #FFFFFF;">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;background-color: #FFFFFF;color: #5257ea;font-weight: bold;border-radius:20px"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 &nbsp;&nbsp; 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <!--    <div class="el-login-footer">-->
    <!--      <span>Copyright © 2020 BCP All Rights Reserved.</span>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import {getCodeImg} from "@/api/login";
  import Cookies from "js-cookie";
  import {encrypt, decrypt} from '@/utils/jsencrypt';
  // import logoImg from '@/assets/logo/logo2.gif'
  import logoImg from '@/assets/logo/loginxm.png'

  export default {
    name: "Login",
    data() {
      return {
        logo: logoImg,
        coverImgUrl:"",
        num:1,
        codeUrl: "",
        cookiePassword: "",
        loginForm: {
          username: "admin",
          password: "admin123",
          rememberMe: false,
          code: "",
          uuid: ""
        },
        loginRules: {
          username: [
            {required: true, trigger: "blur", message: "用户名不能为空"}
          ],
          password: [
            {required: true, trigger: "blur", message: "密码不能为空"}
          ],
          code: [{required: true, trigger: "change", message: "验证码不能为空"}]
        },
        loading: false,
        redirect: undefined
      };
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    created() {
      this.getCode();
      this.getCookie();
    },
    mounted(){
      this.changeBackGround();
      // 定时任务
      setInterval(this.changeBackGround, 4000);
    },
    methods: {
      // 切换背景图片
      changeBackGround(){
        console.log("---");
        this.num  = this.num + 1;
        if(this.num % 2 ===1 ){
          this.coverImgUrl = require("../assets/image/loginlunbo2.jpg");
        } else {
          this.coverImgUrl = require("../assets/image/lunbo1.jpg");
        }
      },
      getCode() {
        getCodeImg().then(res => {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        });
      },
      getCookie() {
        const username = Cookies.get("username");
        const password = Cookies.get("password");
        const rememberMe = Cookies.get('rememberMe')
        this.loginForm = {
          username: username === undefined ? this.loginForm.username : username,
          password: password === undefined ? this.loginForm.password : decrypt(password),
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        };
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.loginForm.rememberMe) {
              Cookies.set("username", this.loginForm.username, {expires: 30});
              Cookies.set("password", encrypt(this.loginForm.password), {expires: 30});
              Cookies.set('rememberMe', this.loginForm.rememberMe, {expires: 30});
            } else {
              Cookies.remove("username");
              Cookies.remove("password");
              Cookies.remove('rememberMe');
            }
            this.$store
              .dispatch("Login", this.loginForm)
              .then(() => {
                this.$router.push({path: this.redirect || "/"});
              })
              .catch(() => {
                this.loading = false;
                this.getCode();
              });
          }
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

  .login .el-input__inner{
    border-radius: 20px
  }

  .login .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #FFFFFF;
  }

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /*background-image: url("../assets/image/login_back.jpg");*/
    background-size: cover;
    transition: 2s;
  }

  .titleh2 {
    margin: 13px auto 0px auto;
    text-align: center;
    /*color: #707070;*/
    color: #336ab1;
    font-size:16px;
    font-weight: bolder;
  }
  .el-button--primary{
    background-color: #0083CB;
  }

  .login-form {
    border-radius: 6px;
    background: none;
    width: 350px;
    padding: 25px 25px 5px 25px;
    margin-top: -200px;

    .el-input {
      height: 38px;

      input {
        height: 38px;
      }
    }

    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }

  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }

  .login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }

  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
</style>
