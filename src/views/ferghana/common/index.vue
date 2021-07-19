<template>
  <div>

    <iframe id="iframeId" :src="url"  width="100%" height="100%" frameborder="no" border="0"
            marginwidth="0" scrolling="no" marginheight="0">
    </iframe>


  </div>
</template>

<script>
  import {getSSOParams} from "@/api/ferghana/ssoFerghana.js"
  export default {
    name: 'FerghanaCommon',
    props:{
      redirect:String,
    },
    data () {
      return {
        url: '',
        token:undefined,
        alreadySSO:undefined,
        userAccount:undefined,
      }
    },
    created() {
      console.log("=22222");
      // this.url = "http://localhost:8083" + this.redirect;
      this.url = "http://192.168.4.95:8083" + this.redirect;
      console.log(this.url);


      // 先不用单点登录
      // getSSOParams().then(res =>{
      //   if (res.code === 200){
      //     console.log("==2======");
      //     console.log(res);
      //     this.token = res.data.token;
      //     this.redirect = res.data.redirect;
      //     this.alreadySSO = res.data.alreadySSO;
      //     this.userAccount = res.data.userAccount;
      //
      //     this.getSource();
      //   }
      // });

    },
    mounted(){
      const oIframe = document.getElementById('iframeId');
      const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
      oIframe.height = document.documentElement.clientHeight;
    },
    methods:{

      getSource(){

        // let flag = true;
        // if (this.alreadySSO !== null && this.alreadySSO === "1") {
        //   // this.url = "http://192.168.4.95:8083" + this.redirect;
        //   this.url = "http://localhost:8083" + this.redirect;
        //   flag = false;
        // }
        // if (this.token !== null && this.token !== "" && flag === true) {
        //   // this.url = "http://192.168.4.95:8083/sso/login?userAccount=" + this.userAccount +
        //   //   "&redirect=" + this.redirect + "&loginToken=" + this.token;
        //   // 访问页面的 sso/login 路径
        //   this.url = "http://localhost:8083/sso/login?userAccount=" + this.userAccount +
        //     "&redirect=" + this.redirect + "&loginToken=" + this.token;
        // }


        console.log(this.url);
      },



    }
  }
</script>

<style scoped>
  .iframe {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow-y: hidden;
  }

</style>
