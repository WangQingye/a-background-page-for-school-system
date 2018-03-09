<template>
  <div class="main-info">
    <p class="text">工作台</p>
    <p class="small-title">
      <i class="el-icon-service"></i> 当前学校学生统计</p>
    <div class="info-block">
      <p>当前学校总人数：
        <span style="background:transparent;color:black">{{infos.studentNum}}</span>人</p>
    </div>
    <div class="info-block">
      <p>当前课程总人次：
        <span style="background:transparent;color:black">{{infos.studentTime}}</span>次</p>
    </div>
    <p class="small-title">
      <i class="el-icon-service"></i> 每日上课人次统计</p>
    <el-table :data="timesData" border style="width: 80%" class="count-table">
      <el-table-column prop="d1" label="周一" width="180">
      </el-table-column>
      <el-table-column prop="d2" label="周二">
      </el-table-column>
      <el-table-column prop="d3" label="周三">
      </el-table-column>
      <el-table-column prop="d4" label="周四" width="180">
      </el-table-column>
      <el-table-column prop="d5" label="周五">
      </el-table-column>
      <el-table-column prop="d6" label="周六">
      </el-table-column>
      <el-table-column prop="d7" label="周日">
      </el-table-column>
    </el-table>
    <p class="small-title">
      <i class="el-icon-message"></i> 近期通知</p>
    <div class="info-block">
      <p>近一周新增家长反馈
        <span>{{infos.newFeedback}}</span>条</p>
      <el-button type="primary" @click="goToFeedBack">查看</el-button>
    </div>
    <div class="info-block">
      <p>未来7天请假申请
        <span>{{infos.newLeaveNum}}</span>条</p>
      <el-button type="primary" @click="showLeaveList">查看</el-button>
    </div>
    <!-- 请假表 -->
    <el-dialog width="1200px" title="请假情况" :visible.sync="leaveTableVisible" append-to-body>
      <el-table stripe class="feedback-table" :data="leaveList" style="width: 90%;margin:0 auto;text-align:center" max-height="2000">
        <el-table-column prop="studentName" align="center" label="学员姓名" width="150">
        </el-table-column>
        <el-table-column prop="phone" align="center" label="联系方式" width="120">
        </el-table-column>
        <el-table-column prop="lessonName" align="center" label="请假课程" width="220">
        </el-table-column>
        <el-table-column prop="date" align="center" label="请假日期" width="220">
        </el-table-column>
        <el-table-column prop="timeRange" align="center" label="请假时间" width="auto">
        </el-table-column>
      </el-table>
          <div class="feed-back-pagination" style="margin-top: 20px;">
      <el-pagination ref="paginat" background @current-change="handleCurrentChange" :current-page="leavePage" :page-size="10" layout="total, prev, pager, next" :total="leaveCount">
      </el-pagination>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import { getMainInfo, getLeaveList } from "../api/getData";
export default {
  data() {
    return {
      timesData: [
        {
          d1: 0,
          d2: 0,
          d3: 0,
          d4: 0,
          d5: 0,
          d6: 0,
          d7: 0
        }
      ],
      infos: {},
      leaveTableVisible: false,
      leaveList: [
        {
          id: 1, //记录id
          lessonName: "xxx", //课程名字
          studentName: "xxx", //学生名字
          date: "2018-03-01", //日期
          timeRange: "08:00-09:00", //时间
          phone: "13800138000" //家长手机号
        },
        {
          id: 1, //记录id
          lessonName: "xxx", //课程名字
          studentName: "xxx", //学生名字
          date: "2018-03-01", //日期
          timeRange: "08:00-09:00", //时间
          phone: "13800138000" //家长手机号
        },
        {
          id: 1, //记录id
          lessonName: "xxx", //课程名字
          studentName: "xxx", //学生名字
          date: "2018-03-01", //日期
          timeRange: "08:00-09:00", //时间
          phone: "13800138000" //家长手机号
        }
      ],
      leavePage: 1,
      leaveCount: 0
    };
  },
  mounted() {
    this.getInfos();
  },
  methods: {
    async getInfos() {
      let res = await getMainInfo();
      console.log(res);
      if (res.ok) {
        this.infos = res;
        for (let i = 0; i < 7; i++) {
          this.timesData[0]["d" + (i + 1)] = res.everydayTime[i];
        }
        console.log(this.timesData);
      }
    },
    async getLeaveInfo(page) {
      let res = await getLeaveList({ page: this.leavePage - 1 });
      console.log(res);
      if (res.ok){
        this.leaveList = res.list;
        this.leaveCount = res.count;
      }
    },
    goToFeedBack() {
      this.$router.push("/userFeedBack");
    },
    showLeaveList() {
      this.leaveTableVisible = true;
      this.getLeaveInfo();
      if (!this.leaveList.length) {
      }
    },
    handleCurrentChange(val) {
      this.leavePage = val;
      this.getLeaveList();
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
.feed-back-pagination {
  display: block;
  width: 460px;
  margin: 0 auto;
}
</style>
