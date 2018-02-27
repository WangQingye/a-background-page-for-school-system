<template>
  <div class="main">
    <el-row class="header" type="flex">
      <el-col :span="6">
        <img class="logo" src="../assets/logo.jpg" alt="">
        <p class="logo-text">巧克力梦工厂后台管理系统</p>
      </el-col>
      <el-col :span="14" class="admin-text">
        <p>{{userName}}，你好</p>
      </el-col>
      <el-col :span="6" class="log-out">
        <el-button size="medium" v-show="isAdmin" type="primary" @click="dialogVisible = true">账号管理</el-button>
        <el-button size="medium" type="primary" @click="changePassVisible = true">修改密码</el-button>
        <el-button size="medium" @click="logOut">退出</el-button>
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
    <account-manage @close="dialogVisible = false" :dialogVisible="dialogVisible"></account-manage>
    <!-- 修改密码 -->
    <el-dialog width="400" :rules="rules" title="修改密码" :visible.sync="changePassVisible" append-to-body>
      <el-form ref="changePass" :rules="rules" :model="changePassForm" label-width="80px">
        <el-form-item prop="oldPass" label="当前密码">
          <el-input type="password" v-model="changePassForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item prop="newPass" label="新密码">
          <el-input type="password" v-model="changePassForm.newPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitChangePass">确认修改</el-button>
          <el-button @click="changePassVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import AccountManage from "./subpages/AccountManage.vue";
import { logOut, changePass } from "../api/getData";
export default {
  data() {
    return {
      dialogVisible: false,
      isAdmin: this.$store.state.adminInfo.type == 1,
      userName: this.$store.state.adminInfo.name,
      changePassVisible: false,
      changePassForm: {
        oldPass: "",
        newPass: ""
      },
      rules: {
        oldPass: [{ required: true, message: "请输入当前密码", trigger: "blur" }],
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "密码不能少于6个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {},
  // computed: mapState({
  //   // 箭头函数可使代码更简练
  //   adminInfo: state => state.adminInfo,
  // }),
  async mounted() {
    if (!this.$store.state.adminInfo.id) {
      await this.getAdminData();
      console.log(this.$store.state.adminInfo);
      this.isAdmin = this.$store.state.adminInfo.type == 1;
      this.userName = this.$store.state.adminInfo.name;
    }
  },
  methods: {
    async logOut() {
      const res = await logOut();
      if (res.ok) {
        this.$router.push("/");
      }
    },
    async submitChangePass() {
      // console.log(this.changePassForm);
      let res = await changePass(this.changePassForm);
      if (res.ok) {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.changePassVisible = false;
        this.changePassForm.oldPass = '';
        this.changePassForm.newPass = '';
      } else {
        this.$message({
          type: "error",
          message: res.errorMsg
        });
      }
    },
    ...mapActions(["getAdminData"])
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
