<template>
  <div>
    <div class="title">
      <span class="fz_icon"/>
      <div class="title_text">
        <p>预警任务管理</p>
      </div>
      <!--        搜索框-->
      <div v-show="detailListShow">
        <el-form :model="queryParams" ref="queryForm" :inline="true">
          <el-form-item prop="taskNoOrCusnameLike">
              <el-input
                class="sel-input"
                v-model="queryParams.taskNoOrCusnameLike"
                placeholder="模糊查询编号名称"
                clearable
                @keyup.enter.native="handleQuery"
              />
          </el-form-item>
          <el-form-item prop="taskNo">
            <el-input
              v-model="queryParams.taskNo"
              placeholder="预警任务编号"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
         <el-form-item prop="description">
            <dictionary-select code="WarningObjectCateoryCode" v-model="queryParams.typevalue" clearable placeholder="预警对象类别">
            </dictionary-select>
          </el-form-item>
          <el-form-item prop="description">
            <dictionary-select code="TaskTypeCode" v-model="queryParams.typevalue" clearable placeholder="任务类别">
            </dictionary-select>
          </el-form-item>
          <el-form-item prop="description">
            <dictionary-select code="" v-model="queryParams.typevalue" clearable placeholder="所属分行">
            </dictionary-select>
          </el-form-item>
          <el-form-item prop="description">
            <dictionary-select code="" v-model="queryParams.typevalue" clearable placeholder="所属支行">
            </dictionary-select>
          </el-form-item>
          <el-form-item prop="description">
            <dictionary-select code="WorkingStatusCode" v-model="queryParams.typevalue" clearable placeholder="工作状态">
            </dictionary-select>
          </el-form-item>
          <el-form-item style="padding-left: 12px ; float: right;">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--    展示列表  -->
    <div v-show="detailListShow">
      <el-table style="width:100%"  border highlight-current-row
                 :data="taskInfoList">
        <el-table-column label="任务类别" min-width="100px" align="center" prop="TASK_STATUS">
          <template slot-scope="scope">
            <dictionary-transform code="TaskTypeCode" :value="scope.row['TASK_STATUS']"></dictionary-transform>
          </template>
        </el-table-column>
        <el-table-column label="预警任务编号" min-width="220px" align="center" prop="TASK_NO"/>
        <el-table-column label="预警对象类别" min-width="100px" align="center" prop="WARNING_OBJECT_CATEGORY">
          <template slot-scope="scope">
            <dictionary-transform code="WarningObjectCateoryCode" :value="scope.row['WARNING_OBJECT_CATEGORY']"></dictionary-transform>
          </template>
        </el-table-column>
        <el-table-column label="预警对象编号" min-width="220px" align="center" prop="WARNING_OBJECT_NO"/>
        <el-table-column label="预警对象名称" min-width="110px" align="center" prop="WARNING_OBJECT_NAME"/>
        <el-table-column label="监测主体类型" min-width="100px" align="center" prop="TASK_TYPE"/>
        <el-table-column label="一级预警信号数量" min-width="120px" align="center" prop="ONELEVELCOUNT"/>
        <el-table-column label="二级预警信号数量" min-width="120px" align="center" prop="TWOLEVELCOUNT"/>
        <el-table-column label="三级预警信号数量" min-width="120px" align="center" prop="THREELEVELCOUNT"/>
        <el-table-column label="任务生成时间" min-width="170px" align="center" prop="TASK_START_TIME"/>
        <el-table-column label="当前任务工作" min-width="100px" align="center" prop="TASK_DEADLINE">
         <template slot-scope="scope">
            <dictionary-transform code="TaskWorkingCode" :value="scope.row['TASK_DEADLINE']"></dictionary-transform>
          </template>
        </el-table-column>
        <el-table-column label="当前工作状态" min-width="100px" align="center" prop="TASK_DEADLINE">
           <template slot-scope="scope">
            <dictionary-transform code="WorkingStatusCode" :value="scope.row['TASK_DEADLINE']"></dictionary-transform>
          </template>
        </el-table-column>
        <el-table-column label="当前步骤" min-width="100px" align="center" prop="TASK_HANDLE_POST">
          <template slot-scope="scope">
            <dictionary-transform code="WorkingStatusCode" :value="scope.row['TASK_DEADLINE']"></dictionary-transform>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80px" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-view"
              @click="handleDetail(scope.row)"
            >处理
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>


    <!-- 预警信号列表 -->
    <div v-show="detailShow" style="margin-top: 15px;">
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">预警信号列表</p>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag" :row-style="{height:'32px'}"
         :cell-style="{padding:'0px'}" :data="taskInfoDetail.seWfWarningSigns">
          <el-table-column label="任务编号" align="center" prop="taskId"/>
          <el-table-column label="当前处理岗" align="center" prop="nowDealRole"/>
          <el-table-column label="信号名称" align="center" prop="signalName"/>
          <el-table-column label="信号等级" align="center" prop="warningLevel"/>
          <el-table-column label="预警原因" width="400px" align="center" prop="warnDsc"/>
          <el-table-column label="触发日期" align="center" prop="signalTriggerTime"/>
          <el-table-column label="下放时间" align="center" prop="distributeTime"/>
          <el-table-column label="认定状态" align="center" prop="confirmStatus">
            <template slot-scope="scope">
              <el-select v-model="scope.row.confirmStatus" :disabled="isManager" style="width: 90px">
                <el-option label="属实" value="01">属实</el-option>
                <el-option label="不属实" value="02">不属实</el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="90px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-view"
                @click="changeFeedback(scope.row)"
              >认定反馈
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--      风险检查反馈    -->
    <div v-show="detailShow" style="margin-top: 15px;">
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;margin-top: 15px">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">风险检查反馈</p>
        </div>
        <table class="table" style="font-size: 14px;margin-top: 10px" v-model="detailShow">
          <tbody>
            <tr>
              <td width="10%"></td>
              <td class="tdfir" style="line-height:30px ; " colspan="3" align="left"  >
                客户认定风险等级
              </td>
              <td width="10%">
                <div class="dropdown">
                  <el-select v-model="taskInfoDetail.riskLevel"  :disabled="isManager"  @change="riskLevelChange">
                    <el-option label="红色" value="红色">
                      <span>红色</span>
                    </el-option>
                    <el-option label="橙色" value="橙色">

                      <span>橙色</span>
                    </el-option>
                    <el-option label="黄色" value="黄色">

                      <span>黄色</span></el-option>
                    <el-option label="蓝色" value="蓝色">

                      <span>蓝色</span>
                    </el-option>
                    <el-option label="绿色" value="绿色">

                      <span>绿色</span>
                    </el-option>
                  </el-select>
                </div>
              </td>
              <td width="20%"></td>
              <td colspan="3"align="left" >
                <ul style="list-style: none;">
                  <li>
                    <span style="color: red">*</span>
                    跟踪完成日期
                    <el-input type="date" style="height: 35px;width: 220px;font-size: 12px;" :disabled="isManager"
                              v-model="taskInfoDetail.confirmTraceDate"/>
                  </li>
                </ul>
              </td>
            </tr>
            <tr  style="background: #f9f9f9;" align="left">
              <td width="10%"></td>
              <td class="tdfir" style="line-height:30px" colspan="2">附件：</td>
              <td colspan="5" style="line-height:5px">
                <a style="color:#0062bd;position:relative" @click="updateA">
                  <i style="font-size:20px" title="附件下载" class="fa fa-cloud-download"/>
                  <span style="color: red;padding-top: -5px">
                  </span>
                </a>
              </td>
            </tr>
            <tr>
              <td width="10%"></td>
              <td class="tdfir" style="height:50px" align="left ">
                检查结论
                <span style="color: red">*</span>
                <!-- <p style="color: red">(限制1000字)</p> -->
              </td>
              <td colspan="5" class="tdsec" style="height:50px">
                <el-input type="textarea" :disabled="isManager" v-model="taskInfoDetail.currentConclusions"
                          :autosize="{ minRows: 3, maxRows: 3}" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

        <!--      风险管控措施    -->
    <div v-show="detailShow" class="el-col-24" style="margin-top: 15px">
      <div class="cl_title" style="margin-bottom:5px;">
        <div class="radioball lt"></div>
        <p class="lt" style="margin: 0 0">风险管控措施</p>
      </div>
      <div class="titleTable_check">
        <div class="title_table_div">
          <p class="title_table_p" style="padding-left: 25px">
            风险管控措施:
          </p>
        </div>
        <div class="title_table_textarea" style="padding-left: 25px">
          <el-checkbox-group v-model="taskInfoDetail.currentControlMeasures" :disabled="isManager" style="line-height: 20px">
            <div style="float: left">
              <div style="width: 300px;float: left">
                <el-checkbox label="1">继续加大力度支持</el-checkbox>
                <el-checkbox label="2">按常规实施授信后管理和检查</el-checkbox>
                <el-checkbox label="3">列为重点关注对象，加大对客户的监控力度</el-checkbox>
                <el-checkbox label="4">增加风险缓释措施</el-checkbox>
                <el-checkbox label="5">收回授信后不再给予续贷</el-checkbox>
                <el-checkbox label="6">“三定原则”落实清收</el-checkbox>
                <el-checkbox label="7">依法处置授信抵/质押物</el-checkbox>
              </div>
              <div style="width: 280px;float: left;margin-left: 40px">
                <el-checkbox label="8">逐步退出</el-checkbox>
                <el-checkbox label="9">要求借款人提出更详细的还款计划</el-checkbox>
                <el-checkbox label="10">停止发放新授信</el-checkbox>
                <el-checkbox label="11">提前收回该客户未使用的授信</el-checkbox>
                <el-checkbox label="12">追索保证人连带责任</el-checkbox>
                <el-checkbox label="13">与客户协商以物抵贷</el-checkbox>
                <el-checkbox label="14">依法提起诉讼</el-checkbox>
              </div>
              <div>
                <el-checkbox label="其他"/>
                <el-input v-model="otherCheck" style="width: 200px;height: 30px;margin-left: 20px"/>
              </div>
            </div>
          </el-checkbox-group>
        </div>
      </div>
    </div>

    <!--      审核意见    -->
    <div v-show="isManager" class="el-col-24" style="margin-top: 15px">
      <div class="cl_title" style="margin-bottom:5px;">
        <div class="radioball lt"></div>
        <p class="lt" style="margin: 0 0">审核意见</p>
      </div>

      <div style="background-color: #e5e5e5;height: 40px;margin: auto 0">
        <span style="font-size: 12px;margin: auto 0; padding-top: 15px;padding-left: 20px;float: left">是否同意</span>
        <div style="float: left;padding-top: 12px;padding-left: 20px;">
          <el-radio v-model="radio" label="1">通过</el-radio>
          <el-radio v-model="radio" label="2">不通过</el-radio>
        </div>
      </div>

      <div class="titleTable">
        <div class="title_table_div">
          <p class="title_table_p" style="padding-top: 30px;padding-left: 40px">
            审核意见:
          </p>
          <p class="title_table_p_color">
            (限制1000字)
          </p>
        </div>
        <div class="title_table_textarea">
          <el-input type="textarea" v-model="examinValue" :autosize="{ minRows: 3, maxRows: 3}"/>
        </div>
      </div>
    </div>

    <!--      流程信息    -->
    <div v-show="isManager">
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">流程信息</p>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="taskInfoList" >
          <el-table-column label="序号" width="50px"  align="center" type="index"/>
          <el-table-column label="流程步骤" align="center" prop="TASKINFONO"/>
          <el-table-column label="上一流程步骤" align="center" prop="TASKINFONO"/>
          <el-table-column label="执行人" align="center" prop="CUSTNO"/>
          <el-table-column label="意见结论" align="center" prop="CUSTNAME"/>
          <el-table-column label="审核意见描述" align="center" prop="testSubType"/>
          <el-table-column label="执行时间" align="center" prop="ONELEVELCOUNT"/>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </div>

    <div v-show="detailShow" slot="footer" class="el-col-24" style="margin: 20px 40% 0 40%;padding-bottom: 30px;f;" >
      <el-button type="primary" class="btn" @click="submit">提 交</el-button>
      <el-button type="primary" class="btn" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
  import {listTaskInfo, getTaskInfoDetail, submitTaskInfo} from "@/api/workBenchDetail/peersTaskInfo.js";
  import LinkLog from "../linkLog/index";
  import redimgpng from "@/assets/png/redcircle.png"
  import orangeimgpng from "@/assets/png/orangecircle.png"
  import blueimgpng from "@/assets/png/bluecircle.png"
  import greenimgpng from "@/assets/png/greencircle.png"
  import yellowimgpng from "@/assets/png/yellowcircle.png"
  import {mapGetters} from "vuex";

  export default {
    name: "taskInfo",
    components: {LinkLog},
    data() {
      return {
        // 条数
        total:0,
        isManager:true,
        // 系统认定风险等级
        sysRiskLevel:undefined,
        //  true 标志
        trueFlag: true,
        tableHeader:false,
        redImg:redimgpng,
        orangeImg:orangeimgpng,
        blueImg:blueimgpng,
        greenImg:greenimgpng,
        yellowImg:yellowimgpng,
        //  预警认定集合
        taskInfoList: [],
        enclosureList: [],
        // 流程信息
        processList: [],
        // 任务详情
        taskInfoDetail:{
          dpApCustInfo:{},
          seWfWarningSigns:[],
          currentControlMeasures:[],
        },
        //  详情展示控制
        detailShow: false,
        open: false,
        openRiskIntroduce: false,
        onWayTaskDialog: false,
        logShow: false,
        detailListShow: true,
        radio: "",
        radioExamine: undefined,
        otherCheck: undefined,
        //
        detailInfo:{},
        examinValue: "",
        taskInfoNo: "",
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10
        },
        typeoptions: [{label:'非同业主体',value:'1'},
        {label:'同业主体',value:'2'},
        {label:'资产',value:'3'},
        {label:'投租',value:'4'}],
      }
    },
    created() {
      this.getList();
      this.managerDetail();
    },
    computed:{
      ...mapGetters([
        'roles',
      ]),
    },
    methods: {

      // 针对客户经理，不显示审核意见
      managerDetail(){
        if (this.roles.indexOf("客户经理")>-1)
          this.isManager = true;
        else
          this.isManager = false;
      },


      onWayTaskShow(){
        this.onWayTaskDialog = true;
      },
      riskLevelChange(value){
        console.log("----riskLevelChange");
        console.log(value);
        console.log(this);
        taskInfoDetail.riskLevel=value;
      },
      // 附件上传
      updateA(){
        this.openRiskIntroduce = true;
        // taskInfoDetail.attachedFile
      },
      // 流程按钮
      linkClick() {
        this.open = true;
      },
      //  提交
      submit() {
        // 没出结果，一直等待
        let loading = this.$loading({
          lock: true,
          text: '.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        });
        console.log("---submitTaskInfo1");
        //this.taskInfoDetail.currentControlMeasures = JSON.parse(this.taskInfoDetail.currentControlMeasures);
        console.log(this.taskInfoDetail.currentControlMeasures);
        submitTaskInfo(this.taskInfoNo,
        this.taskInfoDetail.currentControlMeasures.toString(),
          this.radio,
          this.examinValue,
          this.taskInfoDetail.riskLevel,
          this.taskInfoDetail.currentConclusions,
          this.taskInfoDetail.seWfWarningSigns,
          this.taskInfoDetail.confirmTraceDate).then(res => {
          console.log("---submitTaskInfo");
          console.log(res);
          if (res.code === 200) {
            this.msgSuccess("提交成功");
            this.getList();
            this.detailShow = false;
            this.detailListShow = true;
          }
          this.restParam();
          loading.close();
        }).catch(res=>{
          this.restParam();
          loading.close();
          })
      },
      cancel() {
        this.detailShow = false;
        this.detailListShow = true;
        this.isManager = false;
        this.restParam();
      },
      // 重置参数
      restParam() {
        this.taskInfoNo = "";
        this.radio = "";
        this.checkList = [];
      },
      //  详情
      handleDetail(scope) {
        console.log("wwwwwwwww");
        console.log(scope);
        this.detailShow = true;
        this.detailListShow = false;
        this.taskInfoNo = scope.TASK_NO;
        console.log(this.taskInfoNo);
        // checkBox返显
        // this.checkList = scope.riskValue === null?[]:scope.riskValue.split(";");
        // 个人认定风险等级返显
        // this.riskLevel = scope.riskLevel
        // 检查结论返显
        // this.currentConclusions = scope.currentConclusions

        // 赋值
        getTaskInfoDetail(this.taskInfoNo).then(res => {
          console.log("---res==============");
          console.log(res);
          if (200 === res.code) {
            this.taskInfoDetail = res.data;
            this.sysRiskLevel = this.taskInfoDetail.sysRiskLevel;
            this.taskInfoDetail.currentControlMeasures = this.taskInfoDetail.currentControlMeasures.split(',');
          }
        })
      },
      // 查询所有的值
      getList() {
        // 没出结果，一直等待
        let loading = this.$loading({
          lock: true,
          text: '.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        });
        listTaskInfo(this.queryParams).then(res => {
          if (res.code === 200) {
            this.taskInfoList = res.data;
            this.total= res.data.length;
          }
          console.log("---res");
          console.log(res);
          loading.close();
        }).catch(() => {
            loading.close();
          }
        )
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      resetQuery() {}
    }
  }
</script>


<style scoped>
  .selInput{
    margin-top: 3px;
  }
  .title_table_textarea >>>.el-checkbox{
    padding-top: 5px
  }

  .title_table_textarea >>>.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
    border-color: black;
  }

  .title_table_textarea >>>.el-checkbox__input.is-disabled+span.el-checkbox__label{
    color: black;
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
  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
  .table tr {
    border-bottom: 1px solid #E0E0E0;
  }
  .table .tdsec {
    width: 88%;
    text-align: left;
  }
  .dropdown {
    position: relative;
    font-size: 12px;
    margin-right: 16px;
  }
  .tipText {
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
    color: #fff;
    background: #0092DC;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    padding: 5px 5px;
  }
  .table {
    border-collapse: collapse;
    border: none;
    width: 100%;
  }
  .table .tdfir {
    width: 12%;
    text-align: center;
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
    font-size: 14px;
    margin: auto 0;
    padding-top: 100px;
    padding-left: 5px;
  }

  .title_table_p1 {
    font-size: 14px;
    margin: auto 0;
    padding-top: 100px;
    padding-left: 5px
  }

  .titleTable {
    background-color: #f9f9f9;
    height: 105px;
    margin: auto 0;
  }

  .titleTable_check {
    height: 230px;
    margin: auto 0;
  }

  .title_table_div {
    height: 100%;
    float: left;
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
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }

  .lt {
    float: left;
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
    background: url(../../../assets/png/zcicon1.png);
    background-size: 100% 100%;
    float: left;
    margin: 4px 3px 0 0;
  }

</style>
