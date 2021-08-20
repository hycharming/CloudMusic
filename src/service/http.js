// axios全局封装
import axios from 'axios';
// import {
//     Loading
// } from 'element-ui';
// import qs from 'qs';
// import {Loading} from 'element-ui'

// let loading = null; // eslint-disable-line no-unused-vars

// 创建axios实例
var instance = axios.create({
    timeout: 1000 * 12
});

instance.defaults.baseURL = 'http://localhost:3000';
// 请求超时 
// axios.defaults.timeout = 10000;
// 设置post请求的请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
instance.interceptors.request.use(config => {
    // loading = Loading.service({
    //     lock: true,
    //     text: '请稍等',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    // })
    // console.log("config:", config);
    return config;
})

// 响应拦截器
instance.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    // setTimeout(() => {
    //     loading.close();
    // }, 200)
    if (response.status === 200) {
        return Promise.resolve(response);
    }
}, error => {
    if (error == 'Error: Request failed with status code 301') {
        console.log('没有登录权限！！！');
    }
    // setTimeout(() => {
    //     loading.close();
    // }, 1000)
    return Promise.reject(error)
})

//get
export default instance;