<template>
    <div class="order-mana">
        <!-- 订单管理 -->
        <div class="order-form">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="formInline.ordernum" placeholder="订单号"></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                    <el-input v-model="formInline.user" placeholder="收货人"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.region" placeholder="订单状态">
                        <el-option label="未受理" value="notacc"></el-option>
                        <el-option label="已受理" value="accepted"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-date-picker
                        v-model="value"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onCheck">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 订单列表 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%;fontSize: 12px;">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <!-- 查看 -->
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="订单号">
                            <span>{{ props.row.ordernumber }}</span>
                        </el-form-item>
                        <el-form-item label="收货人">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="配送地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="用户备注">
                            <span>{{ props.row.remark }}</span>
                        </el-form-item>
                        <el-form-item label="订单金额">
                            <span>{{ props.row.money }}</span>
                        </el-form-item>
                        <el-form-item label="订单状态">
                            <span>{{ props.row.region }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
            prop="ordernumber"
            label="订单号"
            width="110">
            </el-table-column>
            <el-table-column
            prop="time"
            label="下单时间"
            width="80">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="手机号"
            width="130">
            </el-table-column>
            <el-table-column
            prop="name"
            label="收货人"
            width="80">
            </el-table-column>
            <el-table-column
            prop="address"
            label="配送地址">
            </el-table-column>
            <el-table-column
            prop="dday"
            label="送达时间"
            width="80">
            </el-table-column>
            <el-table-column
            prop="remark"
            label="用户备注"
            width="80">
            </el-table-column>
            <el-table-column
            prop="money"
            label="订单金额"
            width="80">
            </el-table-column>
            <el-table-column
            prop="region"
            label="订单状态"
            width="80">
            </el-table-column>
           <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button @click="handleCheck(scope.$index,scope.row)" type="text" size="small">查看</el-button>
                <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
            </template>
            </el-table-column>
        </el-table>

        <!-- 编辑弹窗 -->
        <el-dialog title="订单信息" :visible.sync="dialogFormVisible">
            <el-form :model="addAcountForm"
                status-icon
                :rules="rules"
                ref="addAcountForm"
                label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="订单号" prop="ordernumber">
                    <el-input v-model="addAcountForm.ordernumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收货人" prop="name">
                    <el-input v-model="addAcountForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="addAcountForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="配送地址" prop="address">
                    <el-input v-model="addAcountForm.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户备注" prop="remark">
                    <el-input v-model="addAcountForm.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="订单金额" prop="money">
                    <el-input v-model="addAcountForm.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="订单状态" prop="region">
                    <el-input v-model="addAcountForm.region" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 分页 -->
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="400">
        </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false, // 对话框默认不可见
      addAcountForm: {
        ordernumber: "",
        phone: "",
        name: "",
        region: "",
        money: "",
        remark: "",
        address: ""
      },
      rules: {},
      tableData: [
        {
          ordernumber: "14214314",
          time: "19:21:42",
          phone: "18080823213",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          dday: "19:51:42",
          remark: "微辣",
          money: "108",
          region: "已受理",
          operate: "查看编辑"
        },
        {
          ordernumber: "14214314",
          time: "19:21:42",
          phone: "18080823213",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          dday: "19:51:42",
          remark: "微辣",
          money: "108",
          region: "已受理",
          operate: "查看编辑"
        },
        {
          ordernumber: "14214314",
          time: "19:21:42",
          phone: "18080823213",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          dday: "19:51:42",
          remark: "微辣",
          money: "108",
          region: "已受理",
          operate: "查看编辑"
        },
        {
          ordernumber: "14214314",
          time: "19:21:42",
          phone: "18080823213",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          dday: "19:51:42",
          remark: "微辣",
          money: "108",
          region: "已受理",
          operate: "查看编辑"
        },
        {
          ordernumber: "14214314",
          time: "19:21:42",
          phone: "18080823213",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          dday: "19:51:42",
          remark: "微辣",
          money: "108",
          region: "已受理",
          operate: "查看编辑"
        }
      ],
      formInline: {
        user: "",
        ordernum: "",
        phone: "",
        region: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value: [new Date(2019, 10, 10, 10, 10), new Date(2019, 10, 11, 10, 10)],
      currentPage: 1
    };
  },
  methods: {
    handleEdit(index, row) {
      //编辑
      console.log(index, row);
      // 修改对话框的显示状态为true，即显示对话框
      this.dialogFormVisible = true;

      // 点击编辑按钮时，把当前行的数据，更新到form对于的model对象上
      this.addAcountForm = row;
    },
    handleCheck(index, row){//查看
        console.log(row);
        // expanded=true;
    },
    onCheck() {
      //查询
      console.log("查到了!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.order-mana {
  width: 1100px;
  padding: 10px;
  background: #fff;

  .demo-form-inline {
    .el-form-item {
      /deep/.el-input {
        font-size: 12px;
        width: 180px;
      }
    }
  }
  .el-table {
    margin: 30px 0;
  }

  .el-pagination {
    text-align: center;
  }
}
</style>