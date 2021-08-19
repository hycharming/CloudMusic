<template>
  <div class="sidebar">
      <el-card body-style="padding:15px 2px 0 14px;" shadow="never">
          <div class="list" :class="{isActive:clickIndex===index}"  v-for="(item,index) in msgList" :key="index" @click="getIndex(index)">
              {{item}}
          </div>
          <div class="myMusic">我的音乐</div>
          <div class="list" :class="{isMyMusicActive:clickIndex===index+5}" v-for="(item,index) in myMusicList" :key="'A'+index" @click="getIndex(index+5)">
              <i :class="'iconfont icon-'+iconList[index]"></i>
              {{item}}
          </div>
          <div class="myMusic">创建的歌单</div>
          <div class="myMusic">收藏的歌单</div>
      </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            clickIndex:-1,

            msgList:['发现音乐','视频','朋友','直播','私人FM'],
            myMusicList:['本地音乐','下载管理','最近播放','我的音乐云盘','我的电台','我的收藏'],
            iconList:['yinyue','xiazai','zuijinbofang','yun','yule_yinlediantai','wodeshoucang'],
            routerPath:['/findMusic','/video','/friend','/live','/privateFM']
        }
    },
    methods:{
        getIndex(idx){
            this.clickIndex = idx;
            this.$router.push(this.routerPath[idx])
        }
    }
}
</script>

<style lang='scss' scoped>
    .sidebar{
        height: 100%;
        .el-card{
            border-radius:0 !important;
            height:100% !important;
            border:none !important;
            .list{
                padding:6px;
                height:25px;
                font-size: 15px;
                cursor: pointer;
            }
            .list:hover{
                background-color: #F6F6F7;
            }
            .myMusic{
                font-size:13px;
                color:#B3B3B3;
                padding: 15px 8px 8px;
                // cursor: auto;
            }
            .isActive{
                background-color: #F6F6F7;
                font-weight: bolder;
                font-size: 16px;
            }
            .isMyMusicActive{
                background-color: #F6F6F7;
                // font-weight: bolder;
            }
        }
    }
</style>