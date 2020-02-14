<template>
    <div class="user-center">
        <!-- 个人中心 -->
        <h3>管理员信息</h3>
        <el-form label-position="left">
            <el-form-item label="管理员ID：">
                <span>{{ accountInfo.id }}</span>
            </el-form-item>
            <el-form-item label="账号：">
                <span>{{ accountInfo.username }}</span>
            </el-form-item>
            <el-form-item label="用户组：">
                <span>{{ accountInfo.role===1 ? '超级管理员':'普通员工' }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
                <span>{{ accountInfo.inputtime | formateDate }}</span>
            </el-form-item>
            <el-form-item label="管理员头像" style="height:100px">
                <el-upload class="avatar-uploader" 
                :action="uploadApi" 
                :show-file-list="false" 
                :on-success="handleAvatarSuccess" 
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

                <el-button
                    @click="editAvatar"
                    style="margin-left: 30px; margin-top: 15px;"
                    size="small"
                    type="primary">修改头像</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {accountInfo,uploadApi,uploadDir,editAvatarImg} from "@/api/login";
    import moment from "moment";
    export default {
        data() {
            return {
                uploadApi,
                uploadDir,
                accountInfo: {
                    id: "123",
                    username: "雪球",
                    role: "超级管理员",
                    inputtime: "2019-10-22",
                    avatar:""
                },
            };
        },
        methods:{
            handleAvatarSuccess(res){//用户头像上传
                // console.log(res)
                this.accountInfo.avatar=res.fileName;//获取上传的图片名
            },
            getUserInfo(){//获取用户信息
                const token = localStorage.getItem("token");
                // debugger;
                accountInfo({token}).then(({accountInfo})=>{
                    Object.assign(this.accountInfo,accountInfo)
                });
            },
            editAvatar(){//修改用户头像
                const vm=this;
                const avatarParams=vm.accountInfo.avatar;
                editAvatarImg(avatarParams).then((data)=>{
                    if(data.success){//如果修改成功
                        vm.$message({
                            type:'success',
                            duration:800,
                            message:data.message,
                            onClose(){
                                vm.$bus.$emit('avatarChange',vm.imageUrl)
                            }
                        })
                    }else{//修改失败
                        vm.$message.error(data.message)
                    }
                })
            }
        },
        created() {
            this.getUserInfo()
        },
        filters: {
            formateDate(v) {//修改时间格式
                return moment(v).format("YYYY-MM-DD hh:mm:ss");
            }
        },
        computed:{
            imageUrl(){//用户头像回显
                if(this.accountInfo.avatar){
                    return uploadDir+this.accountInfo.avatar
                }else{
                    return ''
                }
            }
        }
    };
</script>

<style lang="less" scoped>
    .user-center {
        background: #fff;
        padding: 20px;
        .avatar-uploader{
            display: inline-block;
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
                width: 78px;
                height:78px;
                line-height: 78px;
                text-align: center;
            }
            .avatar {
                width: 78px;
                height: 78px;
                display: block;
            }
        }
    }
</style>