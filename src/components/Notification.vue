<template>
    <div class="notification">
        <h1>发送通知</h1>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="选择校区">
                <el-select v-model="school" placeholder="请选择要查看的校区" class="school-select">
                    <el-option v-for="(item,index) in schoolList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="通知内容">
                <el-select v-model="form.code" placeholder="请选择要发送的通知" class="content">
                    <el-option v-for="(item,index) in templateList" :key="index" :label="item.content" :value="item.code">
                    </el-option>
                </el-select>
                <el-button type="primary" class="add-content" @click="showAdd">添加模板</el-button>
            </el-form-item>
            <el-form-item label="添加模板" v-show="showAddTemplate" class="add-template">
                <el-input type="textarea" :rows="2" placeholder="请输入要添加的模板" v-model="template.content">
                </el-input>
                <el-input type="input" placeholder="请输入模板id" v-model="template.code">
                </el-input>
                <el-button type="primary" class="add-btn" @click="addSmsTemplate">立即添加模板</el-button>
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
            <el-form-item label="按班级" v-show="form.type == '1'">
                <el-transfer :props="{key: 'id',label: 'name'}" v-model="form.data" :data="lessonList" :titles="['班级列表','通知的班级']" class="select-item"></el-transfer>
            </el-form-item>
            <el-form-item label="按学生" v-show="form.type =='2'">
                <!-- <el-transfer :props="{key: 'studentId',label: 'studentName'}" v-model="form.student" :data="studentList" :titles="['学生列表','通知的学生']" class="select-item" filterable :filter-method="filterMethod" filter-placeholder="请输入学生名字"></el-transfer> -->
                <el-transfer :props="{key: 'studentId',label: 'studentName'}" v-model="form.data" :data="studentList" :titles="['学生列表','通知的学生']" filterable :filter-method="filterMethod" filter-placeholder="请输入学生名字" class="select-item"></el-transfer>
            </el-form-item>
            <el-form-item label="操作">
                <el-button class="add-btn" type="primary" @click="addNotification">添加通知</el-button>
                <el-button class="add-btn" type="info">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {
    getSchool,
    addTemplate,
    getTemplate,
    getLesson,
    getStudentInfo,
    addTask
} from '../api/getData1';

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
                    value: 0
                },
                {
                    label: '按班级发送',
                    value: 1
                },
                {
                    label: '按学生发送',
                    value: 2
                }
            ],
            showAddTemplate: false,
            form: {
                // 通知内容
                code: null,
                // 发送日期
                day: null,
                // 具体时间
                time: null,
                // 是否全体发送通知
                type: 1,
                // 要通知的班级Id
                data: []
            },
            lessonList: [],
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
            ],
            template: {
                content: null,
                code: null
            },
            templateList: [],
            schoolList: [],
            school: null
        };
    },
    created() {
        this.getSchoolList();
    },
    watch: {
        school() {
            this.getLessonList();
            this.getStudentList();
        }
    },
    methods: {
        // 获取课程列表
        async getLessonList() {
            const res = await getLesson({
                schoolId: this.school
            });
            if (res.ok) {
                console.log('成功请求课程列表');
                this.lessonList = res.list;
            }
            console.log(res);
        },
        // 搜索框过滤
        filterMethod(query, item) {
            return item.studentName.indexOf(query) > -1;
        },
        // 显示添加模板
        showAdd() {
            this.showAddTemplate = true;
        },
        // 获取模板列表
        async getTemplateList() {
            const res = await getTemplate({
                schoolId: this.school
            });
            if (res.ok) {
                console.log('成功请求模板列表');
                this.templateList = res.list;
            }
        },
        // 添加模板
        async addSmsTemplate() {
            if (!this.template.content) {
                this.$message.error('请输入模板内容');
                return;
            }
            if (!this.template.code) {
                this.$message.error('请输入模板ID');
                return;
            }
            const res = await addTemplate(this.template);
            console.log(res);
            if (res.ok) {
                console.log('成功添加模板');
                this.$message({
                    message: '成功添加模板',
                    type: 'success'
                });
                this.template.content = null;
                this.template.code = null;
                this.showAddTemplate = false;
                this.getTemplateList();
            }
        },
        // 获取校区信息
        async getSchoolList() {
            // 获取校区
            const res = await getSchool();
            if (res.ok) {
                console.log('成功请求校区信息');
                res.list.forEach(element => {
                    var temp = {
                        value: element.id,
                        label: element.name
                    };
                    this.schoolList.push(temp);
                });
                this.school = this.schoolList[0].value;
                this.getTemplateList();
            }
        },
        // 根据校区获取学生列表
        async getStudentList() {
            const res = await getStudentInfo({
                schoolId: this.school
            });
            if (res.ok) {
                this.studentList = [];
                console.log('成功获取学生列表');
                res.list.forEach(item => {
                    const temp = {
                        studentId: item.id,
                        studentName: item.name
                    };
                    this.studentList.push(temp);
                });
            }
        },
        // 添加通知
        async addNotification() {
            if (!this.form.code) {
                this.$message.error('请选择通知内容');
                return;
            }
            if (!this.form.day || !this.form.time) {
                this.$message.error('请选择通知发送时间');
                return;
            }
            if (this.form.type != 0 && this.form.data.length == 0) {
                this.$message.error('请选择要发送的班级或者同学');
                return;
            }
            const res = await addTask(this.form);
            console.log(res);
            if (res.ok) {
                console.log('成功添加了通知');
                this.$message({
                    message: '已成功添加通知',
                    type: 'success'
                });
            }
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
        width: 500px;
        margin-right: 18px;
    }
    .add-content {
        width: 95px;
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
    .select-item {
        margin-bottom: 20px;
        margin-left: 20xp;
    }
    .add-btn {
        width: 200px;
        margin-right: 20px;
    }
    .school-select {
        width: 615px;
    }
    .add-template {
        .el-input,
        .el-textarea {
            margin-bottom: 20px;
        }
    }
}
</style>

