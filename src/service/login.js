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
}