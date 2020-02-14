<template>
    <div class="left-menu">
        <h4 class="nav-title">
          <i class="el-icon-s-shop"></i>
          华谊春天后台中心</h4>
          <el-menu router unique-opened :default-active="$route.path" class="el-menu-vertical-demo" 
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <!-- 做动态菜单 -->
          <template v-for="menu in filterlist">
            <!-- 没有子 -->
            <el-menu-item v-if="!menu.children" :index="menu.index" :xx="menu.index" :key="menu.id">
              <!-- 菜单图标 -->
              <i :class="menu.cls"></i>
              <!-- 菜单文字 -->
              <span slot="title">{{menu.title}}</span>
            </el-menu-item>
            <!-- 有子集 -->
            <el-submenu v-else :index="menu.index" :key="menu.id">
              <template slot="title">
                <i :class="menu.cls"></i>
                {{menu.title}}
              </template>
              <el-menu-item v-for="item in menu.children" :key="item.index" :index="item.index">
                <i :class="item.icon"></i>
                {{item.name}}
              </el-menu-item>
            </el-submenu>
          </template>

        </el-menu>
    </div>
</template>

<script>
import { getCurrentUserRole } from "@/api/login";
    export default {
      data() {
        return {
          menulist: [
            {
              id: 1,
              index: "/home/index",
              cls: "el-icon-s-home",
              title: "首页",
              role : [1,2] // 可访问角色有：超级管理员，普通员工
            },
            {
              id: 2,
              index: "/home/order",
              cls: "el-icon-s-order",
              title: "订单管理",
              role : [1] // 可访问角色有：超级管理员
            },
            {
              id: 3,
              index: "3",
              cls: "el-icon-suitcase",
              title: "商品管理",
              role : [1,2], // 可访问角色有：超级管理员，普通员工
              children: [
                { index: "/home/goodslist", name: "商品列表" ,icon:"el-icon-s-unfold"},
                { index: "/home/addgoods", name: "添加商品" ,icon:"el-icon-folder-add" },
              ]
            },
            {
              id: 4,
              index: "4",
              cls: "el-icon-menu",
              title: "商品分类管理",
              role : [1], // 可访问角色有：超级管理员
              children: [
                { index: "/home/goodstypelist", name: "商品分类列表" ,icon:"el-icon-s-unfold"},
                { index: "/home/goodstype", name: "添加商品分类" ,icon:"el-icon-edit-outline" }
              ]
            },
            {
              id: 5,
              index: "/home/shopmana",
              cls: "el-icon-s-shop",
              title: "店铺管理",
              role : [1], // 可访问角色有：超级管理员
            },
            {
              id: 6,
              index: "6",
              cls: "el-icon-pie-chart",
              title: "销售统计",
              role : [1], // 可访问角色有：超级管理员
              children: [
                { index: "/home/goodscount", name: "商品统计",icon:"el-icon-paperclip" },
                { index: "/home/ordercount", name: "订单统计" ,icon:"el-icon-shopping-cart-2"}
              ]
            },
            {
              id: 7,
              index: "7",
              cls: "el-icon-setting",
              title: "账号设置",
              role : [1], // 可访问角色有：超级管理员
              children: [
                { index: "/home/acountlist", name: "账号列表" ,icon:"el-icon-s-unfold"},
                { index: "/home/acountadd", name: "增加账号" ,icon:"el-icon-document-add"},
                { index: "/home/repwd", name: "修改密码" ,icon:"el-icon-edit"}
              ]
            },
          ],
          currentUserRole:2
        };
      },
      created(){
        getCurrentUserRole().then(data=>{
          this.currentUserRole=data.role
        })
      },
      computed:{
        filterlist(){
          let array=[],
          vm=this;
          array=vm.menulist.filter((menu)=>{
            return menu.role.includes(vm.currentUserRole)
          })

          return array
        }
      }
    }
</script>

<style lang="less" scoped>
    .left-menu{
        .nav-title{
            text-align: center;
            color:whitesmoke;
        }
        .el-menu{
            border:none;
        }
    }
</style>