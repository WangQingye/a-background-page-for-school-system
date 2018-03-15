<template>
  <div class="user-feed-back">
    <p class="text">家长反馈</p>
    <el-table class="feedback-table" :data="feedBackList" style="width: 90%;margin:0 auto" max-height="1000">
      <el-table-column fixed prop="date" align="center" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="name" align="center" label="反馈学员" width="120">
      </el-table-column>
      <el-table-column prop="phone" align="center" label="联系方式" width="120">
      </el-table-column>
      <el-table-column prop="content" align="center" label="反馈内容" width="auto">
        <template slot-scope="scope">
          <p style="margin-left: 10px">{{ scope.row.content }}</p>
          <div v-show="!(scope.row.isReply == 0)">
            <i class="el-icon-message"></i>
            <span style="color:orange">回复内容：{{scope.row.replyContent}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-show="scope.row.isReply == 0" @click="replyFeedBack(scope.row)" type="text" size="small">
            回复
          </el-button>
          <el-button v-show="!(scope.row.isReply == 0)" disabled type="text" size="small">
            已回复
          </el-button>
          <el-button v-if="isAdmin" @click="deleteFeedBack(scope.row)" type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="feed-back-pagination" style="margin: 0 auto;margin-top: 20px;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getFeedBack, replyFeedBack, delFeedBack } from "../api/getData";
export default {
  data() {
    return {
      feedBackList: [],
      currentPage: 1,
      count: 100
    };
  },
  mounted() {
    this.getFeedBack();
  },
  methods: {
    async getFeedBack() {
      let res = await getFeedBack({ page: this.currentPage - 1 });
      this.log("获取反馈列表", res.ok);
      console.log(res);
      if (res.ok) {
        this.feedBackList = res.list;
        this.count = res.count;
      }
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    async replyFeedBack(row) {
      console.log(row);
      this.$prompt("请输入回复", `回复家长${row.name}的留言`, {
        confirmButtonText: "回复",
        cancelButtonText: "取消",
        inputType: "textarea"
      })
        .then(async ({ value }) => {
          let res = await replyFeedBack({ id: row.id, replyContent: value });
          console.log(res);
          if (res.ok) {
            this.$message({
              type: "success",
              message: "回复成功！"
            });
            this.getFeedBack();
          }
          // row.reply = 1;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    async deleteFeedBack(row) {
      this.$confirm("本次操作将在后台删除此条反馈，但家长端仍会显示，是否确认", "确认操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async () => {
          let res = await delFeedBack({ id: row.id });
          console.log(res);
          if (res.ok) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
          this.getFeedBack();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  },
  watch: {
    currentPage() {
      this.getFeedBack();
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.adminInfo.type == 1;
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
.el-input__inner {
  row: 14;
}
</style>
