<template>
  <div class="add-student">
    <p class="text">添加学员</p>
    <el-steps ref="steps" :active="stepNum" simple style="margin: 50px auto;width:600px">
      <el-step title="录入学生信息" icon="el-icon-edit"></el-step>
      <el-step title="添加课程" icon="el-icon-tickets"></el-step>
      <el-step title="完成添加" icon="el-icon-success"></el-step>
    </el-steps>
    <!-- 添加基础信息表格 -->
    <el-form ref="addInfoForm" :rules="rules" :model="addInfoForm" label-width="120px" label-position="left" class="add-form" v-show="addInfoShow">
      <el-form-item label="学员姓名" prop="name">
        <el-input v-model="addInfoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="家长联系方式" prop="phone">
        <el-input v-model="addInfoForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="校区">
        <el-select v-model="addInfoForm.schoolId" placeholder="请选择校区">
          <el-option v-for="(school,index) in schoolList" :key="index" :label="school.name" :value="school.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="充值课时" prop="lessonNum">
        <el-input-number v-model="addInfoForm.lessonNum" :min="0" :max="1000" label="第一次充值课时"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitInfoAdd">完成，去录入课程</el-button>
        <el-button @click="resetInfoForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加课程表格 -->
    <el-form class="account-dialog" ref="addClassForm" :model="addClassForm" label-width="150px" width="800px" v-show="addClassShow">
      <el-form-item label="学生姓名" prop="name">
        <span>{{addClassForm.name}}</span>
      </el-form-item>
      <el-form-item label="可用课时" prop="balanceNum">
        <span>{{addClassForm.balanceNum}}</span>
      </el-form-item>
      <el-form-item label="要添加的课程课时" prop="pass">
        <el-input-number v-model="singleClass" :min="1" :max="addClassForm.leftClass" label="课程课时"></el-input-number>
      </el-form-item>
      <el-form-item label="选择课程" prop="repassword">
        <el-select v-model="className" placeholder="请选择课程">
          <el-option v-for="(cls,index) in classList" :key="index" :label="cls.name" :value="cls.id"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left:10px" @click="addOneClass">添加</el-button>
      </el-form-item>
      <el-form-item label="已选择" prop="leftClass">
        <span v-for="(classname, index) in addClasses" :key="index" class="class-name">{{classname}}</span>
      </el-form-item>
      <el-form-item label="添加后剩余课时" prop="leftClass">
        <span>{{afterAddClassLeft}}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="finishAdd">完成</el-button>
        <el-button @click="cancelAdd">取消添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加完成继续添加 -->
    <div v-show="addSuccessShow">
      <div style="font-size:20px;margin:150px 0 100px 0">
        <i class="el-icon-success"> 添加成功！</i>
      </div>
      <el-button type="primary" @click="goOnAdd">继续添加</el-button>
      <el-button @click="goToStudentList">返回列表</el-button>
    </div>
    <!-- <student-add-class @close="addClassShow = false" :dialogVisible="addClassShow"></student-add-class> -->
  </div>
</template>



<script>
import StudentAddClass from "./com/StudentAddClass.vue";
import StudentDetail from "./subpages/StudentDetail.vue";
import Bus from '../utils/bus'; 
import {
  getSchools,
  addStudentInfo,
  getClassList,
  delStudent,
  addClassToStudent
} from "../api/getData";
export default {
  data() {
    return {
      addInfoForm: {
        name: "",
        phone: "",
        schoolId: "1",
        lessonNum: ""
      },
      rules: {
        name: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入家长联系方式", trigger: "blur" }]
      },
      // 添加信息成功服务器后的学生信息
      addClassForm: {},
      singleClass: 16,
      className: "",
      addClasses: [],
      stepNum: 0,
      addInfoShow: true,
      addClassShow: false,
      addSuccessShow: false,
      schoolList: [],
      classList: [],
      afterAddClassLeft: 0
    };
  },
  mounted() {
    this.getSchoolList();
  },
  methods: {
    async getSchoolList() {
      let res = await getSchools();
      this.log("获取学校列表", res.ok);
      if (res.ok) this.schoolList = res.list;
    },
    async getSchoolClasses(schoolId) {
      let res = await getClassList({ schoolId: schoolId });
      this.log(`获取校区${schoolId}课程`, res.ok);
      console.log(res);
      if (res.ok) {
        // 复制一次，因为添加了课程后会删除
        this.classList = JSON.parse(JSON.stringify(res.list));
      }
    },
    async submitInfoAdd() {
      this.$refs.addInfoForm.validate(async valid => {
        if (valid) {
          let res = await addStudentInfo(this.addInfoForm);
          this.log("添加学员信息", res.ok);
          console.log(res);
          if (res.ok) {
            this.$message({
              type: "success",
              message: "录入成功"
            });
            this.addClassForm = res;
            this.afterAddClassLeft = res.balanceNum;
            this.getSchoolClasses(this.addInfoForm.schoolId);
            this.addInfoShow = false;
            this.addClassShow = true;
            this.stepNum = 1;
          } else {
            this.$message({
              type: "error",
              message: res.errorMsg
            });
            return false;
          }
        }
      });
    },
    /* 现在课程只一门一门的添加 */
    async addOneClass() {
      if (this.afterAddClassLeft - this.singleClass < 0) {
        this.$message.error("剩余课时不够添加这些课程哦");
        return;
      }
      let res = await addClassToStudent({
        studentId: this.addClassForm.id,
        lessonId: this.className,
        num: this.singleClass
      });
      this.log(`为${this.addClassForm.id}学员添加${this.className}课程`, res.ok);
      console.log(res);
      if (res.ok) {
        // 扣除课时
        this.afterAddClassLeft -= this.singleClass;
        // 放入已选择课程
        this.addClasses.push(
          this.switchIdorName(this.className, this.classList, "id") +
            " - " +
            this.singleClass +
            "课时"
        );
        // 添加后将之从课程列表中删除
        this.classList.splice(
          this.classList.findIndex(item => {
            return item.id == this.className;
          }),
          1
        );
        // 重置选择器
        this.className = "";
      } else {
        this.$message.error("添加失败");
      }
    },
    /* 完成添加 */
    finishAdd() {
      this.$message({
        type: "success",
        message: "添加成功"
      });
      this.addSuccessShow = true;
      this.addClassShow = false;
      this.stepNum = 2;
      Bus.$emit('refreshStudentList');      
    },
    /* 取消添加 */
    async cancelAdd() {
      //因为在上一步其实已经实际添加了学生，所以如果在这里取消，需要删除学生
      let res = await delStudent({ id: this.addClassForm.id });
      this.log(`删除学生${this.addClassForm.id}`, res.ok);
      this.addInfoShow = true;
      this.addClassShow = false;
      this.resetInfoForm();
      this.stepNum = 0;
    },
    resetInfoForm() {
      this.$refs.addInfoForm.resetFields();
    },
    goToStudentList() {      
      this.$router.push("/studentList");
      this.goOnAdd();
    },
    goOnAdd() {
      this.$refs.addInfoForm.resetFields();
      this.addInfoShow = true;
      this.addClassShow = false;
      this.addSuccessShow = false;
      this.stepNum = 0;   
    }
  },
  watch: {
    allClass() {
      this.form.restClass = this.form.allClass;
    }
  },
  components: {
    StudentAddClass,
    StudentDetail
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* @import '../style/common.less';   */
.text {
  font-size: 20px;
  font-weight: 600;
}
.add-form {
  width: 700px;
  margin: 0 auto;
}
.el-transfer-panel__item .el-checkbox__input {
  left: 40px;
}
.el-transfer-panel .el-transfer-panel__header {
  padding-left: 0;
}
.class-overplus {
  margin: 0;
  font-size: 18px;
}
.el-form-item__content {
  text-align: left;
}
.el-transfer {
  text-align: center;
}
.class-name {
  display: block;
}
</style>
