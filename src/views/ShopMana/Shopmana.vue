<template>
    <div class="shop-mana">
        <!-- 店铺管理 -->
        <h3 class="title">店铺管理</h3>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.adress"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="店铺简介">
                <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="店铺标语">
                <el-input v-model="form.slogen"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类">
                <el-select v-model="form.classify" placeholder="请选择店铺分类">
                    <el-option label="早餐" value="breakfast"></el-option>
                    <el-option label="午餐" value="lunch"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺特色">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="品牌保证" name="type"></el-checkbox>
                    <el-checkbox label="蜂鸟专送" name="type"></el-checkbox>
                    <el-checkbox label="新店开业" name="type"></el-checkbox>
                    <el-checkbox label="外卖报" name="type"></el-checkbox>
                    <el-checkbox label="准时达" name="type"></el-checkbox>
                    <el-checkbox label="开发票" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="配送费">
                <el-input-number v-model="form.num" @change="numberChange" :min="1" :max="10" label="0"></el-input-number>
            </el-form-item>
            <el-form-item label="起送价">
                <el-input-number v-model="form.price" @change="priceChange" :min="1" :max="10" label="20"></el-input-number>
            </el-form-item>
            <el-form-item label="营业时间">
                <el-time-select v-model="form.value"
                    :picker-options="{
                        start: '08:30',
                        step: '00:30',
                        end: '24:00'
                    }"
                    placeholder="选择时间">
                </el-time-select>
            </el-form-item>
            <el-form-item label="店铺头像">
                <el-upload class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="店铺描述">
                <el-input type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form.textarea">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
         data() {
            return {
                imageUrl: '',
                form: {
                    name: '',
                    classify: '',
                    type: [],
                    slogen:'',
                    adress:'',
                    phone:'',
                    desc:'',
                    value:'',
                    num:'',
                    price:'',
                    textarea: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            numberChange(value) {
                console.log(value);
            },
            priceChange(value) {
                console.log(value);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style lang="less" scoped>
    .shop-mana{
        width: 1100px;
        background:#fff;
        .title{
            font-size: 14px;
            padding:15px 20px;
            color:#525355;
            border-bottom: 1px solid #ccc;
        }
        .el-form{
            width: 500px;
            padding:20px;
            .avatar-uploader{
            .el-upload-text{
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;

            }
            .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                border: 1px dashed #d9d9d9;
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }
            .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }
        }
    }
</style>