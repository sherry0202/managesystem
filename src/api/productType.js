// 1.准备
import $http from "@/utils/request.js";
import qs from "qs";

// 2.配置

// 商品类型列表
export function listType(data){
    return $http.get('/productType/list',{
        params:data
    }).then((data)=>{
        return data.data
    })
}

// 商品类型添加
export function addType(data){
    return $http.post('/productType/add',qs.stringify(data)).then(data=>data.data)
}

// 商品类型修改
export function editType(data){
    return $http.post('/productType/edit',qs.stringify(data)).then(data=>data.data)
}

// 商品类型删除
export function delType(id){
    return $http.get('/productType/del',{
        params:{
            id,
        }
    }).then(data=>data.data)
}

// 商品类型查询
export function searchType(data){
    return $http.post('/productType/search',qs.stringify(data))
    .then(data=>data.data)
}

// 商品类型分页
export function pageType(data){
    return $http.post('/productType/page',qs.stringify(data))
    .then(data=>data.data)
}