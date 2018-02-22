<template>
  <div class="main-info">
    <p class="text">主页信息</p>
    <el-table :data="formData" border show-summary style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="students" label="上课人数">
      </el-table-column>
      <el-table-column prop="classes" label="上课人次">
      </el-table-column>
    </el-table>
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
  methods: {}
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
