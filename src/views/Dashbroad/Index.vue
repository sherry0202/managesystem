<template>
    <div class="index">
        <!-- <h2>首页</h2> -->
        <div class="top-list">
            <el-row>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <i class="el-icon-document-checked count-icon"></i>
                    <p class="count-sum">总订单</p><p class="count-num">102400</p></div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">
                    <i class="el-icon-coin count-icon"></i>
                    <p class="count-sum">总销售额</p><p class="count-num">102400</p></div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple">
                    <i class="el-icon-s-order count-icon"></i>
                    <p class="count-sum">今日订单数</p><p class="count-num">102400</p></div>
                </el-col>
                <el-col :span="6"><div class="grid-content bg-purple-light">
                    <i class="el-icon-bank-card count-icon"></i>
                    <p class="count-sum">今日销售额</p><p class="count-num">102400</p></div>
                </el-col>
            </el-row>
        </div>
        <!-- echarts容器 -->
        <div ref="myChart" :style="{width: '1052px', height: '400px'}"></div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
            msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(this.$refs.myChart)
                // 绘制图表
                myChart.setOption({
                    title: { text: '数据统计' },
                    tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '2%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .grid-content{
        background: #fff;
        height: 90px;
        width: 260px;
        overflow: hidden;
        .count-icon{
            float: left;
            padding: 10px 30px;
            font-size: 70px;
        }
        .el-icon-document-checked{
            color:#259EDE;
        }
        .el-icon-coin{
            color:#DC4F94;
        }
        .el-icon-s-order{
            color:#1296DB;
        }
        .el-icon-bank-card{
            color:red;
        }
        .count-sum{
            text-align: right;
            padding-right: 40px;
            font-size: 18px;
            margin:20px 0 8px;
            color:#ccc;
        }
        .count-num{
            text-align: right;
            padding-right: 40px;
            font-size: 16px;
            font-weight: 700;
            margin:0;
            color:#424242;
        }
    }
    #myChart{
        margin-top:50px;
        background: #fff;
        padding:25px 20px;
    }
</style>