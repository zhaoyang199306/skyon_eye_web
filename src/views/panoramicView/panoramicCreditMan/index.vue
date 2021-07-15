<template>
  <div v-model="form">
    <!--    风险提示-->
    <div>
      <div class="el-col-24 context_module" style="">
        <div class="context_module_title">
          <p class="context_module_title_p">风险提示</p>
        </div>
      </div>
      <div class="el-col-24">
        <div class="risk_Context_left">
          <p class="risk_Context_title">1.负债到期情况</p>
          <div style="font-size: 14px;padding-left: 20px">
            <p>当年内到期笔数 <span>{{form.dtTyDpApLiabMatureSituW==null?'--':form.dtTyDpApLiabMatureSituW.thYearIntMatureCnt==null?'--':form.dtTyDpApLiabMatureSituW.thYearIntMatureCnt}}</span>
              , 到期金额 <span>{{form.dtTyDpApLiabMatureSituW==null?'--':form.dtTyDpApLiabMatureSituW.thYearMatureAmt==null?'--':form.dtTyDpApLiabMatureSituW.thYearMatureAmt}}</span>
              万元, 其中金额最大的一笔 <span>{{form.dtTyDpApLiabMatureSituW==null?'--':form.dtTyDpApLiabMatureSituW.thYearMaxAmt==null?'--':form.dtTyDpApLiabMatureSituW.thYearMaxAmt}}</span>
              万元。</p>
            <p>未来一年内到期笔数 <span>{{form.dtTyDpApLiabMatureSituW==null?'--':form.dtTyDpApLiabMatureSituW.after1YearIntMatureCnt === null ? '- -' : form.dtTyDpApLiabMatureSituW.after1YearIntMatureCnt}}</span>
              , 到期金额 <span>{{form.dtTyDpApLiabMatureSituW==null?'--':form.dtTyDpApLiabMatureSituW.after1YearMatureAmt==null ? '--' : form.dtTyDpApLiabMatureSituW.after1YearMatureAmt}}</span>
              万元, 其中金额最大的一笔 <span>{{form.dtTyDpApLiabMatureSituW==null?'--':form.dtTyDpApLiabMatureSituW.after1YearMaxAmt==null?'--':form.dtTyDpApLiabMatureSituW.after1YearMaxAmt}}</span>
              万元。</p>
            <p>未来二年年内到期笔数 <span>{{form.dtTyDpApLiabMatureSituW==null?'--':form.dtTyDpApLiabMatureSituW.afterY2IntMatureCnt==null?'--':form.dtTyDpApLiabMatureSituW.afterY2IntMatureCnt}}</span>
              , 到期金额 <span>{{form.dtTyDpApLiabMatureSituW==null?'--':form.dtTyDpApLiabMatureSituW.afterY2MatureAmt==null?'--':form.dtTyDpApLiabMatureSituW.afterY2MatureAmt}}</span>
              万元, 其中金额最大的一笔 <span>{{form.dtTyDpApLiabMatureSituW==null?'--':form.dtTyDpApLiabMatureSituW.afterY2MaxAmt==null?'--':form.dtTyDpApLiabMatureSituW.afterY2MaxAmt}}</span>
              万元。</p>
          </div>
        </div>
        <div class="risk_Context_right">
          <p class="risk_Context_title">2.当前账户异常状况</p>
          <div style="font-size: 14px;padding-left: 20px">
            <p>当前展期账户
              <span>{{form.dtAcctExcepSituW==null?'--':form.dtAcctExcepSituW.currRenewAcctCnt==null?'--':form.dtAcctExcepSituW.currRenewAcctCnt}}</span>
              个，当前借新还旧账户 <span>{{form.dtAcctExcepSituW==null?'--':form.dtAcctExcepSituW.currBrwNewReturnOld==null?'--':form.dtAcctExcepSituW.currBrwNewReturnOld}}</span>
              个， 当前欠息账户 <span>{{form.dtAcctExcepSituW==null?'--':form.dtAcctExcepSituW.currOweIntAcctCnt==null?'--':form.dtAcctExcepSituW.currOweIntAcctCnt}}</span>
              个；</p>
            <p>当前时点较上期新增关注类笔数
              <span>{{form.dtAcctExcepSituW==null?'--':form.dtAcctExcepSituW.addConceCnt==null?'--':form.dtAcctExcepSituW.addConceCnt}}</span>
              ， 新增关注类金额 <span>{{form.dtAcctExcepSituW==null?'--':form.dtAcctExcepSituW.addConceAmt==null?'--':form.dtAcctExcepSituW.addConceAmt}}</span>
              万元；</p>
            <p>当前时点较上期新增不良类笔数
              <span>{{form.dtAcctExcepSituW==null?'--':form.dtAcctExcepSituW.addNonCnt==null?'--':form.dtAcctExcepSituW.addNonCnt}}</span>
              ， 新增不良类金额 <span>{{form.dtAcctExcepSituW==null?'--':form.dtAcctExcepSituW.addNonAmt==null?'--':form.dtAcctExcepSituW.addNonAmt}}</span>
              万元。</p>
          </div>
        </div>
      </div>
      <div class="el-col-24">
        <div class="risk_Context_left">
          <p class="risk_Context_title">3.负债情况明显变化</p>
          <div style="font-size: 14px;padding-left: 20px">
            <p> 当前时点较上期借贷余额变动 <span>{{form.dtTyDpApLiabSituChangeW==null?'--':form.dtTyDpApLiabSituChangeW.debitCrdtBalChangeCnt==null?'--':form.dtTyDpApLiabSituChangeW.debitCrdtBalChangeCnt}}</span>
              万元，变动比例 <span>{{form.dtTyDpApLiabSituChangeW==null?'--':form.dtTyDpApLiabSituChangeW.debitCrdtBalChangeRatio==null?'--':form.dtTyDpApLiabSituChangeW.debitCrdtBalChangeRatio}}</span>
              %；</p>
            <p>当前时点较上期办理信贷业务的金融机构家数变动 <span>{{form.dtTyDpApLiabSituChangeW==null?'--':form.dtTyDpApLiabSituChangeW.finInstCntChange==null?'--':form.dtTyDpApLiabSituChangeW.finInstCntChange}}</span>
              户，变动比例 <span>{{form.dtTyDpApLiabSituChangeW==null?'--':form.dtTyDpApLiabSituChangeW.finInstCntChangeRatio==null?'--':form.dtTyDpApLiabSituChangeW.finInstCntChangeRatio}}</span>
              %。</p>
          </div>
        </div>
        <div class="risk_Context_right">
          <p class="risk_Context_title">4.相关还款责任概要（含担保）</p>
          <div style="font-size: 14px;padding-left: 20px">
            <p>当前时点其他借贷交易较上期新增关注类金额 <span>120</span> 万元，新增不良类金额 <span>100</span> 万元；</p>
            <p>当前时点担保交易较上期新增关注类金额 <span>200</span> 万元，新增不良类金额 <span>150</span> 万元。</p>
          </div>
        </div>
      </div>
      <div class="el-col-24">
        <div class="risk_Context_left">
          <p class="risk_Context_title">5.征信评分及变化</p>
          <div style="font-size: 14px;padding-left: 20px">
            <p>当前征信评分分数 <span>{{form.dtCrdtcScoreAndChangeW==null?'--':form.dtCrdtcScoreAndChangeW.currCrdtcScoreScore==null?'--':form.dtCrdtcScoreAndChangeW.currCrdtcScoreScore}}</span>
              ，相对位置 <span>{{form.dtCrdtcScoreAndChangeW==null?'--':form.dtCrdtcScoreAndChangeW.oppoPosition==null?'--':form.dtCrdtcScoreAndChangeW.oppoPosition}}</span>，分数解读
              <span>{{form.dtCrdtcScoreAndChangeW==null?'--':form.dtCrdtcScoreAndChangeW.scoreExplain==null?'--':form.dtCrdtcScoreAndChangeW.scoreExplain}}</span>；
            </p>
            <p>当前征信评分分数较上期分数 <span>{{form.dtCrdtcScoreAndChangeW==null?'--':form.dtCrdtcScoreAndChangeW.linkRelatScore==null?'--':form.dtCrdtcScoreAndChangeW.linkRelatScore}}</span>，变动比例
              <span>{{form.dtCrdtcScoreAndChangeW==null?'--':form.dtCrdtcScoreAndChangeW.linkRelatScoreChangeRatio==null?'--':form.dtCrdtcScoreAndChangeW.linkRelatScoreChangeRatio}}</span>
              %，相对位置 <span>{{form.dtCrdtcScoreAndChangeW==null?'--':form.dtCrdtcScoreAndChangeW.linkRelatScoreOppoPosition==null?'--':form.dtCrdtcScoreAndChangeW.linkRelatScoreOppoPosition}}</span>
              %。</p>
          </div>
        </div>
        <div class="risk_Context_right" style="height: 200px">
          <p class="risk_Context_title">6.公共记录</p>
          <div style="font-size: 14px;padding-left: 20px">
            <p>累计欠税记录 <span>{{form.dtTyDpApPublicRecA==null?'--':form.dtTyDpApPublicRecA.accumTaxArreaRecCnt==null?'--':form.dtTyDpApPublicRecA.accumTaxArreaRecCnt}}</span>
              笔，欠税金额 <span>{{form.dtTyDpApPublicRecA==null?'--':form.dtTyDpApPublicRecA.accumTaxArreaAmt==null?'--':form.dtTyDpApPublicRecA.accumTaxArreaAmt}}</span>
              万元；</p>
            <p>累计民事判决记录 <span>{{form.dtTyDpApPublicRecA==null?'--':form.dtTyDpApPublicRecA.accumCivilJudgeCnt==null?'--':form.dtTyDpApPublicRecA.accumCivilJudgeCnt}}</span>
              笔，民事判决金额 <span>{{form.dtTyDpApPublicRecA==null?'--':form.dtTyDpApPublicRecA.accumCivilJudgeAmt==null?'--':form.dtTyDpApPublicRecA.accumCivilJudgeAmt}}</span>
              万元；</p>
            <p>累计强制执行记录 <span>{{form.dtTyDpApPublicRecA==null?'--':form.dtTyDpApPublicRecA.accumEnforcCnt==null?'--':form.dtTyDpApPublicRecA.accumEnforcCnt}}</span>
              笔，强制执行金额 <span>{{form.dtTyDpApPublicRecA==null?'--':form.dtTyDpApPublicRecA.accumEnforcAmt==null?'--':form.dtTyDpApPublicRecA.accumEnforcAmt}}</span>
              万元</p>
            <p>累计行政处罚记录 <span>{{form.dtTyDpApPublicRecA==null?'--':form.dtTyDpApPublicRecA.accumAdminPenalCnt==null?'--':form.dtTyDpApPublicRecA.accumAdminPenalCnt}}</span>
              笔，行政处罚金额 <span>{{form.dtTyDpApPublicRecA==null?'--':form.dtTyDpApPublicRecA.accumAdminPenalAmt==null?'--':form.dtTyDpApPublicRecA.accumAdminPenalAmt}}</span>
              万元；</p>
            <p>当前公积金缴费状态缴费 <span>{{form.dtTyDpApPublicRecA==null?'--':form.dtTyDpApPublicRecA.currProviFundPayStatus==null?'--':form.dtTyDpApPublicRecA.currProviFundPayStatus}}</span>
              。</p>
          </div>
        </div>
      </div>
    </div>
    <!--    借贷变化历史-->
    <div>
      <div class="el-col-24 context_module" style="">
        <div class="context_module_title">
          <p class="context_module_title_p">借贷变化历史</p>
        </div>
      </div>

      <div class="el-col-24" style="margin-top: 5px">
        <el-table border stripe highlight-current-row :data="transData" :header-cell-style="{background:'#BBBBBB',color:'#000000'}"
                  :span-method="objectSpanMethod">
          <el-table-column v-for="(item, index) in transTitle"  :label="item" :key="index" align="center">
            <template slot-scope="scope">
              {{scope.row[index]}}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="el-col-24" style="margin-top: 10px;margin-bottom: 40px">
        <el-table border stripe highlight-current-row  :row-class-name="tableRowClassName" :data="transCreditData"
                  :span-method="objectCreditSpanMethod" :header-cell-style="{background:'#BBBBBB',color:'#000000'}">
          <el-table-column v-for="(item, index) in transCreditTitle"  :label="item" :key="index" align="center">
            <template slot-scope="scope">
              {{scope.row[index]}}
            </template>
          </el-table-column>
        </el-table>
      </div>


    </div>
    <!--    总图展示-->
    <div>
      <div class="el-col-24 context_module" style="">
        <div class="context_module_title">
          <p class="context_module_title_p">总图展示</p>
        </div>
      </div>
    <!--  负债融资变化历史    -->
      <div class="el-col-24" style="margin-top: 20px">
        <div style="width: 90%;height: 300px" id="financingHistory">
        </div>
      </div>
    <!--    相关还款责任概要  -->
      <div class="el-col-12" style="margin-top: 20px">
        <div style="width: 90%;height: 300px" id="repayment">
        </div>
      </div>
    <!--未结清非正常类贷款历史变化-->
      <div class="el-col-12" style="margin-top: 20px">
        <div style="width: 90%;height: 300px" id="noLoanHistory">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getPanoramicCreditMan} from "@/api/panoramicView/panoramicCreditMan.js"

  export default {
    name: "panoramicCreditMan",
    props: {
      custNo: String,
      custType: String,
    },
    data() {
      return {
        // 页面form
        form: {
          dtTyDpApLiabMatureSituW: {
            thYearIntMatureCnt: undefined,
            thYearMatureAmt: undefined,
            thYearMaxAmt: undefined,
            after1YearIntMatureCnt: undefined,
            after1YearMatureAmt: undefined,
            after1YearMaxAmt: undefined,
            afterY2IntMatureCnt: undefined,
            afterY2MatureAmt: undefined,
            afterY2MaxAmt: undefined,
          },
          dtAcctExcepSituW: {
            currRenewAcctCnt: undefined,
            currBrwNewReturnOld: undefined,
            currOweIntAcctCnt: undefined,
            addConceCnt: undefined,
            addConceAmt: undefined,
            addNonCnt: undefined,
            addNonAmt: undefined,
          },
          dtTyDpApLiabSituChangeW: {
            debitCrdtBalChangeCnt: undefined,
            debitCrdtBalChangeRatio: undefined,
            finInstCntChange: undefined,
            finInstCntChangeRatio: undefined,
          },
          dtCrdtcScoreAndChangeW: {
            currCrdtcScoreScore: undefined,
            oppoPosition: undefined,
            scoreExplain: undefined,
            linkRelatScore: undefined,
            linkRelatScoreChangeRatio: undefined,
            linkRelatScoreOppoPosition: undefined,
          },
          dtTyDpApPublicRecA: {
            accumTaxArreaRecCnt: undefined,
            accumTaxArreaAmt: undefined,
            accumCivilJudgeCnt: undefined,
            accumCivilJudgeAmt: undefined,
            accumEnforcCnt: undefined,
            accumEnforcAmt: undefined,
            accumAdminPenalCnt: undefined,
            accumAdminPenalAmt: undefined,
            currProviFundPayStatus: undefined,
          },
          dtTyDpApLiabFinWList: [{
            reportPeriod: undefined,
            acctCnt: undefined,
            crdtBal: undefined,
          }]
        },
        prepositionTitle:'负债融资',
        originTitle: [ '授信账户数（个）', '信贷余额（万元）'],
        transTitle: ['指标大类', '指标名称', '本期指', '较上期', '本期指', '较上期', '本期指', '较上期', '本期指', '较上期'],
        transData: [],
        // originData 为后端原始正常的数据, 此数据按正常表格展示 一行一行的数据
        // 保证数组里每一个对象中的字段顺序, 从上到下 一次对应显示表格中的从左到右
        originData: [],

        // 信贷变化历史 table 信息
        //
        prepositionCreditTitle:['贷款结构','贷款结构','贷款结构','贷款结构','贷款结构','贷款结构',
          '未结清贷款（五级）','未结清贷款（五级）','未结清贷款（五级）','未结清贷款（五级）','未结清贷款（五级）',
          '对外担保','对外担保','对外担保',
          '逾期'],
        originCreditTitle: [ '中长期借款（万元）', '短期借款（万元）', '循环透支（万元）', '贴现（万元）', '银行承重汇票（万元）', '使用证（万元）',
          '关注类授信账户数','关注类授信余额','不良授信账户数','不良类信贷余额','非正常类信贷余额'
          ,'正常类对外担保金额','关注类类对外担保金额','不良类类对外担保金额'
          ,'逾期类信贷金额'],
        transCreditTitle: ['指标大类', '指标名称', '本期指', '较上期', '本期指', '较上期', '本期指', '较上期', '本期指', '较上期'],
        transCreditData: [],
        // originData 为后端原始正常的数据, 此数据按正常表格展示 一行一行的数据
        // 保证数组里每一个对象中的字段顺序, 从上到下 一次对应显示表格中的从左到右
        originCreditData: [{type1:'1',type2:'2',type3:'3',type4:'4',type5:'5',type6:'6',type7:'7',type8:'8',type9:'9',type10:'10',type11:'11',type12:'12',type13:'13',type14:'15',type15:'15'},
          {type1:'1',type2:'2',type3:'3',type4:'4',type5:'5',type6:'6',type7:'7',type8:'8',type9:'9',type10:'10',type11:'11',type12:'12',type12:'12',type13:'13',type14:'15',type15:'15'},
          {type1:'1',type2:'2',type3:'3',type4:'4',type5:'5',type6:'6',type7:'7',type8:'8',type9:'9',type10:'10',type11:'11',type12:'12',type12:'12',type13:'13',type14:'15',type15:'15'},
          {type1:'1',type2:'2',type3:'3',type4:'4',type5:'5',type6:'6',type7:'7',type8:'8',type9:'9',type10:'10',type11:'11',type12:'12',type12:'12',type13:'13',type14:'15',type15:'15'},
          {type1:'1',type2:'2',type3:'3',type4:'4',type5:'5',type6:'6',type7:'7',type8:'8',type9:'9',type10:'10',type11:'11',type12:'12',type12:'12',type13:'13',type14:'15',type15:'15'},
          {type1:'1',type2:'2',type3:'3',type4:'4',type5:'5',type6:'6',type7:'7',type8:'8',type9:'9',type10:'10',type11:'11',type12:'12',type12:'12',type13:'13',type14:'15',type15:'15'},
          {type1:'1',type2:'2',type3:'3',type4:'4',type5:'5',type6:'6',type7:'7',type8:'8',type9:'9',type10:'10',type11:'11',type12:'12',type12:'12',type13:'13',type14:'15',type15:'15'},
          {type1:'1',type2:'2',type3:'3',type4:'4',type5:'5',type6:'6',type7:'7',type8:'8',type9:'9',type10:'10',type11:'11',type12:'12',type12:'12',type13:'13',type14:'15',type15:'15'},
        ]



      }
    },
    created() {
      this.getList();

    },
    mounted() {
      this.financingEcharts();
      this.repaymentEcharts();
      this.noLoanHistoryEcharts();
    },
    methods: {

      // 贷款
      noLoanHistoryEcharts(){
        // 基于准备好的dom，初始化echarts实例
        let noLoanHistoryChart = this.$echarts.init(document.getElementById('noLoanHistory'));
        // 指定图表的配置项和数据
        let option = {
          title: {
            left: 'center',
            text: '未结清非正常类贷款历史变化'
          },
          tooltip: {},
          legend: {
            data:['']
          },
          xAxis: {
            data: []
          },
          yAxis: {
            name:'金额（万元）',
          },
          series: [{
            name: '销量',
            type: 'line',
            data: []
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        noLoanHistoryChart.setOption(option);
      },

      // 相关还款责任
      repaymentEcharts(){
        // 基于准备好的dom，初始化echarts实例
        let myRepaymentChart = this.$echarts.init(document.getElementById('repayment'));
        // 指定图表的配置项和数据
        let option = {
          title: {
            left: 'center',
            text: '相关还款责任概要'
          },
          color:['#4169E1'],
          tooltip: {},
          legend: {
            data:['']
          },
          xAxis: {
            data: ['正常类','关注类','不良类']
          },
          yAxis: {
            name:'金额（万元）',
          },
          series: [{
            name: '销量',
            type: 'bar',
            barWidth:30,
            data: [200000, 0,0]
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myRepaymentChart.setOption(option);
      },

      // 融资变化历史
      financingEcharts(){
        // 基于准备好的dom，初始化echarts实例
        let myFinancingChart = this.$echarts.init(document.getElementById('financingHistory'));
        // 指定图表的配置项和数据
        let option = {
          title: {
            left: 'center',
            text: '负债融资变化历史'
          },
          tooltip: {},
          legend: {
            data:['']
          },
          xAxis: {
            data: []
          },
          yAxis: {
            name:'金额（万元）',
          },
          series: [{
            name: '销量',
            type: 'line',
            data: [5, 20,24,28, 36, 10, 10, 20]
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myFinancingChart.setOption(option);
      },
      // 斑马颜色类设置
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'statistics-warning-row';
        } else {
          return '';
        }
      },
      objectCreditSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) { // 第一列
          if (rowIndex === 0) {
            return {
              rowspan: 6,
              colspan: 1
            };
          } else  if(rowIndex === 6) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else if(rowIndex === 11) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else if(rowIndex === 14) {
            return {
              rowspan: 1,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      // 转化负债融资变化历史表
      tranToLoanTable(){
        // 数组按矩阵思路, 变成转置矩阵
        if (this.originData){
          let matrixData = this.originData.map((row, i) => {
            let arr = []
            for (let key in row) {
              if (key === 'acctCnt' || key === 'crdtBal'){
                arr.push(row[key])
              }
            }
            return arr
          });
          // 加入标题拼接最终的数据
          this.transData = matrixData[0].map((col, i) => {
            return [this.prepositionTitle,this.originTitle[i], ...matrixData.map((row) => {
              return row[i]
            })]
          })

        }
      },
      // 转化负债融资变化历史表
      tranCreditTable(){
        // 数组按矩阵思路, 变成转置矩阵
        let matrixCreditData = this.originCreditData.map((row, i) => {
          let arr = []
          for (let key in row) {
              arr.push(row[key])
            }
          return arr
        });

        // 加入标题拼接最终的数据
        this.transCreditData = matrixCreditData[0].map((col, i) => {
          return [this.prepositionCreditTitle[i],this.originCreditTitle[i], ...matrixCreditData.map((row) => {
            return row[i]
          })]
        })
      },
      // 初始化
      getList() {
        getPanoramicCreditMan(this.custNo, this.custType).then(res => {
          if (res.code === 200) {
            this.form = res.data;
            this.originData = this.form.dtTyDpApLiabFinWList;
            // this.originCreditData = this.form.dtTyDpApLiabFinWList;
            this.tranToLoanTable();
            this.tranCreditTable();
          }
        })
      }
    }
  }
</script>

<style scoped>

  .statistics-warning-row{
    background-color: yellow;
  }

  .risk_Context_left span {
    color: blue;
    font-weight: bold;
  }

  .risk_Context_right span {
    color: blue;
    font-weight: bold;
  }

  .risk_Context_right {
    width: 36%;
    height: 150px;
    border: 2px solid rgb(187, 187, 187);
    float: right;
    margin-right: 8%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .risk_Context_left {
    width: 36%;
    height: 150px;
    border: 2px solid rgb(187, 187, 187);
    float: left;
    margin-left: 8%;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .risk_Context_title {
    text-align: center;
    font-weight: bold;
    font-size: 14px;
  }

  .context_module_title {
    height: 40px;
    background-color: rgb(247, 247, 247)
  }

  .context_module_title_p {
    margin: 0 0;
    line-height: 40px;
    padding-left: 20px;
    font-weight: bolder;
    font-size: 14px
  }
</style>
