import instance from "./http";

export default {

    // 推荐歌单
    async songsListRequest() {
        const res = await instance({
            url: "/personalized",
            method: 'get',
        })
        return res.data;
    },
    // 轮播图
    async bannerRequest(){
        const res = await instance({
            url:"/banner",
            method:'get',
        })
        return res.data;
    }
}