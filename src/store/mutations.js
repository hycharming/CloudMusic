import * as types from './mutation-types'

const mutations = {
    // 添加歌曲至播放列表
    [types.ADD_SONGS_TO_PLAYINGLIST](state,list){
        console.log(state.playingList.find((n)=>n.id == list.id));
        if(state.playingList.find((n)=>n.id == list.id) == undefined){
            state.playingList.push(list);
        }
        console.log(state.playingList);
    },
    // 播放歌曲
    [types.PLAYING_SONG](state,data){
        state.playingSong = data;
        console.log(state.playingSong);
    }
}

export default mutations