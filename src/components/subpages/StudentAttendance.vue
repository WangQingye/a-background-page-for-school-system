<template>
    <div class="student-attendance">
        <el-dialog class="detail-dialog" title="出勤记录" :visible.sync="showAttendance" width="1200px" :before-close="close" @open="openAttendance">
            <h1>课程出勤记录</h1>
            <el-table :data="students" style="width: 100%">
                <el-table-column align="center" prop="studentName" label="学生姓名" width="180">
                </el-table-column>
                <el-table-column label="出勤情况" width="180">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.type === '缺席'" :type="'danger'">{{ scope.row.type }}</el-tag>
                        <el-tag v-if="scope.row.type === '已上'" :type="'success'">{{ scope.row.type }}</el-tag>
                        <el-tag v-if="scope.row.type === '请假'" :type="'warning'">{{ scope.row.type }}</el-tag>
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

        <el-dialog class="status-dialog" title="学生出勤状况" :visible.sync="showStatus" width="400px" :before-close="closeStatus" @open="openStatus">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="学生姓名">
                    <span>{{studentName}}</span>
                </el-form-item>
                <!-- <el-form-item label="课程名称">
                    <span>舞蹈课</span>
                </el-form-item>
                <el-form-item label="上课时间">
                    <span>2018-03-28</span>
                </el-form-item> -->
                <el-form-item label="出勤状态">
                    <el-select v-model="form.type" placeholder="请选择出勤状态">
                        <el-option label="已上" value="1"></el-option>
                        <el-option label="请假" value="2"></el-option>
                        <el-option label="缺席" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作">
                    <el-button type="primary" @click="submitStudentStatus">修改出勤状态</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>
<script>
import StudentDetail from './StudentDetail.vue';
import { getStudent, changeStudent } from '../../api/getData1';
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
            students: [],
            studentName: null,
            showStatus: false,
            form: {
                type: '正常',
                id: null
            }
        };
    },
    components: {
        StudentDetail
    },
    methods: {
        // 关闭弹窗
        close() {
            this.$emit('close');
        },
        // 打开弹窗
        openAttendance() {
            this.getStudentAttendance();
        },
        async getStudentAttendance() {
            const res = await getStudent(this.lesson);
            console.log(res);
            if (res.ok) {
                console.log('成功请求学生出勤接口');
                this.students = res.list;
            }
        },
        closeDetail() {
            this.dialogVisible = false;
        },
        // 打开学生详情
        openStudentDetail(index) {
            this.studentId = this.students[index].studentId;
            console.log(this.studentId);
            this.dialogVisible = true;
        },
        closeStatus() {
            this.showStatus = false;
        },
        openStatus() {
            console.log('已经打开学生状态');
        },
        // 更改学生出勤状态
        changeStudentStatus(index) {
            console.log(this.students[index]);
            this.form.type = this.students[index].type;
            this.form.id = this.students[index].id;
            this.studentName = this.students[index].studentName;
            this.showStatus = true;
        },
        async submitStudentStatus() {
            const res = await changeStudent(this.form);
            if (res.ok) {
                console.log('成功修改上课状态');
                this.getStudentAttendance();
                this.showStatus = false;
                this.$message({
                    showClose: true,
                    message: '成功修改学生状态',
                    type: 'success'
                });
            }
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
