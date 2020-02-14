<template>
  <div id="login" class="container">
    <h2 class="title">华谊春天后台管理系统</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input type="username" placeholder="用户名"
    prefix-icon="el-icon-user-solid" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="密码"
    prefix-icon="el-icon-lock" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { doLogin } from "@/api/login";
  export default {
    data() {
      return {
        ruleForm: {
          username: 'admin',
          password: 'abc',
        },
        rules: {
          username: [
           { required: true, message: "请输入用户名", trigger: "blur" },
          //min: 内容的最小长度 , max：内容的最大长度
          { min: 3, max:12, message: "长度在 3 到12 个字符", trigger: "blur" }
          ],
          password: [
           { required: true, message: "请输入密码", trigger: "blur" },
          //min: 内容的最小长度 , max：内容的最大长度
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
          ],
        }
      };
    },
    methods: {
      submitForm() {//登录提交表单
        const vm=this;
        const form=this.$refs.ruleForm
        form.validate((valid) => {//验证表单
          if (valid) {//如果验证通过
            // 发送登录验证请求
            const params=this.ruleForm;
            doLogin(params).then(data=>{
              if(data.success){
                vm.$message({
                  message:data.message,
                  type: 'success',
                  duration:1000,
                  onClose:() =>{
                    //先将token保存到本地
                    localStorage.setItem('token',data.token);
                    // 跳转到首页
                    vm.$router.replace('/home/index') 
                  }
                });
              }else{
                this.$message.error(data.message)
              }
            });
          } else {
            this.$message.error({
              type: 'error',
              message:'登录失败',
              showClose:true
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .container{
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #2D3A4B;
    .title{
      color:#fff;
    }
    .el-form{
      width: 400px;
      .el-button{
        width: 100%;
      }
    }
  }
  

</style>