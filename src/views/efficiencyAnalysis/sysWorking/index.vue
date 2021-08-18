<template>
  <div class="panoramic-cust-info-context">

    <div>
      <el-form :model="form" ref="form" label-width="120px" class="el-col-24">
        <!--      机构预警情况总体概览  -->
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">系统运营分析总体概览</p>
              </div>
            </div>
          </div>
          <!--          table 1-->
          <div style="padding-left: 20px">
            <p>当前所选机构：所有机构； 当前所选产品：所有产品； 时间：截至 2020-06；</p>
            <p>触警客户数<span>{{touchAlarmWarnCustNum}}</span>户，
              余额<span>{{touchAlarmWarnCustBal}}</span>亿，
              触警率<span>{{touchAlarmWarnCustRate}}</span>；</p> <span>点击查看触警客户清单</span>
            <p>出险客户数<span>{{touchAlarmAccidCustNum}}</span>户，
              出现率<span>{{touchAlarmAccidCustRate}}</span>，
              命中客户数<span>{{touchAlarmHitCustNum}}</span>户；
              命中率<span>{{touchAlarmHitCustRate}}</span>户；</p>

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
          <!--          table 2   风险准确-->
          <div style="padding-left: 20px">
            <p>风险认定数<span>{{riskAccuracyAffNum}}</span>户，
              认定为风险客户数<span>{{riskAccuracyAffRiskCustNum}}</span>亿；</p>
            <p>人工风险认定数<span>{{riskAccuracyArtAffNum}}</span>户，
              风险认定准确数<span>{{riskAccuracyArtAffRigNum}}</span>户，
              风险认定准确率<span>{{riskAccuracyArtAffRigRate}}</span>；</p>
            <p>系统风险认定数<span>{{riskAccuracySysAffNum}}</span>户，
              风险认定准确数<span>{{riskAccuracySysAffRigNum}}</span>户，
              风险认定准确率<span>{{riskAccuracySysAffRigRate}}</span>；</p>

            <el-table border stripe highlight-current-row :data="riskAccuracyTableData">
              <template v-for="(item ,index) in riskAccuracyTableColumns ">

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
                      {{scope.row[index]}}
                    </template>
                  </el-table-column>
                </el-table-column>
              </template>
            </el-table>


          </div>
          <!--          table 3-->
          <div style="padding-left: 20px">
            <p>人工风险认定失误数<span>{{riskMissArtAffWrgNum}}</span>户，
              人工风险认定失误率<span>{{riskMissArtAffWrgRate}}</span>；</p>
            <p>系统风险认定失误数<span>{{riskMissSysAffWrgNum}}</span>户，
              系统风险认定失误率<span>{{riskMissSysAffWrgRate}}</span>；</p>

            <el-table border stripe highlight-current-row :data="riskMissTableData">
              <template v-for="(item ,index) in riskMissTableColumns ">

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
                      {{scope.row[index]}}
                    </template>
                  </el-table-column>
                </el-table-column>
              </template>
            </el-table>


          </div>
          <!--          table 4-->
          <div style="padding-left: 20px">
            <p>漏报客户数<span>{{underReportMisDeteNum}}</span>户，
              漏报率<span>{{underReportMisDeteRate}}</span>；</p>
            <p>误报客户数<span>{{underReportMisinBal}}</span>户，
              误报率<span>{{underReportSysAffWrgRate}}</span>；</p>

            <el-table border stripe highlight-current-row :data="underReportTableData">
              <template v-for="(item ,index) in underReportTableColumns ">

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
                      {{scope.row[index]}}
                    </template>
                  </el-table-column>
                </el-table-column>
              </template>
            </el-table>


          </div>
        </div>

        <!--      预警余额统计  -->
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">预警余额统计</p>
              </div>
            </div>
          </div>
          <!--          table 1-->
          <div style="padding-left: 20px">

            <el-table border stripe highlight-current-row :data="ingBals">
              <el-table-column prop="analyTime" label="时间" />
              <el-table-column prop="prtName" label="机构名称" />
              <el-table-column prop="warnCustBal" label="预警客户余额" />
              <el-table-column prop="accidCustBal" label="出险客户余额" />
              <el-table-column prop="narSenRedAsBal" label="狭义挽回资产余额" />
              <el-table-column prop="broSenRedAsBal" label="广义挽回资产余额" />
            </el-table>


          </div>

        </div>
        <!--      趋势分析  -->
        <div class="el-col-24">
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">趋势分析</p>
              </div>
            </div>
          </div>
          <!--          触警率、出险率、命中率-->
          <div class="el-col-24" style="padding-left: 20px">
            <div style="width: 90%;height: 300px" id="financingHistory">
            </div>
          </div>
          <!--          人工认定准确率、系统认定准确率-->
          <div class="el-col-24" style="padding-left: 20px">
            <div style="width: 90%;height: 300px" id="accuracyEchar">
            </div>
          </div>
          <!--          漏报率、误报率-->
          <div class="el-col-24" style="padding-left: 20px">
            <div style="width: 90%;height: 300px" id="errorEchar">
            </div>
          </div>




        </div>
      </el-form>
    </div>


  </div>

</template>

<script>
  import {formatDateYM} from "../../../utils";

  export default {
    name: "sysWorking",
    // 父传子
    props: {
      form: Object,
      queryDate: Date,
    },
    data() {
      return {

        //-------------------触警table ---------------------
        // 触警客户数
        touchAlarmWarnCustNum:'- -',
        // 触警余额
        touchAlarmWarnCustBal:'- -',
        // 触警率
        touchAlarmWarnCustRate:'- -%',
        // 出险客户数
        touchAlarmAccidCustNum: '- -',
        // 出险率
        touchAlarmAccidCustRate: '- -%',
        // 命中客户数
        touchAlarmHitCustNum: '- -',
        // 命中率
        touchAlarmHitCustRate: '- -%',
        // 触警table 垂直表头
        touchAlarmTableTitle: ['触警客户数', '触警客户余额', '触警率', '出险客户数', '出险客户余额',
          '出险率', '命中客户数', '命中客户余额', '命中率'],
        // 触警table 表数据
        touchAlarmTableData: [],
        touchAlarmTableOriginData: [],
        // 触警table 表头
        touchAlarmTableColumns: [
          {key: 'key1', name: '指标', minWidth: 90},
          {key: 'key2', name: '系统上线以来累计', minWidth: 90},
        ],
        // 季度表头
        quarterTitleArr:[],

        //-------------------风险准确  riskAccuracy   Table ---------------------
        // 风险认定数
        riskAccuracyAffNum:'- -',
        // 认定为风险客户数
        riskAccuracyAffRiskCustNum:'- -',
        // 人工风险认定数
        riskAccuracyArtAffNum:'- -',
        // 人工认风险定数准确数
        riskAccuracyArtAffRigNum:'- -',
        // 人工风险认定准确率
        riskAccuracyArtAffRigRate:'- -%',
        // 系统风险认定数
        riskAccuracySysAffNum: '- -',
        // 系统风险认定数
        riskAccuracySysAffRigNum: '- -',
        // 系统风险认定准确率
        riskAccuracySysAffRigRate:'- -%',
        // 触警table 垂直表头
        riskAccuracyTableTitle: ['人工认定准确数', '人工认定准确余额', '人工认定准确率',
          '系统认定准确数', '系统认定准确余额', '系统认定准确率'],
        // 触警table 表数据
        riskAccuracyTableData: [],
        riskAccuracyTableOriginData: [],
        // 触警table 表头
        riskAccuracyTableColumns: [
          {key: 'key1', name: '指标', minWidth: 90},
          {key: 'key2', name: '系统上线以来累计', minWidth: 90},
        ],
        //-------------------风险失误  riskMiss   Table ---------------------
        // 风险认定数
        riskMissArtAffWrgNum:'- -',
        // 认定为风险客户数
        riskMissArtAffWrgRate:'- -',
        // 人工风险认定数
        riskMissSysAffWrgNum:'- -',
        // 人工认风险定数准确数
        riskMissSysAffWrgRate:'- -',

        // 风险失误  riskMiss table 垂直表头
        riskMissTableTitle: ['人工认定失误数', '人工认定失误余额', '人工认定失误率',
          '系统认定失误数', '系统认定失误余额', '系统认定失误率'],
        // 风险失误 riskMiss 表数据
        riskMissTableData: [],
        riskMissTableOriginData: [],
        // 触警table 表头
        riskMissTableColumns: [
          {key: 'key1', name: '指标', minWidth: 90},
          {key: 'key2', name: '系统上线以来累计', minWidth: 90},
        ],

        //-------------------漏报客户  underreport   Table ---------------------
        // 风险认定数
        underReportMisDeteNum:'- -',
        // 认定为风险客户数
        underReportMisDeteRate:'- -',
        // 人工风险认定数
        underReportMisinBal:'- -',
        // 人工认风险定数准确数
        underReportSysAffWrgRate:'- -',

        // 风险失误  underReport table 垂直表头
        underReportTableTitle: ['漏报户数', '漏报余额', '漏报率',
          '误报户数', '误报余额', '误报率'],
        // 风险失误 riskMiss 表数据
        underReportTableData: [],
        underReportTableOriginData: [],
        // 触警table 表头
        underReportTableColumns: [
          {key: 'key1', name: '指标', minWidth: 90},
          {key: 'key2', name: '系统上线以来累计', minWidth: 90},
        ],

        // --------------------------预警余额统计-----------------------------
        ingBals:{},
      }
    },
    mounted() {
      this.financingEcharts();
      this.setAccuracyEcharts();
      this.setErrorEcharts();
    },
    created() {
      console.log("----sysWorking----");
      console.log(this.form);
      console.log(this.queryDate);
      let s = formatDateYM(this.queryDate);

      this.yearQuarter();
      // 给 touchAlarmTitleArr 赋值

      this.touchAlarmTableColumns = this.touchAlarmTableColumns.concat(this.quarterTitleArr);
      this.setTouchAlarmTable();

      // 给 riskAccuracyTitleArr 赋值
      this.riskAccuracyTableColumns = this.riskAccuracyTableColumns.concat(this.quarterTitleArr);
      this.setRiskAccuracyTable();

      // 给 riskMissTitleArr 赋值
      this.riskMissTableColumns = this.riskMissTableColumns.concat(this.quarterTitleArr);
      this.setRiskMissTable();

      // 给 underReport 赋值
      this.underReportTableColumns = this.underReportTableColumns.concat(this.quarterTitleArr);
      this.setUnderReportTable();

      // 给 预警余额统计  赋值  ingBals
      this.setIngBasl();

    },


    methods: {
      // 漏报率、误报率
      setErrorEcharts(){
        // 基于准备好的dom，初始化 echarts 实例
        let myFinancingChart = this.$echarts.init(document.getElementById('errorEchar'));
        console.log("=======s====s========s=================");
        console.log(this.underReportTableData);
        let touchArr = [];
        let riskArr = [];
        this.underReportTableData.forEach((data,i)=>{
          if ("漏报率" === data[0] || "误报率" === data[0]){
            let common = [data[2].replace('%',''),data[3].replace('%',''),data[4].replace('%',''),data[5].replace('%','')];
            if ("漏报率" === data[0]){
              touchArr =common;
            } else if ("误报率" === data[0]){
              riskArr = common;
            }
          }
        });
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '漏报率、误报率',
            textStyle:{
              fontSize:16
            },
            // 标题padding：上右下左
            padding: [10, 0, 0, 100],
          },
          tooltip: {
            trigger: 'axis'
          },
          // 图例组件
          legend: {
            show:true,
            data:['漏报率','误报率'],
            top:"5%",
            textStyle: {
              fontSize: 14
            },
          },
          xAxis: {
            data: []
          },
          yAxis: {
            name:'%',
            type: 'value'
          },
          series: [{
            name: '漏报率',
            type: 'line',
            data:touchArr,
          },{
            name: '误报率',
            type: 'line',
            data: riskArr
          }]
        };
        console.log(option);

        // 使用刚指定的配置项和数据显示图表。
        myFinancingChart.setOption(option);
      },
      // 人工认定准确率、系统认定准确率
      setAccuracyEcharts(){
        // 基于准备好的dom，初始化 echarts 实例
        let myFinancingChart = this.$echarts.init(document.getElementById('accuracyEchar'));
        console.log("=======s====s========s=================");
        console.log(this.riskAccuracyTableData);
        let touchArr = [];
        let riskArr = [];
        this.riskAccuracyTableData.forEach((data,i)=>{
          if ("人工认定准确率" === data[0] || "系统认定准确率" === data[0]){
            let common = [data[2].replace('%',''),data[3].replace('%',''),data[4].replace('%',''),data[5].replace('%','')];
            if ("人工认定准确率" === data[0]){
              touchArr =common;
            } else if ("系统认定准确率" === data[0]){
              riskArr = common;
            }
          }
        });
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '人工认定准确率、系统认定准确率',
            textStyle:{
              fontSize:16
            },
            // 标题padding：上右下左
            padding: [10, 0, 0, 100],
          },
          tooltip: {
            trigger: 'axis'
          },
          // 图例组件
          legend: {
            show:true,
            data:['人工认定准确率','系统认定准确率'],
            top:"5%",
            textStyle: {
              fontSize: 14
            },
          },
          xAxis: {
            data: []
          },
          yAxis: {
            name:'%',
            type: 'value'
          },
          series: [{
            name: '人工认定准确率',
            type: 'line',
            data:touchArr,
          },{
            name: '系统认定准确率',
            type: 'line',
            data: riskArr
          }]
        };
        console.log(option);

        // 使用刚指定的配置项和数据显示图表。
        myFinancingChart.setOption(option);
      },
      // 触警率、出险率、命中率 echarts
      financingEcharts(){
        // 基于准备好的dom，初始化 echarts 实例
        let myFinancingChart = this.$echarts.init(document.getElementById('financingHistory'));
        let touchArr = [];
        let riskArr = [];
        let hitArr= [];
        this.touchAlarmTableData.forEach((data,i)=>{
          if ("触警率" === data[0] || "出险率" === data[0] || "命中率" === data[0]){
            let common = [data[2].replace('%',''),data[3].replace('%',''),data[4].replace('%',''),data[5].replace('%','')];
            if ("触警率" === data[0]){
              touchArr =common;
            } else if ("出险率" === data[0]){
              riskArr = common;
            } else if ("命中率" === data[0]){
              hitArr = common;
            }
          }
        });
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '触警率、出险率、命中率',
            textStyle:{
              fontSize:16
            },
            // 标题padding：上右下左
            padding: [10, 0, 0, 100],
          },
          tooltip: {
            trigger: 'axis'
          },
          // 图例组件
          legend: {
            show:true,
            data:['触警率','出险率','命中率'],
            top:"5%",
            textStyle: {
              fontSize: 14
            },
          },
          xAxis: {
            data: []
          },
          yAxis: {
            name:'%',
            type: 'value'
          },
          series: [{
            name: '触警率',
            type: 'line',
            data:touchArr,
          },{
            name: '出险率',
            type: 'line',
            data: riskArr
          },{
            name: '命中率',
            type: 'line',
            data: hitArr
          }]
        };
        console.log(option);

        // 使用刚指定的配置项和数据显示图表。
        myFinancingChart.setOption(option);
      },

      setIngBasl() {
        if (this.form) {
          if (this.form.bals && this.form.bals.length > 0) {
            this.ingBals = this.form.bals;
          }
        }
      },



      // 漏报 underReport 的 data 赋值
      setUnderReportTable() {
        // 触警table 的 OriginData 赋值
        this.setUnderReportTableOriginData();

        // 数组按矩阵思路, 变成转置矩阵
        if (this.underReportTableOriginData) {
          let matrixData = this.underReportTableOriginData.map((row, i) => {
            let arr = [];
            for (let key in row) {
              arr.push(row[key])
            }
            return arr
          });

          // 加入标题拼接最终的数据
          this.underReportTableData = matrixData[0].map((col, i) => {
            return [this.underReportTableTitle[i], ...matrixData.map((row) => {
              if (i === 1 || i === 4){
                return row[i] + "万"
              } else if(i === 2 || i === 5){
                return row[i] + "%"
              }
              return row[i]
            })]
          });
        }
      },

      // 漏报 table 的 OriginData 赋值
      setUnderReportTableOriginData(){
        if (this.form.dpRmMonRuleSysIng && this.form.dpRmMonRuleSysIng.length > 0){
          for (let i = 0; i < this.form.dpRmMonRuleSysIng.length; i++) {
            let element = this.form.dpRmMonRuleSysIng[i];
            let da = {misDeteNum:element.misDeteNum,misDeteBal:element.misDeteBal,misDeteRate:element.misDeteRate,
              misinNum:element.misinNum,misinBal:element.misinBal,misinRate:element.misinRate};
            this.underReportTableOriginData = this.underReportTableOriginData.concat(da);
          }
          this.underReportMisDeteNum = this.form.dpRmMonRuleSysIng[0].misDeteNum;
          this.underReportMisDeteRate = this.form.dpRmMonRuleSysIng[0].misDeteRate + "%";
          this.underReportMisinBal = this.form.dpRmMonRuleSysIng[0].misinNum;
          this.underReportSysAffWrgRate = this.form.dpRmMonRuleSysIng[0].misinRate + "%";
        }
      },
      //--------------------------------------------------------------------------------
      // 风险失误 table 的 data 赋值
      setRiskMissTable() {
        // 触警table 的 OriginData 赋值
        this.setRiskMissTableOriginData();

        // 数组按矩阵思路, 变成转置矩阵
        if (this.riskMissTableOriginData) {
          let matrixData = this.riskMissTableOriginData.map((row, i) => {
            let arr = [];
            for (let key in row) {
              arr.push(row[key])
            }
            return arr
          });

          // 加入标题拼接最终的数据
          this.riskMissTableData = matrixData[0].map((col, i) => {
            return [this.riskMissTableTitle[i], ...matrixData.map((row) => {
              if (i === 1 || i === 4){
                return row[i] + "万"
              } else if(i === 2 || i === 5){
                return row[i] + "%"
              }
              return row[i]
            })]
          });
        }
      },

      // 风险失误 table 的 OriginData 赋值
      setRiskMissTableOriginData(){
        if (this.form.dpRmMonRuleSysIng && this.form.dpRmMonRuleSysIng.length > 0){
          for (let i = 0; i < this.form.dpRmMonRuleSysIng.length; i++) {
            let element = this.form.dpRmMonRuleSysIng[i];
            let da = {artAffWrgNum:element.artAffWrgNum,artAffWrgBal:element.artAffWrgBal,artAffWrgRate:element.artAffWrgRate,
              sysAffWrgNum:element.sysAffWrgNum,sysAffWrgBal:element.sysAffWrgBal,sysAffWrgRate:element.sysAffWrgRate};
            this.riskMissTableOriginData = this.riskMissTableOriginData.concat(da);
          }
          this.riskMissArtAffWrgNum = this.form.dpRmMonRuleSysIng[0].artAffWrgBal;
          this.riskMissArtAffWrgRate = this.form.dpRmMonRuleSysIng[0].artAffWrgRate + "%";
          this.riskMissSysAffWrgNum = this.form.dpRmMonRuleSysIng[0].sysAffWrgBal;
          this.riskMissSysAffWrgRate = this.form.dpRmMonRuleSysIng[0].sysAffWrgRate + "%";
        }
      },
      //--------------------------------------------------------------------------------

      // 风险准确 table 的 data 赋值
      setRiskAccuracyTable() {
        // 触警table 的 OriginData 赋值
        this.setRiskAccuracyTableOriginData();

        // 数组按矩阵思路, 变成转置矩阵
        if (this.riskAccuracyTableOriginData) {
          let matrixData = this.riskAccuracyTableOriginData.map((row, i) => {
            let arr = [];
            for (let key in row) {
              arr.push(row[key])
            }
            return arr
          });

          // 加入标题拼接最终的数据
          this.riskAccuracyTableData = matrixData[0].map((col, i) => {
            return [this.riskAccuracyTableTitle[i], ...matrixData.map((row) => {
              if (i === 1 || i === 4){
                return row[i] + "万"
              } else if(i === 2 || i === 5){
                return row[i] + "%"
              }
              return row[i]
            })]
          });
        }
      },

      // 风险准确 table 的 OriginData 赋值
      setRiskAccuracyTableOriginData(){
        if (this.form.dpRmMonRuleSysIng && this.form.dpRmMonRuleSysIng.length > 0){
          for (let i = 0; i < this.form.dpRmMonRuleSysIng.length; i++) {
            let element = this.form.dpRmMonRuleSysIng[i];
            let da = {artAffNum:element.artAffNum,artAffRigNum:element.artAffRigNum,artAffRigRate:element.artAffRigRate,
              sysAffNum:element.sysAffNum,sysAffRigNum:element.sysAffRigNum,sysAffRigRate:element.sysAffRigRate};
            this.riskAccuracyTableOriginData = this.riskAccuracyTableOriginData.concat(da);
          }
          this.riskAccuracyAffNum = this.form.dpRmMonRuleSysIng[0].affNum;
          this.riskAccuracyAffRiskCustNum = this.form.dpRmMonRuleSysIng[0].affRiskCustNum;
          this.riskAccuracyArtAffNum = this.form.dpRmMonRuleSysIng[0].artAffNum;
          this.riskAccuracyArtAffRigNum = this.form.dpRmMonRuleSysIng[0].artAffRigNum;
          this.riskAccuracyArtAffRigRate = this.form.dpRmMonRuleSysIng[0].artAffRigRate + "%";
          this.riskAccuracySysAffNum = this.form.dpRmMonRuleSysIng[0].sysAffNum;
          this.riskAccuracySysAffRigNum = this.form.dpRmMonRuleSysIng[0].sysAffRigNum;
          this.riskAccuracySysAffRigRate = this.form.dpRmMonRuleSysIng[0].sysAffRigRate + "%";
        }
      },

      //---------------------------------------------------------------------------------------------

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



      // 触警table 的 OriginData 赋值
      setTouchAlarmTableOriginData(){
        if (this.form.dpRmMonRuleSysIng && this.form.dpRmMonRuleSysIng.length > 0){
          for (let i = 0; i < this.form.dpRmMonRuleSysIng.length; i++) {
            let element = this.form.dpRmMonRuleSysIng[i];
            let da = {warnCustNum:element.warnCustNum,warnCustBal:element.warnCustBal,warnCustRate:element.warnCustRate,
                      accidCustNum:element.accidCustNum,accidCustBal:element.accidCustBal,accidCustRate:element.accidCustRate,
                      hitCustNum:element.hitCustNum,hitCustBal:element.hitCustBal,hitCustRate:element.hitCustRate};
            this.touchAlarmTableOriginData = this.touchAlarmTableOriginData.concat(da);
          }
          console.log("----------s---------s--------");
          console.log(this.touchAlarmTableOriginData);
          // 总体概述
          this.touchAlarmWarnCustNum = this.form.dpRmMonRuleSysIng[0].warnCustNum;
          this.touchAlarmWarnCustBal = this.form.dpRmMonRuleSysIng[0].warnCustBal;
          this.touchAlarmWarnCustRate = this.form.dpRmMonRuleSysIng[0].warnCustRate + "%";
          // 出险客户数
          this.touchAlarmAccidCustNum = this.form.dpRmMonRuleSysIng[0].accidCustNum;
          this.touchAlarmAccidCustRate = this.form.dpRmMonRuleSysIng[0].accidCustRate + "%";
          this.touchAlarmHitCustNum = this.form.dpRmMonRuleSysIng[0].hitCustNum;
          this.touchAlarmHitCustRate = this.form.dpRmMonRuleSysIng[0].hitCustRate + "%";
        }
      },

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
          // 加入标题拼接最终的数据
          this.touchAlarmTableData = matrixData[0].map((col, i) => {
            return [this.touchAlarmTableTitle[i], ...matrixData.map((row) => {
              if (i === 1 || i === 4 || i === 7){
                return row[i] + "万"
              } else if(i === 2 || i === 5 || i === 8){
                return row[i] + "%"
              }
              return row[i]
            })]
          });
        }
      },

      /**
       *  根据年月 计算 年月-季度  往前推，共4个季度
       *  eg：2021-6
       *                    ——————————————————————————————————————————————————————————————————————————————————————
       *  result:         |               2020年                |                           2021 年             |
       *                  |第三季度           |        第四季度      |       第一季度          |        第二季度|
       *                  ————————————————————————————————————————————————————————————————————————————————————————
       */
      yearQuarter(){
        let date = new Date(this.queryDate);
        let fullYear = date.getFullYear(); // 年份
        let lastFullYear = fullYear -1 ; // 上一年
        let month = date.getMonth() + 1; // 月份
        let quarter = Math.floor((month + 2) / 3); // 所选时间为哪个季度
        if (quarter === 1){
          this.quarterTitleArr = [{name: lastFullYear+'年', children: [{key: 'key3', name: '第二季度', minWidth: 90},
              {key: 'key4', name: '第三季度', minWidth: 90},
              {key: 'key5', name: '第四季度', minWidth: 90}]},
            {name: fullYear+'年',      children: [{key: 'key6', name: '第一季度', minWidth: 90}]}];
        } else if (quarter === 2) {
          this.quarterTitleArr = [{name: lastFullYear+'年', children: [{key: 'key3', name: '第三季度', minWidth: 90},
              {key: 'key4', name: '第四季度', minWidth: 90}]},
            {name: fullYear+'年',      children: [{key: 'key5', name: '第一季度', minWidth: 90},
                {key: 'key6', name: '第二季度', minWidth: 90}]}];
        } else if (quarter === 3) {
          this.quarterTitleArr = [{name: lastFullYear+'年', children: [{key: 'key3', name: '第四季度', minWidth: 90}]},
            {name: fullYear+'年',      children: [{key: 'key4', name: '第一季度', minWidth: 90},
                {key: 'key5', name: '第二季度', minWidth: 90},
                {key: 'key6', name: '第三季度', minWidth: 90}]}];
        }else if (quarter === 4) {
          this.quarterTitleArr = [{name: fullYear+'年',      children: [{key: 'key3', name: '第一季度', minWidth: 90},
              {key: 'key4', name: '第二季度', minWidth: 90},
              {key: 'key5', name: '第三季度', minWidth: 90},
              {key: 'key6', name: '第四季度', minWidth: 90}]}];
        }
      },
    }
  }
</script>

<style scoped>

  .panoramic-cust-info-context span {
    color: #0069BA;
    font-weight: bold;
  }

  .panoramic-cust-info-context >>> .el-table .el-table__body-wrapper tr {
    background-color: #FFFFFF;
  }

  .panoramic-cust-info-context >>> .el-table .cell {
    text-align: center;
  }

  .context_module_title {
    height: 40px;
    background-color: rgb(247, 247, 247)
  }

  .context_module_title_p {
    line-height: 40px;
    padding-left: 20px;
    font-weight: bolder;
    font-size: 14px
  }

</style>
