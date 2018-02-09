<template>
    <div class="student-detail">
        <el-dialog :title="'学员详情 - 王小虎'" :before-close="close" :show-close="false" :visible.sync="dialogVisible" width="60%">
            <el-tabs>
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
                <el-tab-pane label="课程记录">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="上课时间" sortable width="180">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="课程名称" width="280">
                        </el-table-column>
                        <el-table-column prop="address" label="备注" :formatter="formatter">
                        </el-table-column>
                        <el-table-column prop="tag" label="出勤状态" width="100" :filters="[{ text: '请假', value: '请假' }, { text: '到课', value: '到课' }, { text: '待上', value: '待上' }]" :filter-method="filterTag" filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag :type="calClassType(scope.row.tag)" close-transition>{{scope.row.tag}}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>

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
        allClass: [],
        singleClass: [],
        restClass: []
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
      ]
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
</style>
