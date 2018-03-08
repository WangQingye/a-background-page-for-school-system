<template>
    <div class="add-class">
        <h1 class="title">添加课程</h1>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="校区选择">

                <el-select class="select" v-model="form.schoolId" placeholder="请选择校区">
                    <el-option v-for="item in school" :label="item.label" :key="item.id" :value="item.value">
                    </el-option>
                </el-select>

                <el-button class="add" type="primary" @click="showAddSchool">添加校区</el-button>

            </el-form-item>
            <el-form-item label="添加校区" v-if="showSchool">

                <el-input class="select" v-model="schoolNeedAdd" placeholder="请输入要添加的校区名称"></el-input>

                <el-button class="add" type="primary" @click="addSchoolItem">确认添加</el-button>

            </el-form-item>
            <el-form-item label="课程名称" prop="class">
                <el-input class="lesson" v-model="form.name" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item :label="'时间地点' +(index+1)" v-for="(item,index) of  form.schedule" :key="index">

                <el-select class="weekday" v-model="item.weekday" placeholder="周几">
                    <el-option label="周一" value="1"></el-option>
                    <el-option label="周二" value="2"></el-option>
                    <el-option label="周三" value="3"></el-option>
                    <el-option label="周四" value="4"></el-option>
                    <el-option label="周五" value="5"></el-option>
                    <el-option label="周六" value="6"></el-option>
                    <el-option label="周日" value="7"></el-option>
                </el-select>

                <el-time-select class="time" placeholder="起始时间" v-model="item.startTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '24:00'
    }">
                </el-time-select>

                <el-time-select class="time" placeholder="结束时间" v-model="item.endTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '24:00',
      minTime: form.startTime
    }">
                </el-time-select>

                <el-input class="location" v-model="item.location" placeholder="如:A教室"></el-input>

                <!-- <el-col :span="2">-</el-col>
                <el-col :span="2">
                    <el-button type="danger" @click="removeTime(index)">删除</el-button>
                </el-col> -->
            </el-form-item>
            <el-form-item label="教师名字" prop="teacher">
                <el-input class="teacher" v-model="form.teacherName" placeholder="请输入教师名字"></el-input>
            </el-form-item>

            <el-form-item label="操作">
                <el-button class="add-lesson" type="primary" @click="submitClass">立即添加</el-button>
                <!-- <el-col :span="6">
                    <el-button type="primary" @click="addMoreTime">添加更多时间地点</el-button>
                </el-col> -->
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
import { addClass, getSchool, addSchool } from '../api/getData1';
export default {
    data() {
        return {
            showSchool: false,
            schoolNeedAdd: null,
            school: [],
            form: {
                schoolId: null,
                schedule: [
                    {
                        weekday: '1',
                        startTime: null,
                        endTime: null,
                        location: null
                    }
                ],
                name: null,
                teacherName: null
            }
        };
    },
    async created() {
        // console.log(this.$route.query);
        this.getQuery();
        // 获取校区列表
        const res = await getSchool();
        res.list.forEach(element => {
            var temp = {
                value: element.id,
                label: element.name,
                id: element.id
            };

            this.school.push(temp);
        });
    },
    watch: {
        $route: 'getQuery'
    },
    methods: {
        getQuery() {
            let routerQuery = this.$route.query;
            console.log(routerQuery);
            if (routerQuery && routerQuery.weekday) {
                if (this.form.schedule.length > 1) {
                    this.form.schedule.push(routerQuery);
                } else {
                    this.form.schedule.splice(0, 1, routerQuery);
                }
            }
        },
        // 提交课程
        async submitClass() {
            if (!this.form.schoolId) {
                this.$message.error('请选择相应校区');
                return;
            }
            if (!this.form.name) {
                this.$message.error('请输入课程名称');
                return;
            }
            if (!this.form.teacherName) {
                this.$message.error('请输入教师姓名');
                return;
            }
            const res = await addClass(this.form);

            if (res.ok) {
                this.$message({
                    message: '已成功添加课程',
                    type: 'success'
                });
            } else {
                this.$message.error(res.errorMsg);
            }
        },
        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 是否显示添加校区
        showAddSchool() {
            this.showSchool = true;
        },
        // 添加校区
        async addSchoolItem() {
            if (!this.schoolNeedAdd) {
                this.$message({
                    message: '请输入校区名称',
                    type: 'error'
                });
                return;
            }
            const res = await addSchool({
                name: this.schoolNeedAdd
            });
            if (res.ok) {
                this.school.push({
                    value: this.schoolNeedAdd,
                    label: this.schoolNeedAdd
                });
                this.$message({
                    message: '已成功添加校区',
                    type: 'success'
                });
                this.showSchool = false;
            }
        },
        addMoreTime() {
            this.form.schedule.push({
                week: '周一',
                startTime: null,
                endTime: null,
                location: null
            });
        },
        removeTime(index) {
            if (this.form.schedule.length > 1) {
                this.form.schedule.splice(index, 1);
            }
        }
    }
};
</script>
<style lang="less" >
.weekday {
    width: 100px;
    margin-right: 20px;
}
.time {
    width: 100px;
    margin-right: 20px;
}
.location {
    width: 164px;
}
.add {
    width: 151px;
}
.select {
    width: 400px;
    margin-right: 20px;
}
.lesson,
.teacher {
    width: 574px;
}
.add-lesson {
    width: 200px;
    margin-left: 180px;
}
.add-class {
    width: 700px;
    margin: 0 auto;
    .el-date-editor {
        width: 120px;
    }
}
</style>
