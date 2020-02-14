<template>
    <div class="header">
        <!-- 头部 -->
        <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in breadCrumbList" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 账户头像 -->
          <div class="count-user">
            <p class="user-count">欢迎你，<span>雪球</span></p>
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-avatar fit="fill" :size="30" :src="avatar"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user-solid" command="usercenter">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" command="logout">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
    </div>
</template>

<script>
import { doLogout } from "@/api/login";
import avatar from "@/assets/images/header.jpeg";

export default {
    data(){
      return{
        avatar,
        breadCrumbList:[] //头部面包屑导航内容
      }
    },
    methods: {
        handleCommand(command){
            // console.log(command);
            const vm=this;
            if(command=="logout"){//如果是点击注销，就跳转到登录页面
              const token=localStorage.getItem('token')//首先获取到用户的token
              doLogout(token).then(data=>{
                  if(data.success){
                      // localStorage.removeItem('token')
                      localStorage.setItem('token','')//先清除token
                      vm.$router.replace('/login')//跳转到登陆页面
                }
              })
              // localStorage.removeItem('token')//先清除token
              // vm.$router.replace('/login')//跳转到登陆页面
            }
            if(command=="usercenter"){//如果是个人中心，跳转到用户信息界面
              vm.$router.push('/home/usercenter')
            }
        }
    },
    created(){
      const vm=this;
      vm.$bus.$on('avatarChange',(avatarUrl)=>{
        vm.avatar=avatarUrl;
      })
    },
    watch:{
      $route(newValue){//监听路由变化
        // debugger
        var arr=[];                   //定义一个arr空数组
        let title=newValue.meta.title //获取到路由的配置title
        arr.push(title)                //把title添加到arr空数组中
        this.breadCrumbList=arr;      //title面包屑导航的内容
      }
    }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .count-user {
    display: flex;
    align-items: center;
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
      .user-img {
        display: inline-block;
        width: 40px;
        height: 40px;
        font-size: 0;
      }
    }
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      margin-bottom: 20px;
    }
    .user-count {
      display: inline-block;
      font-size: 12px;
      margin-right: 8px;
    }
    .header-img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }
  }
}
</style>