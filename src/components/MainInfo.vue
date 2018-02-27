<template>
  <div class="main-info">
    <p class="text">工作台</p>
    <p class="small-title">
      <i class="el-icon-service"></i> 人数人次统计</p>
    <el-table :data="formData" border show-summary style="width: 80%" class="count-table">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="students" label="上课人数">
      </el-table-column>
      <el-table-column prop="classes" label="上课人次">
      </el-table-column>
    </el-table>
    <p class="small-title">
      <i class="el-icon-message"></i> 近期通知</p>
    <div class="info-block">
      <p>近一周新增家长反馈
        <span>7</span>条</p>
      <el-button type="primary" @click="goToFeedBack">查看</el-button>
    </div>
    <div class="info-block">
      <p>未来请假情况</p>
      <el-button type="primary" @click="goToFeedBack">查看</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: [
        {
          date: "周一",
          students: "23",
          classes: "12"
        },
        {
          date: "周一",
          students: "23",
          classes: "12"
        }
      ]
    };
  },
  methods: {
    goToFeedBack() {
      this.$router.push("/userFeedBack");
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text {
  font-size: 20px;
  font-weight: 600;
}
.count-table {
  margin-left: 10%;
}
.small-title {
  text-align: left;
  padding-left: 100px;
  margin-bottom: 20px;
  color: orangered;
}
.info-block {
  text-align: left;
  padding-left: 140px;
}
.info-block p {
  text-align: left;
  margin-right: 50px;
  display: inline-block;
}
.info-block p span {
  font-size: 24px;
  text-align: center;
  color: white;
  width: 30px;
  height: 30px;
  display: inline-block;
  background: #f56c6c;
  border-radius: 50%;
  margin: 0 10px;
}
</style>
