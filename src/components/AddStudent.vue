<template>
  <div class="add-student">
    <p class="text">添加学员</p>
    <el-steps :active="0" simple style="margin: 50px auto;width:600px">
      <el-step title="录入学生信息" icon="el-icon-edit"></el-step>
      <el-step title="添加课程" icon="el-icon-tickets"></el-step>
      <el-step title="完成添加" icon="el-icon-success"></el-step>
    </el-steps>
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
        <!-- <el-input v-model="addInfoForm.lessonNum"></el-input> -->
        <el-input-number v-model="addInfoForm.lessonNum" :min="0" :max="1000" label="第一次充值课时"></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="单个课程课时" prop="singleClass">
        <el-input-number v-model="form.singleClass" :min="0" :max="1000" label="描述文字"></el-input-number>
      </el-form-item> -->
      <!-- <el-form-item label="添加课程"> -->
      <!-- <el-checkbox-group v-model="form.type">
          <el-transfer @change="changeClass" v-model="form.classChoose" :titles="['校区课程', '参加课程']" :data="classData"></el-transfer>
        </el-checkbox-group> -->
      <!-- <el-button type="primary" @click="addClassShow = true">添加课程界面</el-button>
      </el-form-item> -->
      <!-- <el-form-item label="剩余课时" prop="restClass">
        <p class="class-overplus">{{form.restClass}}</p>
      </el-form-item> -->
      <!-- <el-form-item label="其他备注">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitInfoAdd">完成，去录入课程</el-button>
        <el-button @click="resetInfoForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加课程表格 -->
    <el-form class="account-dialog" ref="addClassForm" :model="addClassForm" label-width="150px" width="800px" v-show="addClassShow">
      <el-form-item label="学生姓名" prop="student">
        <span>{{addClassForm.student}}</span>
      </el-form-item>
      <el-form-item label="可用课时" prop="leftClass">
        <span>{{addClassForm.leftClass}}</span>
      </el-form-item>
      <el-form-item label="要添加的课程课时" prop="pass">
        <el-input-number v-model="addClassForm.singleClass" :min="1" :max="addClassForm.leftClass" label="课程课时"></el-input-number>
      </el-form-item>
      <el-form-item label="选择课程" prop="repassword">
        <el-select ref="classSelect" v-model="addClassForm.className" placeholder="请选择课程">
          <el-option label="课程1" value="课程1"></el-option>
          <el-option label="课程2" value="课程2"></el-option>
        </el-select>
        <el-button type="primary" style="margin-left:10px" @click="addOneClass">添加</el-button>
      </el-form-item>
      <el-form-item label="已选择" prop="leftClass">
        <span v-for="(classname, index) in addClasses" :key="index" class="class-name">{{classname}}</span>
      </el-form-item>
      <el-form-item label="添加后剩余课时" prop="leftClass">
        <span>312</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitClassAdd">确认添加</el-button>
        <el-button>取消添加</el-button>
      </el-form-item>
    </el-form>
    <!-- <student-add-class @close="addClassShow = false" :dialogVisible="addClassShow"></student-add-class> -->
  </div>
</template>



<script>
import StudentAddClass from "./com/StudentAddClass.vue";
import StudentDetail from "./subpages/StudentDetail.vue";
import { getSchools, addStudentInfo } from "../api/getData";
export default {
  data() {
    /* 写这里是因为data里面无法使用methods里面的方法 */
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `课程 ${i}`
          // disabled: i % 4 === 0
        });
      }
      return data;
    };
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
      addClassForm: {
        student: "王小虎",
        leftClass: 64,
        singleClass: 16,
        className: ""
      },
      addClasses: [],
      classData: generateData(),
      addInfoShow: true,
      addClassShow: false,
      schoolList: []
    };
  },
  mounted() {
    this.getSchoolList();
  },
  methods: {
    async getSchoolList() {
      let res = await getSchools();
      console.log(res);
      if (res.ok) this.schoolList = res.list;
    },
    async submitInfoAdd() {
      this.$refs.addInfoForm.validate(async valid => {
        if (valid) {
          let res = await addStudentInfo(this.addInfoForm);
          console.log(res);
          if (res.ok) {
            this.$message({
              type: "success",
              message: "录入成功"
            });
            this.addInfoShow = false;
            this.addClassShow = true;
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
    addOneClass() {
      this.addClasses.push(
        this.addClassForm.className +
          " - " +
          this.addClassForm.singleClass +
          "课时"
      );
    },
    submitClassAdd() {},
    changeClass(value, direction, movedKeys) {
      if (this.form.allClass - this.form.classChoose.length * 16 < 0) {
        this.$message.error("您的剩余课时不够添加这些课程哦");
        movedKeys.forEach(key => {
          this.form.classChoose.splice(
            this.form.classChoose.findIndex(value => {
              return value == key;
            })
          );
        }, this);
        return;
      }
      this.form.restClass =
        this.form.allClass - this.form.classChoose.length * 16;
    },
    resetInfoForm() {
      this.$refs.addInfoForm.resetFields();
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
