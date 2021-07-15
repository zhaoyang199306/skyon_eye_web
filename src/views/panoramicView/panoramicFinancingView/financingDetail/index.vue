<template>
  <div class="context">

    <!--    本行授信贷款信息（包括关联人）-->
    <div>
      <div class="el-col-24 context_module" style="">
        <div class="context_module_title">
          <p class="context_module_title_p">本行授信贷款信息（包括关联人）</p>
        </div>
      </div>

      <div class="el-col-24" style="margin-top: 10px;margin-bottom: 40px">
        <el-table :data="form.myLoan">
            <el-table-column label="主体" align="center" prop="custName"/>
            <el-table-column label="关联关系" align="center" prop="correlation"/>
            <el-table-column label="贷款名称" align="center" prop="loanName"/>
            <el-table-column label="贷款日期" align="center" prop="loanDate"/>
            <el-table-column label="到期日期" align="center" prop="dueDate"/>
            <el-table-column label="贷款利率" align="center" prop="loanRate"/>
            <el-table-column label="贷款金额" align="center" prop="loanAmount"/>
            <el-table-column label="五级分类" align="center" prop="level5Class"/>
            <el-table-column label="发放机构" align="center" prop="orgName"/>
            <el-table-column label="贷款余额" align="center" prop="loanBal"/>
            <el-table-column label="贷款状态" align="center" prop="loanStauts"/>
        </el-table>
      </div>
    </div>
    <!--    本行信用卡信息（包括关联人）-->
    <div>
      <div class="el-col-24 context_module" style="">
        <div class="context_module_title">
          <p class="context_module_title_p">本行信用卡信息（包括关联人）</p>
        </div>
      </div>

      <div class="el-col-24" style="margin-top: 10px;margin-bottom: 40px">
        <el-table :data="form.myCredit">
          <el-table-column label="主体" align="center" prop="custName"/>
          <el-table-column label="关联关系" align="center" prop="correlation"/>
          <el-table-column label="开卡日期" align="center" prop="openCardDate"/>
          <el-table-column label="卡号" align="center" prop="cardNo"/>
          <el-table-column label="总额度" align="center" prop="totalAmount"/>
          <el-table-column label="临时额度" align="center" prop="tmpAmount"/>
          <el-table-column label="当前可用额度" align="center" prop="wdrawalOdraftAmount"/>
          <el-table-column label="分期付款额度" align="center" prop="installmentAmount"/>
          <el-table-column label="当前透支额度" align="center" prop="currentAvailQuota"/>
          <el-table-column label="账户余额" align="center" prop="accountBal"/>
          <el-table-column label="逾期金额" align="center" prop="overdueAmount"/>
          <el-table-column label="开卡机构" align="center" prop="openCardOrg"/>
        </el-table>
      </div>
    </div>
    <!--    本行担保信息（包括关联人）-->
    <div>
      <div class="el-col-24 context_module" style="">
        <div class="context_module_title">
          <p class="context_module_title_p">本行担保信息（包括关联人）</p>
        </div>
      </div>

      <div class="el-col-24" style="margin-top: 10px;margin-bottom: 40px">
        <el-table :data="form.myGuarantee">
          <el-table-column label="担保人" align="center" prop="guarantor"/>
          <el-table-column label="关联关系" align="center" prop="correlation"/>
          <el-table-column label="担保贷款名称" align="center" prop="guarantLoanName"/>
          <el-table-column label="被担保人" align="center" prop="guaranteedPerson"/>
          <el-table-column label="担保金额" align="center" prop="guarantAmount"/>
          <el-table-column label="担保方式" align="center" prop="guarantWay"/>
          <el-table-column label="担保贷款日期" align="center" prop="guarantDate"/>
          <el-table-column label="担保贷款到期日" align="center" prop="guarantDueDate"/>
          <el-table-column label="担保到款金额" align="center" prop="guarantLoanBal"/>
          <el-table-column label="担保贷款五级分类" align="center" prop="guarantLoanLevel5Class"/>
          <el-table-column label="担保贷款发放机构" align="center" prop="guarantLoanOrg"/>
        </el-table>
      </div>
    </div>
    <!--    他行授信贷款信息（包括关联人）-->
    <div>
      <div class="el-col-24 context_module" style="">
        <div class="context_module_title">
          <p class="context_module_title_p">他行授信贷款信息（包括关联人）</p>
        </div>
      </div>

      <div class="el-col-24" style="margin-top: 10px;margin-bottom: 40px">
        <el-table :data="form.otherLoan">
          <el-table-column label="主体" align="center" prop="custName"/>
          <el-table-column label="关联关系" align="center" prop="correlation"/>
          <el-table-column label="贷款名称" align="center" prop="loanName"/>
          <el-table-column label="贷款日期" align="center" prop="loanDate"/>
          <el-table-column label="到期日期" align="center" prop="dueDate"/>
          <el-table-column label="贷款利率" align="center" prop="loanRate"/>
          <el-table-column label="贷款金额" align="center" prop="loanAmount"/>
          <el-table-column label="五级分类" align="center" prop="level5Class"/>
          <el-table-column label="发放机构" align="center" prop="orgName"/>
          <el-table-column label="贷款余额" align="center" prop="loanBal"/>
          <el-table-column label="贷款状态" align="center" prop="loanStauts"/>
        </el-table>
      </div>
    </div>
    <!--    他行信用卡信息（包括关联人）-->
    <div>
      <div class="el-col-24 context_module" style="">
        <div class="context_module_title">
          <p class="context_module_title_p">他行信用卡信息（包括关联人）</p>
        </div>
      </div>

      <div class="el-col-24" style="margin-top: 10px;margin-bottom: 40px">
        <el-table :data="form.otherCredit">
          <el-table-column label="主体" align="center" prop="custName"/>
          <el-table-column label="关联关系" align="center" prop="correlation"/>
          <el-table-column label="开卡日期" align="center" prop="openCardDate"/>
          <el-table-column label="卡号" align="center" prop="cardNo"/>
          <el-table-column label="总额度" align="center" prop="totalAmount"/>
          <el-table-column label="临时额度" align="center" prop="tmpAmount"/>
          <el-table-column label="当前可用额度" align="center" prop="wdrawalOdraftAmount"/>
          <el-table-column label="分期付款额度" align="center" prop="installmentAmount"/>
          <el-table-column label="当前透支额度" align="center" prop="currentAvailQuota"/>
          <el-table-column label="账户余额" align="center" prop="accountBal"/>
          <el-table-column label="逾期金额" align="center" prop="overdueAmount"/>
          <el-table-column label="开卡机构" align="center" prop="openCardOrg"/>
        </el-table>
      </div>
    </div>
    <!--    他行担保信息（包括关联人）-->
    <div>
      <div class="el-col-24 context_module" style="">
        <div class="context_module_title">
          <p class="context_module_title_p">他行担保信息（包括关联人）</p>
        </div>
      </div>

      <div class="el-col-24" style="margin-top: 10px;margin-bottom: 40px">
        <el-table :data="form.otherGuarantee">
          <el-table-column label="担保人" align="center" prop="guarantor"/>
          <el-table-column label="关联关系" align="center" prop="correlation"/>
          <el-table-column label="担保贷款名称" align="center" prop="guarantLoanName"/>
          <el-table-column label="被担保人" align="center" prop="guaranteedPerson"/>
          <el-table-column label="担保金额" align="center" prop="guarantAmount"/>
          <el-table-column label="担保方式" align="center" prop="guarantWay"/>
          <el-table-column label="担保贷款日期" align="center" prop="guarantDate"/>
          <el-table-column label="担保贷款到期日" align="center" prop="guarantDueDate"/>
          <el-table-column label="担保到款金额" align="center" prop="guarantLoanBal"/>
          <el-table-column label="担保贷款五级分类" align="center" prop="guarantLoanLevel5Class"/>
          <el-table-column label="担保贷款发放机构" align="center" prop="guarantLoanOrg"/>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FinancingDetail",
    data() {
      return {
        form: {
          myLoan:[],
          myCredit:[],
          myGuarantee:[],
          otherLoan:[],
          otherCredit:[],
          otherGuarantee:[],
        },
      }
    },
    props: {
      custNo: String,
      custType: String,
      custName: String,
      financingDetail:String,
    },
    created() {
      this.getList();
    },
    methods:{
      getList(){
        console.log("-----fff-------------");
        console.log(this.financingDetail);
        if (this.financingDetail){
          // 授信信息
          if (this.financingDetail.dp360LoanInfo){
            for (let i = 0; i < this.financingDetail.dp360LoanInfo.length; i++) {
              let dp360LoanInfo = this.financingDetail.dp360LoanInfo[i];
              console.log(dp360LoanInfo);
              if (dp360LoanInfo.ifThisBank === '1'){
                this.form.myLoan = this.form.myLoan.concat(dp360LoanInfo);
              } else {
                this.form.otherLoan = this.form.otherLoan.concat(dp360LoanInfo);
              }
            }
          }
          // 信用卡信息
          if (this.financingDetail.dp360CreditCardInfo){
            for (let i = 0; i < this.financingDetail.dp360CreditCardInfo.length; i++) {
              let dp360CreditCardInfo = this.financingDetail.dp360CreditCardInfo[i];
              if (dp360CreditCardInfo.ifThisBank === '1'){
                this.form.myCredit = this.form.myCredit.concat(dp360CreditCardInfo);
              } else {
                this.form.otherCredit = this.form.otherCredit.concat(dp360CreditCardInfo);
              }
            }
          }
          // 担保信息
          if (this.financingDetail.dp360GuaranteeInfo){
            for (let i = 0; i < this.financingDetail.dp360GuaranteeInfo.length; i++) {
              let dp360GuaranteeInfo = this.financingDetail.dp360GuaranteeInfo[i];
              if (dp360GuaranteeInfo.ifThisBank === '1'){
                this.form.myGuarantee = this.form.myGuarantee.concat(dp360GuaranteeInfo);
              } else {
                this.form.otherGuarantee = this.form.otherGuarantee.concat(dp360GuaranteeInfo);
              }
            }
          }
        }

        console.log(this.form)

      },
    }

  }
</script>

<style scoped>
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
  .context >>> td{
    color: #4A8AD7;
    font-weight: bold;
  }

  .context >>> .el-table .el-table__body-wrapper tr {
    word-break: break-word;
    background-color: #FFFFFF;
    color: #515a6e;
    height: 32px;
    font-size: 13px;
  }

  .context >>> .el-table .el-table__header-wrapper th {
    word-break: break-word;
    background-color: #FFFFFF;
    color: #515a6e;
    height: 32px;
    font-size: 13px;
    font-weight: bold;
  }


</style>
