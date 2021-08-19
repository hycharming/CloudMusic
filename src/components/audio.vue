<template>
  <div class="audio">
    <!-- <audio src=""></audio> -->
    <div class="avatar">
      <img src="//s1.music.126.net/style/favicon.ico?v20180823" alt="" />
      <div class="title">
        <div class="song">
          <span>勿忘我</span>
          <i class="iconfont icon-changyongicon-"></i>
        </div>
        <div class="singer">要不要买菜</div>
      </div>
    </div>
    <div class="play">
      <div class="options">
        <i class="el-icon-delete"></i>
        <i class="iconfont icon-shangyishoushangyige"></i>
        <i :class="isPause?'el-icon-video-play':'el-icon-video-pause'" @click="isPause =!isPause"></i>
        <i class="iconfont icon-xiayigexiayishou"></i>
        <span>词</span>
      </div>
      <div class="progress">
        <span>0:03</span>
        <el-progress
          :show-text="false"
          :stroke-width="3"
          :percentage="50"
          status="exception"
          style="width: 80%"
        ></el-progress>
        <span>3:55</span>
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
      <i class="el-icon-s-fold"></i>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isPause:true
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin playOrPauseIcon{
  font-size: 32px;
  color:rgb(73, 73, 73)
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
      .icon-shangyishoushangyige {
        color: #d7d7d7;
      }
      .el-icon-video-play{
        @include playOrPauseIcon;
      }
      .el-icon-video-play:hover{
          font-weight:normal;
      }
      .el-icon-video-pause{
        @include playOrPauseIcon;
      }
      .el-icon-video-pause:hover{
          font-weight:normal;
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
    width:210px;
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