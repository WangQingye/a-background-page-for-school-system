<template>
    <div class="student-attendance">
        <h1>课程出勤记录</h1>
        <el-table :data="students" style="width: 100%">
            <el-table-column align="center" prop="studentName" label="学生姓名" width="180">
            </el-table-column>
            <el-table-column prop="status" label="出勤情况" width="180">
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button @click="changeStudentStatus(scope.$index)" type="text" size="small">
                        修改出勤状态
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
                    status: '正常'
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
    methods: {
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
</style>
