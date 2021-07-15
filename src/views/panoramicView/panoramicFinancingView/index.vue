<template>
  <div class="context">
    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="map">图形概览</el-radio-button>
      <el-radio-button style="margin-left: 5px" label="detail">融资明细</el-radio-button>
    </el-radio-group>
    <div>
      <template v-if="tabPosition === 'map' && returnFlag === true">
        <pan-relation-graph :custNo="custNo" :custType="custType"
                            :custName="custName" :dtCustGraphicsOverviewW = "dtCustGraphicsOverviewW"/>
      </template>
      <template v-else-if="tabPosition === 'detail' && returnFlag === true">
        <financing-detail :custNo="custNo" :custType="custType" :custName="custName"
                          :financingDetail = "financingDetail"/>
      </template>

    </div>

  </div>
</template>

<script>
  import PanRelationGraph from "./panRelationGraph/index";
  import FinancingDetail from "./financingDetail/index";
  import {getPanoramicFinacingView} from "@/api/panoramicView/panoramicFinacingView.js"

  export default {
    name: "PanoramicFinancingView",

    components: {PanRelationGraph, FinancingDetail},
    data() {
      return {
        tabPosition: 'map',
        // 父传子（图形）参数
        dtCustGraphicsOverviewW:{},
        // 父传子（明细）参数
        financingDetail:{
          dp360CreditCardInfo:[],
          dp360GuaranteeInfo:[],
          dp360LoanInfo:[],
        },
        //
        returnFlag:false,
      }
    },
    props: {
      custNo: String,
      custType: String,
      custName: String,
    },
    created() {
      this.getList();
    },
    mounted() {

    },
    methods:{
      getList(){
        getPanoramicFinacingView(this.custNo,this.custType).then(res => {
          this.returnFlag = true;
          if (res.code === 200) {
            this.dtCustGraphicsOverviewW = res.data.dtCustGraphicsOverviewW;
            this.financingDetail.dp360CreditCardInfo = res.data.dp360CreditCardInfo;
            this.financingDetail.dp360GuaranteeInfo = res.data.dp360GuaranteeInfo;
            this.financingDetail.dp360LoanInfo = res.data.dp360LoanInfo;
          }
        });
      },
    },
  }
</script>

<style scoped>


  .context >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #fff;
    background-color: #0061D78F;
    border-color: #0061D78F;
    box-shadow: -1px 0 0 0 #0061D78F;
  }
  .context >>> .el-radio-button--medium .el-radio-button__inner{
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 0;
    background: #E5E5EA;
  }

</style>
