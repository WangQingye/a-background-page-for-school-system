<template>
    <div class="user-feed-back">
        <p class="text">用户反馈</p>
        <el-table class="feedback-table" :data="tableData4" style="width: 90%;margin:0 auto" max-height="1000">
            <el-table-column fixed prop="date" align="center" label="日期" width="150">
            </el-table-column>
            <el-table-column prop="name" align="center" label="反馈家长" width="120">
            </el-table-column>
            <el-table-column prop="contact" align="center" label="联系方式" width="120">
            </el-table-column>
            <el-table-column prop="info" align="center" label="反馈内容" width="auto">
            </el-table-column>
            <el-table-column fixed="right" align="center" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button type="text" size="small">
                        回复
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData4: [
        {
          date: "2018-01-03",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333
        },
        {
          date: "2018-01-02",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333
        },
        {
          date: "2018-01-04",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333
        },
        {
          date: "2018-01-01",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333
        },
        {
          date: "2018-01-08",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333
        },
        {
          date: "2018-01-06",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333
        },
        {
          date: "2018-01-07",
          name: "王小虎",
          contact: "18888888888",
          info: "教学质量非常好，希望出更多更好更精彩的课程",
          zip: 200333
        }
      ]
    };
  },
  methods: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text {
  font-size: 20px;
  font-weight: 600;
}
.el-table th>div{
    text-align: center;
}
</style>
