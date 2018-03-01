<template>
  <div class="student-list">
    <p class="text">学员列表</p>
    <search :place-text="'请输入学生姓名'" @search="search"></search>
    <el-table stripe @sort-change="handleSortChange" class="feedback-table" :data="nowData" style="width: 90%;margin:0 auto" max-height="2000">
      <el-table-column fixed="left" type="expand">
        <template slot-scope="scope">
          <el-form inline class="demo-table-expand">
            <el-form-item v-for="(cls, index) in scope.row.class" :key="index" :label="cls.className">
              <el-progress :show-text="false" class="class-progress" :stroke-width="16" :percentage="calPercent(cls.finishPercnet)" :status="calProgressBarStatus(cls.finishPercnet)"></el-progress>
              <span class="class-progress-text">{{cls.finishPercnet}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="学员姓名" width="150">
      </el-table-column>
      <el-table-column prop="parentContact" align="center" label="联系方式" width="120">
      </el-table-column>
      <el-table-column prop="school" align="center" label="校区" width="120">
      </el-table-column>
      <el-table-column prop="class" align="center" label="参加课程" width="auto">
        <template slot-scope="scope">
          <span>{{calClass(scope.row.class)}}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="haveDeadline" align="center" label="有课程即将到期" width="160">
        <template slot-scope="scope">
          <el-tag :type="calDeadLine(scope.row.class) === '是' ? 'danger' : 'success'" close-transition>{{calDeadLine(scope.row.class)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="restClass" align="center" label="剩余/总充值课时" width="160">
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="showStudentDetail(scope.row)" type="text" size="small">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="feed-back-pagination" style="text-align: left;margin-top: 10px;">
      <el-pagination ref="paginat" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
    <student-detail @close="closeDetail" :dialogVisible="dialogVisible" :studentIndex="detailIndex"></student-detail>
  </div>
</template>
<script>
import Search from "./com/Search.vue";
import StudentDetail from "./subpages/StudentDetail.vue";
import { getStudentList } from "../api/getData";
export default {
  data() {
    function mockData() {
      let arr = [];
      for (let i = 0; i < 100; i++) {
        arr.push({
          name: "王小虎" + i,
          parentName: "王爸爸",
          parentContact: "13888888888",
          school: "天府校区",
          class: [
            {
              className: "领袖口才2017期" + i,
              finishPercnet: Math.floor(Math.random() * 16) + "/16"
            },
            {
              className: "形象气质2017期",
              finishPercnet: Math.floor(Math.random() * 16) + "/16"
            }
          ],
          restClass: Math.floor(Math.random() * 96) + " / 96",
          index: i
        });
      }
      return arr;
    }
    return {
      allData: mockData(),
      // nowData: [],
      searchData: [],
      currentPage: 1,
      count: 100,
      dialogVisible: false,
      detailIndex: 0 // 打开详情时传入的学生编号，用于向服务器请求
    };
  },
  mounted() {
    // this.nowData = this.allData.slice(0, 10);
    this.getStudentsList();
  },
  methods: {
    async getStudentsList(data){
      let res = await getStudentList(data);
      console.log(res);
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.nowData = this.allData.slice(val * 10 - 10, val * 10);
    },
    calClass(classArr) {
      let text = "";
      classArr.forEach(item => {
        text += item.className + "　\n";
      });
      return text;
    },
    calPercent(str) {
      return Math.floor(eval(str) * 100);
    },
    calProgressBarStatus(str) {
      /* 本门课的剩余课时等于总课时减去已经上过的 */
      let restClass = Number(str.split("/")[1]) - Number(str.split("/")[0]);
      if (restClass == 0) return "success";
      if (restClass < 5) return "exception";
    },
    calDeadLine(classes) {
      let text = "暂无";
      classes.forEach(item => {
        if (this.calProgressBarStatus(item.finishPercnet) == "exception") {
          text = "是";
        }
      });
      return text;
    },
    search(text) {
      this.searchData = this.allData.filter(item => {
        return item.name.indexOf(text) !== -1;
      });
      this.count = this.searchData.length;
      this.nowData = this.searchData.slice(
        this.currentPage * 10 - 10,
        this.currentPage * 10
      );
    },
    handleSortChange(data) {
      console.log(data);
      if (data.prop == "restClass") {
        if (data.order == "descending") {
          this.allData = this.allData.sort((itemA, itemB) => {
            let a = Number(itemA.restClass.split("/")[0]);
            let b = Number(itemB.restClass.split("/")[0]);
            if (a > b) {
              return 1;
            } else if (a == b) {
              return 0;
            } else {
              return -1;
            }
          });
        } else if (data.order == "ascending") {
          this.allData = this.allData.sort((itemA, itemB) => {
            let a = Number(itemA.restClass.split("/")[0]);
            let b = Number(itemB.restClass.split("/")[0]);
            if (a < b) {
              return 1;
            } else if (a == b) {
              return 0;
            } else {
              return -1;
            }
          });
        }
      }
      if (data.prop == "haveDeadline") {
        if (data.order == "descending") {
          this.allData = this.allData.sort((itemA, itemB) => {
            let a = this.calDeadLine(itemA.class);
            let b = this.calDeadLine(itemB.class);
            if (a == '是') {
              return 1;
            } else if (a == b) {
              return 0;
            } else {
              return -1;
            }
          });
        } else if (data.order == "ascending") {
          this.allData = this.allData.sort((itemA, itemB) => {
            let a = this.calDeadLine(itemA.class);
            let b = this.calDeadLine(itemB.class);
            if (a == '暂无') {
              return 1;
            } else if (a == b) {
              return 0;
            } else {
              return -1;
            }
          });
        }
      }
    },
    showStudentDetail(data) {
      this.dialogVisible = true;
      this.detailIndex = data.index;
    },
    closeDetail() {
      this.dialogVisible = false;
    }
  },
  computed: {
    nowData() {
      return this.allData.slice(
        this.currentPage * 10 - 10,
        this.currentPage * 10
      );
    }
  },
  components: {
    Search,
    StudentDetail
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.text {
  font-size: 20px;
  font-weight: 600;
}
.el-table th > div {
  text-align: center;
}
.feed-back-pagination {
  display: block;
  width: 460px;
  margin: 0 auto;
}
.class-progress {
  width: 150px;
  margin-top: 10px;
  display: inline-block;
}
.form {
  display: block;
}
.class-progress-text {
  display: inline-block;
  height: 40px;
  margin-left: 20px;
  margin-right: 50px;
  font-size: 18px;
}
.detail-form {
  text-align: left;
}
</style>
