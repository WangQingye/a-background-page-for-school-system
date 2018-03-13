<template>
  <div class="student-detail">
    <el-dialog class="detail-dialog" :title="'学员详情 - ' + infoForm.name" :before-close="close" :show-close="false" :visible.sync="dialogVisible" width="1200px">
      <el-tabs v-model="tabName" @tab-click="handleTabClick">
        <!-- 基本信息页 -->
        <el-tab-pane label="基本信息" name="基本信息">
          <div class="class-title" style="margin-bottom:20px">
            <i class="el-icon-date"></i>
            <span>基本信息</span>
          </div>
          <!-- 展示页 -->
          <el-form v-show="infoShow" class="detail-form" ref="form" :model="infoForm" label-width="120px">
            <el-form-item label="学员姓名" prop="name">
              <span>{{infoForm.name}}</span>
            </el-form-item>
            <el-form-item label="家长联系方式" prop="phone">
              <span>{{infoForm.phone}}</span>
            </el-form-item>
            <el-form-item label="校区">
              <span>{{infoForm.school}}</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="showEditInfo(true)">编辑信息</el-button>
              <el-button @click="close">关闭</el-button>
            </el-form-item>
          </el-form>
          <!-- 编辑页 -->
          <el-form v-show="editInfoShow" class="detail-form" ref="form" :rules="rules" :model="editForm" label-width="120px">
            <el-form-item label="学员姓名" prop="name">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
            <el-form-item label="家长联系方式" prop="phone">
              <el-input v-model="editForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="校区">
              <span>{{editForm.school}}</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitEditInfo">确认修改</el-button>
              <el-button @click="showEditInfo(false)">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 课程情况 -->
        <el-tab-pane label="课程情况" name="课程情况">
          <div class="class-title">
            <i class="el-icon-date"></i>
            <span>课程情况</span>
          </div>
          <el-table :data="classData" v-if="classData" style="width: 100%">
            <el-table-column prop="lessonName" label="课程名称" width="180">
            </el-table-column>
            <el-table-column prop="date" label="上课时间" width="140">
              <template slot-scope="scope">
                <span v-for="(date, index) in scope.row.schedules" :key="index" style="margin-left: 10px">{{ date.weekday + " " + date.startTime + '-' + date.endTime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="progress" label="课程进度" width="180">
              <template slot-scope="scope">
                <el-progress type="circle" :percentage="Math.floor((scope.row.expendNum / scope.row.num) * 100)" :width="25" :show-text="false"></el-progress>
                <span style="margin-left: 10px;font-size:16px">{{ scope.row.expendNum + '/' + scope.row.num}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="desc" label="备注">
              <template slot-scope="scope">
                <span style="margin-left: 10px;font-size:16px;">{{ scope.row.school + '-' + scope.row.schedules[0].location + '-' + scope.row.teacherName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="480">
              <template slot-scope="scope">
                <div v-if="scope.row.status == 0">
                  <el-button size="small" type="primary" @click="openClassChange(scope.row)">修改课时</el-button>
                  <el-button size="small" type="warning" @click="openClassTrans(scope.row)">转班</el-button>
                  <el-button size="small" type="success" @click="openRenewClass(scope.row)">续课</el-button>
                  <el-button size="small" type="info" @click="openConfirm(1,scope.row)">暂停课</el-button>
                  <el-button size="small" type="danger" @click="openConfirm(2,scope.row)">退课</el-button>
                </div>
                <div v-if="scope.row.status == 1">
                  <span>该课程已暂停，我要：</span>
                  <el-button size="small" type="success" @click="openConfirm(4,scope.row)">复课</el-button>
                </div>
                <div v-if="scope.row.status == 2">
                  <span>该课程已结束，无可选操作</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin-top: 30px" @click="openAddClass">添加新课程</el-button>
        </el-tab-pane>
        <!-- 上课记录 -->
        <el-tab-pane label="上课记录" name="上课记录">
          <div class="class-title">
            <i class="el-icon-date"></i>
            <span>上课记录</span>
          </div>
          <el-table :data="historyData" v-if="historyData.length" style="width: 90%; margin:0 auto">
            <el-table-column prop="date" label="上课时间" sortable width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="lessonName" label="课程名称" width="auto">
            </el-table-column>
            <el-table-column prop="mark" label="备注" width="280">
              <template slot-scope="scope">
                <span v-if="scope.row.mark">{{scope.row.mark}}</span>
                <span v-else>暂无</span>
              </template>
            </el-table-column>
            <el-table-column prop="tag" label="出勤状态" width="100" :filters="[{ text: '请假', value: '请假' }, { text: '已上', value: '已上' }, { text: '待上', value: '待上' }]" :filter-method="filterTag" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="calClassType(scope.row.typeName)" close-transition>{{scope.row.typeName}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <div class="feed-back-pagination" style="margin-top: 10px;">
            <el-pagination ref="paginat" background @current-change="handleClassHistoryPageChange" :current-page="historyPage" :page-size="10" layout="total, prev, pager, next" :total="historyCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <!-- 充值相关 -->
        <el-tab-pane label="充值相关" name="充值相关">
          <div v-if="this.$store.state.adminInfo.auth.canCharge || this.$store.state.adminInfo.type==1">
            <div class="class-title">
              <i class="el-icon-date"></i>
              <span>充值</span>
            </div>
            <span>为学员充值</span>
            <el-input-number style="margin-left:20px;margin-top:20px" v-model="charegeNum" :min="1" :max="1000" label="课程课时"></el-input-number>
            <span>课时</span>
            <el-button style="margin-left:20px" type="primary" @click="openConfirm(3)">充值</el-button>
          </div>
          <div class="class-title">
            <i class="el-icon-date"></i>
            <span>充值记录</span>
          </div>
          <el-table :data="chargeData" v-if="chargeData.length" style="width: 80%; margin:0 auto">
            <el-table-column prop="date" label="充值时间" width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="充值课时" width="auto">
            </el-table-column>
            <el-table-column prop="user" label="操作人员" width="auto">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 修改课时弹出框 -->
      <el-dialog width="30%" title="修改课时" :visible.sync="changeClassVisible" append-to-body>
        <el-form ref="changeClass" :model="changeClassform" label-width="80px">
          <el-form-item label="课程名称">
            <span>{{changeClassform.className}}</span>
          </el-form-item>
          <el-form-item label="已上课时">
            <el-input-number v-model="changeClassform.hadClass" :min="0" :max="Number(changeClassform.totalClass)" label="已上课时"></el-input-number>
          </el-form-item>
          <el-form-item label="总课时">
            <span>{{changeClassform.totalClass}}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitChangeHadClass">修改</el-button>
            <el-button @click="changeClassVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 转班弹出框 -->
      <el-dialog width="30%" title="转班" :visible.sync="transClassVisible" append-to-body>
        <el-form ref="changeClass" :model="transClassform" label-width="80px">
          <el-form-item label="当前班级">
            <span>{{transClassform.oldClassName}}</span>
          </el-form-item>
          <el-form-item label="课时情况">
            <span>{{transClassform.progress}}</span>
          </el-form-item>
          <el-form-item label="转到">
            <el-select v-model="transClassform.newClassId" placeholder="选择班级">
              <el-option v-for="(cls,index) in classList" :key="index" :label="cls.name" :value="cls.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitTransClass">确定</el-button>
            <el-button @click="transClassVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 续课弹出框 -->
      <el-dialog width="30%" title="续课" :visible.sync="renewClassVisible" append-to-body>
        <el-form ref="changeClass" :model="renewClassform" label-width="80px">
          <el-form-item label="续课班级">
            <span>{{renewClassform.className}}</span>
          </el-form-item>
          <el-form-item label="课时情况">
            <span>{{renewClassform.progress}}</span>
          </el-form-item>
          <el-form-item label="可用课时">
            <span>{{renewClassform.balanceNum}}</span>
          </el-form-item>
          <el-form-item label="续课课时">
            <el-input-number v-model="renewClassform.renewNum" :min="0" :max="Number(renewClassform.balanceNum)" label="续课课时"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRenewClass">确定</el-button>
            <el-button @click="renewClassVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
    <student-add-class @close="addClassShow = false" :dialogVisible="addClassShow" :add-class-form="addClassForm" @refresh="refreshStudentInfo"></student-add-class>
  </div>
</template>
<script>
import StudentAddClass from "../com/StudentAddClass.vue";
import {
  getStudentInfo,
  changeStudentInfo,
  changeExpendNum,
  stopClass,
  pauseClass,
  continueClass,
  renewClass,
  transClass,
  getClassList,
  getStudentClassInfo,
  getStudentClassHistory,
  chargeStudent,
  getStudentChargeHistory
} from "../../api/getData";
export default {
  props: {
    placeText: {
      type: String,
      default: "请输入搜索内容"
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    studentId: {
      type: String,
      default: "0"
    }
  },
  mounted() {},
  data() {
    return {
      tabName: "课程情况",
      infoForm: {},
      editForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入学生姓名",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入家长联系方式",
            trigger: "blur"
          }
        ]
      },
      changeClassform: {
        studentName: "",
        className: "",
        hadClass: 0,
        totalClass: 0,
        orderId: 0
      },
      /* 转班时需要获取当前校区课程 */
      schoolClasses: [],
      /* 转班数据 */
      transClassform: {
        oldClassName: "",
        oldClassOrderId: "",
        progress: "6/16",
        newClassId: ""
      },
      /* 续课数据 */
      renewClassform: {
        orderId: "",
        className: "",
        balanceNum: "",
        progress: "",
        renewNum: 16
      },
      addClassForm: {},
      /* 上课记录 */
      historyData: [],
      /* 课程信息 */
      classData: [],
      /* 充值记录 */
      chargeData: [
        {
          date: "2017-01-01",
          num: 64,
          user: "admin"
        }
      ],
      charegeNum: 1,
      changeClassVisible: false,
      transClassVisible: false,
      renewClassVisible: false,
      // 课程列表（用于转班）
      classList: [],
      historyCount: 10,
      historyPage: 1,
      // 展示编辑
      editInfoShow: false,
      // 展示信息
      infoShow: true,
      // 添加课程面板
      addClassShow: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    /* 获取学生基本信息 */
    async getStudentInfo() {
      let res = await getStudentInfo({ id: this.studentId });
      this.log(`${this.studentId}学生信息`, res.ok);
      if (res.ok) {
        this.infoForm = res.data;
        // 这个等下会变，所以要先复制一下
        this.editForm = JSON.parse(JSON.stringify(res.data));
      }
    },
    /* 获取学生课程信息 */
    async getStudentClasses() {
      let res = await getStudentClassInfo({ studentId: this.studentId });
      console.log(res);
      if (res.ok) {
        this.classData = res.list;
      }
    },
    /* 获取学生课程记录 */
    async getStuClsHistory(page) {
      let res = await getStudentClassHistory({
        studentId: this.studentId,
        page: page || 0
      });
      console.log(res);
      if (res.ok) {
        this.historyCount = res.count;
        this.historyData = res.list;
      }
    },
    async getStudentChargeHis() {
      let res = await getStudentChargeHistory({ studentId: this.studentId });
      console.log(res);
      if (res.ok) {
        this.chargeData = res.list;
      }
    },
    showEditInfo(flag) {
      if (flag) {
        this.editInfoShow = true;
        this.infoShow = false;
      } else {
        this.editInfoShow = false;
        this.infoShow = true;
      }
    },
    async submitEditInfo() {
      let res = await changeStudentInfo({
        id: this.studentId,
        name: this.editForm.name,
        phone: this.editForm.phone
      });
      if (res.ok) {
        this.$message({
          type: "success",
          message: "编辑成功!"
        });
        this.getStudentInfo();
        this.$emit("renewStudentList");
        this.showEditInfo(false);
      }
    },
    changeClass(value, direction, movedKeys) {
      if (this.allClass - this.classChoose.length * 16 < 0) {
        this.$message.error("您的剩余课时不够添加这些课程哦");
        movedKeys.forEach(key => {
          this.classChoose.splice(
            this.classChoose.findIndex(value => {
              return value == key;
            })
          );
        }, this);
        return;
      }
      this.restClass = this.allClass - this.classChoose.length * 16;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleTabClick(tab) {
      if (tab.name == "课程情况") {
        this.getStudentClasses();
      } else if (tab.name == "上课记录") {
        this.getStuClsHistory();
      } else if (tab.name == "充值相关") {
        this.getStudentChargeHis();
      }
    },
    /* 课程课时修改 */
    openClassChange(data) {
      console.log(data);
      this.changeClassform.className = data.lessonName;
      this.changeClassform.hadClass = data.expendNum;
      this.changeClassform.totalClass = data.num;
      this.changeClassform.orderId = data.id;
      this.changeClassVisible = true;
    },
    async submitChangeHadClass() {
      let res = await changeExpendNum({
        id: this.changeClassform.orderId,
        expendNum: this.changeClassform.hadClass
      });
      if (res.ok) {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.refreshStudentInfo();
        this.changeClassVisible = false;
      }
    },
    /* 转班修改 */
    openClassTrans(data) {
      console.log(data);
      this.transClassform.oldClassName = data.lessonName;
      this.transClassform.progress = data.expendNum + "/" + data.num;
      this.transClassform.oldClassOrderId = data.id;
      this.getSchoolClasses();
      this.transClassVisible = true;
    },
    async getSchoolClasses() {
      let res = await getClassList({ schoolId: this.infoForm.schoolId });
      console.log(res);
      if (res.ok) {
        this.classList = res.list;
      }
    },
    async submitTransClass() {
      console.log("确定转班");
      let newClassName = this.switchIdorName(
        this.transClassform.newClassId,
        this.classList,
        "id"
      );
      if (newClassName == this.transClassform.oldClassName) {
        this.$message.error("不能转到相同的班级哦");
        return;
      }
      let res = await transClass({
        id: this.transClassform.oldClassOrderId,
        transferLessonId: this.transClassform.newClassId
      });
      console.log(res);
      if (res.ok) {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.refreshStudentInfo();
        this.transClassVisible = false;
      }
    },
    /* 续课修改 */
    openRenewClass(data) {
      this.renewClassform.orderId = data.id;
      this.renewClassform.balanceNum = this.infoForm.balanceNum;
      this.renewClassform.progress = data.expendNum + "/" + data.num;
      this.renewClassform.className = data.lessonName;
      this.renewClassVisible = true;
    },
    async submitRenewClass() {
      if (this.renewClassform.renewNum > this.renewClassform.balanceNum) {
        this.$message.error("可用课时不足哦");
      }
      let res = await renewClass({
        id: this.renewClassform.orderId,
        num: this.renewClassform.renewNum
      });
      if (res.ok) {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.refreshStudentInfo();
        this.renewClassVisible = false;
        this.renewClassform.renewNum = 0;
      }
    },
    /* 打开添加课程界面 */
    openAddClass() {
      this.addClassShow = true;
      this.addClassForm.name = this.infoForm.name;
      this.addClassForm.balanceNum = this.infoForm.balanceNum;
      this.addClassForm.singleClass = 16;
      this.addClassForm.studentId = this.studentId;
      this.addClassForm.schoolId = this.infoForm.schoolId;
    },
    /* 确认框，暂时分为续课和停课 */
    async openConfirm(type, data) {
      let text;
      console.log(data);
      if (type == 1) {
        text = `本次操作将暂停该学员的${data.lessonName}课程，是否确认？`;
      } else if (type == 2) {
        text = `本次操作将停止该学员的${data.lessonName}课程，剩余${Number(data.num) -
          Number(data.expendNum)}课时将自动转入该学员剩余课时，是否确认？`;
      } else if (type == 3) {
        text = `本次操作将从为学员充值${this.charegeNum}课时，是否确认？`;
      } else if (type == 4) {
        text = `本次操作会将该学员的${data.lessonName}课程复课，是否确认？`;
      }
      this.$confirm(text, "确认操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(async () => {
          if (type == 1) {
            console.log(111);
            let res = await pauseClass({ id: data.id });
            console.log(res);
            if (res.ok) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }
          } else if (type == 2) {
            let res = await stopClass({ id: data.id });
            console.log(res);
            if (res.ok) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }
          } else if (type == 3) {
            let res = await chargeStudent({
              studentId: this.studentId,
              num: this.charegeNum
            });
            console.log(res);
            if (res.ok) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              this.getStudentChargeHis();
            }
          } else if (type == 4) {
            let res = await continueClass({ id: data.id });
            console.log(res);
            if (res.ok) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
            }
          }
          this.refreshStudentInfo();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    calClassType(tag) {
      switch (tag) {
        case "请假":
          return "danger";
          break;
        case "已上":
          return "success";
          break;
        case "待上":
          return "primary";
          break;

        default:
          break;
      }
    },
    /* 分页请求课程记录 */
    handleClassHistoryPageChange(val) {
      this.historyPage = val;
      this.getStuClsHistory(val - 1);
    },
    /* 在修改后刷新学生数据 */
    refreshStudentInfo() {
      this.getStudentInfo();
      this.getStudentClasses();
      this.$emit("renewStudentList");
    }
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) {
        this.getStudentInfo();
        this.tabName = "基本信息";
      }
    }
  },
  components: {
    StudentAddClass
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.detail-form {
  width: 500px;
  margin: 0 auto;
}
.class-title {
  font-size: 18px;
  margin-top: 20px;
}
/* .class-checkboxs{
  text-align: center;
} */
.el-transfer-panel__item .el-checkbox__input {
  left: 40px;
}
.el-transfer-panel .el-transfer-panel__header {
  padding-left: 0;
}
/* .el-form-item__content {
  text-align: left; 
} */
.el-transfer {
  text-align: center;
}
</style>
