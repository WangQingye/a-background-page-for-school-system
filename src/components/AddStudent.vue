<template>
  <div class="add-student">
    <p class="text">添加学员</p>
    <el-form ref="form" :model="form" label-width="120px" label-position="left" class="add-form">
      <el-form-item label="学员姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学员家长">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="家长联系方式">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="校区">
        <el-select v-model="form.region" placeholder="请选择校区">
          <el-option label="天府校区" value="shanghai"></el-option>
          <el-option label="锦江校区" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总充值课时">
        <el-input-number v-model="allClass" :min="0" :max="1000" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="单个课程课时">
        <el-input-number v-model="allClass" :min="0" :max="1000" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="已参加课程">
        <el-checkbox-group v-model="form.type">
          <el-transfer @change="changeClass" v-model="classChoose" :titles="['校区课程', '参加课程']" :data="classData"></el-transfer>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="剩余课时">
        <p class="class-overplus">{{restClass}}</p>
      </el-form-item>
      <el-form-item label="其他备注">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      classData: generateData(),
      classChoose: [],
      allClass: 0,
      restClass: 0
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    changeClass(value, direction, movedKeys) {
      if (this.allClass - this.classChoose.length * 16 < 0) {
        this.$message.error("您的剩余课时不够添加这些课程哦");
        movedKeys.forEach(key => {
          this.classChoose.splice(
            this.classChoose.findIndex(value => {
              return value == key;
            })
          );
        }, this);
        return;
      }
      this.restClass = this.allClass - this.classChoose.length * 16;
    }
  },
  watch: {
    allClass() {
      this.restClass = this.allClass;
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
  font-size: 20px;
}
.el-form-item__content {
  text-align: left;
}
.el-transfer {
  text-align: center;
}
</style>
