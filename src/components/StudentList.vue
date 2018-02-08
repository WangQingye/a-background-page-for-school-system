<template>
    <div class="student-list">
        <p class="text">学员列表</p>
        <el-table class="feedback-table" :data="tableData4" style="width: 90%;margin:0 auto" max-height="1000">
            <el-table-column fixed prop="name" align="center" label="学员姓名" width="150">
            </el-table-column>
            <el-table-column prop="parentName" align="center" label="家长姓名" width="120">
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
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item v-for="(cls, index) in scope.row.class" :key="index" :label="cls.className">
                            <el-progress :text-inside="true" :stroke-width="18" :percentage="100" status="success"></el-progress>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button v-show="!scope.row.reply" @click="replyFeedBack(scope.row)" type="text" size="small">
                        回复
                    </el-button>
                    <el-button v-show="scope.row.reply" disabled type="text" size="small">
                        已回复
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="feed-back-pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData4: [
        {
          name: "王小虎",
          parentName: "王爸爸",
          parentContact: "13888888888",
          school: "天府校区",
          class: [
            { className: "领袖口才2017期", finishPercnet: 40 },
            { className: "形象气质2017期", finishPercnet: 80 }
          ],
          restClass: 66
        }
      ],
      currentPage: 1,
      count: 100
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData4.forEach(item => {
        item.name = `王小虎${val}`;
      });
    },
    calClass(classArr) {
      let text = "";
      classArr.forEach(item => {
        text += item.className + "　\n";
      });
      return text;
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
.el-table th > div {
  text-align: center;
}
.feed-back-pagination {
  display: block;
  width: 460px;
  margin: 0 auto;
}
</style>
