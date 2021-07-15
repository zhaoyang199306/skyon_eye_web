<template>

  <div class="panoramic-cust-info-context">

    <div>
      <el-form :model="form" ref="form" label-width="120px" class="el-col-24">
        <!--      机构预警情况总体概览  -->
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">机构预警情况总体概览</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <p>时间：<span> {{totalTime}} </span></p>
            <p>天眼风险预警共计发出预警信号 <span>{{orgWarnSingleNum}}</span> 条，
              涉及客户 <span>{{orgWarnCustNum}}</span> 户，
              贷款余额 <span>{{orgWarnLoanBal}}</span> 亿元。
              其中风险客户<span> {{orgWarnRiskCustNum}}</span> 户，
              贷款余额合计<span> {{orgWarnRiskLoanBal}} </span>亿。
              自营产品与非自营产品客户预警情况详见下表。</p>
            <el-table
              :data="form.dpRmMonViews"
              style="width: 100%"
              show-summary
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
              <el-table-column prop="orgCode" label="机构"/>
              <el-table-column label="信号数">
                <el-table-column prop="priProRiskNum" label="自营"/>
                <el-table-column prop="unPriProRiskNum" label="非自营"/>
              </el-table-column>
              <el-table-column label="触发客户">
                <el-table-column label="客户数">
                  <el-table-column prop="priProWarnCustNum" label="自营"/>
                  <el-table-column prop="unPriProWarnCustNum" label="非自营"/>
                </el-table-column>
                <el-table-column label="贷款余额">
                  <el-table-column prop="priProRiskCustBal" label="自营"/>
                  <el-table-column prop="unPriProRiskCustBal" label="非自营"/>
                </el-table-column>
              </el-table-column>
              <el-table-column label="风险客户">
                <el-table-column label="客户数">
                  <el-table-column prop="priProRiskCustNum" label="自营"/>
                  <el-table-column prop="unPriProRiskCustNum" label="非自营"/>
                </el-table-column>
                <el-table-column label="贷款余额">
                  <el-table-column prop="priProWarnCustBal" label="自营"/>
                  <el-table-column prop="unPriProWarnCustBal" label="非自营"/>
                </el-table-column>
              </el-table-column>
            </el-table>


          </div>
        </div>
        <!--        非自营产品情况-->
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">非自营产品情况</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <el-table
              :data="form.dpRmMonUnPriPros"
              style="width: 100%"
              show-summary
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
              <el-table-column prop="proName" label="产品名称"/>
              <el-table-column prop="orgCode" label="所属分行"/>
              <el-table-column prop="unPriProRiskNum" label="信号数"/>
              <el-table-column label="触发客户">
                <el-table-column prop="unPriProWarnCustNum" label="客户数"/>
                <el-table-column prop="unPriProWarnCustBal" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="风险客户">
                <el-table-column prop="unPriProRiskCustNum" label="客户数"/>
                <el-table-column prop="unPriProRiskCustBal" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="合作方冻额比例"/>
            </el-table>
          </div>
        </div>
        <!--        自营产品风险客户情况-->
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">自营产品风险客户情况</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <p>自营产品客户中被认定为风险客户的共计 <span>{{selfRiskCustNum}}</span> 户，
              贷款余额共计 <span>{{selfLoanBal}}</span> 亿元。
              其中客户风险等级为红色、橙色、黄色的客户数分别为
              <span>{{redCustNum}}</span> 、<span>{{orangeCustNum}}</span> 、 <span>{{yellowCustNum}}</span> ，
              对应贷款余额分别为
              <span>{{redLoanBal}}</span> 亿元、 <span>{{orangeLoanBal}}</span> 亿元、<span>{{yellowLoanBal}}</span> 亿元。</p>
            <el-table
              :data="form.dpRmMonUnPriProTotals"
              style="width: 100%"
              show-summary
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
              <el-table-column prop="orgCode" label="机构"/>
              <el-table-column label="风险客户（红色）">
                <el-table-column prop="unPriProRedRiskNum" label="客户数"/>
                <el-table-column prop="unPriProRedRiskCustNum" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="风险客户（橙色）">
                <el-table-column prop="unPriProOraRiskNum" label="客户数"/>
                <el-table-column prop="unPriProOraRiskCustNum" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="风险客户（黄色）">
                <el-table-column prop="unPriProYelRiskNum" label="客户数"/>
                <el-table-column prop="unPriProYelRiskCustNum" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="小计">
                <el-table-column prop="totalNum" label="客户数"/>
                <el-table-column prop="totalBal" label="贷款余额"/>
              </el-table-column>
            </el-table>

            <p>自营产品客个人客户</p>
            <el-table
              :data="form.dpRmMonUnPriProPres"
              style="width: 100%"
              show-summary
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
              <el-table-column prop="orgCode" label="机构"/>
              <el-table-column label="风险客户（红色）">
                <el-table-column prop="unPriProRedRiskNum" label="客户数"/>
                <el-table-column prop="unPriProRedRiskCustNum" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="风险客户（橙色）">
                <el-table-column prop="unPriProOraRiskNum" label="客户数"/>
                <el-table-column prop="unPriProOraRiskCustNum" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="风险客户（黄色）">
                <el-table-column prop="unPriProYelRiskNum" label="客户数"/>
                <el-table-column prop="unPriProYelRiskCustNum" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="小计">
                <el-table-column prop="totalNum" label="客户数"/>
                <el-table-column prop="totalBal" label="贷款余额"/>
              </el-table-column>
            </el-table>

            <p>自营产品客小微客户</p>
            <el-table
              :data="form.dpRmMonUnPriProMics"
              style="width: 100%"
              show-summary
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
              <el-table-column prop="orgCode" label="机构"/>
              <el-table-column label="风险客户（红色）">
                <el-table-column prop="unPriProRedRiskNum" label="客户数"/>
                <el-table-column prop="unPriProRedRiskCustNum" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="风险客户（橙色）">
                <el-table-column prop="unPriProOraRiskNum" label="客户数"/>
                <el-table-column prop="unPriProOraRiskCustNum" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="风险客户（黄色）">
                <el-table-column prop="unPriProYelRiskNum" label="客户数"/>
                <el-table-column prop="unPriProYelRiskCustNum" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="小计">
                <el-table-column prop="totalNum" label="客户数"/>
                <el-table-column prop="totalBal" label="贷款余额"/>
              </el-table-column>
            </el-table>

          </div>
        </div>
        <!--       已批未提、存量授信客户情况 -->
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">已批未提、存量授信客户情况</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <p>天眼系统将 <span>{{alreadyRiskCustNum}}</span> 户额度已获批但尚未生效或提款的授信客户认定为风险客户，
              合计余额 <span>{{alreadyRiskLoanBal}}</span> 亿元；
              此外，天眼系统也对 <span>{{CreditRiskCustNum}}</span> 户已提用的授信客户下发风险预警，
              合计 <span>{{CreditRiskLoanBal}}</span> 亿元</p>

            <el-table
              :data="form.dpRmMonAgrUndraStos"
              style="width: 100%"
              show-summary
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
              <el-table-column prop="orgCode" label="机构"/>
              <el-table-column label="已批未提">
                <el-table-column prop="agrUndraRiskCustNum" label="客户数"/>
                <el-table-column prop="agrUndraRiskCustBal" label="贷款余额"/>
              </el-table-column>
              <el-table-column label="存量授信">
                <el-table-column prop="stoRiskCustNum" label="客户数"/>
                <el-table-column prop="stoRiskCustBal" label="贷款余额"/>
              </el-table-column>
            </el-table>

          </div>
        </div>
        <!--        任务超期情况-->
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">任务超期情况</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <el-table
              :data="form.dpRmMonTaskOves"
              style="width: 100%"
              show-summary
              :header-cell-style="{'text-align':'center'}">
              <el-table-column prop="orgCode" label="机构"/>
              <el-table-column prop="taskNum" label="处理任务总数"/>
              <el-table-column prop="taskOveNum" label="超期任务总数"/>
              <el-table-column prop="cogTaskOveNum" label="认定任务超期总数"/>
              <el-table-column prop="cogTaskOveAveDay" label="认定任务平均超期天数"/>
              <el-table-column prop="mgtTaskOveNum" label="处理任务超期天数"/>
              <el-table-column prop="mgtTaskOveAveDay" label="处理任务平均超期天数"/>
            </el-table>

          </div>
        </div>
      </el-form>
    </div>


  </div>

</template>

<script>
  import {formatDateYM} from "../../../utils";

  export default {
    name: "warnOverview",
    // 父传子
    props: {
      form: Object,
      queryDate: Date,
    },
    data() {
      return {
        // 页面form
        form: undefined,

        //--------------机构预警情况总体概览参数----------------------
        // 统计查询时间
        totalTime: "- -",
        //机构预警信号条数
        orgWarnSingleNum: '- -',
        //机构预警设计客户数
        orgWarnCustNum: '- -',
        // 机构预警贷款余额 （亿元）
        orgWarnLoanBal: '- -',
        // 机构预警风险客户
        orgWarnRiskCustNum: '- -',
        // 机构预警风险贷款预警（亿元）
        orgWarnRiskLoanBal: '- -',

        //--------------自营产品风险客户情况--------------------------
        // 风险客户统计
        selfRiskCustNum: '- - ',
        // 贷款余额统计
        selfLoanBal: '- - ',
        // 红色客户数
        redCustNum: '- -',
        // 红色贷款余额
        redLoanBal: '- -',
        // 橙色客户数
        orangeCustNum: '- -',
        // 橙色贷款余额
        orangeLoanBal: '- -',
        // 黄色客户数
        yellowCustNum: '- -',
        // 黄色客户数
        yellowLoanBal: '- -',
        // --------------------------已批未提、存量授信客户情况-------------------------------
        // 已批风险客户
        alreadyRiskCustNum: '- -',
        // 已批风险客户余额
        alreadyRiskLoanBal: '- -',
        // 已授信风险客户
        CreditRiskCustNum: '- -',
        // 已授信风险客户余额
        CreditRiskLoanBal: '- -',
      }
    },
    created() {
      console.log("--------warnOverview-------");
      console.log(this.form);
      console.log(this.queryDate);
      this.totalTime = formatDateYM(this.queryDate);

      if (this.form) {
        // 统计机构预警情况总体概览
        if (this.form.dpRmMonViews !== null && this.form.dpRmMonViews.length > 0) {
          let orgWarnSingleNumTmp = 0;
          let orgWarnCustNumTmp = 0;
          let orgWarnLoanBalTmp = 0;
          let orgWarnRiskCustNumTmp = 0;
          let orgWarnRiskLoanBalTmp = 0;
          this.form.dpRmMonViews.map(data => {
            orgWarnSingleNumTmp = orgWarnSingleNumTmp + data.priProRiskNum + data.unPriProRiskNum;
            orgWarnCustNumTmp = orgWarnCustNumTmp + data.priProWarnCustNum + data.unPriProWarnCustNum
              + data.priProRiskCustNum + data.unPriProRiskCustNum;
            orgWarnLoanBalTmp = orgWarnLoanBalTmp + data.priProRiskCustBal + data.unPriProRiskCustBal
              + data.priProWarnCustBal + data.unPriProWarnCustBal;
            orgWarnRiskCustNumTmp = orgWarnRiskCustNumTmp + data.priProRiskCustNum + data.unPriProRiskCustNum;
            orgWarnRiskLoanBalTmp = orgWarnRiskLoanBalTmp + data.priProWarnCustBal + data.unPriProWarnCustBal;
          });
          this.orgWarnSingleNum = orgWarnSingleNumTmp;
          this.orgWarnCustNum = orgWarnCustNumTmp;
          this.orgWarnLoanBal = orgWarnLoanBalTmp;
          this.orgWarnRiskCustNum = orgWarnRiskCustNumTmp;
          this.orgWarnRiskLoanBal = orgWarnRiskLoanBalTmp;
        } else {
          this.restData();
        }
        // 自营产品风险客户情况
        if (this.form.dpRmMonUnPriProTotals !== null && this.form.dpRmMonUnPriProTotals.length > 0) {
          let selfRiskCustNumTmp = 0;
          let selfLoanBalTmp = 0;
          let redCustNumTmp = 0;
          let redLoanBalTmp = 0;
          let orangeCustNumTmp = 0;
          let orangeLoanBalTmp = 0;
          let yellowCustNumTmp = 0;
          let yellowLoanBalTmp = 0;
          this.form.dpRmMonUnPriProTotals.map(data => {
            selfRiskCustNumTmp = selfRiskCustNumTmp + data.totalNum;
            selfLoanBalTmp = selfLoanBalTmp + data.totalBal;
            redCustNumTmp = redCustNumTmp + data.unPriProRedRiskNum;
            redLoanBalTmp = redLoanBalTmp + data.unPriProRedRiskCustNum;
            orangeCustNumTmp = orangeCustNumTmp + data.unPriProOraRiskNum;
            orangeLoanBalTmp = orangeLoanBalTmp + data.unPriProOraRiskCustNum;
            yellowCustNumTmp = yellowCustNumTmp + data.unPriProYelRiskNum;
            yellowLoanBalTmp = yellowLoanBalTmp + data.unPriProYelRiskCustNum;
          });
          this.selfRiskCustNum = selfRiskCustNumTmp;
          this.selfLoanBal = selfLoanBalTmp;
          this.redCustNum = redCustNumTmp;
          this.redLoanBal = redLoanBalTmp;
          this.orangeCustNum = orangeCustNumTmp;
          this.orangeLoanBal = orangeLoanBalTmp;
          this.yellowCustNum = yellowCustNumTmp;
          this.yellowLoanBal = yellowLoanBalTmp;
        }

        // 已批未提、存量授信客户情况
        if (this.form.dpRmMonAgrUndraStos !== null && this.form.dpRmMonAgrUndraStos.length > 0){
          let alreadyRiskCustNumTmp = 0;
          let alreadyRiskLoanBalTmp = 0;
          let CreditRiskCustNumTmp = 0;
          let CreditRiskLoanBalTmp = 0;
          this.form.dpRmMonAgrUndraStos.map(data =>{
            alreadyRiskCustNumTmp = alreadyRiskCustNumTmp + data.agrUndraRiskCustNum;
            alreadyRiskLoanBalTmp = alreadyRiskLoanBalTmp + data.agrUndraRiskCustBal;
            console.log("=");
            console.log(data.agrUndraRiskCustBal);
            CreditRiskCustNumTmp = CreditRiskCustNumTmp + data.stoRiskCustNum;
            CreditRiskLoanBalTmp = CreditRiskLoanBalTmp + data.stoRiskCustBal;
          });
          this.alreadyRiskCustNum = alreadyRiskCustNumTmp;
          this.alreadyRiskLoanBal = alreadyRiskLoanBalTmp;
          this.CreditRiskCustNum = CreditRiskCustNumTmp;
          this.CreditRiskLoanBal = CreditRiskLoanBalTmp;

        }

      }

    },
    methods: {
      // 清空操作
      restData() {
        this.orgWarnSingleNum = '- -';
        this.orgWarnCustNum = '- -';
        this.orgWarnLoanBal = '- -';
        this.orgWarnRiskCustNum = '- -';
        this.orgWarnRiskLoanBal = '- -';
      }
    },
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
