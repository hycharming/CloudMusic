<template>
  <div class="part">
    <div class="title">
      <h3>{{ title }}</h3>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="content">
      <div class="contentPart" v-for="index in contentLength" :key="index" style="width:200px" @click="pathToDetail(index)">
        <el-image
          style="width: 200px; height: 200px"
          :src="Object.keys(dataList).length !== 0?dataList[index-1].picUrl:''"
          fit="cover"
        ></el-image>
        <div class="describe">{{Object.keys(dataList).length !== 0?dataList[index-1].name:''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dataAPI from '../service/api'
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    contentLength: {
      type: Number,
      default: 0,
    },
    dataList:{
        type:Array,
        required:true
    }
  },
  mounted(){
    //   console.log('this.dataList:',this.dataList)
  },
  methods:{
    pathToDetail(index){
      // console.log(index);
      dataAPI.songsListDetailRequest({
        id:this.dataList[index-1].id
      }).then(res=>{
        this.$router.push({path:'/songsListDetail',query:res.playlist})
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin flex {
  display: flex;
  align-items:flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}
.part {
  .title {
    display: flex;
    align-items: center;
    i {
      font-size: 20px;
    }
    h3 {
      margin: 0;
      padding-right: 5px;
    }
  }
  .content {
    @include flex;
    .contentPart {
      padding: 10px 0 10px 5px;
      .describe{
          font-size: 12px;
      }
    }
  }
}
::v-deep .el-image__inner {
  border-radius: 3px;
}
</style>