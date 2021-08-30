<template>
  <div class="top">
    <div class="findMusic">
      <div class="navbar">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          router
          :default-active="'/findMusic/command'"
        >
          <!--  :default-active="activeIndex"
        @select="handleSelect" -->
          <el-menu-item
            v-for="(item, idx) in MenuList"
            :key="idx"
            :index="'/findMusic' + routerPath[idx]"
          >
            {{ item }}</el-menu-item
          >
        </el-menu>
      </div>
      <div class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MenuList: ["个性推荐", "歌单", "主播电台", "排行榜", "歌手", "最新音乐"],  
      routerPath: [
        "/command",
        "/songlist",
        "/TV",
        "/rank",
        "/singer",
        "/newestMusic",
      ],
    };
  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.top {
  height: 100%;
  padding:5px 15px;
  .findMusic {
    height: 100%;
    .el-menu {
      border: none;
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        color: #000;
        padding: 0;
        margin: 0 20px;
      }
      .is-active {
        border-bottom: 3px solid red !important;
        font-weight: bold;
        font-size: 16px;
      }
    }
    .content {
      padding: 0 100px;
    }
  }
  
}
</style>