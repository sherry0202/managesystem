<template>
    <div class="count-list">
        <!-- 账号列表 -->
        <h3 class="title">账号列表</h3>

        <!-- 搜索框 -->
        <el-form :inline="true" :model="searchForm" ref="searchForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="searchForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select v-model="searchForm.role" placeholder="角色">
                    <el-option label="超级管理员" :value="1"></el-option>
                    <el-option label="普通员工" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doSearch">查询</el-button>
                <el-button @click="doReset">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 账号列表 -->
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="selsChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="账号" prop="username" width="120">
                <template slot-scope="scope">{{ scope.row.username }}</template>
            </el-table-column>
            <el-table-column label="邮箱" prop="email" width="180">
                <template slot-scope="scope">{{ scope.row.email }}</template>
            </el-table-column>
            <el-table-column label="用户组" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.role===1 ? '超级管理员':'普通员工' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{ scope.row.inputtime | formateDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

        <div class="select">
            <el-button type="danger" plain @click="delSelected(sels.map(i=>i.id))" :disabled="this.sels.length === 0">批量删除</el-button>
            <el-button type="primary" plain @click="toggleSelection()">取消选择</el-button>
        </div>

        <!-- 弹窗编辑 -->
        <el-dialog title="账号修改" :visible.sync="dialogFormVisible">
            <el-form :model="editAcountForm"
                status-icon
                :rules="rules"
                ref="editAcountForm"
                label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editAcountForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户组" prop="role">
                    <el-select v-model.number="editAcountForm.role" placeholder="请选择用户组">
                        <el-option label="超级管理员" :value="1"></el-option>
                        <el-option label="普通员工" :value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editForm">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { editAcount,delAcount,pageAccount,searchAccount} from "@/api/account.js";
// 引入日期格式
import moment from "moment";
    export default {
        data() {
            return {
                dialogFormVisible: false, // 对话框默认不可见
                page:{//分页
                    currentPage: 1,//当前页
                    pageSize:5,
                    total:10
                },
                editAcountForm:{//编辑弹框
                    id:"",
                    username:"",
                    role:"",
                },
                searchForm:{//搜索表单
                    username:'',
                    role:''
                },
                rules: {},
                sels:[],//多选框选中的值显示
                tableData: [
                    {   
                        id:1,
                        username: '王小虎',
                        role: '超级管理员',
                        email:'12@qq.com',
                        inputtime: '2019-05-02',
                        }, 
                    {
                        id:2,
                        inputtime: '2019-05-04',
                        email:'12@qq.com',
                        username: '皮皮',
                        role: '普通员工'
                        }, 
                    {
                        id:3,
                        username: '李洙赫',
                        email:'12@qq.com',
                        role: '超级管理员',
                        inputtime: '2019-05-02',
                    }, 
                    {
                        id:4,
                        inputtime: '2019-05-04',
                        email:'12@qq.com',
                        username: '蛋蛋',
                        role: '普通员工'
                    }, 
                ]
            }
        },
        methods: {
            handleEdit(index, row) {//编辑
                // console.log(index, row);
                
                // 修改对话框的显示状态为true，即显示对话框
                this.dialogFormVisible = true;

                // 点击编辑按钮时，把当前行的数据，更新到form对于的model对象上
                // this.editAcountForm = row;
                this.editAcountForm=Object.assign({},row);//拷贝传递
            },
            editForm(){// 编辑提交
                const vm = this
                editAcount(this.editAcountForm).then(data=>{
                    if (data.success) {//如果成功
                        vm.$message({
                            type: "success",
                            message: data.message,
                            duration: 700,
                            showClose: true,
                            onClose: () => {
                                //关闭对话框
                                vm.dialogFormVisible = false;
                                //提示成功，刷新页面
                                pageAccount().then(function(data){ 
                                    vm.tableData = data;
                                })
                            }
                        });
                    }else{
                    // 如果不合法
                    vm.$message.error(data.message);
                    }
                })
            },
            doSearch(){//查询表单
                searchAccount(this.searchForm).then(data=>{this.tableData=data})
            },
            doReset(){//重置表单
                this.$refs.searchForm.resetFields();
            },
            handleDelete(index,row) { //删除当前行
                const vm=this;
                this.$confirm(//弹出提示框
                '此操作将永久删除该信息,是否删除?',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {//发送ajax请求
                    let{id}=Object.assign({},row);
                    delAcount(id).then((data)=>{
                        if(data.success){
                            this.$message({
                                type:'success',
                                message:data.message,
                            });
                            pageAccount(this.page).then(function(page){
                                vm.tableData=page.data;
                            })
                        }else{
                            this.$message({
                                type:'info',
                                message:'已取消删除'
                            })
                        }
                    })
                })
            },
            handleSizeChange(val){//每页长度
                this.page.pageSize=val;
                this.page.currentPage=1;
                // 根据新条件查询页面
                pageAccount(this.page).then(page=>{
                    this.tableData=page.data;//更新行数据
                    this.total=page.total;//更新总条数
                })
            },
            handleCurrentChange(val){//当前页切换
                this.page.currentPage=val;
                // 根据新条件查询页面
                pageAccount(this.page).then(page=>{
                    this.tableData=page.data;//更新行数据
                    this.total=page.total;//更新总条数
                })
            },
            toggleSelection(rows){ //取消全选
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            selsChange(sels){//选中项存放在sels[]中
                this.sels=sels
            },
            delSelected(){//批量删除
                var ids= this.sels.map(item => item.id).join()//获取所有选中行的id组成的字符串，以逗号分隔
                console.log(ids)
                this.$confirm('此操作将永久删除该文件,是否删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {      
                    this.tableData=this.tableData.filter(i=>!ids.includes(i.id))
                })
            }
        },
        // 发送ajax请求
        created(){
            const vm=this;
            // listAccount().then(function(data){
            //     vm.tableData=data.reverse();
            // })
            // 通过分页获取列表数据
            pageAccount(this.page).then(function(page){
                // console.log(page)
                vm.tableData=page.data;
                vm.page.total=page.total;
            })
        },
        // 过滤器
        filters:{
            formateDate(v) {
                return moment(v).format("YYYY-MM-DD hh:mm:ss");
            }
        }
    }
</script>

<style lang="less" scoped>
.count-list {
  width: 1100px;
  background: #fff;
  .title {
    font-size: 14px;
    padding: 15px 20px;
    color: #525355;
    border-bottom: 1px solid #ccc;
  }
  .el-form{
      margin:20px 0 0 20px;
  }
  .el-table {
    padding-left: 20px;
  }
  .el-pagination {
    padding-top: 20px;
    text-align: center;
  }
  .select {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .el-dialog {
    .el-form {
      width: 300px;
    }
  }
}
</style>