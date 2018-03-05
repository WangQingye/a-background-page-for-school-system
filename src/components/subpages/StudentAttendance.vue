<template>
    <div class="student-attendance">
        <el-dialog class="detail-dialog" title="出勤记录" :visible.sync="showAttendance" width="1200px" :before-close="close" @open="openAttendance">
            <h1>课程出勤记录</h1>
            <el-table :data="students" style="width: 100%">
                <el-table-column align="center" prop="studentName" label="学生姓名" width="180">
                </el-table-column>
                <el-table-column label="出勤情况" width="180">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === '缺席'" :type="'danger'">{{ scope.row.status }}</el-tag>
                        <el-tag v-if="scope.row.status === '正常'" :type="'success'">{{ scope.row.status }}</el-tag>
                        <el-tag v-if="scope.row.status === '请假'" :type="'warning'">{{ scope.row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="changeStudentStatus(scope.$index)" type="text" size="small">
                            修改出勤状态
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="openStudentDetail(scope.$index)" type="text" size="small">
                            查看学生详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-dialog>
        <student-detail @close="closeDetail" :dialogVisible="dialogVisible" :studentId="studentId"></student-detail>

    </div>

</template>
<script>
import StudentDetail from './StudentDetail.vue';

export default {
    props: {
        showAttendance: {
            type: Boolean,
            default: false
        },
        lesson: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            dialogVisible: false,
            studentId: null,
            students: [
                {
                    studentId: 126,
                    studentName: '王小虎',
                    status: '正常'
                },
                {
                    studentId: 126,
                    studentName: '王小虎',
                    status: '缺席'
                },
                {
                    studentId: 126,
                    studentName: '王小虎',
                    status: '请假'
                },
                {
                    studentId: 126,
                    studentName: '王小虎',
                    status: '正常'
                },
                {
                    studentId: 126,
                    studentName: '王小虎',
                    status: '正常'
                }
            ]
        };
    },
    components: {
        StudentDetail
    },
    methods: {
        close() {
            this.$emit('close');
        },
        openAttendance() {},
        closeDetail() {
            this.dialogVisible = false;
        },
        openStudentDetail(index) {
            this.studentId = this.students[index].studentId;
            console.log(this.studentId);
            this.dialogVisible = true;
        },
        changeStudentStatus(index) {
            this.$confirm('确定要修改此学生的出勤状态吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    if (this.students[index].status === '缺席') {
                        this.students[index].status = '正常';
                    } else {
                        this.students[index].status = '缺席';
                    }
                    this.$message({
                        type: 'success',
                        message: '已成功修改出勤状态!'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改操作'
                    });
                });
        }
    }
};
</script>
<style lang="less">
.student-attendance {
    table {
        width: 600px;
        margin: 0 auto;
    }
    th div {
        text-align: center;
    }
}
.absent {
    color: red;
}
</style>
