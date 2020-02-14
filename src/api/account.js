// 1.准备
import $http from "@/utils/request.js";
import qs from "qs";

// 2.配置

// 账户列表  通过分页获取数据列表
export function listAccount(data){
    return $http.get('/account/list',{
        params:data
    }).then((data)=>{
        return data.data
    })
}

// 账户添加
export function addAcount(data){
    return $http.post('/account/add',qs.stringify(data)).then(data=>data.data)
}

// 账户修改
export function editAcount(data){
    return $http.post('/account/edit',qs.stringify(data)).then(data=>data.data)
}

// 账户删除
export function delAcount(id) {
    return $http.get('/account/del',{
        params:{
            id : id
        }
    }).then(data=>data.data)
}

// 账户搜索
export function searchAccount(data){
    return $http.post('/account/search',qs.stringify(data))
    .then(data=>data.data)
}

// 账户分页
export function pageAccount(data){
    return $http.post('/account/page',qs.stringify(data))
    .then(data=>data.data)
}

// 导出