<template>
  <div class="student-add-class">
    <el-dialog :title="'添加课程'" :before-close="close" :show-close="false" :visible.sync="dialogVisible" width="500px">
      <el-form class="account-dialog" ref="addClassForm" :model="addClassForm" label-width="150px" width="300px" style="text-align:left">
        <el-form-item label="学生姓名" prop="name">
          <span>{{addClassForm.name}}</span>
        </el-form-item>
        <el-form-item label="可用课时" prop="balanceNum">
          <span>{{addClassForm.balanceNum}}</span>
        </el-form-item>
        <el-form-item label="要添加的课程课时" prop="singleClass">
          <el-input-number v-model="addClassForm.singleClass" :min="1" :max="addClassForm.leftClass" label="课程课时"></el-input-number>
        </el-form-item>
        <el-form-item label="选择课程" prop="repassword">
          <el-select v-model="classId" placeholder="请选择课程">
            <el-option v-for="(cls,index) in classList" :key="index" :label="cls.name" :value="cls.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAddClass">确认添加</el-button>
          <el-button @click="close">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getClassList, addClassToStudent } from "../../api/getData";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    addClassForm: {
      type: Object,
      default: function() {
        return {
          name: "王小虎",
          leftClass: 64,
          singleClass: 16,
          className: "课程1"
        };
      }
    }
  },
  data() {
    return {
      classList: [],
      classId: ""
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    /* 添加课程后需要通知父组件刷新数据 */
    notiRefresh(){
      this.$emit("refresh");
    },
    async getClasses() {
      let res = await getClassList({ schoolId: this.addClassForm.schoolId });
      this.log(`获取校区${this.addClassForm.schoolId}课程`, res.ok);
      if (res.ok) {
        // 复制一次，因为添加了课程后会删除
        this.classList = res.list;
      }
    },
    async submitAddClass() {
      console.log({
        studentId: this.addClassForm.studentId,
        lessonId: this.classId,
        num: this.addClassForm.singleClass
      });
      if (this.addClassForm.balanceNum - this.addClassForm.singleClass < 0) {
        this.$message.error("可用课时不够添加这门课程哦");
        return;
      }
      let res = await addClassToStudent({
        studentId: this.addClassForm.studentId,
        lessonId: this.classId,
        num: this.addClassForm.singleClass
      });
      this.log(`为${this.addClassForm.studentId}学员添加${this.classId}课程`, res.ok);
      console.log(res);
      if (res.ok) {
        this.$message({
          type: "success",
          message: "添加课程成功"
        });
        this.close();
        this.notiRefresh();
      }
    }
  },
  watch: {
    // 每次打开需要获取课程列表
    dialogVisible(val) {
      if (val) this.getClasses();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  width: 300px;
  float: right;
  margin-right: 5%;
}
.search-input {
  width: 200px;
}
</style>
