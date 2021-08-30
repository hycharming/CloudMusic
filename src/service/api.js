import instance from "./http";

export default {
    //获取歌曲Url
    async songUrlRequest(data) {
        const res = await instance({
            url: "/song/url",
            method: 'get',
            params: data
        })
        return res.data;
    },
    // 获取歌曲详情
    async songDetailRequest(data) {
        const res = await instance({
            url: "/song/detail",
            method: 'get',
            params: data
        })
        return res.data;
    },
    // 搜索歌曲
    async searchSongs(data){
        const res = await instance({
            url:"/cloudsearch",
            method:'get',
            params:data
        })
        return res.data;
    },
    // 获取歌单详情
    async songsListDetailRequest(data) {
        const res = await instance({
            url: "/playlist/detail",
            method: 'get',
            params: data
        })
        return res.data;
    },
    // 推荐歌单
    async songsListRequest(data) {
        const res = await instance({
            url: "/personalized",
            method: 'get',
            params:data
        })
        return res.data;
    },
    // 轮播图
    async bannerRequest() {
        const res = await instance({
            url: "/banner",
            method: 'get',
        })
        return res.data;
    },
    //精品歌单
    async BoutiqueSongsList(data){
        const res = await instance({
            url:'/top/playlist/highquality',
            method:'get',
            params:data
        })
        return res.data;
    },
    // 推荐歌单(网友精选)
    async songsListOnline(data){
        const res = await instance({
            url:'/top/playlist',
            method:'get',
            params:data
        })
        return res.data;
    }

}