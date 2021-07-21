<template>
  <div class="panoramic-view-context"
       style="min-height: calc(100vh - 80px);width: 100%;position: relative;overflow: hidden;">

    <div style="padding: 0 1%;margin: 6px 0 0 0px">
      <div class="title">
        <span class="fz_icon"/>
        <div class="title_text">
          <p>效能分析</p>
        </div>

      </div>
      <!--      搜索框-->
      <div>
        <el-date-picker
          v-model="queryDate"
          type="month"
          placeholder="选择日期"
          default-value="new Date()">
        </el-date-picker>
        <el-button type="primary" @click="getAllDate" size="mini">查询</el-button>
        <el-button type="primary" @click="getAllDate(1)" size="mini">重置</el-button>
      </div>
      <!--      radio列表-->
      <div>
        <el-radio-group v-model="tabPosition" style="margin-bottom: 10px;margin-top: 10px;">
          <el-radio-button label="warnOverview">预警情况概览</el-radio-button>
          <el-radio-button style="margin-left: 5px" label="sysWorking">系统运行分析</el-radio-button>
          <el-radio-button style="margin-left: 5px" label="signalDimension" v-if="false">信号维度分析</el-radio-button>
        </el-radio-group>

        <template v-if="tabPosition === 'warnOverview' && returnFlag === true ">
          <warn-overview :form="form" :queryDate="queryDate"/>
        </template>
        <template v-else-if="tabPosition === 'sysWorking'">
          <sys-working :form="form" :queryDate="queryDate"/>
        </template>
        <template v-else-if="tabPosition === 'signalDimension'">
          <signal-dimension/>
        </template>

      </div>
      <!---->

      <!--    展示列表  -->
    </div>

  </div>
</template>

<script>
  import WarnOverview from "./warnOverview/index";
  import SysWorking from "./sysWorking/index";
  import SignalDimension from "./signalDimension/index";
  import {allEfficiencyAnalysis} from "@/api/efficiencyAnalysis/efficiencyAnalysis.js"

  export default {
    name: "EfficiencyAnalysis",
    components: {SignalDimension, SysWorking, WarnOverview},
    data() {
      return {
        // radio model
        tabPosition: "warnOverview",
        // 查询日期
        queryDate: new Date(),
        // 页面form
        form: undefined,
        // 查询返回标志
        returnFlag: false,
      }
    },
    created() {
      this.getAllDate();
    },
    methods: {
      // 查询所有的数据
      getAllDate(value) {
        this.returnFlag = false;
        if (value === 1) this.queryDate = new Date();
        allEfficiencyAnalysis(this.queryDate).then(res => {
          console.log("--getAllDate--");
          console.log(res);
          if (res.code === 200) {
            this.form = res.data;
            this.returnFlag = true;
          }
        });
      }
    }
  }
</script>

<style scoped>

  .panoramic-view-context >>> .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background-color: #FFFFFF !important;
    border-top: 4px solid #5257ea;
  }

  .title {
    overflow: hidden;
    position: relative;
  }

  .title_text p {
    color: #0062bd;
    font-size: 12px;
    margin-bottom: 5px;
    letter-spacing: 1px;
  }

  .title_text {
    margin: 6px 0 0 0px;
  }

  .fz_icon {
    display: block;
    width: 20px;
    height: 20px;
    background: url(../../assets/png/zcicon1.png);
    background-size: 100% 100%;
    float: left;
    margin: 4px 3px 0 0;
  }

</style>
