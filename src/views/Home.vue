<template>
  <div class="home">
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <!-- 导航栏 -->
        <LeftMenu></LeftMenu>
      </el-aside>
      <!-- 右侧 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <HomeHeader></HomeHeader>
        </el-header>
        <!-- 中 -->
        <el-main>
          <!-- 主体页面路由 -->
          <router-view></router-view>
        </el-main>
        <!-- 下 -->
        <el-footer style="height:40px;">
          <p class="bot-msg">admin@nowcoder.com
              华谊春天©2019 All rights reserved
              </p>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from "../components/LeftMenu"
import HomeHeader from "../components/HomeHeader"

export default {
  components:{
      LeftMenu,HomeHeader
  },
  methods: {
        
      }
}
</script>

<style lang="less" scoped>
.home{
  height: 100%;
  background: #F0F2F5;
  &>.el-container{
    height: 100%;
    .el-aside{
      background: #545c64;
    }
  }
  .el-header,.el-footer{
    height: 60px;
    background: #fff;
  }
  .el-footer{
    .bot-msg{
      margin:0;
      text-align: center;
      font-size: 12px;
      line-height: 40px;
    }
  }
}
</style>

