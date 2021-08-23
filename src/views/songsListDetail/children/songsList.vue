<template>
  <div class="songsList">
    <el-table stripe :data="filterData" style="width: 100%" :row-class-name="rowClassName" @row-dblclick="playSongs"
    :row-style="{height: '20px'}">
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
        width="450"
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
      <!-- .ar[0].name -->
    </el-table>
  </div>
</template>

<script>
import songsAPI from "../../../service/api";
export default {
  data() {
    return {
      filterData:[],
      dataList: {},
      tableData: [],
      Id: "",
    };
  },
  created() {
    this.dataList = this.$route.query;
    // console.log("object",this.$route.query,this.dataList);
    this.dataList.trackIds.map((item, index) => {
      index != this.dataList.trackIds.length - 1
        ? (this.Id += item.id + ",")
        : (this.Id += item.id);
    });
    console.log("id",this.Id);
    this.getSongsDetail(this.Id);
  },
  mounted(){
    this.$EventBus.$on('playSongs',res=>{
      // console.log(res,this.tableData);
      this.playSongs(this.tableData[res])
    })

    // 播放全部
    this.$EventBus.$on('PlayingAllSongs',()=>{
        this.playAllSongs();
    })
    // 获取播放列表点击事件
    this.$EventBus.$on('findSongsUrl',res=>{
      this.playSongs(res)
    })
    // 搜索框过滤歌名
    this.$EventBus.$on('filterData',res=>{
      this.filterData = this.tableData.filter(item=>{
        return item.name.indexOf(res) !== -1?item:''
      })
    })
  },
  methods: {
    //   获取歌曲详情
    getSongsDetail(Id) {
      songsAPI
        .songDetailRequest({
          ids: Id,
        })
        .then((res) => {
          // console.log("res",res);
          this.tableData = res.songs;
          this.filterData = this.tableData;
          // this.getSongsUrl(Id);
        });
    },
    // 获取歌曲Url
    getSongsUrl(datalist,Id){
      songsAPI.songUrlRequest({
        id:Id
      }).then(res=>{
         this.$set(datalist,'Url',res.data[0].url);
      })
    },
    rowClassName({row, rowIndex}){
      row.index = rowIndex;
    },
    // 双击播放歌曲
    playSongs(res){
      this.getSongsUrl(res,res.id);
      // console.log('abc',res);
      this.$EventBus.$emit('Detail',res);

      // this.$$EventBus.$emit('songsIndex',res.$index)
    },
    // 播放全部
    playAllSongs(){
      this.getSongsUrl(this.tableData[0],this.tableData[0].id);
      this.$EventBus.$emit('AllSongs',this.tableData)
      // console.log(this.tableData);
    }
  },
  props: {
    // dataList: {
    //   type: Object,
    //   required: true,
    // },
  },
};
</script>

<style lang="scss" scoped>
.songsList {
  .el-table {
    font-size: 12px;
    .el-table__row{
      height: 20px !important;
    }
  }
  .index{
    display: flex;
    align-items: center;
    i {
    font-size: 18px;
    opacity: 50%;
    padding:0 5px
  }
  span {
    font-size: 12px;
    opacity: 50%;
    font-weight: 100;
    padding:0 15px;
  }
  }
}
::v-deep .el-table td, .el-table th{
  padding:5px 0;
}
</style>