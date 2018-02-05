<template>
  <div class="main">
    <el-row style="min-height: 100%">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu default-active="1" style="min-height: 100%" theme="dark" router>
          <el-menu-item index="1">
            <i class="el-icon-tickets"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>课程管理</span>
            </template>
            <el-menu-item-group title="课程相关">
              <el-menu-item index="2-1">课程表</el-menu-item>
              <el-menu-item index="2-2">课程添加</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="学员相关">
              <el-menu-item index="2-3">学员列表</el-menu-item>
              <el-menu-item index="2-4">学员添加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
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
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
