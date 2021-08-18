<template>
  <div class="panoramic-view-context" style="min-height: calc(100vh - 80px);width: 100%;position: relative;overflow: hidden;">


    <div style="padding: 0 1%;margin: 6px 0 0 0px" v-show="detailListShow">
      <div class="title">
        <span class="fz_icon"/>
        <div class="title_text">
          <p>对私客户全景视图</p>
        </div>

        <!--        搜索框-->
        <div v-show="detailListShow" class="seaContainer">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="0px">
            <el-form-item prop="custNo">
              <el-input
                v-model="queryParams.custNo"
                placeholder="客户编号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="custName">
              <el-input
                v-model="queryParams.custName"
                placeholder="客户名称"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="custManager">
              <el-input
                v-model="queryParams.custManager"
                placeholder="管护客户经理"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item prop="subBranch">
              <el-input
                v-model="queryParams.subBranch"
                placeholder="所属支行"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item style="padding-left: 12px">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div></div>

      <!--    展示列表  -->
      <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                :cell-style="{padding:'0px'}" @row-dblclick="handledbClick" :data="panoramicViewList"
                v-show="detailListShow">
        <el-table-column label="客户编号" align="center" prop="CUSTNO"/>
        <el-table-column label="客户名称" align="center" prop="CUSTNAME"/>
        <el-table-column label="客户类型" align="center" prop="CUSTTYPE"/>
        <el-table-column label="监测主体类型" align="center" prop="MONITORTYPE"/>
        <el-table-column label="所属分行" align="center" prop="BELONGBRCH"/>
        <el-table-column label="所属支行" align="center" prop="subBranch"/>
        <el-table-column label="管护客户经理" align="center" prop="CUSTMGR"/>
        <el-table-column label="审批权限" align="center">总行</el-table-column>

      </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
    </div>

    <!--      详情-->
    <transition name = "fade">
      <div v-show = "fadeShow" >
        <div v-if="detailShow" style="min-height: calc(100vh - 80px);margin-top: 5px;margin-left: 10px;
    border-left: 1px solid #0068B9; ">

          <div style="margin-left: 15px">

        <div class="cl_title" style="margin-bottom:5px;">
          <p class="lt" style="margin: 0 0;">{{custName}}</p>
          <el-button type="primary" size="mini" @click="closeDetail" style="float: right" icon="el-icon-close"/>
        </div>
        <div>

        </div>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="风险视图" name="riskView">
            <template v-if="activeName==='riskView'">
              <panoramic-risk-view :custNo="custNo"/>
            </template>
          </el-tab-pane>
          <el-tab-pane label="客户信息" name="custInfo">
            <template v-if="activeName==='custInfo'">
              <panoramic-cust-info :custNo="custNo" :custType="custType"/>
            </template>
          </el-tab-pane>
          <el-tab-pane label="关系图谱" name="relationMap">
            <template v-if="activeName==='relationMap'">
              <panoramic-relation-map :custNo="custNo" :custType="custType" :custName="custName"/>
            </template>
          </el-tab-pane>
          <el-tab-pane label="人行征信" name="creditMan">
            <template v-if="activeName==='creditMan'">
              <panoramic-credit-man :custNo="custNo" :custType="custType"/>
            </template>
          </el-tab-pane>
          <el-tab-pane label="全融资视图" name="fullMap">
            <template v-if="activeName==='fullMap'">
              <panoramic-financing-view  :custNo="custNo" :custType="custType" :custName="custName" />
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {getPanoramicViewList} from "@/api/panoramicView/panoramicView.js"
  import PanoramicRiskView from "./panoramicRiskView/index";
  import PanoramicCustInfo from "./panoramicCustInfo/index";
  import PanoramicCreditMan from "./panoramicCreditMan/index";
  import PanoramicRelationMap from "./panoramicRelationMap/index";
  import PanoramicFinancingView from "./panoramicFinancingView/index";

  export default {
    name: "panoramicView",
    components: {
      PanoramicFinancingView,
      PanoramicRelationMap,
      PanoramicCreditMan,
      PanoramicCustInfo,
      PanoramicRiskView
    },
    data() {
      return {
        total: 0,
        fadeShow:false,
        //  true 标志
        trueFlag: true,
        //  详情展示控制
        detailShow: false,
        // tab页默认值
        activeName: 'riskView',
        // 组件传参 custNo
        custNo: undefined,
        // 组件传参 custType
        custType: undefined,
        open: false,
        detailListShow: true,
        // 客户名
        custName: '',
        //  全景视图集合
        panoramicViewList: [],
        enclosureList: [],
        // 审核意见
        examinValue: "",
        feedbackValue: undefined,
        taskInfoNo: "",
        // 在途任务列表
        onWayTaskList: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          custNo: undefined,
          custName: undefined,
          subBranch: undefined,
          custManager: undefined,
        },

      }
    },
    created() {
      this.getList();
    },
    methods: {
      // 关闭详情
      closeDetail() {
        this.detailShow = false;
        this.detailListShow = true;
        this.restInfo();
      },
      // 清除信息
      restInfo() {
        this.activeName = 'riskView';
        this.fadeShow = false;
      },
      // 查询全景视图列表
      getList() {
        getPanoramicViewList(this.queryParams).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.panoramicViewList = res.data;
            this.total = res.data.length;
          }

        })
      },
      // 列表双击事件
      handledbClick(row) {
        this.detailShow = true;
        this.detailListShow = false;
        this.custName = row.CUSTNAME;
        this.custNo = row.CUSTNO;
        this.custType = row.CUSTTYPE;

        setTimeout(()=>{
          this.fadeShow = true;
        },500);
      },
      handleClick(tab, event) {
        if (tab.name === 'riskView') {

        } else if (tab.name === 'custInfo') {

        }
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

  .panoramic-view-context >>> .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
    background-color: #FFFFFF !important;
    border-top: 4px solid #5257ea;
  }

  .panoramic-view-context >>> .el-tabs--card>.el-tabs__header .el-tabs__nav {
    border: 0px solid #dfe4ed;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
  }

  .btnTask {
    padding: 0px 10px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    height: 30px;
    background: #0062BD;
    color: #fff;
    line-height: 30px;
    border-radius: 3px;
  }

  .el-select-dropdown__item {
    font-size: 12px;
    padding: 0 10px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 25px;
    line-height: 25px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .title_table_textarea {
    height: 100%;
    float: left;
    width: 1000px;
    padding-top: 10px
  }

  .title_table_p_color {
    font-size: 12px;
    margin: auto 0;
    padding-top: 15px;
    padding-left: 35px;
    color: red
  }

  .title_table_p {
    font-size: 12px;
    margin: auto 0;
    padding-top: 30px;
    padding-left: 35px
  }

  .titleTable {
    background-color: #f9f9f9;
    /*height: 105px;*/
    margin: auto 0;
  }

  .title_table_div {
    height: 100%;
    width: 160px;
    float: left
  }

  .btn {
    padding: 0px 10px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    height: 30px;
    width: 60px;
    background: #0062BD;
    color: #fff;
    line-height: 30px;
    border-radius: 3px;
  }

  .cl_title p {
    color: #0068B9;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
  }

  .lt {
    float: left;
    padding-left: 10px;
  }

  .radioball {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0068B9;
    margin: 5px 10px 0 10px;
  }

  .cl_title {
    overflow: hidden;
    border-bottom: 1px solid #0068B9;
  }

  .el-form-item {
    margin-bottom: 5px;
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
