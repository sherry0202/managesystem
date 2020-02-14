<template>
    <div class="add-type">
        <!-- 添加商品分类 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>分类添加</h3>
            </div>
            <el-form ref="typeForm" :model="typeForm" label-width="80px">
                <el-form-item label="分类名称" prop="name">
                    <el-input placeholder="请输入内容" v-model="typeForm.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="分类序号" prop="order">
                    <template>
                        <el-input-number v-model="typeForm.order" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
                    </template>
                </el-form-item>
                <el-form-item label="描述" label-width="80px" prop="desc">
                        <el-input type="textarea" v-model="typeForm.desc"></el-input>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
import { addType } from "@/api/productType.js";
    export default {
        data() {
            return {
                typeForm:{
                    name: '',
                    order: "",
                    desc:''
                }
            }
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            onSubmit(){
                if(this.typeForm){//如果输入框有值
                    addType(this.typeForm).then(data=>{//添加商品类型
                    if(data.success){//添加成功
                        this.$message({
                            type:'success',
                            message:data.message,
                            duration:700,
                            onClose:()=>{
                                this.$router.push('/home/goodstypelist')
                            }
                        })
                    }else{//添加失败
                        this.$message({
                            type:'error',
                            message:data.message,
                            dutation:1000,
                            showClose:true,
                        })
                    }
                })
                }else{
                    this.$message.error('添加失败')
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    .add-type{
        .el-input{
            width: 200px;
        }
    }
</style>