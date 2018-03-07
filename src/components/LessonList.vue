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
            <el-table-column prop="time" label="上课时间" width="180">
                <template slot-scope="scope">
                    <p v-for="(item,index) of scope.row.time" :key="index">{{item}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="location" label="上课地点">
                <template slot-scope="scope">
                    <p v-for="(item,index) of scope.row.location" :key="index">{{item}}</p>
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
import { getSchool } from '../api/getData1';

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
                    time: ['周二/10:00-12:00'],
                    location: ['C教室']
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
            console.log(val);
        }
    },
    methods: {
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
                    value: element.name,
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

