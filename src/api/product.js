// 1.准备
import $http from "@/utils/request.js";
import qs from "qs";

// 2.配置

// 商品列表
export function listGoods(data){
    return $http.get('/product/list',{
        params:data
    }).then(data=>data.data)
}

// 商品添加
export function addGoods(data){
    return $http.post('/product/add',qs.stringify(data)).then(data=>data.data)
}

// 商品修改
export function editGoods(data){
    return $http.post('/product/edit',qs.stringify(data)).then(data=>data.data)
}
// 商品查询
export function searchGoods(data){
    return $http.post('/product/search',qs.stringify(data)).then(data=>data.data)
}

// 商品分页
export function pageGoods(data){
    return $http.post('/product/search',qs.stringify(data)).then(data=>data.data)
}

// 商品删除
export function delGoods(id){
    return $http.get('/product/del',{
        params:{
            id:id
        }
    })
    .then(data=>data.data)
}

// 商品图片上传
export const uploadApi =  $http.defaults.baseURL + '/product/upload'  // 地址拼装     

//服务器文件加载
export const uploadDir =  $http.defaults.baseURL + '/upload/product/'


// 导出