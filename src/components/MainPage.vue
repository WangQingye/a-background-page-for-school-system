<template>
  <div class="main">
    <el-row class="header">
      <el-col :span="2">
        <img class="logo" src="../assets/logo.jpg" alt="">
      </el-col>
      <el-col :span="20" class="admin-text">
        <p>管理员，你好</p>
      </el-col>
      <el-col :span="2" class="log-out">
        <el-button @click="logOut">退出</el-button>
      </el-col>
    </el-row>
    <el-row style="min-height: 100%">
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
            <el-menu-item index="class">课程表</el-menu-item>
            <el-menu-item index="addClass">课程添加</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-service"></i>
              <span>学员管理</span>
            </template>
            <el-menu-item index="classmates">学员列表</el-menu-item>
            <el-menu-item index="addClassmate">学员添加</el-menu-item>
          </el-submenu>
          <el-menu-item index="userFeedBack">
            <i class="el-icon-message"></i>
            <span slot="title">用户反馈</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  mounted(){
  },
  methods: {
    logOut(){
      this.$router.push('/');
    }
  },
  computed:{
    defaultActive(){
      return this.$route.path.replace('/','')
    }
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
  .log-out{
    margin-top: 7.5px;
  }
}
.logo {
  width: 50px;
  height: 50px;
  margin: 0;
  padding: 0;
}
</style>
