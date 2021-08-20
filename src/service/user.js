import instance from './http'

export default{
    // 获取用户歌单
    async GetUserSongsList(data){
        const res = await instance({
            url:'/user/playlist',
            method:'get',
            params:data
            
        })
        return res.data
    }
}