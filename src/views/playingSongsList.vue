<template>
  <div class="playingSongsList" v-if="isPlayingListOpen">
    <el-card>
      <div class="title">
        <h2>当前播放</h2>
      </div>
      <div class="options">
        <span>{{ "共" + getState.length + "首" }}</span>
        <div class="btn">
          <el-button type="text" style="color: black"
            ><i class="el-icon-folder-add"></i> 收藏全部</el-button
          >
          <el-button type="text">清空列表</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
          :show-header="false"
          stripe
          style="width: 100%; min-height: 500px"
          :data="getState"
          :row-style="{ height: '10px' }"
          :row-class-name="tableRowClassName"
          @row-dblclick="playSongs"
        >
          <el-table-column width="25" show-overflow-tooltip
            ><template slot-scope="scope">
              <i class="el-icon-service" v-show="scope.row.id == playingId"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            width="125"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="al.name"
            width="90"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column width="40">
            <template>
              <i class="el-icon-paperclip"></i>
            </template>
          </el-table-column>
          <el-table-column>
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
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      loading: true,
      playingId: -1, //正在播放
      isRepeat: false,
      isPlayingListOpen: false,
    };
  },
  watch: {
    getplayingSong(newval) {
      this.playingId = newval.id;
    },
  },
  mounted() {
    // 是否打开播放列表
    this.$EventBus.$on("isOpenPlayingList", (res) => {
      this.isPlayingListOpen = res;
    });
  },
  computed: {
    ...mapGetters(["getState", "getplayingSong"]),
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.id == this.playingId) {
        return "isPlaying";
      }
      return "";
    },
    playSongs(res) {
      console.log("res12", res);
      if (Object.prototype.hasOwnProperty.call(res,'Url')) {
        this.PlayingSong(res);
      } else {
        this.$EventBus.$emit("findSongsUrl", res);
      }
    },
    ...mapMutations({
      PlayingSong: "PLAYING_SONG",
    }),
  },
};
</script>

<style lang="scss" scoped>
.playingSongsList {
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 2;
  .el-card {
    height: 100%;
    width: 400px;
    // border: none;
    // border-radius: 0;
    overflow: scroll;
    .title {
      h2 {
        margin-bottom: 0;
      }
    }
    .options {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 10px;
        opacity: 25%;
      }
      .el-button {
        i {
          font-size: 20px;
          //   line-height: 16px;
        }
        font-size: 14px;
      }
    }
    .el-table {
      font-size: 12px;
      .el-table__row {
        height: 20px !important;
      }
    }
  }
  .el-card::-webkit-scrollbar {
    display: none;
  }
}
::v-deep .isPlaying {
  color: red;
}
::v-deep .el-table td,
.el-table th {
  padding: 5px 0;
}
</style>