<template>
    <div class="class-list">

        <h1 class="class-list-title">{{title}}</h1>
        <el-table v-if="classList.length>0" @cell-dblclick="clickCell" :data="classList[index]" border :span-method="objectSpanMethod" v-for="(classDetail,index) of classList" :key="index">
            <el-table-column :prop="item.prop" :label="item.label" v-for="(item,index) of heads" :key="index">
            </el-table-column>
        </el-table>
        <h2 v-if="classList.length===0">暂无课程</h2>
        <el-select v-model="school" placeholder="请选择要查看的校区" class="school-select">
            <el-option v-for="(item,index) in schoolList" :key="index" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<style lang="css">
.class-list thead {
    display: none !important;
    text-align: center;
}
.class-list div:nth-of-type(1) thead {
    display: table-header-group !important;
}
.class-list .el-table__body-wrapper {
    margin-top: 0px;
}
.school-select {
    width: 900px;
    margin: 20px auto;
}
</style>

<script>
import { getSchool, getClassDetail } from '../api/getData1';
export default {
    async created() {
        this.getSchoolList();
    },
    data() {
        return {
            schoolList: [],
            school: '',
            // 课程表名称
            title: null,
            // 表头字段
            heads: [
                {
                    // 表头键值
                    prop: 'week',
                    // 表头名称
                    label: '日期'
                },
                {
                    prop: 'noon',
                    label: '时间段'
                },
                {
                    prop: 'hour',
                    label: '上课时间'
                },
                {
                    prop: 'classA',
                    label: 'A教室'
                },
                {
                    prop: 'classB',
                    label: 'B教室'
                },
                {
                    prop: 'classC',
                    label: 'C教室'
                },
                {
                    prop: 'classD',
                    label: 'D教室'
                },
                {
                    prop: 'classE',
                    label: 'E教室'
                },
                {
                    prop: 'classF',
                    label: 'F教室'
                },
                {
                    prop: 'classG',
                    label: 'G教室'
                }
            ],
            // 班级列表
            classList: [
                [
                    {
                        // 上课天
                        weekday: '周一',
                        // 时间段
                        noon: '下午',
                        // 具体时间
                        hour: '17:00-18:30',
                        // 班级名称
                        classC: '领袖口才（四级)',
                        classF: '创意想象（一班）',

                        id: [
                            {
                                lessonName: '领袖口才（四级）',
                                lessonId: 131
                            },
                            {
                                lessonName: '创意想象（一班）',
                                lessonId: 132
                            }
                        ]
                    },
                    {
                        week: '周一',
                        noon: '下午',
                        hour: '17:45-18:45',
                        classF: '创意想象（一班）'
                    },
                    {
                        week: '周一',
                        noon: '下午',
                        hour: '18:30-20:00',
                        classA: '炫舞拉丁(启蒙)',
                        classB: '炫舞拉丁(启蒙)'
                    }
                ],
                [
                    {
                        week: '周二',
                        noon: '下午',
                        hour: '18:30-20:00',
                        classC: '炫舞拉丁(启蒙)',
                        classF: '炫舞拉丁(启蒙)'
                    }
                ],
                [
                    {
                        week: '周三',
                        noon: '下午',
                        hour: '17:30-19:00',
                        classF: '创意想象'
                    },
                    {
                        week: '周三',
                        noon: '下午',
                        hour: '18:15-19:45',
                        classE: '领袖口才1级'
                    },
                    {
                        week: '周三',
                        noon: '晚上',
                        hour: '19:00-20:00',
                        classB: '领袖口才1级',
                        classA: '流行街舞'
                    }
                ],
                [
                    {
                        week: '周四',
                        noon: '下午',
                        hour: '17:00-18:30',
                        classE: '创意想象',
                        classA: '形体气质'
                    }
                ],
                [
                    {
                        week: '周五',
                        noon: '下午',
                        hour: '17:30-19:00',
                        classF: '炫舞拉丁'
                    },
                    {
                        week: '周五',
                        noon: '下午',
                        hour: '19:00-20:00',
                        classD: '领袖口才(艺术团)'
                    }
                ]
            ]
        };
    },
    watch: {
        school() {
            this.getClass();
        }
    },
    methods: {
        async getSchoolList() {
            // 获取校区
            const res = await getSchool();

            res.list.forEach(element => {
                var temp = {
                    value: element.name,
                    label: element.name
                };
                this.schoolList.push(temp);
            });
            this.school = this.schoolList[0].value;
        },
        async getClass() {
            const res = await getClassDetail({
                school: this.school
            });
            this.title = res.title;
            this.heads = res.heads;
            this.classList = res.list;
        },
        clickCell(row, column, cell, event) {
            const tempName = cell.innerHTML.replace('<div class="cell">', '');
            const className = tempName.replace('</div>', '');
            const query = {
                weekday: row.weekday,
                startTime: row.startTime,
                endTime: row.endTime,
                location: column.label,
                lessonName: row[column.property]
            };
            console.log(row);
            console.log(column);
            console.log(cell);
            // console.log(query);
            // 如果点击空课程表，跳转到课程添加页面
            if (!className) {
                this.$router.push({
                    path: '/addClass',
                    query: query
                });
                return;
            }
            if (
                className.indexOf('周') > -1 ||
                className.indexOf('上午') > -1 ||
                className.indexOf('下午') > -1 ||
                className.indexOf('晚上') > -1 ||
                className.indexOf('-') > -1
            ) {
                console.log(123);
            } else {
                this.$router.push({
                    path: '/classDetail',
                    query: query
                });
            }
        },
        selectClass(classId) {
            console.log(classId);
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex % 2 === 0) {
                if (columnIndex === 0) {
                    return [1, 2];
                } else if (columnIndex === 1) {
                    return [0, 0];
                }
            }
        },

        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                switch (rowIndex) {
                    case 0:
                        return {
                            rowspan: 10,
                            colspan: 1
                        };
                    case 1:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 2:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 3:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 4:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 5:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 6:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 7:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 8:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 9:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 10:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 11:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 12:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    case 13:
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                }
            }
        }
    }
};
</script>