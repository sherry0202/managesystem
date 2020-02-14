<template>
    <div class="goods">
        <!-- 搜索框 -->
        <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini">
            <el-form-item label="商品名" prop="name">
                <el-input v-model="searchForm.name" placeholder="商品名"></el-input>
            </el-form-item>
            <el-form-item label="价格起始" prop="priceStart">
                <el-input v-model.number="searchForm.priceStart" placeholder="0"></el-input>
            </el-form-item>
            <el-form-item label="最高价格" prop="priceEnd">
                <el-input v-model.number="searchForm.priceEnd" placeholder="30"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doSearch">查询</el-button>
                <el-button @click="doReset">重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 商品列表 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <!-- 下拉框隐藏内容 -->
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="商品 ID">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <span>{{ props.row.name }}</span>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <span>{{ props.row.category }}</span>
                    </el-form-item>
                    <el-form-item label="商品特色">
                        <span>{{ props.row.feature }}</span>
                    </el-form-item>
                    <el-form-item label="是否促销">
                        <span>{{ props.row.isPromotion }}</span>
                    </el-form-item>
                    <el-form-item label="单价">
                        <span>{{ props.row.price }}</span>
                    </el-form-item>
                    <el-form-item label="包装费">
                        <span>{{ props.row.packingexpense }}</span>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <span>{{ props.row.desc }}</span>
                    </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <!-- table展示内容 -->
            <el-table-column label="商品 ID" prop="id" width="100"></el-table-column>
            <el-table-column label="商品名称" prop="name" width="150"></el-table-column>
            <el-table-column label="商品分类" prop="category" width="130"></el-table-column>
            <el-table-column label="价格" prop="price" width="100"></el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip>
                <!-- 作用域插槽 -->
                <template slot-scope="scope">
                    <span>{{ scope.row.inputtime | formateDate }}</span>
                </template>
            </el-table-column>
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
            :current-page.sync="page.currentPage"
            :page-sizes="[2, 5, 10, 20]"
            :page-size="5"
            layout="total,sizes,prev, pager, next, jumper"
            :total="page.total">
        </el-pagination>   

        <!-- 弹窗编辑 -->
        <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
            <el-form :model="editForm" status-icon :rules="rules" ref="editForm"
                label-width="100px" class="demo-ruleForm" size="mini">
                <el-form-item label="商品名称">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-select v-model="editForm.category" placeholder="请选择商品分类">
                        <el-option label="热销" value="热销"></el-option>
                        <el-option label="咖啡" value="咖啡"></el-option>
                        <el-option label="热菜" value="热菜"></el-option>
                        <el-option label="凉菜" value="凉菜"></el-option>
                        <el-option label="饮品" value="饮品"></el-option>
                        <el-option label="火锅" value="火锅"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="特色">
                    <el-checkbox-group v-model="editForm.feature">
                        <el-checkbox label="新品上市" name="feature"></el-checkbox>
                        <el-checkbox label="第二单半价" name="feature"></el-checkbox>
                        <el-checkbox label="主打产品" name="feature"></el-checkbox>
                        <el-checkbox label="火爆产品" name="feature"></el-checkbox>
                        <el-checkbox label="祖传手艺" name="feature"></el-checkbox>
                        <el-checkbox label="源自四川" name="feature"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="商品图片"></el-form-item>
                <el-form-item label="是否促销">
                    <el-radio-group v-model="editForm.isPromotion">
                        <el-radio label="促销"></el-radio>
                        <el-radio label="不促销"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="editForm.price" :min="20" label="价格"></el-input>
                </el-form-item>
                <el-form-item label="包装费">
                    <el-input v-model="editForm.packingexpense" :min="0" :max="20" label="包装费"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input type="textarea" v-model="editForm.desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sureEdit">修改</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>     
    </div>
</template>

<script>
import { listGoods, editGoods, delGoods, searchGoods,pageGoods } from "@/api/product.js";
import moment from "moment";

export default {
  data() {
    return {
      dialogFormVisible: false, //弹出框不可见
      // 编辑框
      editForm: {
        name: "",
        desc: "",
        shop: "",
        id: "",
        feature: "",
        address: "",
        shopId: "",
        category: "",
        packingexpense: "7"
      },
      page:{//分页
        currentPage: 1,//当前页
        pageSize:5,
        total:10
    },
      //搜索表单
      searchForm: {
        name: "",
        priceStart:'',
        priceEnd:'',
      },
      rules: {},
      tableData: [
        {
          id: "12",
          name: "鸡蛋仔",
          category: "江浙小吃、小吃零食",
          feature: '["第二单半价", "火爆产品"]',
          isPromotion: "促销",
          packingexpense: "7",
          price: "8",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          inputtime: "2019-10-10 14:20:43"
        }
      ],
    //   商品分类列表
      typelist:[],
    };
  },
  methods: {
    //每页条数
    handleSizeChange(val){//每页长度
        this.page.pageSize=val;
        this.page.currentPage=1;
        // 根据新条件查询页面
        pageGoods(this.page).then(page=>{
            this.tableData=page.data;//更新行数据
            this.total=page.total;//更新总条数
        })
    },
    //当前页
    handleCurrentChange(val){//当前页切换
        this.page.currentPage=val;
        // 根据新条件查询页面
        pageGoods(this.page).then(page=>{
            this.tableData=page.data;//更新行数据
            this.total=page.total;//更新总条数
        })
    },
    //搜索表单
    doSearch() {
        searchGoods(this.searchForm).then(data => {
            this.tableData = data;
        });
    },
    //重置表单
    doReset() {
        this.$refs.searchForm.resetFields();
    },
    //编辑
    handleEdit(index, row) {
      // console.log(index, row);
      // 修改对话框的显示状态为true，即显示对话框
      this.dialogFormVisible = true;

      // 点击编辑按钮时，把当前行的数据，更新到form对于的model对象上
      this.editForm = Object.assign({}, row);
      // 特殊数据的处理
      if (this.editForm.feature) {
        try {
          this.editForm.feature = JSON.parse(this.editForm.feature);
        } catch {
          this.editForm.feature = this.editForm.feature;
        }
      }
    },
    //编辑修改提交
    sureEdit() {
      const vm = this;
      editGoods(this.editForm).then(data => {
        if (data.success) {
          vm.$message({
            type: "success",
            message: data.message,
            duration: 700,
            onClose: () => {
              vm.dialogFormVisible = false;
              listGoods().then(function(data) {
                vm.tableData = data;
              });
            }
          });
        }
      });
    },
    //删除当前行
    handleDelete(index, row) {
      const vm = this;
      this.$confirm("此操作将永久删除该信息,是否删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let { id } = Object.assign({}, row);
        delGoods(id).then(data => {
          if (data.success) {
            this.$message({
              type: "success",
              message: data.message
            });
            listGoods().then(function(data) {
              vm.tableData = data;
            });
          } else {
            this.$message({
              type: "info",
              message: data.message
            });
          }
        });
      });
    },
    // 手动输入价格
    handleChangeStart(value) {//起始价格
        console.log(value);
    },
    handleChangeEnd(value) {//最终价格
        console.log(value);
    },
},
    created() {
        const vm = this;
        // pageGoods(this.page).then(function(page){
        //     console.log(page)
        // })
        listGoods().then(function(data) {
            vm.tableData = data;
        });
    },
    filters: {
        //过滤器
        formateDate(t) {
        //格式化创建时间
        return moment(t).format("YYYY-MM-DD hh:mm:ss");
        },
        renderFeature(value) {
            if (value) {
            // 如果值存在
                try {
                // 把符合数组格式的字符串，先转为数组对象，再拆分拼接为字符结果
                    return JSON.parse(value).join("、");
                } catch {
                    return value.join("、");
                }
            }
        }
    }
};
</script>

<style lang="less" scoped>
.goods {
  background: #fff;
  padding:20px;
  .el-table {
    padding: 10px;
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>