<template>
    <div class="lesson-list">
        <el-select v-model="school" placeholder="请选择要查看的校区" class="school-select">
            <el-option v-for="(item,index) in schoolList" :key="index" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <h1>课程列表</h1>
        <el-table :data="lesson" style="width: 100%">
            <el-table-column prop="lessonName" label="课程名称" width="180">
            </el-table-column>
            <el-table-column prop="schedules" label="上课时间与地点" width="380">
                <template slot-scope="scope">
                    <p v-for="(item,index) of scope.row.schedules" :key="index">{{item}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="teacherName" label="教师名字">
            </el-table-column>
            <el-table-column prop="teacherName" label="操作">
                <template slot-scope="scope">
                    <el-button @click="showClassDetail(scope.$index)" type="text" size="small">
                        查看详情
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <classDetail @close="closeDetail" :dialogVisible="dialogVisible" :lessonId="lessonId"></classDetail>
    </div>
</template>
<script>
import ClassDetail from './subpages/ClassDetail';
import { getSchool, getList } from '../api/getData1';

export default {
    components: {
        ClassDetail
    },
    data() {
        return {
            dialogVisible: false,
            lessonId: null,
            school: null,
            schoolList: [],
            lesson: [
                {
                    lessonId: '123',
                    lessonName: '形体课1班',
                    teacherName: '余老师',
                    schedules: ['周一 / 08:00-09:00 / A教室']
                }
            ]
        };
    },
    created() {
        this.getSchoolList();
    },
    watch: {
        school(val) {
            // this.getClass();
            this.getLessonList();
        },
        $route() {
            this.getLessonList();
        }
    },
    methods: {
        async getLessonList() {
            const res = await getList({
                schoolId: this.school
            });
            if (res.ok) {
                console.log('成功请求课程列表');
                this.lesson = res.list;
            }
            console.log(res);
        },
        showClassDetail(index) {
            this.lessonId = this.lesson[index].lessonId;
            this.dialogVisible = true;
        },
        closeDetail() {
            this.dialogVisible = false;
        },
        async getSchoolList() {
            // 获取校区
            const res = await getSchool();
            res.list.forEach(element => {
                var temp = {
                    value: element.id,
                    label: element.name
                };
                this.schoolList.push(temp);
            });
            this.school = this.schoolList[0].value;
        }
    }
};
</script>
<style lang="less">
.school-select {
    width: 900px;
    margin: 20px auto;
}
</style>

