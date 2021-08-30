<template>
  <div class="searchResult">
    <h3>{{ "找到" + searchData.length + "首单曲" }}</h3>

    <div class="menu">
      <el-menu class="el-menu-demo" mode="horizontal" :default-active="'0'">
        <el-menu-item
          v-for="(item, idx) in MenuList"
          :key="idx"
          :index="String(idx)"
        >
          {{ item }}</el-menu-item
        >
      </el-menu>
    </div>
    <div class="table">
      <el-table
       v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
        stripe
        :data="searchData"
        style="width: 100%;min-height:200px"
        @row-dblclick="playSongs"
        :row-style="{ height: '20px' }"
      >
        <el-table-column width="130">
          <template slot-scope="scope">
            <div class="index">
              <span>{{
                scope.$index >= 9 ? scope.$index + 1 : "0" + (scope.$index + 1)
              }}</span>
              <i class="iconfont icon-changyongicon-"></i>
              <i class="el-icon-download"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="音乐标题"
          width="350"
        ></el-table-column>
        <el-table-column
          prop="ar[0].name"
          label="歌手"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="al.name"
          label="专辑"
          width="300"
        ></el-table-column>
        <el-table-column label="时长">
          <template slot-scope="scope">
            {{
              parseInt(parseInt(scope.row.dt / 1000) / 60) +
              ":" +
              (parseInt(scope.row.dt / 1000) % 60 >= 10
                ? parseInt(scope.row.dt / 1000) % 60
                : "0" + (parseInt(scope.row.dt / 1000) % 60))
            }}
          </template>
        </el-table-column>
        <el-table-column label="热度">
          <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.pop"
              color="#CDCDCD"
              :show-text="false"
            ></el-progress>
          </template>
        </el-table-column>
        <!-- .ar[0].name -->
      </el-table>
    </div>
  </div>
</template>

<script>
import dataAPI from "../service/api";
import {mapMutations} from 'vuex'
export default {
  data() {
    return {
        loading:true,
      searchData: [],
      MenuList: [
        "单曲",
        "歌手",
        "专辑",
        "视频",
        "歌单",
        "歌词",
        "博客",
        "用户",
      ],
    };
  },
  created() {
    this.dataRequest(this.$route.query.result);
  },
  mounted() {
    this.$EventBus.$on("searchData", (res) => {
      this.dataRequest(res);
    });
  },
  methods: {
    playSongs(result) {
      dataAPI
        .songUrlRequest({
          id: result.id,
        })
        .then((res) => {
          this.$set(result, "Url", res.data[0].url);
          console.log(result,res);
          this.PlayingSong(result);
          this.AddSongsToList(result)
          // this.$EventBus.$emit("Detail", result);
        });
    },
    ...mapMutations({
      AddSongsToList:'ADD_SONGS_TO_PLAYINGLIST',
      PlayingSong:'PLAYING_SONG'
    }),
    // 搜索歌曲请求
    dataRequest(keywords) {
        this.loading = true;
      dataAPI
        .searchSongs({
          keywords: keywords,
          limit: 100,
        //   type:100
        })
        .then((res) => {
            this.loading = false;
          console.log(res.result);
          this.searchData = res.result.songs;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.searchResult {
  padding: 20px 30px;
  .menu {
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
  }
  .table {
    .el-table {
      font-size: 12px;
      .el-table__row {
        height: 20px !important;
      }
    }
    .index {
      display: flex;
      align-items: center;
      i {
        font-size: 18px;
        opacity: 50%;
        padding: 0 5px;
      }
      span {
        font-size: 12px;
        opacity: 50%;
        font-weight: 100;
        padding: 0 15px;
      }
    }
  }
}
::v-deep .el-table td,
.el-table th {
  padding: 5px 0;
}
</style>