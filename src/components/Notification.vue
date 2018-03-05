<template>
    <div class="notification">
        <h1>发送通知</h1>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="通知内容">
                <el-input type="textarea" :rows="5" v-model="form.desc"></el-input>
            </el-form-item>

            <el-form-item label="发送时间">
                <el-col :span="11">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.day" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker value-format="hh:mm:ss" type="fixed-time" placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="全体发送">
                <el-switch v-model="form.allStudent"></el-switch>
            </el-form-item>
            <el-form-item label="按班级">
                <el-transfer :props="{
      key: 'classId',
      label: 'className'
    }" v-model="form.class" :data="classList" :titles="['班级列表','通知的班级']"></el-transfer>
            </el-form-item>
            <el-form-item label="按学生">
                <el-transfer :props="{
      key: 'studentId',
      label: 'studentName'
    }" v-model="form.student" :data="studentList" :titles="['学生列表','通知的学生']"></el-transfer>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addNotification">添加通知</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                // 通知内容
                desc: null,
                // 发送日期
                day: null,
                // 具体时间
                time: null,
                // 是否全体发送通知
                allStudent: false,
                // 要通知的班级Id
                class: [],
                // 要通知的学生Id
                student: []
            },
            classList: [
                {
                    classId: 15546,
                    className: '舞蹈一班'
                },
                {
                    classId: 15549,
                    className: '口才启蒙班'
                },
                {
                    classId: 15547,
                    className: '艺术团'
                }
            ],
            studentList: [
                {
                    studentId: 452,
                    studentName: '小帅'
                },
                {
                    studentId: 453,
                    studentName: '小胡'
                },
                {
                    studentId: 454,
                    studentName: '小王'
                }
            ]
        };
    },
    methods: {
        addNotification() {
            if (!this.form.desc) {
                this.$message.error('请输入通知内容');
                return;
            }
            if (!this.form.day || !this.form.time) {
                this.$message.error('请选择通知发送时间');
                return;
            }
            if (
                !this.form.allStudent &&
                this.form.class.length == 0 &&
                this.form.student.length == 0
            ) {
                this.$message.error('请选择要发送的班级或者同学');
                return;
            }
            console.log(this.form);
            this.$message({
                message: '已成功添加通知',
                type: 'success'
            });
        }
    }
};
</script>
<style lang="less" >
.notification {
    width: 700px;
    margin: 0 auto;
    .el-transfer-panel__item .el-checkbox__input {
        left: 20px;
    }
}
</style>

