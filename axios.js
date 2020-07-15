import axios from 'axios';
import log from "@utils/util.log"

// 创建一个错误，对错误进行处理, 可以对错误进行收集到状态里面，添加日志
function errorCreate (msg) {
    const error = new Error(msg);
    errorLog(error)
    throw error;
}

// 记录和显示错误
function errorLog (error) {
    // 添加到日志，状态管理
    // store.dispatch('mum/log/push', {
    //     message: '数据请求异常',
    //     type: 'danger',
    //     meta: {
    //         error
    //     }
    // })
    if (process.env.NODE_ENV === 'development') {
        log.danger('>>>>>> Error >>>>>>')
        console.log(error)
    }
    // 显示提示 这里可以换成对应的 react 和 vue 的组件
    // Message({
    //     message: error.message,
    //     type: 'error',
    //     duration: 5 * 1000
    // })
}

// 基础设置
let baseConfig = {
    baseURL: process.env.REQUEST_BASE_URL || '/', // 请求的地址，正在 .env 设置 REQUEST_BASE_URL
    timeout: 5000 // 请求超时时间
};

// 实例化
const service = axios.create(baseConfig);

// 请求拦截
service.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        // const token = util.cookies.get('token')
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        // config.headers['Authorization'] = token
        // config.headers['appId'] = store.getters['mum/appid/getAppId']
        // if (config.method === 'POST' || config.method === 'PUT' || config.method === 'DELETE') {
        //   config.headers['AppId'] = util.localStorage.getItem('appid')
        // }
        return config;
    },
    error => {
        // 发送失败
        console.log(error)
        Promise.reject(error)
    }
)

// 返回拦截
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data;
        // 这个状态码是和后端约定的
        const { code } = dataAxios;
        // 根据 code 进行判断
        if (code === undefined) {
            return dataAxios;
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
                case 0:
                    return dataAxios.data
                // token过期
                case 1001:
                    // [ 示例 ] 其它和后台约定的 code
                    // errorCreate(`[ code: 1001 ] ${dataAxios.msg}: ${response.config.url}`)
                    break
                case 1011:
                    // errorCreate(`[ code: 1010 ] ${dataAxios.msg}: ${response.config.url}`)
                    return ''
                default:
                    // 不是正确的 code
                    errorCreate(`${dataAxios.msg}: ${response.config.url}`)
                    break
            }
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400: error.message = '请求错误'; break
                case 401: error.message = '未授权，请登录'; break
                case 403: error.message = '拒绝访问'; break
                case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
                case 408: error.message = '请求超时'; break
                case 500: error.message = '服务器内部错误'; break
                case 501: error.message = '服务未实现'; break
                case 502: error.message = '网关错误'; break
                case 503: error.message = '服务不可用'; break
                case 504: error.message = '网关超时'; break
                case 505: error.message = 'HTTP版本不受支持'; break
                default: break
            }
        }
        errorLog(error)
        return Promise.reject(error)
    }
)
module.exports = service;