<template>
  <div class="lesson-list">
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
  </div>
</template>
<script>
export default {
    data() {
        return {
            lesson: [
                {
                    lessonId: 123,
                    lessonName: '形体课1班',
                    teacherName: '余老师',
                    time: ['周二/10:00-12:00'],
                    location: ['C教室']
                },
                {
                    lessonId: 123,
                    lessonName: '形体课2班',
                    teacherName: '刘老师',
                    time: ['周一/17:30-19:00', '周二/10:00-12:00'],
                    location: ['F教室', 'D教室']
                }
            ]
        };
    },
    methods: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
    }
};
</script>
<style lang="less">

</style>

