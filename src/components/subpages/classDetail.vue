<template>
    <div class="class-detail">
        <el-dialog class="detail-dialog" title="课程详情" :visible.sync="dialogVisible" width="1200px" :before-close="close" @open="openDetail">
            <el-tabs v-model="activeName">
                <el-tab-pane label="课程记录" name="first">
                    <el-table :data="history" style="width: 100%">
                        <el-table-column prop="date" label="上课日期" width="180">
                        </el-table-column>
                        <el-table-column prop="timeRange" label="上课时间" width="180">
                        </el-table-column>
                        <el-table-column prop="lessonName" label="课程名称" width="300">
                        </el-table-column>
                        <el-table-column prop="type" label="上课状态" width="120">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.type === '待上'" :type="'success'">{{ scope.row.type }}</el-tag>
                                <el-tag v-if="scope.row.type === '已上'" :type="'info'">{{ scope.row.status }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.type === '已上'" @click="showClassDetail(scope.$index)" type="text" size="small">
                                    查看详情
                                </el-button>
                                <el-button v-if="scope.row.type === '待上'" @click="suspendLesson(scope.$index)" type="text" size="small">
                                    停课
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination ref="paginat" background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="修改课程" name="second">
                    <div class="change-class">
                        <div class="add-class">
                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="所属校区">
                                    <span>{{school}}</span>
                                </el-form-item>
                                <el-form-item label="课程名称" prop="class">
                                    <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
                                </el-form-item>
                                <el-form-item class="lesson-time" :label="'时间地点' +(index+1)" v-for="(item,index) of  form.schedule" :key="index">
                                    <el-col>
                                        <el-select v-model="item.weekday" placeholder="周几" class="select">
                                            <el-option label="周一" value="1"></el-option>
                                            <el-option label="周二" value="2"></el-option>
                                            <el-option label="周三" value="3"></el-option>
                                            <el-option label="周四" value="4"></el-option>
                                            <el-option label="周五" value="5"></el-option>
                                            <el-option label="周六" value="6"></el-option>
                                            <el-option label="周日" value="7"></el-option>
                                        </el-select>
                                    </el-col>

                                    <el-col>
                                        <el-time-select placeholder="起始时间" v-model="item.startTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '24:00'
    }">
                                        </el-time-select>
                                    </el-col>

                                    <el-col>
                                        <el-time-select placeholder="结束时间" v-model="item.endTime" :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '24:00',
      minTime: form.startTime
    }">
                                        </el-time-select>
                                    </el-col>

                                    <el-col>
                                        <el-input class="location" v-model="item.location" placeholder="如:A教室"></el-input>
                                    </el-col>
                                    <el-col>
                                        <el-button type="danger" @click="removeTime(index)">删除</el-button>
                                    </el-col>
                                </el-form-item>
                                <el-form-item label="教师名字" prop="teacher">
                                    <el-input v-model="form.teacherName" placeholder="请输入教师名字"></el-input>
                                </el-form-item>

                                <el-form-item label="操作">
                                    <el-col :span="4">
                                        <el-button type="primary" @click="changeClass">修改课程</el-button>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button type="primary" @click="addMoreTime">添加更多时间地点</el-button>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button type="danger" @click="delClassItem">删除课程</el-button>
                                    </el-col>
                                </el-form-item>
                            </el-form>

                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <student-attendance :showAttendance="showAttendance" :lesson="lesson" @close="closeAttendance"></student-attendance>
    </div>
</template>
<script>
import {
    getClassInfo,
    addClass,
    addSchool,
    delClass,
    getHistory
} from '../../api/getData1';
import StudentAttendance from '../subpages/StudentAttendance';
export default {
    components: {
        StudentAttendance
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        lessonId: {
            type: String,
            default: '0'
        }
    },
    data() {
        return {
            count: 100,
            currentPage: 1,
            showAttendance: false,
            activeName: 'first',
            history: [],
            school: null,
            lesson: {
                lessonId: null,
                startTime: null
            },
            form: {
                schedule: [
                    {
                        weekday: null,
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
    methods: {
        suspendLesson(index) {
            console.log(this.history[index]);
        },
        async getClassHistory() {
            const res = await getHistory({
                lessonId: this.lessonId,
                page: this.currentPage - 1
            });
            if (res.ok) {
                console.log('成功请求课程记录');
                this.count = res.count;
                this.history = res.list;
                console.log(this.history);
            }
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        closeAttendance() {
            this.showAttendance = false;
        },
        async delClassInfo() {
            const res = await delClass({
                id: this.lessonId
            });
            console.log(res);
            if (res.ok) {
                this.$message({
                    message: '已成功删除课程',
                    type: 'success'
                });
            }
        },
        delClassItem() {
            this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.delClassInfo();
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        async getInfo() {
            const info = await getClassInfo({
                id: this.lessonId
            });
            this.form = info.data;
            this.school = info.data.school;
            console.log('成功获取课程信息');
        },

        openDetail() {
            this.getInfo();
            this.getClassHistory();
        },
        close() {
            this.$emit('close');
        },
        showClassDetail(index) {
            console.log(index);
            this.showAttendance = true;
            this.lesson = {
                lessonId: this.history[index].lessonId,
                startTime: this.history[index].startTime
            };
        },
        async changeClass() {
            this.form.lessonId = this.lessonId;
            const res = await addClass(this.form);
            console.log(res);
            if (res.ok) {
                this.$message({
                    type: 'success',
                    message: '成功修改课程'
                });
            } else {
                this.$message.error(res.errorMsg);
            }
        },
        // 修改课程
        submitChangeClass() {
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
            this.$confirm('此操作将修改该课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.changeClass();
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
        addMoreTime() {
            this.form.schedule.push({
                weekday: '1',
                startTime: null,
                endTime: null,
                location: null
            });
        },
        removeTime(index) {
            if (this.form.schedule.length > 1) {
                this.form.schedule.splice(index, 1);
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
.lesson-time > div {
    display: flex;
    .el-col {
        margin-right: 20px;
    }
    .el-date-editor.el-input,
    .location,
    .select {
        width: 140px;
    }
}
.class-detail {
    padding-left: 20px;

    th div {
        text-align: center;
    }
}
.change-class {
    width: 790px;
    margin: 20px auto 0;
}
</style>
