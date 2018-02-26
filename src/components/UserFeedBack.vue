<template>
  <div class="user-feed-back">
    <p class="text">家长反馈</p>
    <el-table class="feedback-table" :data="tableData4" style="width: 90%;margin:0 auto" max-height="1000">
      <el-table-column fixed prop="date" align="center" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="name" align="center" label="反馈家长" width="120">
      </el-table-column>
      <el-table-column prop="contact" align="center" label="联系方式" width="120">
      </el-table-column>
      <el-table-column prop="info" align="center" label="反馈内容" width="auto">
        <template slot-scope="scope">
          <p style="margin-left: 10px">{{ scope.row.info }}</p>
          <div v-show="scope.row.reply">

            <i class="el-icon-message"></i>
            <span style="color:orange">回复内容：{{scope.row.reply}}</span>
          </div>
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
import { getFeedBack } from "../api/getData";
export default {
  data() {
    return {
      tableData4: [
        {
          date: "2018-01-03",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,
          reply: 0
        },
        {
          date: "2018-01-02",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,
          reply: "谢谢您的支持，我们会再接再厉！"
        },
        {
          date: "2018-01-04",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,  
          reply: 0
        },
        {
          date: "2018-01-01",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,
          reply: "谢谢您的支持，我们会再接再厉！"
        },
        {
          date: "2018-01-08",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,
          reply: 0
        },
        {
          date: "2018-01-06",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,
          reply: 0
        },
        {
          date: "2018-01-07",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,
          reply: 0
        },
        {
          date: "2018-01-07",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,
          reply: 0
        },
        {
          date: "2018-01-07",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,
          reply: 0
        },
        {
          date: "2018-01-07",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333,
          reply: 0
        }
      ],
      currentPage: 1,
      count: 100
    };
  },
  mounted(){
    this.getFeedBack();
  },
  methods: {
    async getFeedBack(){
      let res = await getFeedBack({page:this.currentPage})
      console.log(res);
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tableData4.forEach(item => {
        item.name = `王小虎${val}`;
      });
    },
    replyFeedBack(row) {
      console.log(row);
      this.$prompt("请输入回复", `回复家长${row.name}的留言`, {
        confirmButtonText: "回复",
        cancelButtonText: "取消",
        inputType: 'textarea'
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "回复成功！"
          });
          row.reply = 1;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
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
.el-input__inner{
  row: 14;
}
</style>
