<template>
  <el-container class="home_container">
    <!-- 顶部导航栏区域 -->
    <el-header>
      <NavBar></NavBar>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container class="content_container">
      <!-- 侧边栏 -->
      <el-aside style="width: 200px">
        <side-bar></side-bar>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <playingSongsList></playingSongsList>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      <Audio></Audio>
    </el-footer>
  </el-container>
</template>

<script>
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar.vue";
import Audio from "../components/audio.vue";
import playingSongsList from './playingSongsList.vue'
export default {
  name: "Home",
  components: {
    NavBar,
    SideBar,
    Audio,
    playingSongsList
  },
  created(){
    if(this.$router.path !== '/findMusic/command'){
            this.$router.push('/findMusic/command')
        }
  }
};
</script>

<style lang="scss" scoped>
.home_container {
  height: 100%;
  background-color: #f7f7f7;
  .el-header {
    padding: 0;
    position: absolute;
    width: 100%;
    top: 0;
  }
  .content_container {
    position: absolute;
    top: 60px;
    bottom: 72px;
    width: 100%;
    .el-aside {
      border-right: 1px solid#E1E1E1;
      overflow: scroll;
      background-color: #fff;
    }
    .el-aside::-webkit-scrollbar {
      display: none;
    }
    .el-main {
      background-color: #fff;
      padding:0;
      overflow: scroll;

      // height:calc( 100% - 72px );
    }
    .el-main::-webkit-scrollbar {
      display: none;
    }
  }
  .el-footer {
    border-top: 1px solid#E1E1E1;
    height: 72px !important;
    width: 100%;
    padding: 0;
    position: absolute;
    bottom: 0;
  }
}
</style>
