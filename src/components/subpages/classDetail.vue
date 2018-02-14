<template>
    <div class="class-detail">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="课程记录" name="first">
                <el-table :data="classHistory" style="width: 100%">
                    <el-table-column prop="date" label="上课日期" width="180">
                    </el-table-column>
                    <el-table-column prop="hour" label="上课时间" width="180">
                    </el-table-column>
                    <el-table-column prop="className" label="课程名称" width="300">
                    </el-table-column>
                    <el-table-column prop="status" label="上课状态" width="120">
                    </el-table-column>
                    <el-table-column fixed="right" align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="showClassDetail(scope.$index)" type="text" size="small">
                                查看详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="修改课程" name="second">
                <div class="change-class">
                    <div class="add-class">
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
                                    <el-button type="danger" @click="removeTime(index)">删除</el-button>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="教师名字" prop="teacher" required>
                                <el-input v-model="form.teacherName" placeholder="请输入教师名字"></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-col :span="5">
                                    <el-button type="primary" @click="changeClass">修改课程</el-button>
                                </el-col>
                                <el-col :span="6">
                                    <el-button type="primary" @click="addMoreTime">添加更多时间地点</el-button>
                                </el-col>
                                <el-col :span="8">
                                    <el-button type="danger" @click="removeClass">删除课程</el-button>
                                </el-col>
                            </el-form-item>
                        </el-form>

                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'first',
            classId: 165,
            classHistory: [
                {
                    classId: 44152,
                    date: '2018-02-25',
                    hour: '17:00-18:30',
                    className: '口才课',
                    status: '已上'
                },
                {
                    classId: 44152,
                    date: '2018-02-25',
                    hour: '17:00-18:30',
                    className: '口才课',
                    status: '已上'
                },
                {
                    classId: 44152,
                    date: '2018-02-25',
                    hour: '17:00-18:30',
                    className: '口才课',
                    status: '已上'
                },
                {
                    classId: 44152,
                    date: '2018-02-25',
                    hour: '17:00-18:30',
                    className: '口才课',
                    status: '已上'
                },
                {
                    classId: 44152,
                    date: '2018-02-25',
                    hour: '17:00-18:30',
                    className: '口才课',
                    status: '已上'
                },
                {
                    classId: 44152,
                    date: '2018-02-25',
                    hour: '17:00-18:30',
                    className: '口才课',
                    status: '已上'
                }
            ],
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
                        startTime: '17:30',
                        endTime: '19:00',
                        location: 'E教室'
                    }
                ],
                className: '口才课',
                teacherName: 'Yui老师'
            }
        };
    },
    created() {
        this.getQuery();
    },
    watch: {
        $route: 'getQuery'
    },
    methods: {
        getQuery() {
            let routerQuery = this.$route.query;
            if (routerQuery && routerQuery.week) {
                console.log(routerQuery);
            }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        showClassDetail(index) {
            console.log(index);
            this.$router.push({
                path: '/studentAttendance'
            });
        },
        // 提交课程
        changeClass() {
            this.$confirm('此操作将修改该课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
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
        },
        removeClass() {
            this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
};
</script>
<style lang="less" >
.class-detail {
    padding-left: 20px;

    th div {
        text-align: center;
    }
}
.change-class {
    width: 700px;
    margin: 20px auto 0;
}
</style>
