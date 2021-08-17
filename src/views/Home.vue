<template>
  <el-container class="home_container">
    <!-- 顶部导航栏区域 -->
    <el-header>
      <NavBar></NavBar>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container class="content_container">
      <!-- 侧边栏 -->
      <el-aside style="width: 250px">
        <side-bar></side-bar>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
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
export default {
  name: "Home",
  components: {
    NavBar,
    SideBar,
    Audio,
  },
};
</script>

<style lang="scss" scoped>
.home_container {
  height: 100%;
  background-color: #f7f7f7;
  .el-header {
    padding: 0;
  }
  .el-aside {
    border-right: 1px solid#E1E1E1;
    overflow: visible;
  }
  .el-footer {
    border-top: 1px solid#E1E1E1;
    height: 72px !important;
    padding:0;
  }
}
</style>
