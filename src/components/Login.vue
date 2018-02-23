<template>
    <div class="login fillcontain">
        <img class="manage-logo" src="../assets/logo.jpg" alt="">
        <div class="manage-tip">
            <p>巧克力梦工厂后台管理系统</p>
        </div>
        <el-row>
            <el-col :span="12" :offset="6">
                <el-form label-position="left" label-width="80px" :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username" label="用户名">
                        <el-input v-model="loginForm.username" placeholder="用户名">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                        <el-input label="密码" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item class="button-wrapper">
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {login} from '../api/getData';
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          const res = await login({
            account: this.loginForm.username,
            pass: this.loginForm.password
          });
          console.log(this.loginForm.username, this.loginForm.password);
          console.log(res);
          if (res.ok) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            this.$router.push("main");
          } else {
            this.$message({
              type: "error",
              message: '账号或者密码错误'
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// @import "../style/common";
// @import "../style/mixin";

.manage-logo {
  width: 200px;
  display: block;
  margin: 0 auto;
}
.manage-tip {
  width: 100%;
  p {
    font-size: 20px;
    font-weight: 600;
    margin-top: -20px;
    width: 100%;
    text-align: center;
  }
}
.submit_btn {
  width: 150px;
  margin-right: 80px;
}
</style>
