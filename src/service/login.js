import instance from './http'

export default {
    // 登录
    async loginRequest(data) {
        const res = await instance({
            url: '/login/cellphone',
            method: 'get',
            params: data
        })
        return res.data
    },
    // 退出登录
    async logoutRequest() {
        const res = await instance({
            url: '/logout',
            method: 'get',
        })
        return res.data
    },
    //登录状态
    async logStatusRequest(data) {
        const res = await instance({
            url: '/login/status',
            method: 'get',
            params:data
        })
        return res.data
    },
}