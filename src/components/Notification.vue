<template>
    <div class="notification">
        <h1>发送通知</h1>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="通知内容">
                <el-select v-model="form.content" placeholder="请选择要发送的通知" class="content">
                    <el-option v-for="(item,index) in contentList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="发送时间">
                <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.day" class="day"></el-date-picker>
                <el-time-select v-model="form.time" :picker-options="{start: '08:30',step: '00:15',end: '24:00'}" placeholder="选择时间" class="time">
                </el-time-select>
            </el-form-item>
            <el-form-item label="发送方式">
                <el-select v-model="form.type" placeholder="请选择要发送方式" class="type">
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="按班级" v-show="form.type == '2'">
                <el-transfer  :props="{key: 'classId',label: 'className'}" v-model="form.class" :data="classList" :titles="['班级列表','通知的班级']" class="select-item"></el-transfer>
            </el-form-item>
            <el-form-item label="按学生" v-show="form.type =='3'">
                <el-transfer  :props="{key: 'studentId',label: 'studentName'}" v-model="form.student" :data="studentList" :titles="['学生列表','通知的学生']" class="select-item"></el-transfer>
            </el-form-item>
            <el-form-item>
                <el-button class="add-btn" type="primary" @click="addNotification">添加通知</el-button>
                <el-button class="add-btn" type="info">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            contentList: [
                {
                    value: '1',
                    label: '尊敬的家长。。。。。。。'
                },
                {
                    value: '2',
                    label: '尊敬的家长。。。。。。。'
                },
                {
                    value: '3',
                    label: '尊敬的家长。。。。。。。'
                }
            ],
            typeList: [
                {
                    label: '全体发送',
                    value: 1
                },
                {
                    label: '按班级发送',
                    value: 2
                },
                {
                    label: '按学生发送',
                    value: 3
                }
            ],
            form: {
                // 通知内容
                content: null,
                // 发送日期
                day: null,
                // 具体时间
                time: null,
                // 是否全体发送通知
                type: 1,
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
    .content {
        width: 615px;
    }
    .day {
        width: 392px;
        margin-right: 20px;
    }
    .time {
        width: 200px;
    }
    .type {
        width: 615px;
    }
    .select-item{
        margin-bottom:20px;
        margin-left:20xp;
    }
    .add-btn{
        width:200px;
        margin-right:20px;
    }
}
</style>

