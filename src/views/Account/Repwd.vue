<template>
    <div class="fix-pwd">
        <!-- 修改密码 -->
        <h3 class="title">修改密码</h3>

        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { changePwd } from "@/api/login";
export default {
	data() {
		var validatePass = (rule, value, callback) => {
		if (value === '') {
			callback(new Error('请输入密码'));
		} else {
			if (this.ruleForm.checkPass !== '') {
			this.$refs.ruleForm.validateField('checkPass');
			}
			callback();
		}
		};
		var validatePass2 = (rule, value, callback) => {
		if (value === '') {
			callback(new Error('请再次输入密码'));
		} else if (value !== this.ruleForm.newPassword) {
			callback(new Error('两次输入密码不一致!'));
		} else {
			callback();
		}
		};
		return {
		ruleForm: {
			oldPassword: '',
			newPassword: '',
			checkPass: '',
		},
		rules: {
			oldPassword: [
			{ required: true, message: '请输入原密码', trigger: 'blur' }
			],
			newPassword: [
			{ validator: validatePass, trigger: 'blur' }
			],
			checkPass: [
			{ validator: validatePass2, trigger: 'blur' }
			],
		}
		};
	},
	methods: {
		// 修改密码
		submitForm() {
			const vm=this;
			this.$refs.ruleForm.validate((valid) => {
				if (valid) {//表单验证成功
					const token=localStorage.getItem('token')//获取本地存储的token
					if(token){
						let {oldPassword,newPassword}=this.ruleForm;//从ruleForm获取原密码和新密码
						//只需要传三个数据
						let data={
							token,
							oldPassword,
							newPassword,
						}
						changePwd(data).then(data=>{//将参数传入修改密码模块
						// debugger;
							if(data.success){//如果修改成功
								vm.$message({
									showClose: true,
									message: data.message,
									type:'success',
									duration:1000,
									onClose:()=>{
										vm.$router.push('/home/acountlist')
									}
								});
							}else{//修改失败
								vm.$message({
									showClose: true,
									message: data.message,
									type:'error',
									duration:1000,
								})
							}
						})
					}else{//如果用户登录验证未通过
						vm.$message({
							showClose: true,
							message: '修改失败',
							type: 'error'
						});
					}
				}else{
					vm.$message({
						showClose: true,
						message: '修改失败',
						type: 'error'
					});
				}
			})
		},
		// 重置表单
		resetForm(){
			this.$refs.ruleForm.resetFields();
		}
	}
}
</script>

<style lang="less" scoped>
.fix-pwd {
  width: 1100px;
  background: #fff;
  .title {
    font-size: 14px;
    padding: 15px 20px;
    color: #525355;
    border-bottom: 1px solid #ccc;
  }
  .el-form {
    padding: 20px;
    /deep/.el-input {
      font-size: 12px;
      width: 200px;
    }
  }
}
</style>