<template>
  <div class="student-detail">
    <el-dialog class="detail-dialog" :title="'学员详情 - 王小虎'" :before-close="close" :show-close="false" :visible.sync="dialogVisible" width="1200px">
      <el-tabs>
        <!-- 基本信息页 -->
        <el-tab-pane label="基本信息">
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
        <el-tab-pane label="课程情况">
          <div class="class-title">
            <i class="el-icon-date"></i>
            <span>课程情况</span>
          </div>
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="className" label="课程名称" width="180">
            </el-table-column>
            <el-table-column prop="date" label="上课时间" width="140">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="progress" label="课程进度" width="180">
              <template slot-scope="scope">
                <el-progress type="circle" :percentage="25" :width="27" :show-text="false"></el-progress>
                <span style="margin-left: 10px;font-size:16px;">{{ scope.row.progress }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="desc" label="备注">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="openClassChange(scope.row)">修改课时</el-button>
                <el-button size="small" type="warning" @click="openClassTrans(scope.row)">转班</el-button>
                <el-button size="small" type="success" @click="openConfirm(1,scope.row)">续课</el-button>
                <el-button size="small" type="danger" @click="openConfirm(2,scope.row)">停课</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin-top: 30px" @click="addClassShow = true">添加新课程</el-button>
        </el-tab-pane>
        <el-tab-pane label="上课记录">
          <div class="class-title">
            <i class="el-icon-date"></i>
            <span>上课记录</span>
          </div>
          <el-table :data="tableData" style="width: 90%; margin:0 auto">
            <el-table-column prop="date" label="上课时间" sortable width="180">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="课程名称" width="280">
            </el-table-column>
            <el-table-column prop="address" label="备注">
            </el-table-column>
            <el-table-column prop="tag" label="出勤状态" width="100" :filters="[{ text: '请假', value: '请假' }, { text: '到课', value: '到课' }, { text: '待上', value: '待上' }]" :filter-method="filterTag" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="calClassType(scope.row.tag)" close-transition>{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <div class="feed-back-pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination ref="paginat" background @current-change="handleClassHistoryPageChange" :current-page="historyPage" :page-size="10" layout="total, prev, pager, next" :total="count">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="充值相关">
          <div class="class-title">
            <i class="el-icon-date"></i>
            <span>充值记录</span>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 修改课时弹出框 -->
      <el-dialog width="30%" title="修改课时" :visible.sync="changeClassVisible" append-to-body>
        <el-form ref="changeClass" :model="changeClassform" label-width="80px">
          <el-form-item label="学员姓名">
            <span>王小虎</span>
          </el-form-item>
          <el-form-item label="课程名称">
            <span>{{changeClassform.className}}</span>
          </el-form-item>
          <el-form-item label="已上课时">
            <el-input-number v-model="changeClassform.hadClass" :min="1" :max="changeClassform.totalClass" label="已上课时"></el-input-number>
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
          <el-form-item label="学员姓名">
            <span>王小虎</span>
          </el-form-item>
          <el-form-item label="当前班级">
            <span>{{transClassform.oldClassName}}</span>
          </el-form-item>
          <el-form-item label="课时情况">
            <span>{{transClassform.progress}}</span>
          </el-form-item>
          <el-form-item label="转到">
            <el-select v-model="transClassform.newClassName" placeholder="选择班级">
              <el-option label="周一" value="周一"></el-option>
              <el-option label="周二" value="周二"></el-option>
              <el-option label="周三" value="周三"></el-option>
              <el-option label="周四" value="周四"></el-option>
              <el-option label="周五" value="周五"></el-option>
              <el-option label="周六" value="周六"></el-option>
              <el-option label="周日" value="周日"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitTransClass">确定</el-button>
            <el-button @click="transClassVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
    <student-add-class @close="addClassShow = false" :dialogVisible="addClassShow"></student-add-class>
  </div>
</template>



<script>
import StudentAddClass from "../com/StudentAddClass.vue";
import { getStudentInfo, changeStudentInfo } from "../../api/getData";
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
      type: Number,
      default: 12
    }
  },
  mounted() {
    this.getStudentInfo();
  },
  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `课程 ${i}`
          // disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      infoForm: {
        name: "王小虎",
        phone: "133333333",
        school: "天府校区"
      },
      editForm: {
        name: "王小虎",
        phone: "133333333",
        school: "天府校区"
      },
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
        // allClass: [],
        // singleClass: [],
        // restClass: []
      },
      changeClassform: {
        className: "",
        hadClass: 0,
        totalClass: 0
      },
      transClassform: {
        oldClassName: "",
        progress: "6/16",
        newClassName: ""
      },
      classData: generateData(),
      tableData: [
        {
          date: "2017-05-02",
          name: "领袖口才2017期",
          address: "无",
          tag: "到课"
        },
        {
          date: "2017-05-04",
          name: "形象气质2017期",
          address: "家人出门旅游",
          tag: "请假"
        },
        {
          date: "2017-05-01",
          name: "领袖口才2017期",
          address: "家长课后约谈",
          tag: "到课"
        },
        {
          date: "2017-05-03",
          name: "形象气质2017期",
          address: "参加学校考试",
          tag: "请假"
        },
        {
          date: "2018-05-03",
          name: "形象气质2018期",
          address: "无",
          tag: "待上"
        },
        {
          date: "2018-05-03",
          name: "形象气质2018期",
          address: "需要自带小板凳",
          tag: "待上"
        },
        {
          date: "2018-05-03",
          name: "形象气质2018期",
          address: "需要自带小板凳",
          tag: "待上"
        },
        {
          date: "2018-05-03",
          name: "形象气质2018期",
          address: "需要自带小板凳",
          tag: "待上"
        },
        {
          date: "2018-05-03",
          name: "形象气质2018期",
          address: "需要自带小板凳",
          tag: "待上"
        },
        {
          date: "2018-05-03",
          name: "形象气质2018期",
          address: "需要自带小板凳",
          tag: "待上"
        }
      ],
      tableData1: [
        {
          date: "周一 17:00-18:00",
          className: "领袖口才2017期1班",
          progress: "5/16",
          desc: "天府校区-E教室-小宇老师"
        },
        {
          date: "周二 17:00-18:00",
          className: "形象气质2017期2班",
          progress: "7/16",
          desc: "天府校区-D教室-小花老师"
        },
        {
          date: "周六 17:00-18:00",
          className: "领袖口才2018期1班",
          progress: "14/16",
          desc: "天府校区-A教室-小萌老师"
        }
      ],
      changeClassVisible: false,
      transClassVisible: false,
      count: 100,
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
      console.log(11);
      this.$emit("close");
    },
    async getStudentInfo() {
      let res = await getStudentInfo({ id: this.studentId });
      console.log(res);
      if (res.ok) {
        this.infoForm = res.data;
        // 这个等下会变，所以要先复制一下
        this.editForm = JSON.parse(JSON.stringify(res.data))
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
    /* 打开课程课时修改 */
    openClassChange(data) {
      console.log(data);
      this.changeClassform.className = data.className;
      this.changeClassform.hadClass = Number(data.progress.split("/")[0]);
      this.changeClassform.totalClass = Number(data.progress.split("/")[1]);
      this.changeClassVisible = true;
    },
    submitChangeHadClass() {
      console.log("确定修改课时");
    },
    /* 打开课程课时修改 */
    openClassTrans(data) {
      console.log(data);
      this.transClassform.oldClassName = data.className;
      this.transClassform.progress = data.progress;
      this.transClassVisible = true;
    },
    submitTransClass() {
      console.log("确定转班");
      console.log(this.transClassform);
    },
    /* 确认框，暂时分为续课和停课 */
    openConfirm(type, data) {
      let text;
      console.log(data);
      if (type == 1) {
        text = `本次操作将从学员剩余课时中扣除${Number(
          data.progress.split("/")[1]
        )}课时，用以续开一期${data.className}课程，是否确认？`;
      } else if (type == 2) {
        text = `本次操作将停止该学员的${data.className}课程，剩余${Number(
          data.progress.split("/")[1]
        ) - Number(data.progress.split("/")[0])}课时将自动转入该学员剩余课时，是否确认？`;
      }
      this.$confirm(text, "确认操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    calClassType(tag) {
      switch (tag) {
        case "请假":
          return "danger";
          break;
        case "到课":
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
      this.currentPage = val;
      // this.nowData = this.allData.slice(val * 10 - 10, val * 10);
    }
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal) this.getStudentInfo();
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
.el-form-item__content {
  text-align: left;
}
.el-transfer {
  text-align: center;
}
</style>
