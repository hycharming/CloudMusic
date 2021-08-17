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
      <img src="" alt="" />
      <span>假装是个id</span>
      <i class="el-icon-caret-bottom"></i>
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
  </div>
</template>

<script>
export default {};
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
      padding-right:80px;
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
}
::v-deep .el-input {
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
</style>