<template>
  <div class="student-detail">
    <el-dialog class="detail-dialog" :title="'学员详情 - 王小虎'" :before-close="close" :show-close="false" :visible.sync="dialogVisible" width="1100px">
      <el-tabs>
        <!-- 基本信息页 -->
        <el-tab-pane label="基本信息">
          <el-form class="detail-form" ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="学员姓名" prop="studentName">
              <el-input v-model="form.studentName"></el-input>
            </el-form-item>
            <el-form-item label="学员家长" prop="parentName">
              <el-input v-model="form.parentName"></el-input>
            </el-form-item>
            <el-form-item label="家长联系方式" prop="parentContact">
              <el-input v-model="form.parentContact"></el-input>
            </el-form-item>
            <el-form-item label="校区">
              <el-select v-model="form.school" placeholder="请选择校区">
                <el-option label="天府校区" value="shanghai"></el-option>
                <el-option label="锦江校区" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="剩余可用课时" prop="allClass">
              <el-input-number v-model="form.allClass" :min="0" :max="1000" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="单个课程课时" prop="singleClass">
              <el-input-number v-model="form.singleClass" :min="0" :max="1000" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="添加课程">
              <el-checkbox-group v-model="form.type">
                <el-transfer @change="changeClass" v-model="form.classChoose" :titles="['校区课程', '已参加课程']" :data="classData"></el-transfer>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="添加后剩余课时" prop="restClass">
              <p class="class-overplus">{{form.restClass}}</p>
            </el-form-item>
            <el-form-item label="其他备注">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">修改信息</el-button>
              <el-button @click="close">关闭</el-button>
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
                <el-button size="small" type="success" @click="openConfirm(1,scope.row)">续课</el-button>
                <el-button size="small" type="danger" @click="openConfirm(2,scope.row)">停课</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="class-title">
            <i class="el-icon-date"></i>
            <span>上课记录</span>
          </div>
          <el-table :data="tableData" style="width: 100%" height="300">
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
    </el-dialog>
  </div>
</template>



<script>
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
    studentIndex: {
      type: Number,
      default: 0
    }
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
      form: {
        studentName: "",
        parentName: "",
        parentContact: "",
        school: "天府校区",
        allClass: 0, // 总充值课程数
        singleClass: 0, // 单个课程的课时
        restClass: 32, // 剩余（未使用）课时数
        classChoose: [], //选择要参加的课时
        type: [],
        desc: ""
      },
      rules: {
        studentName: [{ required: true, message: "请输入学生姓名", trigger: "blur" }],
        parentName: [{ required: true, message: "请输入家长称呼", trigger: "blur" }],
        parentContact: [
          { required: true, message: "请输入家长联系方式", trigger: "blur" }
        ],
        // allClass: [],
        // singleClass: [],
        // restClass: []
      },
      changeClassform: {
        className: "",
        hadClass: 0,
        totalClass: 0
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
      changeClassVisible: false
    };
  },
  methods: {
    close() {
      console.log(11);
      this.$emit("close");
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
    /* 确认框，暂时分为续课和停课 */
    openConfirm(type, data) {
      let text;
      console.log(data);
      if (type == 1){
        text = `本次操作将从学员剩余课时中扣除${Number(data.progress.split("/")[1])}课时，用以续开一期${data.className}课程，是否确认？`
      } else if (type == 2) {
        text =  `本次操作将停止该学员的${data.className}课程，剩余${Number(data.progress.split("/")[1]) - Number(data.progress.split("/")[0])}课时将自动转入该学员剩余课时，是否确认？`
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail-form {
  width: 800px;
  margin: 0 auto;
}
.class-title {
  font-size: 18px;
  margin-top: 40px;
}
</style>
