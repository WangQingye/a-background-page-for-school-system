<template>
    <div class="student-add-class">
        <el-dialog :title="'添加课程'" :before-close="close" :show-close="false" :visible.sync="dialogVisible" width="500px">
            <el-form class="account-dialog" ref="addClassForm" :model="addClassForm" label-width="150px" width="300px">
                <el-form-item label="学生姓名" prop="student">
                    <span>{{addClassForm.student}}</span>
                </el-form-item>
                <el-form-item label="剩余课时" prop="leftClass">
                    <span>{{addClassForm.leftClass}}</span>
                </el-form-item>
                <el-form-item label="要添加的课程课时" prop="singleClass">
                    <el-input-number v-model="addClassForm.singleClass" :min="1" :max="addClassForm.leftClass" label="课程课时"></el-input-number>
                </el-form-item>
                <el-form-item label="选择课程" prop="repassword">
                    <el-select v-model="addClassForm.className" placeholder="请选择课程">
                        <el-option label="课程1" value="1"></el-option>
                        <el-option label="课程2" value="2"></el-option>
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
          student: "王小虎",
          leftClass: 64,
          singleClass: 16,
          className: "课程1"
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submitAddClass() {
      console.log("请求添加课程数据");
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
