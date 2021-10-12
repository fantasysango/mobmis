import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { Toast } from 'vant'

const instance = axios.create({
    baseURL: '/',
    // timeout: 6000, // 请求超时时间
})

let token = ''

// request interceptor
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = {
        token,
        ...config.headers,
    }
    return config
})

// 异常拦截处理器
const errorHandler = (error: any) => {
    if (error.response) {
        const { status, data } = error.responseata
        if ([401, 403].includes(status)) {
            Toast('网络鉴权失败 - ' + data.message)
        } else if (String(status).startsWith('5')) {
            Toast('网络连接失败 - ' + data.message)
        } else {
            Toast('网络异常')
        }
    }
    return Promise.reject(error)
}

// response interceptor
instance.interceptors.response.use((response: AxiosResponse) => {
    const res = response.data
    if (res.token) {
        token = res.token
    }
    if (!res.flag && res.msg) {
        Toast(res.msg)
    }
    return res
}, errorHandler)

export default instance