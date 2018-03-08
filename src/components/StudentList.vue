<template>
  <div class="student-list">
    <p class="text">学员列表</p>
    <div class="search">
      <el-input class="search-input" placeholder="请输入学生姓名" @change="getStudentsList({search:searchStudentName})" v-model="searchStudentName" style="padding-bottom:10px;width:200px">
      </el-input>
      <el-button type="primary" icon="el-icon-search" v-on:click="getStudentsList({search:searchStudentName})">搜索</el-button>
    </div>
    <el-table stripe @sort-change="handleSortChange" class="feedback-table" :data="studentList" style="width: 90%;margin:0 auto" max-height="2000" @filter-change="filterHasClassEnd">
      <el-table-column fixed="left" type="expand">
        <template slot-scope="scope">
          <el-form inline class="demo-table-expand" v-if="scope.row.hadClass">
            <el-form-item v-for="(cls, index) in scope.row.hadClass" :key="index" :label="cls.lessonName">
              <el-progress :show-text="false" class="class-progress" :stroke-width="16" :percentage="calPercent(cls.percent)" :status="calProgressBarStatus(cls.percent)"></el-progress>
              <span class="class-progress-text">{{cls.percent}}</span>
            </el-form-item>
          </el-form>
          <span v-else>暂无课程</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" align="center" label="学员姓名" width="150">
      </el-table-column>
      <el-table-column prop="phone" align="center" label="联系方式" width="120">
      </el-table-column>
      <el-table-column prop="school" align="center" label="校区" width="120">
      </el-table-column>
      <el-table-column prop="hadClass" align="center" label="参加课程" width="auto">
        <template slot-scope="scope">
          <!-- <span class="class-name-text">{{calClass(scope.row.hadClass)}}</span> -->
          <div v-html="calClass(scope.row.hadClass)"></div>
          <!-- <span class="class-name-text">{{calClass(scope.row.hadClass)}}</span> -->
        </template>
      </el-table-column>
      <el-table-column prop="haveClassEnd" align="center" label="有课程即将到期" width="160" :filters="[{ text: '是', value: '1' }, { text: '暂无', value: '0' }]" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.haveClassEnd ? 'danger' : 'success'">{{scope.row.haveClassEnd ? '是' : '暂无'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="restNum" align="center" label="剩余/总充值课时" width="160">
        <template slot-scope="scope">
          <span>{{scope.row.restNum + '/' + scope.row.lessonNum}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="showStudentDetail(scope.row.id)" type="text" size="small">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="feed-back-pagination" style="margin-top: 20px;">
      <el-pagination ref="paginat" background @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
    <student-detail @close="closeDetail" :dialogVisible="dialogVisible" :studentId="detailId" @renewStudentList="getStudentsList"></student-detail>
  </div>
</template>
<script>
import Search from "./com/Search.vue";
import StudentDetail from "./subpages/StudentDetail.vue";
import { getStudentList } from "../api/getData";
import Bus from '../utils/bus'; 
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
      // studentList: mockData(),
      isFilter: "",
      isSort: "",
      studentList: [],
      // nowData: [],
      searchData: [],
      currentPage: 1,
      count: 100,
      dialogVisible: false,
      detailId: "0", // 打开详情时传入的学生编号，用于向服务器请求,
      searchStudentName: ""
    };
  },
  created(){
    Bus.$on('refreshStudentList',this.getStudentsList);
  },
  mounted() {
    // this.nowData = this.studentList.slice(0, 10);
    this.getStudentsList();
  },
  methods: {
    async getStudentsList(data) {
      console.log(1111);
      if (!data) data = {};
      if (this.isFilter) {
        data.haveClassEnd = this.isFilter;
      }
      if (this.isSort) {
        data.sortField = 'restNum';
        data.sortWay = this.isSort;
      }
      let res = await getStudentList(data);
      console.log(res);
      if (res.ok) {
        this.studentList = res.list;
        this.count = res.count;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getStudentsList({ page: val - 1 });
    },
    calClass(classArr) {
      if (!classArr) return "暂无课程";
      let text = "";
      classArr.forEach(item => {
        // text += item.lessonName + "　\r";
        text += "<p style='margin:0 0'>"+ item.lessonName +"</p>";
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
    calDeadLine(status) {
      return status ? "是" : "暂无";
    },
    handleSortChange(data) {
      console.log(data);
      if (data.order == "descending") {
        this.isSort = 'up'
      } else if (data.order == "ascending") {
        this.isSort = 'down'
      } else {
        this.isSort = ''
      }
      this.getStudentsList();
    },
    filterHasClassEnd(data) {
      if (data[Object.keys(data)[0]][0]) {
        this.isFilter = data[Object.keys(data)[0]][0];
      } else {
        this.isFilter = "";
      }
      this.getStudentsList();
    },
    showStudentDetail(id) {
      this.detailId = id;
      this.dialogVisible = true;
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
.class-name-text {
  display: block;
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
.search {
  width: 300px;
  float: right;
  margin-right: 5%;
}
.search-input {
  width: 200px;
}
</style>
