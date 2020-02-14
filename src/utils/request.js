// axios封装

// 1.准备
import axios from "axios";
// 2.配置
const axiosInstance=axios.create({
    baseURL:"http://localhost:666",// 公共的请求地址
    timeout:5000,// 请求超时时间
})

// 3.导出
export default axiosInstance