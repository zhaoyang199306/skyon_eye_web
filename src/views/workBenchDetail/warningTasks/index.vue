<template>
  <div style="padding: 0 1%;margin: 6px 0 0 0px">
    <!--        搜索框-->
    <div v-show="taskListShow" class="seaContainer">
      <div class="title">
        <span class="fz_icon"/>
        <div class="title_text">
          <p>预警任务列表</p>
        </div>
      </div>
      <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="0px">
        <el-form-item prop="taskNo">
          <el-input
            v-model="queryParams.taskNo"
            placeholder="任务编号"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="warningObjectName">
          <el-input
            v-model="queryParams.warningObjectName"
            placeholder="客户名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="adBra">
          <el-select
            v-model="queryParams.adBra"
            placeholder="所属分行"
            clearable
            size="small"
          >
            <el-option
              v-for="dictSource in adBraOptions"
              :key="dictSource.dictValue"
              :label="dictSource.dictLabel"
              :value="dictSource.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="adSubBra">
          <el-select
            v-model="queryParams.adSubBra"
            placeholder="所属支行"
            clearable
            size="small"
          >
            <el-option
              v-for="dictSource in adSubBraOptions"
              :key="dictSource.dictValue"
              :label="dictSource.dictLabel"
              :value="dictSource.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="description">
          <el-select placeholder="审批权限" :disabled="!isManager">
          </el-select>
        </el-form-item>
        <el-form-item prop="taskType">
          <el-select
            v-model="queryParams.taskType"
            placeholder="任务类型"
            clearable
            size="small"
          >
            <el-option
              v-for="dictSource in taskTypeOptions"
              :key="dictSource.dictValue"
              :label="dictSource.dictLabel"
              :value="dictSource.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="taskStatus">
          <el-select
            v-model="queryParams.taskStatus"
            placeholder="任务状态"
            clearable
            size="small"
          >
            <el-option
              v-for="dictSource in taskStatusOptions"
              :key="dictSource.dictValue"
              :label="dictSource.dictLabel"
              :value="dictSource.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item style="padding-left: 12px">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--    展示列表  -->
    <div v-show="taskListShow">
      <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                :cell-style="{padding:'0px'}" :data="taskInfoList">
        <el-table-column label="任务编号" width="220px" align="center" prop="TASK_NO"/>
        <el-table-column label="客户名称" align="center" prop="WARNING_OBJECT_NAME"/>
        <el-table-column label="客户类型" align="center" prop="WARNING_OBJECT_CATEGORY" :formatter="custTypeMatter"/>
        <el-table-column label="任务类型" align="center" prop="TASK_TYPE" :formatter="taskTypeMatter"/>
        <el-table-column label="风险等级" align="center" prop="SYS_RISK_LEVEL" :formatter="riskLevelMatter"/>
        <el-table-column label="一级信号" align="center" prop="ONELEVELCOUNT"/>
        <el-table-column label="二级信号" align="center" prop="TWOLEVELCOUNT"/>
        <el-table-column label="三级信号" align="center" prop="THREELEVELCOUNT"/>
        <el-table-column label="所属分行" align="center" width="150px" prop="AD_BRA" :formatter="adBraMatter"/>
        <el-table-column label="所属支行" align="center" width="150px" prop="AD_SUB_BRA" :formatter="adSubBraMatter"/>
        <el-table-column label="任务生成日期" align="center" prop="TASK_START_TIME" width="150px">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.TASK_START_TIME) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务截止日期" align="center" prop="TASK_DEADLINE" width="150px">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.TASK_DEADLINE) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="任务状态" align="center" prop="TASK_STATUS" :formatter="taskStatusMatter"/>
        <el-table-column label="审批权限" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-view"
              @click="handle(scope.row)"
            >处理
            </el-button>
            <el-dialog
              title="提示"
              :visible.sync="centerDialogVisible"
              width="20%"
              center>
              <div class="messager-icon messager-question"></div>
              <span style="font-size: 15px">确定处理该任务吗？</span>
              <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="taskDetail(handleValue)">确 定</el-button>
    <el-button @click="centerDialogVisible = false">取 消</el-button>
  </span>
            </el-dialog>
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
    <el-dialog :visible.sync="openRiskIntroduce" width="1100px">
      <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                :cell-style="{padding:'0px'}" :data="enclosureList">
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

    <!--      详情-->

    <div v-show="taskDetailShow">
      <div style="margin-top: 10px" class="el-col-24">
        <!--    详情基本信息    -->
        <el-form ref="detailInfo" :model="seWfTaskInfo" class="el-col-24">
          <el-form-item class="el-col-4">
            <div class="pull-left custName">客户名称：</div>
            <div class="pull-left custName">{{ seWfTaskInfo.seWfWarningObject.warningObjectName}}</div>
          </el-form-item>
          <el-form-item label="当前风险等级:" label-width="140px" class="el-col-4">
            <template slot-scope="scope">
              <div class="pull-left">{{ selectDictLabel(riskLevelOptions,seWfTaskInfo.sysRiskLevel)}}</div>
            </template>
          </el-form-item>
          <el-form-item label="名单管理:" label-width="140px" class="el-col-4">
            <div class="pull-left">灰名单/黑名单</div>
          </el-form-item>
          <el-form-item label="贷款余额:" label-width="140px" class="el-col-4">
            <div class="pull-left">300万元</div>
          </el-form-item>
          <el-form-item class="el-col-6">
            <div class="pull-right" style="margin-left: 20px"><el-button type="primary" size="mini" round>历史预警任务记录</el-button></div>
            <div class="pull-right"><el-button type="primary" size="mini" round>&nbsp&nbsp&nbsp&nbsp&nbsp360°全景视图&nbsp&nbsp&nbsp&nbsp&nbsp</el-button></div>

          </el-form-item>
        </el-form>
      </div>

      <!--    预警信号列表    -->
      <div class="el-col-24" style="margin-top: 10px">
        <div style="margin-bottom:20px;">
          <p class="lt" style="margin:0px 0px 9px 0px;font-size: 14px;font-family: 黑体;font-weight:bolder">预警信号列表</p>
        </div>
        <div style="background-color: #BDD3EB;height: 40px;margin: auto 0;color: #1A6BBC ">
          <el-form ref="detailInfo" :model="seWfTaskInfo" class="el-col-24">
            <el-form-item class="el-col-6">
              <div style="font-size: 10px;font-weight:bolder" class="pull-left ">任务编号：</div>
              <div style="font-size: 10px;font-weight:bolder" class="pull-left ">{{ seWfTaskInfo.taskNo}}</div>
            </el-form-item>
            <el-form-item class="el-col-6">
            <div style="font-size: 8px;font-weight:bolder" class="pull-left ">信号来源：</div>
            <div style="font-size: 8px;font-weight:bolder" class="pull-left ">{{ seWfTaskInfo.taskNo}}</div>
          </el-form-item>
          </el-form>
        </div>
        <el-table width="600" header-cell-style="font-size:12px;color: #1A6BBC"  :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="seWfTaskInfo.seWfWarningSigns">
<!--          <el-table-column label="任务信息" width="260px" align="center">-->
<!--            <div>{{ seWfTaskInfo.taskNo}}</div>-->
<!--          </el-table-column>-->
<!--          <el-table-column label="当前处理岗" align="center" prop="nowDealRole"/>-->
          <el-table-column label="信号名称" width="300px" align="center" prop="signalName"/>
          <el-table-column label="信号等级" align="center" prop="warningLevel">
            <template slot-scope="scope">
              <div>{{ selectDictLabel(signalLevelOptions,scope.row.warningLevel)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="预警原因" width="300px" align="center" prop="warnDsc"/>
          <el-table-column label="触发日期" align="center" prop="signalTriggerTime"/>
          <el-table-column label="下放时间" align="center" prop="distributeTime"/>
          <el-table-column label="认定状态" align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.confirmStatus" :disabled="!isManager" style="width: 90px">
                <el-option label="属实" value="01">属实</el-option>
                <el-option label="不属实" value="02">不属实</el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" prop="">
            信号核实
          </el-table-column>
        </el-table>

        <!--      客户当前授信业务    -->
<!--        <div class="el-col-24" style="margin-top: 15px">-->
<!--          <div class="cl_title" style="margin-bottom:5px;margin-top: 15px">-->
<!--            <div class="radioball lt"></div>-->
<!--            <p class="lt" style="margin: 0 0">客户当前授信业务</p>-->
<!--          </div>-->
<!--          <el-table width="1000" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"-->
<!--                    header-cell-style="font-size:12px" :row-style="{height:'32px'}"-->
<!--                    :cell-style="{padding:'0px'}" :data="tableData" style="width: 100%">-->
<!--            <el-table-column label="产品类型" align="center" prop="taskId"/>-->
<!--            <el-table-column label="贷款发放日期" align="center" prop="nowDealRole"/>-->
<!--            <el-table-column label="贷款到期日期" align="center" prop="signalName"/>-->
<!--            <el-table-column label="贷款利率" align="center" prop="warningLevel"/>-->
<!--            <el-table-column label="额度金额" align="center" prop="warnDsc"/>-->
<!--            <el-table-column label="五级分类" align="center" prop="signalTriggerTime"/>-->
<!--            <el-table-column label="贷款余额" align="center" prop="distributeTime"/>-->
<!--            <el-table-column label="主要担保方式" align="center" prop="distributeTime"/>-->
<!--          </el-table>-->
<!--        </div>-->
        <!--      预警任务历史记录    -->
<!--        <div class="el-col-24" style="margin-top: 15px">-->
<!--          <div class="cl_title" style="margin-bottom:5px;margin-top: 15px">-->
<!--            <div class="radioball lt"></div>-->
<!--            <p class="lt" style="margin: 0 0">预警任务历史记录</p>-->
<!--          </div>-->
<!--          <el-table width="1000" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"-->
<!--                    header-cell-style="font-size:12px" :row-style="{height:'32px'}"-->
<!--                    :cell-style="{padding:'0px'}" :data="seWfTaskInfoHis" style="width: 100%">-->
<!--            <el-table-column label="任务编号" align="center" prop="taskNo"/>-->
<!--            <el-table-column label="任务完成日期" align="center" prop="taskEndTime"/>-->
<!--            <el-table-column label="风险等级" align="center" prop="riskLevel">-->
<!--              <template slot-scope="scope">-->
<!--                <div>{{ selectDictLabel(riskLevelOptions,scope.row.riskLevel)}}</div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="一户一策计划" align="center" prop="oneFamilyOnePolicy"/>-->
<!--            <el-table-column label="认定方式" align="center" prop="warningConfirmModel">-->
<!--              <template slot-scope="scope">-->
<!--                <div>{{ selectDictLabel(confirmModelOptions,scope.row.warningConfirmModel)}}</div>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="详情" align="center"><a href="#">查看</a></el-table-column>-->
<!--          </el-table>-->
<!--        </div>-->
      </div>

      <!--      风险判断        -->
      <div class="el-col-24" style="margin-top: 15px">
        <div style="margin-bottom:20px;">
          <p class="lt" style="margin:0px 0px 9px 0px;font-size: 14px;font-family: 黑体;font-weight:bolder">风险判断</p>
        </div>
        <div style="background-color: #e5e5e5;height: 40px;margin: auto 0">
          <span style="font-size: 13px;margin: auto 0; padding-top: 15px;float: left">系统认定客户风险等级：</span>
          <div style="margin: auto 0; padding-top: 4px;float: left">
            <div class="pull-left" style="margin-top: 11px;font-size: 13px">{{ selectDictLabel(riskLevelOptions,seWfTaskInfo.sysRiskLevel)}}</div>
          </div>
          <span style="font-size: 13px;margin: auto 0; padding-top: 15px;padding-left: 100px;float: left">认定客户风险等级：</span>
          <div style="margin: auto 0; padding-top: 4px;padding-left: 10px;float: left">
            <el-select v-model="seWfTaskInfo.riskLevel" placeholder="认定客户风险等级" style="width: 250px"
                       :disabled="detailViem">
              <el-option
                v-for="dict in riskLevelOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="titleTable">
          <div class="title_table_div">
            <p class="title_table_p" style="padding-top: 30px;padding-left: 40px">
              认定理由:
            </p>
            <p class="title_table_p_color">
              (限制1000字)
            </p>
          </div>
          <div class="title_table_textarea">
            <el-input type="textarea" v-model="seWfTaskInfo.seWfTaskExecuteFeedback ==
            null?(seWfTaskInfo.seWfTaskExecuteFeedback = {})
            :seWfTaskInfo.seWfTaskExecuteFeedback.currentConclusions"
                      :autosize="{ minRows: 3.5, maxRows: 3.5}"
                      placeholder="请填写无风险理由"/>
          </div>
        </div>
        <div class="titleTable1">
          <div class="title_table_div">
            <p class="title_table_p" style="padding-top: 20px;padding-left: 40px ;">
              附件
            </p>
          </div>
          <div class="title_table_div">
            <a style="color:#0062bd;padding-top: 20px;padding-left: 40px ;" @click="updateA">
              <i style="font-size:20px" title="附件" class="fa fa-cloud-upload"/>
            </a>
          </div>
        </div>
      </div>

      <!--      风险管控措施    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div style="margin-bottom:20px;">
          <p class="lt" style="margin:0px 0px 9px 0px;font-size: 14px;font-family: 黑体;font-weight:bolder">风险管控措施</p>
        </div>
        <div class="titleTable_check">
          <div class="titleTable1">
            <div class="title_table_div">
              <p class="title_table_p" style="padding-left: 25px">
                风险管控措施:
              </p>
            </div>
            <div class="title_table_div">
              <div class="title_table_textarea" style="padding-left: 25px">
                <el-checkbox-group v-model="seWfTaskInfo.seWfTaskExecuteFeedback ==
                null?(seWfTaskInfo.seWfTaskExecuteFeedback = {})
                :seWfTaskInfo.seWfTaskExecuteFeedback.currentControlMeasures" style="line-height: 20px">
                  <div style="float: left">
                    <div style="width: 1000px;float: left">
                      <el-checkbox label="1">提前催收</el-checkbox>
                      <el-checkbox label="2">日常持续关注</el-checkbox>
                      <el-checkbox label="3">立即实地走访</el-checkbox>
                      <el-checkbox label="4">加强贷后走访</el-checkbox>
                      <el-checkbox label="5">冻额</el-checkbox>
                      <el-checkbox label="6">加强关注</el-checkbox>
                      <el-checkbox label="7">其他</el-checkbox>
                      <!--                      <el-input v-model="seWfTaskInfo.seWfTaskExecuteFeedback.otherControlMeasures"-->
                      <!--                                style="width: 200px;height: 30px;margin-left: 20px"/>-->
                    </div>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </div>

          <div style="background-color: #f9f9f9;height: 40px;margin: auto 0;">
            <el-form ref="detailInfo" :model="seWfTaskInfo" class="el-col-24">
              <el-form-item class="el-col-8">
                <div style="font-size: 14px;" class="pull-left ">要求任务跟踪完成日期：</div>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item class="el-col-6">
                <div style="font-size: 14px;" class="pull-left ">附件：</div>
                <div class="title_table_div">
                  <a style="color:#0062bd;padding-top: 2px;padding-left: 40px;" @click="updateA">
                    <i style="font-size:20px" title="附件" class="fa fa-cloud-upload"/>
                  </a>
                </div>
              </el-form-item>
            </el-form>
          </div>

          <div class="titleTable">
            <div class="title_table_div">
              <p class="title_table_p" style="padding-top: 30px;padding-left: 20px">
                一户一策计划：
              </p>
              <p class="title_table_p_color">
                (限制1000字)
              </p>
            </div>
            <div class="title_table_textarea">
              <el-input type="textarea" v-model="seWfTaskInfo.seWfTaskExecuteFeedback.oneFamilyOnePolicy"
                        :autosize="{ minRows: 3.5, maxRows: 3.5}"
                        aria-placeholder=""/>
            </div>
          </div>
        </div>


        <!--      审核意见    -->
        <div v-show="isManager" class="el-col-24" style="margin-top: 5px">
          <div style="margin-bottom:20px;">
            <p class="lt" style="margin:0px 0px 9px 0px;font-size: 14px;font-family: 黑体;font-weight:bolder">审核意见</p>
          </div>

          <div style="background-color: #e5e5e5;height: 40px;margin: auto 0">
            <span style="font-size: 14px;margin: auto 0; padding-top: 12px;padding-left: 20px;float: left">意见结论</span>
            <div style="float: left;padding-top: 12px;padding-left: 20px;font-size: 12px;">
              <el-radio v-model="radio" label="1">通过</el-radio>
              <el-radio v-model="radio" label="2">不通过</el-radio>
            </div>
          </div>
          <div class="titleTable">
            <div class="title_table_div">
              <p class="title_table_p" style="padding-top: 30px;padding-left: 40px">
                审核意见描述:
              </p>
              <p class="title_table_p_color">
                (限制1000字)
              </p>
            </div>
            <div class="title_table_textarea">
              <el-input type="textarea" v-model="seWfTaskInfo.seWfTaskExecuteFeedback.currentFeedback" :autosize="{ minRows: 3.5, maxRows: 3.5}"/>
            </div>
          </div>
        </div>

        <!--    过程意见    -->
        <div v-show="isManager" class="el-col-24" style="margin-top: 10px">
          <div style="margin-bottom:20px;">
            <p class="lt" style="margin:0px 0px 9px 0px;font-size: 14px;font-family: 黑体;font-weight:bolder">过程意见</p>
          </div>
          <el-table width="600" header-cell-style="font-size:12px;color: #1A6BBC"  :row-style="{height:'32px'}"
                    :cell-style="{padding:'0px'}" :data="seWfTaskInfo.seWfWarningSigns">
            <el-table-column label="流程步骤" width="300px" align="center" prop="signalName"/>
            <el-table-column label="上一流程步骤" align="center" prop="warningLevel">
              <template slot-scope="scope">
                <div>{{ selectDictLabel(signalLevelOptions,scope.row.warningLevel)}}</div>
              </template>
            </el-table-column>
            <el-table-column label="执行人" width="300px" align="center" prop="warnDsc"/>
            <el-table-column label="意见结论" align="center" prop="signalTriggerTime"/>
            <el-table-column label="审核意见描述" align="center" prop="distributeTime"/>
            <el-table-column label="执行时间" align="center" prop=""/>
          </el-table>

          <!--      客户当前授信业务    -->
          <!--        <div class="el-col-24" style="margin-top: 15px">-->
          <!--          <div class="cl_title" style="margin-bottom:5px;margin-top: 15px">-->
          <!--            <div class="radioball lt"></div>-->
          <!--            <p class="lt" style="margin: 0 0">客户当前授信业务</p>-->
          <!--          </div>-->
          <!--          <el-table width="1000" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"-->
          <!--                    header-cell-style="font-size:12px" :row-style="{height:'32px'}"-->
          <!--                    :cell-style="{padding:'0px'}" :data="tableData" style="width: 100%">-->
          <!--            <el-table-column label="产品类型" align="center" prop="taskId"/>-->
          <!--            <el-table-column label="贷款发放日期" align="center" prop="nowDealRole"/>-->
          <!--            <el-table-column label="贷款到期日期" align="center" prop="signalName"/>-->
          <!--            <el-table-column label="贷款利率" align="center" prop="warningLevel"/>-->
          <!--            <el-table-column label="额度金额" align="center" prop="warnDsc"/>-->
          <!--            <el-table-column label="五级分类" align="center" prop="signalTriggerTime"/>-->
          <!--            <el-table-column label="贷款余额" align="center" prop="distributeTime"/>-->
          <!--            <el-table-column label="主要担保方式" align="center" prop="distributeTime"/>-->
          <!--          </el-table>-->
          <!--        </div>-->
          <!--      预警任务历史记录    -->
          <!--        <div class="el-col-24" style="margin-top: 15px">-->
          <!--          <div class="cl_title" style="margin-bottom:5px;margin-top: 15px">-->
          <!--            <div class="radioball lt"></div>-->
          <!--            <p class="lt" style="margin: 0 0">预警任务历史记录</p>-->
          <!--          </div>-->
          <!--          <el-table width="1000" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"-->
          <!--                    header-cell-style="font-size:12px" :row-style="{height:'32px'}"-->
          <!--                    :cell-style="{padding:'0px'}" :data="seWfTaskInfoHis" style="width: 100%">-->
          <!--            <el-table-column label="任务编号" align="center" prop="taskNo"/>-->
          <!--            <el-table-column label="任务完成日期" align="center" prop="taskEndTime"/>-->
          <!--            <el-table-column label="风险等级" align="center" prop="riskLevel">-->
          <!--              <template slot-scope="scope">-->
          <!--                <div>{{ selectDictLabel(riskLevelOptions,scope.row.riskLevel)}}</div>-->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <!--            <el-table-column label="一户一策计划" align="center" prop="oneFamilyOnePolicy"/>-->
          <!--            <el-table-column label="认定方式" align="center" prop="warningConfirmModel">-->
          <!--              <template slot-scope="scope">-->
          <!--                <div>{{ selectDictLabel(confirmModelOptions,scope.row.warningConfirmModel)}}</div>-->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <!--            <el-table-column label="详情" align="center"><a href="#">查看</a></el-table-column>-->
          <!--          </el-table>-->
          <!--        </div>-->
        </div>
      </div>

      <div slot="footer" class="el-col-24" style="margin: 20px 45% 0 45%;padding-bottom: 30px">
        <el-button type="primary" class="btn" @click="submit">提 交</el-button>
        <el-button type="primary" class="btn" @click="cancel">取 消</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import { listTaskInfo, getTaskDetail, getHistoryTask, submitTaskInfo } from '@/api/workBenchDetail/taskInfo.js'
  import LinkLog from '../linkLog/index'
  import redimgpng from '@/assets/png/redcircle.png'
  import orangeimgpng from '@/assets/png/orangecircle.png'
  import blueimgpng from '@/assets/png/bluecircle.png'
  import greenimgpng from '@/assets/png/greencircle.png'
  import yellowimgpng from '@/assets/png/yellowcircle.png'
  import { mapGetters } from 'vuex'

  export default {
    name: 'taskInfo',
    components: { LinkLog },
    data() {
      return {
        // 条数
        total: 0,
        isManager: true,
        // 系统认定风险等级
        sysRiskLevel: undefined,
        trackTime: '2021-08-01',
        //  true 标志
        trueFlag: true,
        tableHeader: false,
        redImg: redimgpng,
        orangeImg: orangeimgpng,
        blueImg: blueimgpng,
        greenImg: greenimgpng,
        yellowImg: yellowimgpng,
        //  预警认定集合
        taskInfoList: [],
        enclosureList: [],
        // 流程信息
        processList: [],
        // 风险等级
        riskLevelOptions: [],
        // 客户类型
        custTypeOptions: [],
        // 任务类型
        taskTypeOptions: [],
        // 任务状态
        taskStatusOptions: [],
        // 所属分行
        adBraOptions: [],
        // 所属支行
        adSubBraOptions: [],
        checkList: ['2', '4'],
        // 信号来源
        signalSourceOptions: [],
        //信号等级
        signalLevelOptions: [],
        //认定方式
        confirmModelOptions: [],
        // 任务详情
        seWfTaskInfo: {
          seWfWarningObject: {},
          seWfTaskExecuteFeedback: { currentControlMeasures: [],oneFamilyOnePolicy:undefined,currentConclusions:undefined},
          seWfWarningSigns: []
        },

        seWfTaskInfoHis: [],
        //  详情展示控制
        taskDetailShow: false,
        open: false,
        openRiskIntroduce: false,
        onWayTaskDialog: false,
        logShow: false,
        taskListShow: true,
        radio: '',
        radioExamine: undefined,
        otherCheck: undefined,
        //
        detailInfo: {},
        examinValue: '',
        taskNo: '',
        warningObjectName: '',
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          taskNo: undefined,
          warningObjectName: undefined,
          adBra: undefined,
          adSubBra: undefined,
          taskType: undefined,
          taskStatus: undefined
        },
        centerDialogVisible: false,
        handleValue:undefined
      }
    },
    created() {
      this.getList()
      this.managerDetail()
      this.getDicts('sys_risk_level').then(response => {
        this.riskLevelOptions = response.data
      })
      this.getDicts('sys_cust_type').then(response => {
        this.custTypeOptions = response.data
      })
      this.getDicts('sys_task_type').then(response => {
        this.taskTypeOptions = response.data
      })
      this.getDicts('sys_task_status').then(response => {
        this.taskStatusOptions = response.data
      })
      this.getDicts('sys_sub_branch').then(response => {
        this.adSubBraOptions = response.data
      })
      this.getDicts('sys_branch_org').then(response => {
        this.adBraOptions = response.data
      })
      this.getDicts('sys_signal_source').then(response => {
        this.signalSourceOptions = response.data
      })
      this.getDicts('sys_signal_level').then(response => {
        this.signalLevelOptions = response.data
      })
      this.getDicts('sys_confirm_model').then(response => {
        this.confirmModelOptions = response.data
      })

    },
    computed: {
      ...mapGetters([
        'roles'
      ])
    },
    methods: {
      // 针对客户经理，不显示审核意见
      managerDetail() {
        if (this.roles.indexOf('客户经理') > -1) {
          this.isManager = true
        } else {
          this.isManager = false
        }
      },

      onWayTaskShow() {
        this.onWayTaskDialog = true
      },
      riskLevelChange(value) {
        console.log('----riskLevelChange')
        console.log(value)
        console.log(this)
      },
      // 附件上传
      updateA() {
        this.openRiskIntroduce = true
      },
      // 流程按钮
      linkClick() {
        this.open = true
      },
      handle(scope){
        this.centerDialogVisible = true
        this.handleValue = scope
      },
      //  提交
      submit() {
        // 没出结果，一直等待
        let loading = this.$loading({
          lock: true,
          // text: '.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        })
        // submitTaskInfo(this.taskNo, this.taskInfoDetail.riskControlMeasures,
        //   this.radio, this.examinValue, this.taskInfoDetail.personalRiskLevel,
        //   this.taskInfoDetail.checkResult, this.taskInfoDetail.warnSignals).then(res => {
        //   console.log('---submitTaskInfo')
        //   console.log(res)
        //   if (res.code === 200) {
        //     this.msgSuccess('提交成功')
        //     this.getList()
        //     this.taskDetailShow = false
        //     this.taskListShow = true
        //   }
        //   this.restParam()
        //   loading.close()
        // }).catch(res => {
        //   this.restParam()
        //   loading.close()
        // })
        console.log('---1231231231')
        console.log(this.seWfTaskInfo)
        if(null!=this.seWfTaskInfo.seWfTaskExecuteFeedback){
          this.seWfTaskInfo.seWfTaskExecuteFeedback.currentControlMeasures = this.seWfTaskInfo.seWfTaskExecuteFeedback.currentControlMeasures.join(',')
        }
        submitTaskInfo(this.seWfTaskInfo).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.msgSuccess('提交成功')
            this.getList()
            this.taskDetailShow = false
            this.taskListShow = true
          }
          this.restParam()
          loading.close()
        }).catch(res => {
          this.restParam()
          loading.close()
        })

      },
      cancel() {
        this.taskDetailShow = false
        this.taskListShow = true
        this.restParam()
      },
      // 重置参数
      restParam() {
        this.taskNo = ''
        this.radio = ''
        this.checkList = []
      },
      // 任务详情
      taskDetail(scope) {
        console.log(scope)
        this.centerDialogVisible = false
        this.taskDetailShow = true
        this.taskListShow = false
        this.taskNo = scope.TASK_NO
        this.warningObjectId = scope.WARNING_OBJECT_ID
        console.log('---res=============='+this.taskNo)
        // 赋值
        getTaskDetail(this.taskNo).then(res => {
          console.log(res)
          if (200 === res.code) {
            // this.seWfWarningObject = this.seWfTaskInfo.seWfWarningObject
            // this.seWfWarningSigns = this.seWfTaskInfo.seWfWarningSigns
            // this.seWfTaskExecuteFeedback = this.seWfTaskInfo.seWfTaskExecuteFeedback
            if(res.data.seWfTaskExecuteFeedback==null){
              res.data.seWfTaskExecuteFeedback = this.seWfTaskInfo.seWfTaskExecuteFeedback
            }
            this.seWfTaskInfo = res.data
            if(null!=this.seWfTaskInfo.seWfTaskExecuteFeedback) {
              this.seWfTaskInfo.seWfTaskExecuteFeedback.currentControlMeasures = this.seWfTaskInfo.seWfTaskExecuteFeedback.currentControlMeasures.split(',')
            }
          }
          // 获取客户历史任务记录
          getHistoryTask(this.warningObjectId).then(res => {
            console.log('---res==============')
            console.log(res)
            if (200 === res.code) {
              this.seWfTaskInfoHis = res.data
            }
          })
        })
      },
      //  详情
      // handleDetail(scope) {
      //   console.log("wwwwwwwww");
      //   console.log(scope);
      //   this.taskDetailShow = true;
      //   this.taskListShow = false;
      //   this.taskNo = scope.taskNo;
      //   // checkBox返显
      //   // this.checkList = scope.riskValue === null?[]:scope.riskValue.split(";");
      //   // 个人认定风险等级返显
      //   // this.personalRiskLevel = scope.personalRiskLevel
      //   // 检查结论返显
      //   // this.checkResult = scope.checkResult
      //
      //   // 赋值
      //   getTaskDetail(this.taskNo).then(res => {
      //     console.log("---res==============");
      //     console.log(res);
      //     if (200 === res.code) {
      //       this.taskInfoDetail = res.data;
      //       this.sysRiskLevel = this.taskInfoDetail.sysRiskLevel;
      //       this.taskInfoDetail.riskControlMeasures = JSON.parse(this.taskInfoDetail.riskControlMeasures);
      //     }
      //   })
      // },
      // 查询所有的值
      getList() {
        // 没出结果，一直等待
        let loading = this.$loading({
          lock: true,
          text: '.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        })
        listTaskInfo(this.queryParams).then(res => {
          if (res.code === 200) {
            this.taskInfoList = res.data
            this.total = res.data.length
          }
          console.log('---res')
          console.log(res)
          loading.close()
        }).catch(() => {
            loading.close()
          }
        )
      },
      // 风险等级字典翻译
      riskLevelMatter(row, column) {
        return this.selectDictLabel(this.riskLevelOptions, row.SYS_RISK_LEVEL)
      },
      // 客户类型字典翻译
      custTypeMatter(row, column) {
        return this.selectDictLabel(this.custTypeOptions, row.WARNING_OBJECT_CATEGORY)
      },
      // 任务类型字典翻译
      taskTypeMatter(row, column) {
        return this.selectDictLabel(this.taskTypeOptions, row.TASK_TYPE)
      },
      // 任务状态字典翻译
      taskStatusMatter(row, column) {
        return this.selectDictLabel(this.taskStatusOptions, row.TASK_STATUS)
      },
      // 所属分行字典翻译
      adBraMatter(row, column) {
        return this.selectDictLabel(this.adBraOptions, row.AD_BRA)
      },
      // 所属支行字典翻译
      adSubBraMatter(row, column) {
        return this.selectDictLabel(this.adSubBraOptions, row.AD_SUB_BRA)
      },
      // 信号来源字典翻译
      signalSourceMatter(row, column) {
        return this.selectDictLabel(this.signalSourceOptions, row.SIGNAL_SOURCE)
      },
      //信号等级字典翻译
      signalLevelMatter(row, column) {
        return this.selectDictLabel(this.signalLevelOptions, row.WARNING_LEVEL)
      },
      //认定方式字典翻译
      confirmModelMatter(row, column) {
        return this.selectDictLabel(this.confirmModelOptions, row.CONFIRM_STATUS)
      },

      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.getList()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      }
    }
  }
</script>


<style scoped>

  .title_table_textarea >>> .el-checkbox {
    padding-top: 5px
  }

  .title_table_textarea >>> .el-checkbox__input.is-disabled .el-checkbox__inner::after {
    border-color: black;
  }

  .title_table_textarea >>> .el-checkbox__input.is-disabled + span.el-checkbox__label {
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
    padding: 0px 0px;
    margin-top: 12px;
    margin-left: 10px;
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
    width: 80%;
    padding-top: 2px
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
    padding-top: 10px;
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

  .titleTable1 {
    background-color: #f9f9f9;
    height: 50px;
    margin: auto 0;
  }

  .titleTable_check {
    height: 100px;
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

  /**
  取消搜索栏各组件的右边距
   */
  .el-form--inline .el-form-item {
    display: inline-block;
    margin-right: 0px;
    vertical-align: top;
  }

  .messager-icon {
    float: left;
    width: 32px;
    height: 32px;
    margin: 0 10px 10px 0;
  }

  .messager-question {
    background: url(../../../../public/messager_icons.png) no-repeat scroll -32px 0;
  }
</style>

<style>
  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }

  .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }

  .el-dialog__title {
    line-height: 20px;
    font-size: 16px;
    color: #0E2D5F;
    float: left;
    height: 20px;
    font-weight: bold;
  }

  .tipText {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    text-align: center;
    line-height: 16px;
    color: #fff;
    background: #0092DC;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  }
  .custName{
    white-space: nowrap;
    text-align: left;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    font-family: 黑体;
    color: rgb(26, 107, 188);
  }
</style>
