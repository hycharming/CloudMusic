<template>
  <div class="songslist">
    <div class="topBoutique">
      <el-card id="elCard" body-style="width:100%;height:150px;padding:15px">
        <el-image
          :src="topImg.coverImgUrl"
          style="height: 150px; width: 150px; border-radius: 4px; float: left"
        >
        </el-image>
        <div class="tag">
          <el-button icon="el-icon-medal" size="small">精品歌单</el-button>
        </div>
        <div class="name">
          <span>{{ topImg.name }}</span>
        </div>
        <div class="describe">
          <span>
            {{ topImg.copywriter }}
          </span>
        </div>
      </el-card>
      <img id="img" :src="topImg.coverImgUrl" alt="" />
    </div>
    <div class="options">
      <el-button size="medium">
        华语
        <i class="el-icon-arrow-right"></i>
      </el-button>
      <div class="kinds">
        <span
          :class="{ isActive: clickIndex == i }"
          v-for="i in 10"
          :key="i"
          @click="songslistRequest(i)"
          >{{ kinds[i - 1] }}</span
        >
      </div>
    </div>
    <div class="content">
      <part :contentLength="100" :dataList="datalist"></part>
    </div>
  </div>
</template>

<script>
import dataAPI from "../../../service/api";
import part from "../../../components/part.vue";
export default {
  data() {
    return {
      topImg: [],
      kinds: [
        "华语",
        "流行",
        "摇滚",
        "民谣",
        "电子",
        "另类/独立",
        "轻音乐",
        "综艺",
        "影视原声",
        "ACG",
      ],
      clickIndex: 1,
      datalist: [],
    };
  },
  components: {
    part,
  },
 mounted() {
    // 精品歌单
    dataAPI
      .BoutiqueSongsList({
        limit: 1,
        cat: "华语",
      })
      .then((res) => {
        console.log(res.playlists[0]);
        this.topImg = res.playlists[0];
      });
    this.songslistRequest(this.clickIndex);
  },
  methods: {
    songslistRequest(i) {
      this.clickIndex = i;
      this.datalist = [];
      // 推荐歌单
      dataAPI
        .songsListOnline({
          limit: 100,
          cat: this.kinds[i - 1],
        })
        .then((res) => {
          console.log(res);
          res.playlists.map((item, index) => {
            this.$set(res.playlists[index], "picUrl", item.coverImgUrl);
          });
          this.datalist = res.playlists;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.songslist {
  .topBoutique {
    padding-top: 10px;
    img {
      display: none;
    }
    .el-card {
      background-image: linear-gradient(
        to right,
        #7f7f7a,
        #232d24,
        #797467,
        #3d4537,
        #787c73
      );
      .el-image {
        float: left;
      }
      .tag {
        margin: 20px 0;
        .el-button {
          margin-left: 10px;
          background-color: transparent;
          border-radius: 20px;
          border-color: #e7aa5a;
          color: #e7aa5a;
        }
      }
      .name {
        color: white;
        span {
          margin-left: 10px;
        }
      }
      .describe {
        color: #96979b;
        span {
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
  }
  .options {
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-button {
      border-radius: 30px;
      padding: 0;
      width: 100px;
      height: 30px;
    }
    .kinds {
      span {
        padding: 0 10px;
        font-size: 12px;
        color: #878787;
        cursor: pointer;
        border-radius: 20px;
      }
      .isActive {
        background-color: #fdf5f5;
        color: #ec4141;
      }
    }
  }
}
</style>