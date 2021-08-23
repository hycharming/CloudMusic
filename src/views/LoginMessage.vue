<template>
  <div class="LoginMessage">
    <el-card v-if="isLogin">
      <div class="data">
        <div class="dynamic">
          <h3 class="num">0</h3>
          <p>动态</p>
        </div>

        <div class="dynamic">
          <h3 class="num">3</h3>
          <p>关注</p>
        </div>
        <div class="dynamic">
          <h3 class="num">1</h3>
          <p>粉丝</p>
        </div>
      </div>
      <div class="signin">
        <el-button icon="el-icon-coin" size="small">签到</el-button>
        <el-divider></el-divider>
        <div class="datalist" v-for="i in 3" :key="i">
          <div class="list">
            <i :class="iconList[i - 1]"></i>
            <span>{{ spanList[i - 1] }}</span>
          </div>
          <div class="RightIcon">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="datalist" v-for="i in 2" :key="i + 3">
          <div class="list">
            <i :class="iconList[i + 2]"></i>
            <span>{{ spanList[i + 2] }}</span>
          </div>
          <div class="RightIcon">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="datalist" v-for="i in 1" :key="i + 5" @click="Logout()">
          <div class="list">
            <i :class="iconList[i + 4]"></i>
            <span>{{ spanList[i + 4] }}</span>
          </div>
          <div class="RightIcon">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import loginAPI from "../service/login";
export default {
  data() {
    return {
      isLogin: false,
      iconList: [
        "el-icon-postcard",
        "el-icon-medal",
        "el-icon-shopping-bag-2",
        "el-icon-user",
        "el-icon-connection",
        "el-icon-switch-button",
      ],
      spanList: [
        "会员中心",
        "等级",
        "商城",
        "个人信息设置",
        "绑定社交账号",
        "退出登录",
      ],
    };
  },
  mounted() {
    this.$EventBus.$on("isLogin", (res) => {
      this.isLogin = res;
    });
  },
  methods: {
    Logout() {
      loginAPI.logoutRequest();
      sessionStorage.clear();
      this.$EventBus.$emit("isLogout", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  z-index: 2;
  width: 18%;
  position: absolute;
  top: 0;
  left: 70%;
  .data {
    display: flex;
    align-items: center;
    justify-content: space-around;
    h3 {
      text-align: center;
      margin: 5px 0;
    }
    p {
      margin: 5px 0;
      font-size: 12px;
    }
  }
  .signin {
    text-align: center;
    padding-top: 10px;
    .el-button {
      border-radius: 20px;
    }
  }
  .datalist {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .list {
      // display: flex;
      // align-items: center;
      padding: 10px 0 5px;
      font-size: 13px;
      span {
        // font-size:13px;
        // line-height: 20px;
        padding: 0 5px;
      }
    }
  }
  .datalist:hover {
    background-color: #f0f1f2;
  }
}
::v-deep.el-divider {
  margin: 10px 0 5px;
}
</style>