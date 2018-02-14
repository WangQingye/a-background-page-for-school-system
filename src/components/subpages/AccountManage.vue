<template>
    <div class="account-manage">
        <el-dialog :title="'账号管理'" :before-close="close" :show-close="false" :visible.sync="dialogVisible" width="1000px">
            <el-tabs>
                <!-- 基本信息页 -->
                <el-tab-pane label="添加账号">
                    <el-form class="account-dialog" ref="form" :rules="rules" :model="form" label-width="80px" width="300px">
                        <el-form-item label="账号" prop="account">
                            <el-input v-model="form.account"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="form.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item label="重复密码" prop="repassword">
                            <el-input type="password" v-model="form.repassword"></el-input>
                        </el-form-item>
                        <el-form-item label="权限选择" prop="repassword">
                            <el-checkbox v-model="canCharge">充值权限</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">添加账号</el-button>
                            <el-button @click="close">关闭</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <!-- 账号列表 -->
                <el-tab-pane label="账号列表" style="text-align:center">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="account" label="账号" width="180">
                        </el-table-column>
                        <el-table-column prop="nickname" label="昵称" width="180">
                        </el-table-column>
                        <el-table-column prop="password" label="密码" width="180">
                        </el-table-column>
                        <el-table-column prop="desc" label="备注" width="180">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="small" type="primary" @click="openClassChange(scope.row)">修改信息</el-button>
                                <el-button size="small" type="danger" @click="openConfirm(2,scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <!-- 修改密码 -->
            <!-- <el-dialog width="30%" title="修改课时" :visible.sync="changePasswordVisible" append-to-body>
                <el-form ref="changeClass" :model="changePasswordForm" label-width="80px">
                    <el-form-item label="账号">
                        <span>王小虎</span>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <span>{{changePasswordForm.className}}</span>
                    </el-form-item>
                    <el-form-item label="旧密码">

                    </el-form-item>
                    <el-form-item label="新密码">
                        <span>{{changePasswordForm.totalClass}}</span>
                    </el-form-item>
                    <el-form-item label="重复密码">
                        <span>{{changePasswordForm.totalClass}}</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitChangePassword">修改</el-button>
                        <el-button @click="changePasswordVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog> -->
        </el-dialog>
    </div>
</template>



<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        account: "",
        nickname: "",
        password: "",
        repassword: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        repassword: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      tableData: [
        {
          account: "13988888888",
          nickname: "小花老师",
          password: "xiaohua123",
          desc: "李春花老师的账号"
        },
        {
          account: "13988888888",
          nickname: "小花老师",
          password: "xiaohua123",
          desc: "李春花老师的账号"
        },
        {
          account: "13988888888",
          nickname: "小花老师",
          password: "xiaohua123",
          desc: "李春花老师的账号"
        },
        {
          account: "13988888888",
          nickname: "小花老师",
          password: "xiaohua123",
          desc: "李春花老师的账号"
        }
      ],
      changePasswordForm: {
        account: "",
        nickname: "",
        oldPassword: "",
        newPassword: "",
        renewPassword: ""
      },
      // 是否显示修改密码界面
      changePasswordVisible: false,
      // 充值权限
      canCharge: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.account-dialog {
  width: 500px;
  margin: 0 auto;
}
.el-table th > .cell {
  text-align: center;
}
</style>
