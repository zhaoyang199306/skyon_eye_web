<template>
  <transition name = "fade">
    <div v-show = "fadeShow" >
  <div v-model="form">
    <!--    风险标签和我行授信情况（万元）-->
    <div class="el-col-24" style="">
      <!--   风险标签 -->
      <div class="risk_Context_left">
        <div class="riskTitle">
          <span>风险标签</span>
        </div>
        <div>
          <div style="margin: 10px 50px;">
            <template v-for="(item,index) in riskTag">
                <el-tag class="risk_context_tag" :class="sstt[index]"><p>{{item}}</p></el-tag>
            </template>
          </div>
        </div>
      </div>
      <!--   我行授信情况（万元） -->
      <div class="risk_Context_right">
        <div class="riskTitle">
          <span>我行授信情况（万元）</span>
        </div>
        <div class="risk_context_right_div">
          <P style="font-size: 15px; font-weight: bold">我行授信余额</P>
          <P style="font-size: 15px; color: rgba(50, 145, 248, 1)">{{form.dtCustFinanceInfoW === null?
            '--':form.dtCustFinanceInfoW.totalSum}}万</P>
        </div>
        <div class="risk_context_right_div">
          <ul>
            <li>信贷余额:<span>{{form.dtCustFinanceInfoW === null?'--':form.dtCustFinanceInfoW.contTotalAmt}}万</span></li>
            <li>信用卡余额:<span>{{form.dtCustFinanceInfoW === null?'--':form.dtCustFinanceInfoW.creditCardAmt}}万</span></li>
            <li>其他:<span>{{form.dtCustFinanceInfoW=== null?'--':form.dtCustFinanceInfoW.totalSum-form.dtCustFinanceInfoW.creditCardAmt-form.dtCustFinanceInfoW.contTotalAmt}}万</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--    待认定风险预警信号-->
    <div class="el-col-24 context_module risk_context" style="">
      <div class="context_module_title" style="height: 40px;background-color: rgb(247, 247, 247)">
        <p class="context_module_title_p">待认定风险预警信号</p>
      </div>
      <div class="el-col-24" style="padding-left: 20px;">
        <el-table :data="toBeConfirmedList">
          <el-table-column label="时间" align="center" prop="riskTime" width="150px"/>
          <el-table-column label="预警风险等级" align="center" prop="warnRiskLevel"/>
          <el-table-column label="信号来源" align="center" prop="isManualInput"  >
            <template slot-scope="scope">
              <span>{{ tranIsManualInput(scope.row.isManualInput) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="规则等级" align="center" prop="ruleLevel"/>
          <el-table-column label="评分等级" align="center" prop="scoreLevel" >
            <template slot-scope="scope">
              <span>{{ scope.row.scoreLevel + '分' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--   已认定风险预警信号 -->
    <div class="el-col-24 context_module risk_context" style="">
      <div class="context_module_title" style="height: 40px;background-color: rgb(247, 247, 247)">
        <p class="context_module_title_p">已认定风险预警信号</p>
      </div>
      <div class="el-col-24" style="padding-left: 20px;">
        <el-table :data="alreadyConfirmedList">
          <el-table-column label="时间" align="center" prop="riskTime" width="150px"/>
          <el-table-column label="预警风险等级" style="color: #FEDD59"  align="center" prop="warnRiskLevel" />
          <el-table-column label="信号来源" align="center" prop="signalSource" />
          <el-table-column label="认定方式" align="center">
            <template slot-scope="scope">
              <span>{{ tranIsManualInput(scope.row.isManualInput) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="触发规则等级" align="center" prop="ruleLevel"  />
          <el-table-column label="评分等级" align="center" >
            <template slot-scope="scope">
              <span>{{ scope.row.scoreLevel + '分' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--    我行评级信息-->
    <div class="el-col-24 context_module" style="">
      <div class="context_module_title" style="height: 40px;background-color: rgb(247, 247, 247)">
        <p class="context_module_title_p">我行评级信息</p>
      </div>
      <div class="el-col-24 context_module_body">
        <div class="el-col-24">
          <div class="el-col-2"><p>去年评级等级</p></div>
          <div class="el-col-6">
            <p style="color: rgba(50, 145, 248, 1)">{{form.dpCustOutRating===null?'--':form.dpCustOutRating[0].bInfoCreditrating}}</p>
          </div>
          <div class="el-col-2"><p>评级时间</p></div>
          <div class="el-col-14">
            <p style="color: rgba(50, 145, 248, 1)">{{form.dpCustOutRating===null?'--':form.dpCustOutRating[0].annDt}}</p>
          </div>
        </div>
        <div class="el-col-24">
          <div class="el-col-2"><p>今年评级等级</p></div>
          <div class="el-col-6">
            <p style="color: rgba(50, 145, 248, 1)">{{form.dpCustOutRating===null?'--':form.dpCustOutRating[1].bInfoCreditrating}}</p>
          </div>
          <div class="el-col-2"><p>评级时间</p></div>
          <div class="el-col-14">
            <p style="color: rgba(50, 145, 248, 1)">{{form.dpCustOutRating===null?'--':form.dpCustOutRating[1].annDt}}</p>
          </div>
        </div>
      </div>
    </div>
    <!--    司法诉讼-->
    <div class="el-col-24 context_module" style="">
      <div class="context_module_title" style="height: 40px;background-color: rgb(247, 247, 247)">
        <p class="context_module_title_p">司法诉讼</p>
      </div>

      <div class="el-col-24" style="margin-top: 5px">
        <el-tabs type="border-card">
          <el-tab-pane label="裁判文书">
            <el-table :data="form.dtCustRiskRefereeDocAList">
              <el-table-column width="55" align="center" type="index"/>
              <el-table-column label="标题" align="center" prop="caption"/>
              <el-table-column label="案件号" align="center" prop="caseNum"/>
              <el-table-column label="案由" align="center" prop="caseReason"/>
              <el-table-column label="时间" align="center" prop="caseDt"/>
              <el-table-column label="判决结果" align="center" prop="judgeResult"/>
              <el-table-column label="审理法院" align="center" prop="courtName"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="失信公告">
            <el-table :data="form.dtCustRiskLostCrdtAffiAList">
              <el-table-column width="55" align="center" type="index"/>
              <el-table-column label="失信被执行人具体情形" align="center" prop="lostCrdtBeExecBehav"/>
              <el-table-column label="案件号" align="center" prop="caseNum"/>
              <el-table-column label="当事人" align="center" prop="party"/>
              <el-table-column label="时间" align="center" prop="issueDt"/>
              <el-table-column label="生效法律文件确定的义务" align="center" prop="effectLawDocCfm"/>
              <el-table-column label="执行依据文号" align="center" prop="execGistNum"/>
              <el-table-column label="被执行人履行情况" align="center" prop="beExecFulfilSitu"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="司法查冻扣">
            <el-table :data="form.dtCustRiskFhfkDhSifacdkA">
              <el-table-column width="55" align="center" type="index"/>
              <el-table-column label="标题" align="center" prop="caption"/>
              <el-table-column label="案件号" align="center" prop=""/>
              <el-table-column label="资产类别" align="center" prop="assetCate"/>
              <el-table-column label="标的名称" align="center" prop="subjMatterName"/>
              <el-table-column label="时间日期" align="center" prop=""/>
              <el-table-column label="法院名称或审理机关" align="center" prop="courtName"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="资产冻结">
            <el-table :data="form.dtCustRiskAssetFrzAList">
              <el-table-column width="55" align="center" type="index"/>
              <el-table-column label="被冻结金额" align="center" prop="beFrzAmt"/>
              <el-table-column label="冻结开始日期" align="center" prop="beginDt"/>
              <el-table-column label="案件号" align="center" prop="caseNum"/>
              <el-table-column label="冻结截止日期" align="center" prop="frzStopDt"/>
              <el-table-column label="执行通知文书号" align="center" prop="execAdviseDocNum"/>
              <el-table-column label="冻结状态" align="center" prop=""/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="资产查封">
            <el-table :data="form.dtCustRiskAssetSqtAList">
              <el-table-column width="55" align="center" type="index"/>
              <el-table-column label="查封状态" align="center" prop="sqtStatus"/>
              <el-table-column label="被查封的房产" align="center" prop="beSqtSubjMatterEstate"/>
              <el-table-column label="案件状态" align="center" prop=""/>
              <el-table-column label="立案时间" align="center" prop="dealDt"/>
              <el-table-column label="法院名称" align="center" prop="courtName"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="执行公告">
            <el-table :data="form.dtCustRiskExecAffiAList">
              <el-table-column width="55" align="center" type="index"/>
              <el-table-column label="案件号" align="center" prop="caseNum"/>
              <el-table-column label="执行标的" align="center" prop="execSubjMatter"/>
              <el-table-column label="案件状态" align="center" prop="caseStatus"/>
              <el-table-column label="立案时间" align="center" prop="closingDt"/>
              <el-table-column label="法院名称" align="center" prop="courtName"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="法院公告">
            <el-table :data="form.dtCustRiskCourtAffiAList">
              <el-table-column width="55" align="center" type="index"/>
              <el-table-column label="当事人" align="center" prop="party"/>
              <el-table-column label="公告类型" align="center" prop="affiType"/>
              <el-table-column label="公告日期" align="center" prop="affiDt"/>
              <el-table-column label="内容概要" align="center" prop="contentOutline"/>
              <el-table-column label="法院名称" align="center" prop="courtName"/>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="开庭公告">
            <el-table :data="form.dtCustRiskCourAffiAList">
              <el-table-column width="55" align="center" type="index"/>
              <el-table-column label="案由" align="center" prop="caseReason"/>
              <el-table-column label="原告/上诉人" align="center" prop="plaintiff"/>
              <el-table-column label="被告/上诉人" align="center" prop="defendant"/>
              <el-table-column label="开庭日期" align="center" prop="courDt"/>
              <el-table-column label="案号" align="center" prop="caseNum"/>
              <el-table-column label="法院名称" align="center" prop="courtName"/>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
    </div>
  </transition>
</template>

<script>
  import {getPanoramicRiskView} from "@/api/panoramicView/panoramicRiskView.js"

  export default {
    name: "panoramicRiskView",
    data() {
      return {
        fadeShow:false,
        toBeConfirmed:{},
        // 颜色
        sstt: [
          "ss1",
          "ss2",
          "ss3",
          "ss4",
          "ss5",
          "ss6",
          "ss7",
          "ss8",
        ],
        // 待认定列表
        toBeConfirmedList:[],
        // 已认定列表
        alreadyConfirmedList:[],
        // 页面form
        form: {
          wTaskInfos:{},
          dtCustFinanceInfoW: {
            totalSum: 0,
            contTotalAmt: 0,
            creditCardAmt: 0,
          },
          dtCustRiskTagW: {
            riskTagName: undefined,
          },
          dpCustOutRating: [
            {
              bInfoCreditrating: undefined,
              annDt: undefined,
            }, {
              bInfoCreditrating: undefined,
              annDt: undefined,
            }
          ],
          dtCustRiskRefereeDocAList: [{}],
          dtCustRiskLostCrdtAffiAList: [{}],
          dtCustRiskFhfkDhSifacdkA: [{}],
          dtCustRiskAssetFrzAList: [{}],
          dtCustRiskAssetSqtAList: [{}],
          dtCustRiskExecAffiAList: [{}],
          dtCustRiskCourtAffiAList: [{}],
          dtCustRiskCourAffiAList: [{}],

        },
        // 风险标签
        riskTag: [],
      }
    },
    // 父传子组件传参
    props: {
      custNo: String,
    },
    // 初始化
    created() {
      this.getList();
    },
    methods: {
      checkDel(value) {
        console.log("0000000000");
        console.log(value);
        // if (this.alreadyConfirmedList[rowIndex].warnRiskLevel === '2级预警') {
          return 'red';
        // }
      },
      //转换信号来源
      tranIsManualInput(value){
        if (value === '1')
          return '人工录入';
        else {
          return '系统信号';
        }
      },
      //
      getList() {
        getPanoramicRiskView(this.custNo).then(res => {
          console.log("----getPanoramicRiskView----");
          console.log(res);
          if (res.code === 200) {
            this.form = res.data;
            if (this.form.dtCustRiskTagW) {
              this.riskTag = this.form.dtCustRiskTagW.riskTagName.split("，");
            }
            console.log(this.form.wTaskInfos);
            if (this.form.wTaskInfos) {
              let wTaskInfos = this.form.wTaskInfos;
              for (let i = 0; i < wTaskInfos.length; i++) {
                if (wTaskInfos[i].status === '02') {
                  this.alreadyConfirmedList = this.alreadyConfirmedList.concat(wTaskInfos[i]);
                } else {
                  this.toBeConfirmedList = this.toBeConfirmedList.concat(wTaskInfos[i]);
                }
              }
            }


          }
          this.fadeShow = true;
        }).catch(() =>{
          this.fadeShow = true;
        })
      }
    }
  }
</script>

<style scoped>

  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0
  }

  .el-table .red{
    background: #5257ea;
  }

  .risk_context >>> .el-table .el-table__body-wrapper tr {
    word-break: break-word;
    background-color: #FFFFFF;
    color: #515a6e;
    height: 32px;
    font-size: 13px;
  }

  .risk_context >>>.el-table .el-table__header-wrapper th {
    word-break: break-word;
    background-color: #FFFFFF;
    color: #515a6e;
    height: 32px;
    font-size: 13px;
  }
  .ss1{
    background: #FFEDA6;
  }
  .ss2{
    background: #FFB3B3;
  }
  .ss3 {
    background: red;
  }
  .ss4{
    background: #A6ECFF;
  }
  .ss5{
    background: #71b262;
  }
  .ss6{
    background: #6288b2;
  }
  .ss7 {
    background: #ecac60;
  }
  .ss8{
    background: #f87171;
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

  .context_module_body {
    padding-left: 20px;
    margin-top: 10px;
  }

  .context_module_body p {
    margin: 0;
    padding: 0;
    margin: 7px 0;
    font-size: 14px;
  }

  .context_module {

  }

  .risk_context_right_div {
    float: left;
    width: 30%;
    margin-left: 10%
  }

  .risk_context_right_div ul {
    list-style: none;
    /* line-height: 35px; */
    font-size: 15px;
    font-weight: bold
  }

  .risk_context_right_div ul li {
    height: 35px;
  }

  .risk_Context_right {
    width: 49%;
    height: 180px;
    border: 1px solid rgb(187, 187, 187);
    float: right;
    margin-right: 0;
  }

  .risk_Context_right li span {
    color: rgba(50, 145, 248, 1)
  }

  .risk_Context_left {
    width: 49%;
    height: 180px;
    border: 1px solid rgb(187, 187, 187);
    float: left;
    margin-left: 0;
  }

  .risk_context_tag {
    width: 100px;
    height: 30px;
    /*background-color: rgb(254, 237, 166);*/
    border: none;
    border-radius: 5px;
    font-size: 14px;
    padding: 0px;
    margin-left: 10%;
    margin-top: 15px;
    text-align: center;
    line-height: 30px;
    letter-spacing: 2px;
    text-indent: 2px;
    font-weight: normal;
    font-style: normal;
    opacity: 1;
    color: black;
  }

  .risk_context_tag p{
    padding: 0;
    margin: 0;
  }

  .riskTitle {
    width: 150px;
    height: 30px;
    left: 70px;
    top: 241px;
    z-index: 311;
    background-color: rgb(50, 145, 248);
    border: none;
    color: rgb(255, 255, 255);
    border-radius: 0px 0px 20px;
    padding: 0px;
    text-align: center;
    line-height: 30px;
    font-weight: normal;
    font-style: normal;
    opacity: 1;
  }

  .riskTitle span {
    font-weight: 700;
    font-size: 13px;
    color: rgb(255, 255, 255);
    font-style: normal;
    letter-spacing: 1px;
    line-height: 30px;
    text-decoration: none;
  }

</style>
