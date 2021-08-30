<template>
  <div class="command">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px" trigger="click">
        <el-carousel-item
          v-for="item in 9"
          :key="item"
          @click.native="getItem(item - 1)"
        >
          <el-image
            style="height: 200px; width: 100%"
            :src="
              carouselList.length != 0 ? carouselList[item - 1].imageUrl : ''
            "
            :fit="'cover'"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="commandsongs">
      <keep-alive>
        <Part
          :contentLength="10"
          :title="'推荐歌单'"
          :dataList="dataList"
        ></Part>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Part from "../../../components/part.vue";
import commandAPI from "../../../service/api";
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      dataList: [],
      carouselList: [],
      songsDetail: {},
    };
  },
  components: {
    Part,
  },
  created() {
    // 轮播图
    commandAPI.bannerRequest().then((res) => {
      console.log(this.carouselList);
      console.log("res:", res.banners);
      this.carouselList = res.banners;
    });
    // 推荐歌单请求
    commandAPI.songsListRequest().then((res) => {
      console.log(res.result);
      this.dataList = res.result;
    });
  },
  computed: {
    ...mapGetters(["getState"]),
  },
  methods: {
    getItem(item) {
      commandAPI
        .songDetailRequest({
          ids: this.carouselList[item].targetId,
        })
        .then((res) => {
          // console.log('res2:',res.songs[0]);
          this.songsDetail = res.songs[0];
          // 获取轮播图歌曲Url
          commandAPI
            .songUrlRequest({
              id: this.carouselList[item].targetId,
            })
            .then((res) => {
              console.log(res.data[0]);
              // this.songDetail.Url = res.data[0].url
              if (res.data[0] != null && res.data[0] != undefined) {
                this.$set(this.songsDetail, "Url", res.data[0].url);
              }
              this.addSongsToPlayinglist(this.songsDetail);
              this.playingSongs(this.songsDetail)
            });
        });
    },
    ...mapMutations({
      addSongsToPlayinglist: "ADD_SONGS_TO_PLAYINGLIST",
      playingSongs:'PLAYING_SONG'
    }),
  },
};
</script>

<style lang="scss" scoped>
.command {
  height: 100%;
  .el-carousel {
    width: 100%;
    margin: 0 auto;
    z-index: 0;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }
  .commandsongs {
  }
}
</style>