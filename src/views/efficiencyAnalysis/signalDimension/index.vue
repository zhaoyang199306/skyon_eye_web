<template>
  <div class="panoramic-cust-info-context">

    <div>
      <el-form :model="form" ref="form" label-width="120px" class="el-col-24">
        <!--      机构预警情况总体概览  -->
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">信号维度分析总体概览</p>
              </div>
            </div>
          </div>
          <!--          table 1-->
          <div style="padding-left: 20px">
            <p>当前所选机构：所有机构； 当前所选产品：所有产品； 时间：截至 2020-06；</p>
            <p>在此期间内触发预警规则<span> {{touchWarnTotal}} </span>条，
              其中触发一级风险等级规则<span> {{oneRiskLevelNum}} </span>条，
              占比<span> {{oneRiskLevelRatio}} </span>；
              触发二级风险等级规则<span> {{twoRiskLevelNum}} </span>条，
              占比<span> {{twoRiskLevelRatio}} </span>；
              触发三级风险等级规则<span> {{threeRiskLevelNum}} </span>条，
              占比<span> {{threeRiskLevelRatio}} </span>。</p>
            <el-table border stripe highlight-current-row :data="touchAlarmTableData">
              <template v-for="(item ,index) in touchAlarmTableColumns ">

                <el-table-column
                  v-if="!item.children" :key="item.key" :label="item.name" show-overflow-tooltip
                  :min-width="item.minWidth" :width="item.width" align="center">
                  <template slot-scope="scope">
                    {{scope.row[index] }}
                  </template>
                </el-table-column>
                <el-table-column v-else :key="item.key" :label="item.name" align="center">
                  <el-table-column v-for="(s_item,i) in item.children" :key="s_item.key"
                                   :label="s_item.name" align="center">
                    <template slot-scope="scope">
                      {{scope.row[getIndex(index,i)]}}
                    </template>
                  </el-table-column>
                </el-table-column>
              </template>
            </el-table>
          </div>

          <!--          table 2-->
          <div style="padding-left: 20px">
            <p>所有一级预警等级规则中，规则覆盖率高于30%有<span> {{touchWarnTotal}} </span>条;
              连续3个月规则转化率为0%的有<span> {{oneRiskLevelNum}} </span>条;
              连续6个月规则转化率为0%的有<span> {{oneRiskLevelRatio}} </span>；
              连续12个月规则转化率为0%的有<span> {{twoRiskLevelNum}} </span>条。</p>
            <el-table border stripe highlight-current-row :data="touchAlarmTableData">
              <template v-for="(item ,index) in touchAlarmTableColumns ">

                <el-table-column
                  v-if="!item.children" :key="item.key" :label="item.name" show-overflow-tooltip
                  :min-width="item.minWidth" :width="item.width" align="center">
                  <template slot-scope="scope">
                    {{scope.row[index] }}
                  </template>
                </el-table-column>
                <el-table-column v-else :key="item.key" :label="item.name" align="center">
                  <el-table-column v-for="(s_item,i) in item.children" :key="s_item.key"
                                   :label="s_item.name" align="center">
                    <template slot-scope="scope">
                      {{scope.row[getIndex(index,i)]}}
                    </template>
                  </el-table-column>
                </el-table-column>
              </template>
            </el-table>
          </div>

        </div>


      </el-form>
    </div>


  </div>
</template>

<script>
  export default {
    name: "signalDimension",
    data() {
      return {
        // 共触发预警规则条数
        touchWarnTotal:'- -',
        // 一级 条数
        oneRiskLevelNum:'- -',
        // 一级 占比
        oneRiskLevelRatio:'- -%',
        // 二级 条数
        twoRiskLevelNum:'- -',
        // 二级 占比
        twoRiskLevelRatio:'- -%',
        // 三级 条数
        threeRiskLevelNum:'- -',
        // 三级 占比
        threeRiskLevelRatio:'- -%',
        // 触警table 垂直表头
        touchAlarmTableTitle: ['触发一级风险规则数', '触发二级风险规则数', '触发三级风险规则数','合计'],
        // 触警table 表数据
        touchAlarmTableData: [],
        touchAlarmTableOriginData: [],
        // 触警table 表头
        touchAlarmTableColumns: [
          {key: 'key1', name: '指标', minWidth: 90},
          {key: 'key2', name: '系统上线以来累计', minWidth: 90},
        ],
        // 年月表头
        monthTitleArr:[],
      }
    },
    props: {
      form: Object,
      queryDate: Date,
    },
    created() {
      this.yearMonth();
      this.touchAlarmTableColumns = this.touchAlarmTableColumns.concat(this.monthTitleArr);
      this.setTouchAlarmTable();
    },
    computed: {},
    mounted() {
    },
    methods: {

      // 触警table 的 data 赋值
      setTouchAlarmTable() {
        // 触警table 的 OriginData 赋值
        this.setTouchAlarmTableOriginData();

        // 数组按矩阵思路, 变成转置矩阵
        if (this.touchAlarmTableOriginData) {
          let matrixData = this.touchAlarmTableOriginData.map((row, i) => {
            let arr = [];
            for (let key in row) {
              arr.push(row[key])
            }
            return arr
          });
          console.log("]]]]]]]]]]]]]");
          console.log(matrixData);
          // 加入标题拼接最终的数据
          this.touchAlarmTableData = matrixData.map((col, i) => {
            console.log(col);
            return [this.touchAlarmTableTitle[i], ...col.map((data) => {
              return data
            })]
          });
          console.log(this.touchAlarmTableData);
        }
      },
      // 触警table 的 OriginData 赋值
      setTouchAlarmTableOriginData(){
        console.log("==========信号维度分析=====================");
        console.log(this.form.dpRmMonRuleSignals);
        if (this.form.dpRmMonRuleSignals && this.form.dpRmMonRuleSignals.length > 0){
          // 合计
          let sum = {zero:0,one:0,two:0,three:0,four:0,five:0,six:0};
          for (let i = 0; i < this.form.dpRmMonRuleSignals.length; i++) {
            let element = this.form.dpRmMonRuleSignals[i];
            // 单月份
            let da = {
                      zero:element[0].hitCustNum,
                      one:element[1].hitCustNum,
                      two:element[2].hitCustNum,
                      three:element[3].hitCustNum,
                      four:element[4].hitCustNum,
                      five:element[5].hitCustNum,
                      six:element[6].hitCustNum};
            sum.zero = sum.zero + element[0].hitCustNum;
            sum.one = sum.one + element[1].hitCustNum;
            sum.two = sum.two + element[2].hitCustNum;
            sum.three = sum.three + element[3].hitCustNum;
            sum.four = sum.four + element[4].hitCustNum;
            sum.five = sum.five + element[5].hitCustNum;
            sum.six = sum.six + element[6].hitCustNum;
            this.touchAlarmTableOriginData = this.touchAlarmTableOriginData.concat(da);
          }
          this.touchAlarmTableOriginData = this.touchAlarmTableOriginData.concat(sum);
          // 总体概览
          this.touchWarnTotal = this.touchAlarmTableOriginData[3].zero;
          this.oneRiskLevelNum = this.touchAlarmTableOriginData[0].zero;
          this.twoRiskLevelNum = this.touchAlarmTableOriginData[1].zero;
          this.threeRiskLevelNum = this.touchAlarmTableOriginData[2].zero;
          this.oneRiskLevelRatio =((this.touchAlarmTableOriginData[3].zero === 0)?
            "0%" :Math.round( this.touchAlarmTableOriginData[0].zero*100/this.touchAlarmTableOriginData[3].zero) +"%");
          this.twoRiskLevelRatio = ((this.touchAlarmTableOriginData[3].zero === 0)?
            "0%" :Math.round( this.touchAlarmTableOriginData[1].zero*100/this.touchAlarmTableOriginData[3].zero) +"%");
          this.threeRiskLevelRatio = ((this.touchAlarmTableOriginData[3].zero === 0)?
            "0%" :Math.round( this.touchAlarmTableOriginData[2].zero*100/this.touchAlarmTableOriginData[3].zero) +"%");

          // 计算百分比 并 拼接格式为:   【数量;百分比】
          for (let i = 0; i < 3; i++) {
            let tmp = this.touchAlarmTableOriginData[i];
            let sum = this.touchAlarmTableOriginData[3];
             tmp.zero =tmp.zero+" ; "+  ((sum.zero === 0)? "0%" :Math.round(tmp.zero*100/sum.zero) +"%");
             tmp.one =tmp.one+" ; "+  ((sum.one === 0)? "0%" :Math.round(tmp.one*100/sum.one) +"%");
             tmp.two =tmp.two+" ; "+  ((sum.two === 0)? "0%" :Math.round(tmp.two*100/sum.two) +"%");
             tmp.three =tmp.three+" ; "+ ((sum.three === 0)? "0%" :Math.round(tmp.three*100/sum.three) +"%");
             tmp.four =tmp.four+" ; "+  ((sum.four === 0)? "0%" :Math.round(tmp.four*100/sum.four) +"%");
             tmp.five =tmp.five+" ; "+  ((sum.five === 0)? "0%" :Math.round(tmp.five*100/sum.five) +"%");
             tmp.six =tmp.six+" ; "+  ((sum.six === 0)? "0%" :Math.round(tmp.six*100/sum.six) +"%");
          }
        }
      },
      //  计算标
      getIndex(index,i){
        let tmpi = i;
        for (let j = 0; j < index; j++) {
          if (this.touchAlarmTableColumns[j].children){
            tmpi = tmpi + this.touchAlarmTableColumns[j].children.length;
          } else {
            tmpi++;
          }
        }
        return tmpi;
      },
      /**
       *  根据年月 计算 年 - 月  ， 往前推5个月
       *  eg：2021-3
       *                    ——————————————————————————————————————————————————————————————————————————————————————
       *  result:         |               2020年                |                           2021 年             |
       *                  | 10月份       | 11月份      | 12月份|         1月份             |2月份           |3月份|
       *                  ————————————————————————————————————————————————————————————————————————————————————————
       *                  1   8 9 10 11 12 1     5
       *                  2   9 10 11 12 1 2     4
       *                  3   10 11 12 1 2 3     3
       *                  4   11 12 1 2 3 4      2
       *                  5   12 1 2 3 4 5       1
       *                  6   1 2 3 4 5 6        0
       *                  7   2 3 4 5 6 7        0
       *                  num    parseInt((7+num)/13)+(7+num)%13
       *                  year   6-num
       */
      yearMonth(){
        let date = new Date(this.queryDate);
        let fullYear = date.getFullYear(); // 年份
        let lastFullYear = fullYear -1 ; // 上一年
        let month = date.getMonth() + 1; // 月份
        let monthArr = [parseInt((7+month)/13)+(7+month)%13,
                        parseInt((8+month)/13)+(8+month)%13,
                        parseInt((9+month)/13)+(9+month)%13,
                        parseInt((10+month)/13)+(10+month)%13,
                        parseInt((11+month)/13)+(11+month)%13,
                        parseInt((12+month)/13)+(12+month)%13]; // 计算的月份 数组
        let childrenArr = [];
        monthArr.forEach((data,index)=>{
          childrenArr = childrenArr.concat({
            key:index,
            name:data + '月份',
            minWidth: 90
          });
        });
        if (month < 6 ){ // 月份小月6 的，就需要增加上一年份
          this.monthTitleArr = [{name: lastFullYear+'年', children: childrenArr.slice(0,6-month)},
                                  {name: fullYear+'年',children: childrenArr.slice(6-month,6)}];
        } else {
          this.monthTitleArr = [{name: lastFullYear+'年', children: childrenArr}];
        }
        console.log(this.monthTitleArr);
      },
    },
    watch: {},
  }
</script>

<style scoped>
  .panoramic-cust-info-context span {
    color: #0069BA;
    font-weight: bold;
  }

</style>
