<template>
    <div class="addgoods">
        <!-- 添加商品 -->
        <h3 class="title">添加商品</h3>
        <el-form :model="addForm" ref="addForm" label-width="80px">
            <el-form-item label="商品名称">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select v-model="addForm.category" placeholder="请选择商品分类">
                    <!-- 循环商品分类，动态渲染分类选项 -->
                    <el-option v-for="type in typelist" :key="type.id" :label="type.name" :value="type.name"></el-option>
                    <!-- <el-option label="咖啡" value="咖啡"></el-option>
                    <el-option label="热菜" value="热菜"></el-option>
                    <el-option label="凉菜" value="凉菜"></el-option>
                    <el-option label="饮品" value="饮品"></el-option>
                    <el-option label="火锅" value="火锅"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="商品特色">
                <el-checkbox-group v-model="addForm.feature">
                    <el-checkbox label="新品上市" name="feature"></el-checkbox>
                    <el-checkbox label="第二单半价" name="feature"></el-checkbox>
                    <el-checkbox label="主打产品" name="feature"></el-checkbox>
                    <el-checkbox label="火爆产品" name="feature"></el-checkbox>
                    <el-checkbox label="祖传手艺" name="feature"></el-checkbox>
                    <el-checkbox label="源自四川" name="feature"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="商品图片">
                <!-- 
                    action : 上传组件的请求接口地址（action地址必须为完整地址：  http://域名：端口/接口地址）
                    show-file-list ： 是否开启列表（多选）模块【不用管】
                    on-success ：文件上传成功时的钩子
                -->
                <el-upload class="avatar-uploader"
                    :action='uploadApi'
                    :show-file-list="false"
                    :on-success="handleUploadSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否促销">
                <el-radio-group v-model="addForm.isPromotion">
                    <el-radio label="促销"></el-radio>
                    <el-radio label="不促销"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="食品规格">
                <el-radio-group v-model="addForm.standard">
                    <el-radio label="规格"></el-radio>
                    <el-radio label="多规格"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="包装费">
                <el-input-number v-model="addForm.packingexpense" @change="packingChange" :min="1" :max="10" label="0"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
                <el-input-number v-model="addForm.price" @change="priceChange" :min="1" :max="10" label="20"></el-input-number>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addForm.desc">
                </el-input>
            </el-form-item>
            <el-form-item>
                <!-- <img src="http://172.16.14.254:666/pub2.jpg" alt=""> -->
                <el-button type="primary" @click="onSubmit">添加商品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { listType } from "@/api/productType";
import { addGoods,uploadApi,uploadDir } from "@/api/product.js";
    export default {
        data() {
            return {
                uploadApi: uploadApi,// 配置上传接口地址
                addForm: {
                    name: '',
                    category: '',
                    feature: [],
                    imgUrl:'',
                    isPromotion: '',
                    packingexpense:'',
                    price:'',
                    desc: ''
                },
                typelist:[],//商品分类数据
            }
        },
        methods: {
            packingChange(value) {//包装费
                console.log(value);
            },
            priceChange(value) {//商品价格
                console.log(value);
            },
            onSubmit() {//添加商品
                //参数预处理
                this.addForm.feature=JSON.stringify(this.addForm.feature);
                const vm=this;
                addGoods(this.addForm).then(data=>{
                    if(data.success){//如果添加成功
                        this.$message({
                            type:'success',
                            duration:800,
                            message:data.message,
                            onClose(){
                                vm.$router.push('/home/goodslist')
                            }
                        })
                    }else{//添加失败
                        this.$message.error(data.message)
                    }
                })
            },
            handleUploadSuccess(res, file) {//图片回显在页面
                console.log(res,file)
                this.addForm.imgUrl = res.fileName;
            },
        },
        computed:{//计算属性封装图片回显的地址
            imageUrl(){
                if(this.addForm.imgUrl){//如果有图片进来
                    return uploadDir+this.addForm.imgUrl   //回显地址=服务器文件地址+文件名
                }else{//默认没有添加图片时什么都不显示
                    return ''
                }
            }
        },
        created(){//商品分类列表
            listType().then(data=>{
                this.typelist=data;
            })
        }
    }
</script>

<style lang="less" scoped>
    .addgoods{
        width: 1100px;
        background:#fff;
        .title{
            font-size: 14px;
            padding:15px 20px;
            color:#525355;
            border-bottom: 1px solid #ccc;
        }
        .el-form{
            width: 500px;
            padding:20px;
            .avatar-uploader{
            .el-upload-text{
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;

            }
            .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                border: 1px dashed #d9d9d9;
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }
        }
    }
</style>