<template>
  <div class="main">
    <el-row class="header" type="flex">
      <el-col :span="6">
        <img class="logo" src="../assets/logo.jpg" alt="">
        <p class="logo-text">巧克力梦工厂后台管理系统</p>
      </el-col>
      <el-col :span="14" class="admin-text">
        <p>管理员，你好</p>
      </el-col>
      <el-col :span="4" class="log-out">
        <el-button type="primary" @click="dialogVisible = true">账号管理</el-button>
        <el-button @click="logOut">退出</el-button>
      </el-col>
    </el-row>
    <el-row style="min-height: 100%" type="flex">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="defaultActive" style="min-height: 100%" router>
          <el-menu-item index="main">
            <i class="el-icon-tickets"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>课程管理</span>
            </template>
            <el-menu-item index="classList">课程表</el-menu-item>
            <el-menu-item index="addClass">课程添加</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-service"></i>
              <span>学员管理</span>
            </template>
            <el-menu-item index="studentList">学员列表</el-menu-item>
            <el-menu-item index="addStudent">学员添加</el-menu-item>
          </el-submenu>
          <el-menu-item index="userFeedBack">
            <i class="el-icon-message"></i>
            <span slot="title">家长反馈</span>
          </el-menu-item>
        </el-menu>`
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
    <account-manage @close="closeAccount" :dialogVisible="dialogVisible"></account-manage>
  </div>
</template>
<script>
import AccountManage from "./subpages/AccountManage.vue";
export default {
  data(){
    return {
      dialogVisible: false
    }
  },
  mounted() {

  },
  methods: {
    logOut() {
      this.$router.push("/");
    },
    closeAccount(){
      this.dialogVisible = false;
    }
  },
  computed: {
    defaultActive() {
      return this.$route.path.replace("/", "");
    }
  },
  components: {
    AccountManage
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
.header {
  border-bottom: 1px solid #dddddd;
  height: 55px;
  .admin-text {
    text-align: right;
  }
  .log-out {
    margin-top: 7.5px;
  }
}
.logo {
  width: 50px;
  height: 50px;
  margin: 0;
  padding: 0;
}
.logo-text {
  float: right;
}
</style>
