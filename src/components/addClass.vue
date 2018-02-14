<template>
    <div class="add-class">
        <h1 class="title">添加课程</h1>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="校区选择">
                <el-col :span="8">
                    <el-select v-model="form.schoolName" placeholder="请选择校区">
                        <el-option v-for="item in school" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="5" v-if="!showSchool">
                    <el-button type="primary" @click="showAddSchool">添加校区</el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="添加校区" v-if="showSchool">
                <el-col :span="10">
                    <el-input v-model="schoolNeedAdd" placeholder="请输入要添加的校区名称"></el-input>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="addSchool">确认添加</el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="课程名称" required prop="class">
                <el-input v-model="form.className" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item :label="'时间地点' +(index+1)" v-for="(item,index) of  form.timeLoactions" :key="index">
                <el-col :span="3">
                    <el-select v-model="item.week" placeholder="周几">
                        <el-option label="周一" value="周一"></el-option>
                        <el-option label="周二" value="周二"></el-option>
                        <el-option label="周三" value="周三"></el-option>
                        <el-option label="周四" value="周四"></el-option>
                        <el-option label="周五" value="周五"></el-option>
                        <el-option label="周六" value="周六"></el-option>
                        <el-option label="周日" value="周日"></el-option>
                    </el-select>
                </el-col>

                <el-col :span="5">
                    <el-time-select placeholder="起始时间" v-model="item.startTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '24:00'
    }">
                    </el-time-select>
                </el-col>

                <el-col :span="5">
                    <el-time-select placeholder="结束时间" v-model="item.endTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '24:00',
      minTime: form.startTime
    }">
                    </el-time-select>
                </el-col>

                <el-col :span="6">
                    <el-input v-model="item.location" placeholder="如:A教室"></el-input>
                </el-col>
                <el-col :span="2">-</el-col>
                <el-col :span="2">
                    <el-button type="warning" @click="removeTime(index)">删除</el-button>
                </el-col>
            </el-form-item>
            <el-form-item label="教师名字" prop="teacher" required>
                <el-input v-model="form.teacherName" placeholder="请输入教师名字"></el-input>
            </el-form-item>

            <el-form-item>
                <el-col :span="5">
                    <el-button type="primary" @click="submitClass">立即添加</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="addMoreTime">添加更多时间地点</el-button>
                </el-col>
            </el-form-item>
        </el-form>

    </div>
</template>
<script>
export default {
    data() {
        return {
            showSchool: false,
            schoolNeedAdd: null,
            school: [
                {
                    value: '天府校区',
                    label: '天府校区'
                },
                {
                    value: '锦江校区',
                    label: '锦江校区'
                }
            ],
            form: {
                schoolName: '天府校区',
                timeLoactions: [
                    {
                        week: '周一',
                        startTime: null,
                        endTime: null,
                        location: null
                    }
                ],
                className: null,
                teacherName: null
            }
        };
    },
    created() {
        console.log(this.$route.query);
        this.getQuery();
    },
    watch: {
        $route: 'getQuery'
    },
    methods: {
        getQuery() {
            let routerQuery = this.$route.query;
            if (routerQuery && routerQuery.week) {
                if (this.form.timeLoactions.length > 1) {
                    this.form.timeLoactions.push(routerQuery);
                } else {
                    this.form.timeLoactions.splice(0, 1, routerQuery);
                }
            }
        },
        // 提交课程
        submitClass() {
            this.$message({
                message: '已成功添加课程',
                type: 'success'
            });
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
        addSchool() {
            if (!this.schoolNeedAdd) {
                this.$message({
                    message: '请输入校区名称',
                    type: 'error'
                });
                return;
            }
            this.school.push({
                value: this.schoolNeedAdd,
                label: this.schoolNeedAdd
            });
            this.$message({
                message: '已成功添加校区',
                type: 'success'
            });
            this.showSchool = false;
        },
        addMoreTime() {
            this.form.timeLoactions.push({
                week: '周一',
                startTime: null,
                endTime: null,
                location: null
            });
        },
        removeTime(index) {
            if (this.form.timeLoactions.length > 1) {
                this.form.timeLoactions.splice(index, 1);
            }
        }
    }
};
</script>
<style lang="less" >
.add-class {
    width: 700px;
    margin: 0 auto;
    .el-date-editor {
        width: 120px;
    }
}
</style>
