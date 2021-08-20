<template>
  <div class="audio">
    <audio
      id="Player"
      :src="Object.keys(songsDetail) !== 0 ? songsDetail.Url : ''"
      autoplay
      @play="playSongs()"
      @pause="pauseSongs()"
    ></audio>
    <div class="avatar">
      <el-image
        v-show="songsDetail.al != ''"
        :src="Object.keys(songsDetail.al) !== 0 ? songsDetail.al.picUrl : ''"
        style="width: 50px; height: 50px"
        fit="cover"
      ></el-image>
      <div class="title">
        <div class="song">
          <span>{{
            Object.keys(songsDetail) !== 0 ? songsDetail.name : ""
          }}</span>
          <!-- 爱心 -->
          <i
            class="iconfont icon-changyongicon-"
            v-show="songsDetail.al != ''"
          ></i>
        </div>
        <div class="singer">
          {{
            songsDetail.ar[0] != ""
              ? songsDetail.ar[0].name + "/" + songsDetail.al.name
              : ""
          }}
          <!-- {{ Object.keys(songsDetail.ar) !== 0 ? '/'+songsDetail.al.name : "" }} -->
        </div>
      </div>
    </div>
    <div class="play">
      <div class="options">
        <i class="el-icon-delete"></i>
        <i
          :class="isFirst ? 'firstOrLast' : ''"
          class="iconfont icon-shangyishoushangyige"
          id="songsDetail.ar[0] ==''? 'isAllowed' : ''"
          @click="lastSongs()"
        ></i>
        <i
          :id="songsDetail.ar[0] == '' ? 'isAllowed' : ''"
          :class="isPlay ? 'el-icon-video-pause' : 'el-icon-video-play'"
          @click="PlayOrPause()"
        ></i>
        <i
          :class="isLast ? 'firstOrLast' : ''"
          class="iconfont icon-xiayigexiayishou"
          id="songsDetail.ar[0] ==''? 'isAllowed' : ''"
          @click="nextSongs()"
        ></i>
        <span>词</span>
      </div>
      <div class="progress">
        <span>{{ minute + ":" + (timer >= 10 ? timer : "0" + timer) }}</span>
        <el-progress
          :show-text="false"
          :stroke-width="3"
          :percentage="percentage"
          status="exception"
          style="width: 80%"
        ></el-progress>
        <span>{{ Object.keys(songsDetail) !== 0 ? songsLength : "" }}</span>
      </div>
    </div>
    <div class="settings">
      <el-button>标准</el-button>
      <i class="iconfont icon-yezi"></i>
      <i class="iconfont icon-shengyin"></i>
      <el-progress
        :show-text="false"
        :stroke-width="3"
        :percentage="50"
        status="exception"
        style="width: 30%"
      ></el-progress>
      <i class="el-icon-s-fold" @click="OpenplayingList()"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlayingListOpen:false, //播放列表是否打开
      isFirst: true, // 是否为第一首歌（没有上一首）
      isLast: false, // 是否为最后一首歌（没有下一首）
      isPlay: false,
      interval: 0,
      time: 0, //歌曲时长 单位s
      timer: 0, //已播放的秒数
      minute: 0, //已播放的分钟
      percentage: 0, //进度条
      songsLength: "",
      songsDetail: {
        al: "",
        ar: [""],
      },
    };
  },
  watch: {
    timer(newvar) {
      this.percentage = ((this.minute * 60 + this.timer) * 100) / this.time;
      // 播放完毕
      if (this.percentage >= 100) {
        clearInterval(this.interval);
        this.isPlay = false;
      }
      // console.log(this.percentage);
      if (newvar == 60) {
        this.timer = 0;
        this.minute += 1;
      }
    },
  },
  mounted() {
    this.$EventBus.$on("Detail", (res) => {
      this.timer = 0;
      clearInterval(this.interval);
      console.log("res", res);
      this.songsDetail = res;
      // 将歌曲添加至播放列表
      this.$EventBus.$emit("playList", this.songsDetail);
      if (this.songsDetail.index === 0) {
        this.isFirst = true;
      } else {
        this.isFirst = false;
      }
      // console.log(this.songsDetail.dt);
      this.time = parseInt(this.songsDetail.dt / 1000);
      // console.log(this.time);
      let min = parseInt(this.time / 60);
      let sec = this.time % 60;
      // console.log(time,min,this.songsDetail.dt,sec);
      this.songsLength = `${min}:${sec}`;
    });
  },
  methods: {
    playSongs() {
      this.isPlay = true;
      this.interval = setInterval(() => {
        this.timer += 1;
      }, 1000);

      console.log(this.isPlay);
    },
    pauseSongs() {
      this.isPlay = false;
      clearInterval(this.interval);
      console.log("isPlay");
    },
    PlayOrPause() {
      let player = document.getElementById("Player");
      this.isPlay ? player.pause() : player.play();
      this.isPlay = !this.isPlay;
    },
    // 上一首
    lastSongs() {
      this.$EventBus.$emit("playSongs", this.songsDetail.index - 1);
    },
    //下一首
    nextSongs() {
      this.$EventBus.$emit("playSongs", this.songsDetail.index + 1);
    },
    // 打开播放列表
    OpenplayingList() {
      this.isPlayingListOpen = !this.isPlayingListOpen
      this.$EventBus.$emit('isOpenPlayingList',this.isPlayingListOpen)
    },
  },
  props: {},
};
</script>

<style lang="scss" scoped>
@mixin playOrPauseIcon {
  font-size: 32px;
  color: rgb(73, 73, 73);
}
@mixin flex($justifyContent: flex-start) {
  display: flex;
  align-items: center;
  justify-content: $justifyContent;
}
.audio {
  @include flex(space-between);
  height: 100%;
  background-color: #fff;
  padding: 0 20px;
  .avatar {
    @include flex;
    width: 300px;
    .title {
      padding-left: 10px;
      .song {
        i {
          font-size: 20px;
          padding: 5px;
        }
      }
      .singer {
        font-size: 12px;
      }
    }
  }
  .play {
    width: 450px;
    height: 100%;
    .options {
      padding: 10px 90px 5px;
      @include flex(space-around);
      i:hover {
        font-weight: bold;
        cursor: pointer;
      }
      .firstOrLast {
        color: #d7d7d7;
      }
      .el-icon-video-play {
        @include playOrPauseIcon;
      }
      #isAllowed {
        // cursor: not-allowed !important;
        pointer-events: none !important;
      }
      .el-icon-video-play:hover {
        font-weight: normal;
      }
      .el-icon-video-pause {
        @include playOrPauseIcon;
      }
      .el-icon-video-pause:hover {
        font-weight: normal;
      }
    }
    .progress {
      // width: 80%;
      // margin: auto;
      @include flex(space-around);
      span {
        color: #b1aeae;
        font-size: 10px;
        padding-bottom: 5px;
        // font-weight: bold;
      }
    }
  }
  .settings {
    @include flex;
    width: 210px;
    .el-button {
      padding: 3px 5px;
      border: 1px solid #000;
      border-radius: 0;
      font-size: 12px;
    }
    i {
      font-size: 20px;
      padding-left: 20px;
    }
  }
}
</style>