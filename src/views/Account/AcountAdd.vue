<template>
    <div class="fix-pwd">
        <!-- 添加账号 -->
        <h3 class="title">添加账号</h3>

        <!-- 表单 -->
        <el-form :model="addAcountForm" status-icon :rules="rules" 
        ref="addAcountForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="addAcountForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="addAcountForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="addAcountForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input v-model="addAcountForm.email"></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="role">
                <el-select v-model="addAcountForm.role" placeholder="请选择用户组">
                    <el-option label="超级管理员" :value="1"></el-option>
                    <el-option label="普通员工" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 引入api模块
import { addAcount } from "@/api/account.js";

    export default {
        data() {
            var vm=this;
            var validatePass = (rule, value, callback) => {
                // 密码框为空
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                if (this.addAcountForm.checkPass !== '') {
                    this.$refs.addAcountForm.validateField('checkPass');
                }
                callback();// 没有错,直接放行
                }
            };
            var checkPass2 = (rule, value, callback) => {
                // 密码框为空
                if (value === "") {
                    callback(new Error("确认密码不能为空"));
                } else {
                    // 如果确认密码有值，直接和密码框的内容进行比较
                    if (value === vm.addAcountForm.password) {
                        // 手动调用确认密码框对应的方法
                    // 没有错,直接放行
                        callback();
                    } else {
                        callback(new Error("两次输入的密码不一致！！"));
                    }
                }
            };
            
            return {
                addAcountForm: {
                    username : '',
                    password: '',
                    checkPass:'',
                    email:'',
                    role: '',
                },
                rules: {
                    username: [
                        { required: true, message: "请输入账号名称", trigger: "blur" },
                        {
                            min: 3,
                            max: 8,
                            message: "账号名称长度在 3 到 8 个字符",
                            trigger: "blur"
                        }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: checkPass2, trigger: 'blur' }
                    ],
                    email:[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    role:[
                        { required: true, message: '请选择用户角色', trigger: 'change' }
                    ]
                }
            };
         },
        methods: {
            submitForm() {//添加账号
                this.$refs.addAcountForm.validate((valid) => {
                if (valid) {
                    // 如果满足验证，就发送ajax请求
                    addAcount(this.addAcountForm).then(data=>{
                        if(data.success){//如果添加账号成功
                            this.$message({
                                showClose: true,
                                message: data.message,
                                type:'success',
                                duration: 1000,
                                onClose:()=>{
                                    this.$router.push('/home/acountlist')
                                }
                            });
                        }else{//如果不成功
                            this.$message.error(data.message);
                        }
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '添加失败',
                        type: 'error'
                        });
                    return false;
                }
                });
            },
            resetForm() {
                this.$refs.addAcountForm.resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
    .fix-pwd{
        width: 1100px;
        background:#fff;
        .title{
            font-size: 14px;
            padding:15px 20px;
            color:#525355;
            border-bottom: 1px solid #ccc;
        }
        .el-form{
            padding:20px;
            /deep/.el-input{
                font-size: 12px;
                width: 200px;
            }
        }
    }
</style>