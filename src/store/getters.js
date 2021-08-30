// 获取播放列表
export const getState = function (state) {
    console.log("state", state);
    return state.playingList
}

// 获取正在播放歌曲
export const getplayingSong = function(state){
    console.log("state.playingSong;",state.playingSong);
    return state.playingSong;
}