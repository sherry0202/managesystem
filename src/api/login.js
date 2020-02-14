// 1.准备
import $http from "@/utils/request.js";
import qs from "qs";

// 2.配置

// 登录
export function doLogin(data){
    return $http.post('/login',qs.stringify(data)).then(data=>data.data)
}

// 注销
export function doLogout(data){
    return $http.post('/logout',qs.stringify(data)).then(data=>data.data)
}

// 获取个人信息
export function accountInfo(data){
    return $http.post('/personalInfo',qs.stringify(data)).then(data=>data.data)
}

// 获取用户角色
export function getCurrentUserRole(){
    const tokenValue = localStorage.getItem('token');
    return $http.post('/getCurrentUserRole',qs.stringify({
        token:tokenValue
    })).then(data=>data.data)
}

// 修改密码
export function changePwd(data){
    return $http.post('/changePassword',qs.stringify(data)).then(data=>data.data)
}

// 用户头像上传API地址
export const uploadApi =  $http.defaults.baseURL + '/uploadAvatar'    

// 图片访问的目的地址
export const uploadDir =  $http.defaults.baseURL + '/upload/personal/'    

// 修改用户头像
export const editAvatarImg =(avatar)=>{
    const tokenValue=localStorage.getItem('token');
    return $http.post('/editAvatarImg',qs.stringify({
        token:tokenValue,
        avatar:avatar
    })).then(data=>data.data)
} 

