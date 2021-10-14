<template>
  <div style="padding: 0 1%;margin: 6px 0 0 0px">
    <div class="title">
      <span class="fz_icon"/>
      <div class="title_text">
        <p>预警认定管理</p>
      </div>

      <!--        搜索框-->
      <div v-show="detailListShow" class="seaContainer">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="0px">
          <el-form-item prop="dataSourceName">
            <el-input
              v-model="queryParams.dataSourceName"
              placeholder="客户编号"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="description">
            <el-input
              v-model="queryParams.description"
              placeholder="客户名称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="description">
            <el-input
              v-model="queryParams.queueName"
              placeholder="队列名称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item prop="description">
            <el-input
              v-model="queryParams.ducCreateDepartment"
              placeholder="产品发行部门"
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
    <div v-show="detailListShow">
      <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                :header-cell-style="{fontSize:'12px'}" :row-style="{height:'32px'}"
                :cell-style="{padding:'0px'}" :data="taskInfoList" >
        <el-table-column label="任务编号" align="center" prop="TASKINFONO"/>
        <el-table-column label="客户编号" align="center" prop="CUSTNO"/>
        <el-table-column label="客户名称" align="center" prop="CUSTNAME"/>
        <el-table-column label="产品发行部门" align="center" prop="publishDepartment"/>
        <el-table-column label="监测主体类型" align="center" prop="testSubType"/>
        <el-table-column label="一级预警信号数量" align="center" prop="ONELEVELCOUNT"/>
        <el-table-column label="二级预警信号数量" align="center" prop="TWOLEVELCOUNT"/>
        <el-table-column label="三级预警信号数量" align="center" prop="THREELEVELCOUNT"/>
        <el-table-column label="所属支行" align="center" prop="BRANCH"/>
        <el-table-column label="所属分行" align="center" prop="NEXTBRANCH"/>
        <el-table-column label="任务完成截止时间" width="160px" align="center"/>
        <el-table-column label="认定状态" align="center"/>
        <el-table-column label="审批权限" align="center"/>
        <el-table-column label="操作" align="center">
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


    <!--附件上传dialog-->
    <el-dialog :visible.sync="openRiskIntroduce" width="1100px" >
      <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                :cell-style="{padding:'0px'}" :data="enclosureList" >
        <el-table-column label="任务编号" align="center" prop="custNo"/>
        <el-table-column label="流程节点" align="center" prop="custName"/>
        <el-table-column label="上传人" align="center" prop="testSubType"/>
        <el-table-column label="上传时间" align="center" prop="oneNum"/>
        <el-table-column label="附件" align="center" prop="twoNum"/>
        <el-table-column label="操作" align="center">
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
    </el-dialog>


    <!--在途任务dialog-->
    <el-dialog :visible.sync="onWayTaskDialog" width="1100px" title="多任务审批信息展示-风险检查反馈">
      <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                :cell-style="{padding:'0px'}" :data="enclosureList" >
        <el-table-column label="任务编号" align="center" prop="custNo"/>
        <el-table-column label="当前流程节点" align="center" prop="custName"/>
        <el-table-column label="客户风险等级" align="center" prop="testSubType"/>
        <el-table-column label="检查结论" align="center" prop="oneNum"/>
        <el-table-column label="管控措施" align="center" prop="twoNum"/>
        <el-table-column label="认定完成重新产生任务跟踪" align="center"/>
        <el-table-column label="跟踪时间" align="center" />
        <el-table-column label="审批时间" align="center" />

      </el-table>
    </el-dialog>

    <!--      详情-->

    <div v-show="detailShow">
      <div class="cl_title" style="margin-bottom:5px;">
        <div class="radioball lt"></div>
        <p class="lt" style="margin: 0 0">客户信息</p>
      </div>
      <div style="margin-top: 10px" class="el-col-24">
        <!--    详情基本信息    -->
        <el-form ref="detailInfo" :model="taskInfoDetail.dpApCustInfo" label-width="120px" class="el-col-24">
          <el-form-item label="客户编号：" class="el-col-5">
            <el-input v-model="taskInfoDetail.dpApCustInfo.custNo" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="客户名称:" class="el-col-5">
            <el-input v-model="taskInfoDetail.dpApCustInfo.custName" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="证件号码:" class="el-col-5">
            <el-input v-model="taskInfoDetail.dpApCustInfo.certNo" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="手机号码:" class="el-col-5">
            <el-input v-model="taskInfoDetail.dpApCustInfo.phone" readonly="readonly"/>
          </el-form-item>
        </el-form>
      </div>

      <!--    详情 - 改派任务清单    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">预警信号列表</p>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="taskInfoDetail.warnSignals">
          <el-table-column label="任务编号" align="center" prop="taskNum"/>
          <el-table-column label="当前处理岗" align="center" prop="nowDealRole"/>
          <el-table-column label="信号名称" align="center" prop="singleName"/>
          <el-table-column label="信号等级" align="center" prop="singleLevel"/>
          <el-table-column label="预警原因" width="400px" align="center" prop="warmResson"/>
          <el-table-column label="触发日期" align="center" prop="touchDate"/>
          <el-table-column label="下放时间" align="center" prop="devolutionDate"/>
          <el-table-column label="认定状态" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.comfStatus" :disabled="!isManager" style="width: 90px">
                <el-option label="属实" value="01">属实</el-option>
                <el-option label="不属实" value="02">不属实</el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>




      </div>
      <!--      风险检查反馈    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;margin-top: 15px">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">风险检查反馈</p>
          <div class="btnTask rt showMoreone" style="float: right" @click="onWayTaskShow">在途任务展示</div>
        </div>




        <table class="table" style="font-size: 14px;margin-top: 10px" v-model="taskInfoDetail">
          <tbody>
            <tr style="background: #f9f9f9;">
              <td rowspan="4" style="width: 120px;border-right: 1px solid #FFF3F3;">
                <p class="title_table_p">{{taskInfoNo}}</p>
              </td>
            </tr>
            <tr>
              <td class="tdfir">
                <span style="color: red">*</span>
                系统认定风险等级
                <el-tooltip  effect="dark" placement="right-start">
                  <div slot="content">
                    　<span>客户风险等级：</span><br/><br/>
                    　<span>红色：授信主体出现经营危机；</span><br/><br/>
                    　<span>橙色：授信主体出现经营下滑或出现下滑的苗头；</span><br/><br/>
                    　<span>橙色：授信主体出现风险较评审准入时有较大迹象；</span><br/><br/>
                    　<span>蓝色：授信主体存在影响授信安全的不利因素（内部，外部）；</span><br/><br/>
                    　<span>蓝色：授信主体正常运营，没有理由怀疑贷款可能出现风险；</span>
                  </div>
                  <el-button class="tipText">?</el-button>
                </el-tooltip>
              </td>
              <td style="width:10%">
                <div class="dropdown">
                  <el-input v-model="sysRiskLevel" disabled="disabled"/>
                </div>

              </td>
              <td class="tdfir">
                <span style="color: red">*</span>
                个人认定风险等级
                <el-tooltip  effect="dark" placement="right-start">
                  <div slot="content">
                    　<span>客户风险等级：</span><br/><br/>
                    　<span>红色：授信主体出现经营危机；</span><br/><br/>
                    　<span>橙色：授信主体出现经营下滑或出现下滑的苗头；</span><br/><br/>
                    　<span>橙色：授信主体出现风险较评审准入时有较大迹象；</span><br/><br/>
                    　<span>蓝色：授信主体存在影响授信安全的不利因素（内部，外部）；</span><br/><br/>
                    　<span>蓝色：授信主体正常运营，没有理由怀疑贷款可能出现风险；</span>
                  </div>
                  <el-button class="tipText">?</el-button>
                </el-tooltip>
              </td>
              <td width="10%">
                <div class="dropdown">
                  <el-select v-model="taskInfoDetail.personalRiskLevel" :disabled="!isManager"  @change="riskLevelChange">
                    <el-option label="红色" value="红色">
                      <span><img :src="redImg" style="display: inline-block;float: left;margin: 0px 5px;">红色</span>
                    </el-option>
                    <el-option label="橙色" value="橙色">
                      <img :src="orangeImg" style="display: inline-block;float: left;margin: 0px 5px;">
                      <span>橙色</span>
                    </el-option>
                    <el-option label="黄色" value="黄色">
                      <img :src="yellowImg" style="display: inline-block;float: left;margin: 0px 5px;">
                      <span>黄色</span></el-option>
                    <el-option label="蓝色" value="蓝色">
                      <img :src="blueImg" style="display: inline-block;float: left;margin: 0px 5px;">
                      <span>蓝色</span>
                    </el-option>
                    <el-option label="绿色" value="绿色">
                      <img :src="greenImg" style="display: inline-block;float: left;margin: 0px 5px;">
                      <span>绿色</span>
                    </el-option>
                  </el-select>
                </div>

              </td>
              <td>
                <ul style="list-style: none;">
                  <li>
                    <el-checkbox>认定完成重新产生跟踪任务</el-checkbox>
                  </li>
                  <li>
                    <span style="color: red">*</span>
                    跟踪完成日期
                    <el-input style="height: 35px;width: 110px;font-size: 12px" :disabled="!isManager"
                              v-model="taskInfoDetail.trackTime"/>
                  </li>
                  <li style="color:red">
                    注：将原在途跟踪任务归档，并产生新的跟踪任务
                  </li>
                </ul>

              </td>
            </tr>
            <tr  style="background: #f9f9f9;">
              <td class="tdfir" style="line-height:30px">附件：</td>
              <td colspan="5" style="line-height:5px">
                <a style="color:#0062bd;position:relative" @click="updateA">
                  <i style="font-size:20px" title="附件下载" class="fa fa-cloud-download"/>
                  <span style="color: red;padding-top: -5px">
                    0
                  </span>
                </a>
              </td>
            </tr>
            <tr>
              <td class="tdfir" style="height:223px">
                <span style="color: red">*</span>
                检查结论
                <p style="color: red">(限制1000字)</p>
              </td>
              <td colspan="5" class="tdsec" style="height:223px">

                <el-input type="textarea" :disabled="!isManager" v-model="taskInfoDetail.checkResult"
                          :autosize="{ minRows: 7, maxRows: 7}" />
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!--      风险管控措施    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">风险管控措施</p>
        </div>

        <div class="titleTable_check">
          <div class="title_table_div" style="background-color: #f9f9f9">
            <p class="title_table_p">
              {{taskInfoNo}}
            </p>
          </div>
          <div class="title_table_div">
            <p class="title_table_p" style="padding-left: 25px">
              风险管控措施:
            </p>
          </div>
          <div class="title_table_textarea" style="padding-left: 25px">
            <el-checkbox-group v-model="taskInfoDetail.riskControlMeasures == null?(taskInfoDetail.riskControlMeasures=[])
            :taskInfoDetail.riskControlMeasures" :disabled="!isManager" style="line-height: 20px">
              <div style="float: left">
                <div style="width: 300px;float: left">
                  <el-checkbox label="a">继续加大力度支持</el-checkbox>
                  <el-checkbox label="b">按常规实施授信后管理和检查</el-checkbox>
                  <el-checkbox label="c">列为重点关注对象，加大对客户的监控力度</el-checkbox>
                  <el-checkbox label="d">增加风险缓释措施</el-checkbox>
                  <el-checkbox label="e">收回授信后不再给予续贷</el-checkbox>
                  <el-checkbox label="f">“三定原则”落实清收</el-checkbox>
                  <el-checkbox label="g">依法处置授信抵/质押物</el-checkbox>
                </div>
                <div style="width: 280px;float: left;margin-left: 40px">
                  <el-checkbox label="h">逐步退出</el-checkbox>
                  <el-checkbox label="i">要求借款人提出更详细的还款计划</el-checkbox>
                  <el-checkbox label="j">停止发放新授信</el-checkbox>
                  <el-checkbox label="k">提前收回该客户未使用的授信</el-checkbox>
                  <el-checkbox label="l">追索保证人连带责任</el-checkbox>
                  <el-checkbox label="m">与客户协商以物抵贷</el-checkbox>
                  <el-checkbox label="n">依法提起诉讼</el-checkbox>
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
      <div v-show="!isManager" class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">审核意见</p>
        </div>

        <div style="background-color: #e5e5e5;height: 40px;margin: auto 0">
          <span style="font-size: 12px;margin: auto 0; padding-top: 15px;padding-left: 20px;float: left">是否同意</span>
          <div style="float: left;padding-top: 12px;padding-left: 20px;">
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
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
      <div>
        <template>
          <el-dialog title="流程信息"  :visible.sync="open" customClass="customWidth" :close-on-click-modal="false"
                     width="700px">
            <link-log v-bind:taskInfoNo="taskInfoNo"/>
          </el-dialog>
        </template>
      </div>



      <div slot="footer" class="el-col-24" style="margin: 20px 40% 0 40%;padding-bottom: 30px" >
        <el-button type="primary" class="btn" style="width: 80px" @click="linkClick">流程信息</el-button>
        <el-button type="primary" class="btn">暂 存</el-button>
        <el-button type="primary" v-show="!isManager" class="btn">退 回</el-button>
        <el-button type="primary" class="btn" @click="submit">提 交</el-button>
        <el-button type="primary" class="btn" @click="cancel">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {listTaskInfo, getTaskInfoDetail, submitTaskInfo} from "@/api/workBenchDetail/taskInfo.js";
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
        trackTime:"2021-08-01",
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
          warnSignals:[],
          riskControlMeasures:[],
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
          pageSize: 10,
          dataSourceId: undefined,
          queueName: undefined,
          ducCreateDepartment: undefined,
        },

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
      },
      // 附件上传
      updateA(){
        this.openRiskIntroduce = true;
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
        submitTaskInfo(this.taskInfoNo, this.taskInfoDetail.riskControlMeasures,
          this.radio, this.examinValue,this.taskInfoDetail.personalRiskLevel,
          this.taskInfoDetail.checkResult,this.taskInfoDetail.warnSignals).then(res => {
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
        this.taskInfoNo = scope.TASKINFONO;
        // checkBox返显
        // this.checkList = scope.riskValue === null?[]:scope.riskValue.split(";");
        // 个人认定风险等级返显
        // this.personalRiskLevel = scope.personalRiskLevel
        // 检查结论返显
        // this.checkResult = scope.checkResult

        // 赋值
        getTaskInfoDetail(this.taskInfoNo).then(res => {
          console.log("---res==============");
          console.log(res);
          if (200 === res.code) {
            this.taskInfoDetail = res.data;
            this.sysRiskLevel = this.taskInfoDetail.sysRiskLevel;
            this.taskInfoDetail.riskControlMeasures = JSON.parse(this.taskInfoDetail.riskControlMeasures);
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
    }
  }
</script>


<style scoped>

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
