<template>
    <div class="type-list">
        <!-- 商品类型列表 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>商品分类列表</h3>
            </div>

            <!-- 搜索框 -->
            <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini">
                <el-form-item label="商品类型" prop="name">
                    <el-input v-model="searchForm.name" placeholder="商品类型"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="doSearch">查询</el-button>
                    <el-button @click="doReset">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 分类列表 -->
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="商品ID" width="180"></el-table-column>
                <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
                <el-table-column prop="order" label="分类序号"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>

            <!-- 编辑弹窗 -->
            <el-dialog title="商品类型" :visible.sync="dialogFormVisible">
                <el-form :model="editform">
                    <el-form-item label="分类名称" label-width="80px">
                        <el-input v-model="editform.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分类序号" label-width="80px">
                        <el-input v-model="editform.order" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" label-width="80px">
                        <el-input type="textarea" v-model="editform.desc"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="sureEdit">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
// 引入模块
import { listType,editType,delType,searchType,pageType} from "@/api/productType.js";
export default {
    data() {
        return {
            dialogFormVisible: false,//默认编辑框不显示
            // 分页
            page:{//分页
                currentPage: 1,//当前页
                pageSize:5,
                total:10
            },
            // 编辑表单
            editform:{
                name:'',
                order:'',
                desc:'',
            },
            // 搜索表单
            searchForm:{
                name:''
            },
            tableData: [
                {
                id: "1",
                name: "饮料",
                order: "12",
                desc: "keke"
                },
                {
                id: "1",
                name: "饮料",
                order: "12",
                desc: "keke"
                },
                {
                id: "1",
                name: "饮料",
                order: "12",
                desc: "keke"
                }
            ]
        };
    },
    methods: {
        handleSizeChange(val){//每页长度
            this.page.pageSize=val;
            this.page.currentPage=1;
            // 根据新条件查询页面
            pageType(this.page).then(page=>{
                this.tableData=page.data;//更新行数据
                this.total=page.total;//更新总条数
            })
        },
        handleCurrentChange(val){//当前页切换
            this.page.currentPage=val;
            // 根据新条件查询页面
            pageType(this.page).then(page=>{
                this.tableData=page.data;//更新行数据
                this.total=page.total;//更新总条数
            })
        },
        doSearch(){//查询表单
            searchType(this.searchForm).then(data=>{this.tableData=data})
        },
        doReset(){//重置表单
            this.$refs.searchForm.resetFields()
        },
        handleEdit(index,row){//编辑商品类型
            //点击编辑显示弹出框 
            this.dialogFormVisible=true,
            //当前行的数据回填到编辑框
            this.editform=Object.assign({},row)
        },
        sureEdit(){//编辑提交
            const vm=this;
            editType(this.editform).then(data=>{
                if(data.success){
                    vm.$message({
                        type:'success',
                        message:data.message,
                        duration:700,
                        showClose:true,
                        onClose:()=>{
                            vm.dialogFormVisible=false;
                            // pageType().then(function(data){
                            //     vm.tableData=data;
                            // })
                            listType().then(function(data){
                                vm.tableData=data;
                            })
                        }
                    })
                }
            })
        },
        handleDelete(index,row){//删除
            console.log(index,row)
            const vm=this;
            this.$confirm(//弹出提示框
            '此操作将永久删除该数据,是否删除?',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {//发送ajax请求
                let{id}=Object.assign({},row)
                delType(id).then((data)=>{
                    console.log(data)
                    if(data.success){
                        this.$message({
                            type:'success',
                            message:data.message,
                        });
                        // pageType(this.page).then(function(page){
                        //     vm.tableData=page.data;
                        // })
                        listType().then(function(data){
                            vm.tableData=data;
                        })
                    }else{
                        this.$message({
                            type:'info',
                            message:'已取消删除'
                        })
                    }
                })
            })
        }
    },
    //发送ajax请求数据渲染页面
    created(){
        const vm=this;
        pageType(this.page).then(function(page){
            console.log(page)
            vm.tableData=page.data;
            vm.page.total=page.total;
        })
        // listType().then(data=>{
        //     this.tableData=data;
        // })
    },
};
</script>

<style lang="less" scoped>
.type-list {
  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  .el-dialog{
      .el-input{
          width: 300px;
      }
  }
}
</style>