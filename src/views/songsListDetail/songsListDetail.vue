<template>
  <div class="songsListDetail">
    <div class="describe">
      <div class="songsListImg">
        <el-image
          :src="Object.keys(dataList).length !== 0 ? dataList.coverImgUrl : ''"
          style="float: left; width: 180px; height: 180px; border-radius: 5px"
        ></el-image>
      </div>
      <div class="title">
        <el-tag type="danger" effect="plain" size="small">歌单</el-tag>
        <h2>{{ dataList.name }}</h2>
      </div>
      <div class="author">
        <el-avatar
          circle
          :src="
            Object.keys(dataList.creator).length !== 0
              ? dataList.creator.avatarUrl
              : ''
          "
          size="small"
        ></el-avatar>
        <span>{{
          Object.keys(dataList.creator).length !== 0
            ? dataList.creator.nickname
            : ""
        }}</span>
      </div>
      <div class="btngroups">
        <el-button size="medium" round style="background: #ec4141; color: white"
          ><i class="el-icon-caret-right"></i> 播放全部
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button size="medium" round
          ><i class="el-icon-folder-add"></i> 收藏</el-button
        >
        <el-button size="medium" round
          ><i class="el-icon-share"></i> 分享</el-button
        >
        <el-button size="medium" round
          ><i class="iconfont icon-xiazai"></i> 下载全部</el-button
        >
      </div>
      <div class="tags">
        <span>标签：</span>
        <span v-for="(item, index) in dataList.tags" :key="index" class="tag"
          >{{ item }}
          <span v-if="index != dataList.tags.length - 1">{{ "/" }}</span>
        </span>
      </div>
      <div class="nums">
        <span
          >歌曲：<span class="data">{{ dataList.trackCount }}</span></span
        >
        <span
          >播放：<span class="data">{{
            dataList.playCount > 10000
              ? parseInt(dataList.playCount / 10000) + "万"
              : dataList.playCount
          }}</span></span
        >
      </div>
      <div class="intro">
        <div class="flex">
          <div>简介：</div>
          <div class="data dataHidden" id="ellipsis">
            {{ dataList.description }}
          </div>
        </div>
        <i
          :class="isDisplay ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"
          @click="DisplayOrClose()"
        ></i>
      </div>
    </div>
    <div class="options">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :default-active="'/songsListDetail' + routerPath[0]"
        router
      >
        <!--  :default-active="activeIndex"
        @select="handleSelect" -->
        <el-menu-item
          v-for="(item, idx) in MenuList"
          :key="idx"
          :index="'/songsListDetail' + routerPath[idx]"
        >
          {{ item }}</el-menu-item
        >
      </el-menu>
      <el-input
        class="search"
        suffix-icon="iconfont icon-sousuo"
        size="mini"
        placeholder="搜索歌单音乐"
      ></el-input>
    </div>
    <div class="content">
      <!--  :include="whiteList" :exclude="blackList" :max="amount" -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
// import songsListAPI from "../../service/api";
export default {
  data() {
    return {
      dataList: {
        creator: {},
      },
      MenuList: ["歌曲列表", "评论", "收藏者"],
      routerPath: ["/songsList", "/comment", "/collector"],
      isDisplay: false,
    };
  },
  created() {
    console.log(this.$route.query);
    this.dataList = this.$route.query;
    // songsListAPI
    //   .songsListDetailRequest({
    //     id: this.$route.query.id,
    //   })
    //   .then((res) => {
    //     this.dataList = res.playlist;
    //     console.log(this.dataList);
    //     // console.log("object",this.$refs.dataList );
    //   });
  },
  methods: {
    DisplayOrClose() {
      this.isDisplay = !this.isDisplay;
      if (this.isDisplay == true) {
        document.getElementById("ellipsis").style = "white-space :normal ";
      } else {
        document.getElementById("ellipsis").style = "white-space :nowrap ";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin flex {
  display: flex;
  align-items: center;
}
@mixin fontCss {
  font-size: 12px;
  padding: 5px 15px 0;
}
.songsListDetail {
  padding: 20px;
  .describe {
    .songsListImg {
    }
    .title {
      @include flex();
      padding: 0 10px;
      h2 {
        margin: 0;
        padding: 0 5px;
      }
    }
    .author {
      @include flex();
      padding: 5px 15px;
      font-size: 12px;
      span {
        padding: 0 10px;
        color: #507daf;
      }
    }
    .btngroups {
      @include flex;
      padding: 5px 20px;
      .el-button {
        padding: 7px 15px;
      }
      i {
        font-size: 15px;
      }
    }
    .tags {
      @include flex();
      @include fontCss();
      .tag {
        color: #507daf;
      }
    }
    .nums {
      @include flex();
      @include fontCss();
      span {
        padding-right: 15px;
      }
      .data {
        color: #656565;
      }
    }
    .intro {
      @include flex();
      align-items: flex-start;
      @include fontCss();
      justify-content: space-between;
      span {
        padding-right: 15px;
      }
      .flex {
        @include flex();
        align-items: flex-start;

        .data {
          color: #656565;
        }
        .dataHidden {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 400px;
        }
      }
      i {
        // align-self: flex-end;
        font-size: 18px;
        color: #656565;
      }
    }
  }
  .options {
    margin-top: 30px;
    @include flex();
    justify-content: space-between;
    .el-menu {
      border: none;
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        color: #000;
        padding: 0;
        margin: 0 10px;
      }
      .is-active {
        border-bottom: 3px solid red !important;
        font-weight: bold;
        // font-size: 16px;
      }
    }
    .el-input {
      width: 200px;
    }
  }
}
::v-deep .el-input {
  // width: 10%;
  .el-input__inner {
    border-radius: 20px;
    // width: 150px;
    background-color: #f9f9f9;
    border: none;
  }
  i {
    color: rgb(0, 0, 0);
    font-weight: bold;
  }
}
</style>