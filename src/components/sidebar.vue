<template>
  <div class="sidebar">
    <el-card body-style="padding:15px 2px 0 14px;" shadow="never">
      <div
        class="list"
        :class="{
          isActive: (index === 0 && clickIndex === -1) || clickIndex === index,
        }"
        v-for="(item, index) in msgList"
        :key="index"
        @click="getIndex(index)"
      >
        {{ item }}
      </div>
      <div class="miniTitle">我的音乐</div>
      <div
        class="list"
        :class="{ isMyMusicActive: clickIndex === index + 5 }"
        v-for="(item, index) in myMusicList"
        :key="'A' + index"
        @click="clickIndex = index + 5"
      >
        <i :class="'iconfont icon-' + iconList[index]"></i>
        {{ item }}
      </div>
      <div class="miniTitle">创建的歌单</div>
      <div class="createdSongsList">
        <div class="list" v-for="(item, index) in createdList" :key="index">
          <i
            class="iconfont icon-changyongicon-"
            v-if="!index"
            style="font-size: 20px"
          ></i>
          <i class="el-icon-headset" v-else></i>
          {{ item.name }}
        </div>
      </div>
      <div class="miniTitle" v-show="isLogin">收藏的歌单</div>
      <div class="collectedSongsList">
        <div class="list" v-for="(item, index) in collectedList" :key="index">
          <i class="el-icon-headset"></i>
          {{ item.name }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import UserAPI from "../service/user";
export default {
  data() {
    return {
      isLogin: false,
      clickIndex: -1,
      dataList: [],
      createdList: [], //创建的歌单
      collectedList: [], //收藏的歌单
      msgList: ["发现音乐", "视频", "朋友", "直播", "私人FM"],
      myMusicList: [
        "本地音乐",
        "下载管理",
        "最近播放",
        "我的音乐云盘",
        "我的电台",
        "我的收藏",
      ],
      iconList: [
        "yinyue",
        "xiazai",
        "zuijinbofang",
        "yun",
        "yule_yinlediantai",
        "wodeshoucang",
      ],
      routerPath: ["/findMusic", "/video", "/friend", "/live", "/privateFM"],
    };
  },
  created() {
    if (JSON.parse(sessionStorage.getItem("dataList"))) {
      this.dataList = JSON.parse(sessionStorage.getItem("dataList"));
    }
    this.dataList.map((item) => {
      item.userId != JSON.parse(sessionStorage.getItem("userInfo")).userId
        ? this.collectedList.push(item)
        : this.createdList.push(item);
    });
  },
  mounted() {
    this.$EventBus.$on("login", (res) => {
      this.isLogin = true;
      console.log("res:",res);
      if (res) {
        this.UserRequest();
      }
    });
    this.$EventBus.$on("isLogout", () => {
      this.collectedList = [];
      this.createdList = [];
      this.isLogin = false;
    });
  },

  methods: {
    getIndex(idx) {
      this.clickIndex = idx;
      this.$router.push(this.routerPath[idx]);
    },
    UserRequest() {
      console.log(JSON.parse(sessionStorage.getItem('userInfo')).userId);
      UserAPI.GetUserSongsList({
        uid: JSON.parse(sessionStorage.getItem("userInfo")).userId,
      }).then((res) => {
        this.dataList = res.playlist;
        console.log(this.dataList);
        sessionStorage.setItem("dataList", JSON.stringify(this.dataList));
        this.dataList.map((item) => {
          item.userId != JSON.parse(sessionStorage.getItem("userInfo")).userId
            ? this.collectedList.push(item)
            : this.createdList.push(item);
        });
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.sidebar {
  // height: 100%;
  // overflow: scroll;
  .el-card {
    width: 200px;
    border-radius: 0 !important;
    height: 100% !important;
    border: none !important;
    .list {
      padding: 6px;
      height: 25px;
      font-size: 15px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .list:hover {
      background-color: #f6f6f7;
    }
    .miniTitle {
      font-size: 13px;
      color: #b3b3b3;
      padding: 15px 8px 8px;
      // cursor: auto
    }
    .isActive {
      background-color: #f6f6f7;
      font-weight: bolder;
      font-size: 16px;
    }
    .isMyMusicActive {
      background-color: #f6f6f7;
      // font-weight: bolder;
    }
  }
}
</style>