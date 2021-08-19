<template>
  <div class="navbar">
    <div class="title">
      <img
        class="titleImg"
        src="//s1.music.126.net/style/favicon.ico?v20180823"
        alt=""
      />
      <span class="titleSpan">网易云音乐</span>
      <div class="options">
        <el-button icon="el-icon-arrow-left" circle></el-button>
        <el-button icon="el-icon-arrow-right" circle></el-button>
        <el-input
          class="search"
          prefix-icon="iconfont icon-sousuo"
          size="mini"
          placeholder="搜索"
        ></el-input>
        <el-button
          class="tgsq"
          icon="iconfont icon-maikefeng-xue"
          circle
        ></el-button>
      </div>
    </div>
    <div class="settings">
      <div class="avatar">
        <el-avatar
          size="small"
          :src="userInfo.avatarUrl?userInfo.avatarUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        ></el-avatar>
      </div>
      <div class="loginMsg" @click="OpenLoginDialog()">
        <span>{{userInfo.nickname?userInfo.nickname:"未登录"}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-badge is-dot>
        <i class="iconfont icon-yifu"></i>
      </el-badge>
      <i class="iconfont icon-shezhi"></i>
      <i class="iconfont icon-V"></i>
      <span>|</span>
      <i class="el-icon-minus"></i>
      <i class="iconfont icon-MINIMIZE"></i>
      <i class="el-icon-close"></i>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="350px">
      <i class="el-icon-mobile-phone top"></i>
      <div class="content">
        <el-input placeholder="请输入手机号" v-model="username">
          <template slot="prepend">
            <i class="el-icon-mobile-phone"></i>
            <span>+86</span>
            <i class="el-icon-caret-bottom"></i>
          </template>
        </el-input>
        <el-input
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          v-model="password"
          show-password
          @keyup.enter.native="loginRequest()"
        >
        </el-input>
        <div class="autoLogin">
          <el-checkbox></el-checkbox>
          <span>自动登录</span>
        </div>
        <el-button class="login" @click="loginRequest()">登 录</el-button>
        <el-button class="regist" type="text">注册</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import loginAPI from '../service/login'
export default {
  // loginAPI.loginRequest({
  //       phone:13678288789,
  //       password:'hyc200113'
  //     })
  data() {
    return {
      dialogVisible: false,
      isLogin:false,
      // isLogout:false,
      username: "13678288789",
      password: "hyc200113",
      userInfo:{}
    };
  },
  created(){
    if(sessionStorage.getItem('userInfo')){
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    }
  },
  mounted(){
    this.$EventBus.$on("isLogout",msg =>{
      if(msg){
        this.userInfo = {};
      }
    })
  },
  methods: {
    OpenLoginDialog() {
      if (this.dialogVisible != true && !sessionStorage.getItem('token')) {
        this.dialogVisible = true;
      }else{
        this.isLogin = true;
        this.$EventBus.$emit("isLogin",this.isLogin);
      }
    },
    // test(){
    //   console.log("1111");
    // },
    loginRequest() {
      loginAPI.loginRequest({
        phone: this.username,
        password: this.password,
      }).then(res=>{
        console.log(res);
        sessionStorage.setItem('token',res.token);
        this.userInfo = res.profile;
        sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      });
      this.dialogVisible = false
    },
  },
};
</script>

<style lang="scss" scoped>
$btnAndInputBGC: #e13e3e;
$BTNfontColor: #e26a6a;
$fontColor: #fbd9d9;
@mixin flexAlignItemsCenter($JustifyContent: flex-start) {
  display: flex;
  align-items: center;
  justify-content: $JustifyContent;
}

.navbar {
  background-color: #ec4141;
  height: 100%;
  padding: 0 10px;
  @include flexAlignItemsCenter(space-between);
  // color:white // FBD9D9
  .title {
    @include flexAlignItemsCenter;
    .titleImg {
      padding: 10px;
    }
    .titleSpan {
      // padding: 10px;
      font-family: "宋体";
      color: white;
      font-weight: bold;
      padding-right: 80px;
    }
  }
  .options {
    @include flexAlignItemsCenter;
    .el-button {
      padding: 6px;
      background-color: $btnAndInputBGC;
      border: none;
      color: $BTNfontColor;
    }
    .tgsq {
      color: $fontColor;
    }
  }
  .settings {
    @include flexAlignItemsCenter(space-around);
    color: $fontColor;
    .avatar {
      padding: 5px 10px 0;
    }
    .loginMsg {
      cursor: pointer;
      span {
        font-size: 12px;
      }
      i {
        padding: 0 5px;
        font-size: 12px;
      }
    }
    i {
      font-size: 20px;
      padding: 0 10px;
    }
    .icon-yifu {
      font-size: 25px;
    }
    .icon-shezhi {
      font-size: 18px;
    }
    .icon-V {
      font-size: 21px;
    }
  }
  .el-dialog {
    .top {
      font-size: 50px;
      position: absolute;
      left: calc(50% - 25px);
      color: #ec4141;
    }
    .content {
      margin-top: 80px;
      padding: 0 30px;
      .el-input {
        padding: 5px 0;
      }
      .autoLogin {
        padding: 10px 0;
        span {
          padding-left: 5px;
          font-size: 12px;
        }
      }
      .login {
        background-color: #ec4141;
        color: #fff;
        width: 100%;
      }
      .regist {
        // width:25px;
        padding: 0;
        border-radius: 0;
        border-bottom: 1px solid black;
        color: black;
        position: absolute;
        bottom: 35px;
        left: calc(50% - 25px);
      }
    }
  }
}
::v-deep .search {
  margin: 0 10px;
  .el-input__inner {
    border-radius: 20px;
    width: 150px;
    background-color: $btnAndInputBGC;
    border: none;
    color: $BTNfontColor;
  }
  .el-input__icon {
    color: $fontColor;
  }
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ec4141;
  border-color: #ec4141;
  // color:red;
}

::v-deep .el-dialog__body {
  height: 300px;
}
</style>