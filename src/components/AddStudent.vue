<template>
  <div class="add-student">
    <p class="text">添加学员</p>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px" label-position="left" class="add-form">
      <el-form-item label="学员姓名" prop="studentName">
        <el-input v-model="form.studentName"></el-input>
      </el-form-item>
      <el-form-item label="学员家长" prop="parentName">
        <el-input v-model="form.parentName"></el-input>
      </el-form-item>
      <el-form-item label="家长联系方式" prop="parentContact">
        <el-input v-model="form.parentContact"></el-input>
      </el-form-item>
      <el-form-item label="校区">
        <el-select v-model="form.school" placeholder="请选择校区">
          <el-option label="天府校区" value="shanghai"></el-option>
          <el-option label="锦江校区" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="可使用课时" prop="allClass">
        <el-input-number v-model="form.allClass" :min="0" :max="1000" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="单个课程课时" prop="singleClass">
        <el-input-number v-model="form.singleClass" :min="0" :max="1000" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="添加课程">
        <el-checkbox-group v-model="form.type">
          <el-transfer @change="changeClass" v-model="form.classChoose" :titles="['校区课程', '参加课程']" :data="classData"></el-transfer>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="剩余课时" prop="restClass">
        <p class="class-overplus">{{form.restClass}}</p>
      </el-form-item>
      <el-form-item label="其他备注">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
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
      form: {
        studentName: "",
        parentName: "",
        parentContact: "",
        school: "天府校区",
        allClass: 0, // 总充值课程数
        singleClass: 0, // 单个课程的课时
        restClass: 0, // 剩余（未使用）课时数
        classChoose: [], //选择要参加的课时
        type: [],
        desc: ""
      },
      rules: {
        studentName: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
        parentName: [{ required: true, message: "请输入家长称呼", trigger: "blur" }],
        parentContact: [{ required: true, message: "请输入家长联系方式", trigger: "blur" }]
      },
      classData: generateData()
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
        } else {
          this.$message({
            type: "error",
            message: "学员信息错误"
          });
          return false;
        }
      });
    },
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
      this.form.restClass = this.form.allClass - this.form.classChoose.length * 16;
    }
  },
  watch: {
    allClass() {
      this.form.restClass = this.form.allClass;
    }
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
.class-overplus {
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
</style>
