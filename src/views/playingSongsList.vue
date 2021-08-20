<template>
  <div class="playingSongsList" v-if="isPlayingListOpen">
    <el-card>
      <div class="title">
        <h2>当前播放</h2>
      </div>
      <div class="options">
        <span>总35首</span>
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
          style="width: 100%"
          :data="tableData"
          :row-style="{ height: '10px' }"
        >
          <el-table-column
            prop="name"
            width="150"
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
export default {
  data() {
    return {
      tableData: [],
      isRepeat: false,
      isPlayingListOpen:false
    };
  },
  mounted() {
    this.$EventBus.$on("playList", (res) => {
      this.isRepeat = false;
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].Url == res.Url) {
          this.isRepeat = true;
          break;
        }
      }
      if (!this.isRepeat) {
        this.tableData.push(res);
      }
    });
    this.$EventBus.$on("isOpenPlayingList",res=>{
        this.isPlayingListOpen = res;
    })
  },
};
</script>

<style lang="scss" scoped>
.playingSongsList {
  height: 100%;
  position: absolute;
  right: 0;
  z-index: 1;
  .el-card {
    height: 100%;
    width: 400px;
    box-shadow: none;
    border: none;
    border-radius: 0;
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
}
::v-deep .el-table td,
.el-table th {
  padding: 5px 0;
}
</style>