<template>
  <div style="padding: 0 1%;margin: 6px 0 0 0px">

    <!-- 标签 -->
    <div class="tag-panel" v-if="!detailShow">
      <div @click="isProprietary = true" class="tag-box" :class="{'tag-is-active': isProprietary}">
        <el-badge :value="(disposalTrackList.length === 0 ? '' : disposalTrackList.length)" class="tag-box-badge">
          自营业务
        </el-badge>
      </div>

      <div :class="{'tag-is-active': !isProprietary}" class="tag-box" @click="isProprietary = false">
        <el-badge :value="(unProprietaryList.length === 0 ? '' : unProprietaryList.length)" class="tag-box-badge">
          非自营业务
        </el-badge>
      </div>
    </div>


    <div class="title">
      <span class="fz_icon"/>
      <div class="title_text">
        <p>处置任务跟踪</p>
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
              :placeholder="(isProprietary ? '客户名称' : '渠道名称')"
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


    <!--    展示列表  -->
    <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
              header-cell-style="font-size:12px" :row-style="{height:'32px'}"
              :cell-style="{padding:'0px'}" :data="disposalTrackList" v-show="detailListShow" v-if="isProprietary">
      <el-table-column label="客户编号" align="center" prop="custNo"/>
      <el-table-column label="客户名称" align="center" prop="custName"/>
      <el-table-column label="队列ID" align="center"  prop="queueId"/>
      <el-table-column label="队列名称" align="center" prop="queueName"/>
      <el-table-column label="产品发行部门" align="center" prop="publishDepartment"/>
      <el-table-column label="所属支行" align="center" prop="branch"/>
      <el-table-column label="所属分行" align="center" prop="nextBranch"/>
      <el-table-column label="风险等级" align="center" prop="riskLevel"/>
      <el-table-column label="任务生成日期" align="center">2021-02-03</el-table-column>
      <el-table-column label="任务截止日期" align="center">2021-04-01</el-table-column>
      <el-table-column label="跟踪状态" align="center">处理中</el-table-column>
      <el-table-column label="审批权限" align="center" prop="limits"/>
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

    <el-table v-else width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
              header-cell-style="font-size:12px" :row-style="{height:'32px'}"
              :cell-style="{padding:'0px'}" :data="unProprietaryList" v-show="detailListShow">
      <el-table-column label="任务编号" align="center" prop="taskInfoNo"/>
      <el-table-column label="渠道名称" align="center" prop="custName"/>
      <el-table-column label="风险客户数" align="center"  prop="riskCustNum"/>
      <el-table-column label="所属支行" align="center" prop="branch"/>
      <el-table-column label="所属分行" align="center" prop="nextBranch"/>
      <el-table-column label="任务生成日期" align="center">2021-02-03</el-table-column>
      <el-table-column label="任务截止日期" align="center">2021-04-01</el-table-column>
      <el-table-column label="风险认定方式" align="center" prop="riskLevel"/>
      <el-table-column label="跟踪状态" align="center">处理中</el-table-column>
      <el-table-column label="审批权限" align="center" prop="limits"/>
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

    <!--      自营业务详情-->

    <div v-if="isProprietary && detailShow">
      <div class="cl_title" style="margin-bottom:5px;">
        <div class="radioball lt"></div>
        <p class="lt" style="margin: 0 0">原信息</p>
      </div>
      <div style="margin-top: 10px" class="el-col-24">
        <!--    详情基本信息    -->
        <el-form ref="form" label-width="120px" class="el-col-24">
          <el-form-item label="客户编号：" class="el-col-4">
            <el-input :value="detailInfo.custNo" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="客户名称:" class="el-col-4">
            <el-input :value="detailInfo.custName" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="证件号码:" class="el-col-4">
            <el-input value="113002199602162223" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="手机号码:" class="el-col-4">
            <el-input value="13956785619" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="跟踪完成日期：" label-width="140px" class="el-col-4">
            <el-input :value="detailInfo.doneDate" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="风险等级：" class="el-col-4">
            <el-input :value="detailInfo.riskLevel" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="管控措施：" class="el-col-18">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" value="按常规实施授信后管理和检查" readonly="readonly"/>
          </el-form-item>

          <el-form-item label="检查结论：" class="el-col-18">
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5}" value="贷款额度较大" readonly="readonly"/>
          </el-form-item>
        </el-form>


      </div>
      <!--    详情 - 改派任务清单    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">在途认定任务列表</p>
          <div class="btnTask rt showMoreone" style="float: right" @click="onWayTaskShow">历史跟踪记录</div>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="onWayTaskList">
          <el-table-column label="认定任务编号" align="center" prop="q"/>
          <el-table-column label="认定完成期限" align="center" prop="w"/>
          <el-table-column label="风险等级" align="center" prop="e"/>
          <el-table-column label="管控措施" align="center" prop="r"/>
          <el-table-column label="管控结论" align="center" prop="t"/>
          <el-table-column label="触发预警日期" align="center" prop="y"/>
          <el-table-column label="认定状态" align="u"/>
        </el-table>
      </div>
      <div class="el-col-24" style="margin-top: 15px">
        <!--      人工输入相关债券信息    -->
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">反馈信息</p>
        </div>
        <div class="el-col-24">
          <el-form ref="feedbackForm" label-width="120px" style="margin-left: 40px" class="el-col-24">
            <el-form-item label="是否处置完成：" class="el-col-6">
              <el-select v-model="feedbackForm.dealProcess" placeholder="请选择">
                <el-option
                  v-for="item in dealProcessOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="风险变化情况:" class="el-col-6">
              <el-select v-model="feedbackForm.riskStatus" placeholder="请选择">
                <el-option
                  v-for="item in riskStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="el-col-12" label-width="0px">
              <td style="width: 150px">
                <div class="dropdown">

                  <el-select v-model="riskLevelSelect" placeholder="请选择风险等级" style="width: 200px">
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
            </el-form-item>
          </el-form>
        </div>
        <div class="el-col-24">
          <div class="titleTable">
            <div class="title_table_div">
              <p class="title_table_p" style="font-size: 14px">
                反馈结果:
              </p>
              <p class="title_table_p_color" style="font-size: 14px">
                (限制1000字)
              </p>
            </div>
            <div class="title_table_textarea">
              <el-input type="textarea" v-model="feedbackValue" :autosize="{ minRows: 3, maxRows: 3}"/>
            </div>
          </div>
        </div>
        <div class="el-col-24">
          <div style="margin-left: 50px;margin-top:10px;line-height: 20px">
            <span>附件：</span>
            <a style="color:#0062bd;position:relative;width: 50px;margin-left: 20px;margin-top: 5px;" @click="updateA">
              <i style="font-size:20px" title="附件下载" class="fa fa-cloud-download"/>
              <span style="color: red;padding-top: -5px">
                    0
                  </span>
            </a>
          </div>
        </div>



      </div>
      <!--      审核意见    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">审核意见</p>
        </div>
        <div class="titleTable">
          <div class="title_table_div">
            <p class="title_table_p">
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
          <el-dialog title="流程信息" :visible.sync="open" customClass="customWidth" :close-on-click-modal="false"
                     width="500px">
            <link-log v-bind:taskInfoNo="taskInfoNo"/>
          </el-dialog>
        </template>
      </div>
      <!--历史跟踪记录dialog-->
      <el-dialog :visible.sync="onWayTaskDialog" width="1100px" title="历史详情">
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="enclosureList" >
          <el-table-column label="任务编号" align="center" prop="custNo"/>
          <el-table-column label="认定完成时限" align="center" prop="custName"/>
          <el-table-column label="风险等级" align="center" prop="testSubType"/>
          <el-table-column label="跟踪完成日期" align="center" prop="oneNum"/>
          <el-table-column label="风险检查情况" align="center" prop="twoNum"/>
          <el-table-column label="跟踪反馈情况" align="center"/>
          <el-table-column label="详情" align="center" />
        </el-table>
      </el-dialog>

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


      <!--        &lt;!&ndash;      流程信息    &ndash;&gt;-->
      <!--        <div class="el-col-24" style="margin-top: 15px">-->
      <!--          <div class="cl_title" style="margin-bottom:5px;">-->
      <!--            <div class="radioball lt"></div>-->
      <!--            <p class="lt" style="margin: 0 0">流程信息</p>-->
      <!--          </div>-->
      <!--          <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"-->
      <!--                    header-cell-style="font-size:12px" :data="processList">-->
      <!--            <el-table-column label="任务编号" label-width="160px" align="center" prop="q"/>-->
      <!--            <el-table-column label="处理岗" align="center" prop="w"/>-->
      <!--            <el-table-column label="处理人" align="center" prop="e"/>-->
      <!--            <el-table-column label="操作" align="center" prop="r"/>-->
      <!--            <el-table-column label="最新风险等级" align="center" prop="t"/>-->
      <!--            <el-table-column label="是否产生新跟踪任务" align="center" prop="y"/>-->
      <!--            <el-table-column label="新任务计划完成时间" align="center" prop="u"/>-->
      <!--            <el-table-column label="时间" align="center" prop="i"/>-->
      <!--            <el-table-column label="审核意见" align="center" prop="o"/>-->
      <!--          </el-table>-->
      <!--        </div>-->

      <div slot="footer" class="el-col-24" style="margin: 20px 40% 0 40%">
        <el-button type="primary" class="btn" style="width: 80px" @click="linkClick">流程信息</el-button>
        <el-button type="primary" class="btn">暂 存</el-button>
        <el-button type="primary" class="btn" @click="submit">提 交</el-button>
        <el-button type="primary" class="btn" @click="cancel">取 消</el-button>
      </div>
    </div>

    <div v-else-if="!isProprietary && detailShow">
      <div class="cl_title" style="margin-bottom:5px;">
        <div class="radioball lt"></div>
        <p class="lt" style="margin: 0 0">原信息</p>
      </div>
      <div style="margin-top: 10px" class="el-col-24">
        <!--    详情基本信息    -->
        <el-form ref="form" label-width="120px" class="el-col-24">
          <el-form-item label="渠道：" class="el-col-4">
            <el-input :value="detailInfo.custName" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="产品:" class="el-col-4">
            <el-input value="XX款" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="认定完成日期:" class="el-col-4">
            <el-input :value="detailInfo.doneDate" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="风险客户数量:" class="el-col-4">
            <el-input :value="detailInfo.riskCustNum" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="认定方式：" label-width="140px" class="el-col-4">
            <el-input value="系统认定" readonly="readonly"/>
          </el-form-item>
        </el-form>
      </div>

      <!--    详情 - 客户历史认定列表    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">客户历史认定列表</p>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="custHistoryList">
          <el-table-column label="任务编号" align="center" prop="custNo"/>
          <el-table-column label="认定完成期限" align="center" prop="doneDate"/>
          <el-table-column label="渠道" align="center" prop="custName"/>
          <el-table-column label="风险客户数量" align="center" prop="riskCustNum"/>
          <el-table-column label="触发预警日期" align="center" prop="createTime"/>
          <el-table-column label="认定状态" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.state}}</span>
             <el-button
                size="mini"
                type="text"
              >查看风险客户清单
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--    详情 - 客户历史跟踪处置记录    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">客户历史跟踪处置记录</p>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="custHistoryDisposalList">
          <el-table-column label="任务编号" align="center" prop="custNo"/>
          <el-table-column label="跟踪完成日期" align="center" prop="doneDate"/>
          <el-table-column label="渠道" align="center" prop="custName"/>
          <el-table-column label="风险客户数量" align="center" prop="riskCustNum"/>
          <el-table-column label="详情" align="center">
            <template slot-scope="scope">
             <el-button
                size="mini"
                type="text"
              >查看反馈清单
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--    详情 - 反馈信息    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">反馈信息</p>
        </div>
        <div class="cl_body">
          <el-form label-width="100px">
            <el-form-item label="是否处置完成" prop="name">
                <select style="width: 100px;">
                  <option>是</option>
                  <option>否</option>
                </select>
            </el-form-item>

            <el-form-item label="反馈结果" prop="name">
                <el-input
                  type="textarea"
                  v-model="textarea"
                  maxlength="100"
                  show-word-limit
                  resize="none"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                >
                </el-input>
            </el-form-item>
            <el-form-item label="上传附件">
              <i class="el-icon-upload" style="font-size: 20px;"></i>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!--    详情 - 审核意见（审批环节可看）    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">审核意见（审批环节可看）</p>
        </div>
        <div class="cl_body">
          <el-form label-width="100px">
            <el-form-item label="是否同意" prop="name">
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="2">否</el-radio>
            </el-form-item>

            <el-form-item label="审核意见" prop="name">
                <el-input
                  type="textarea"
                  v-model="textarea"
                  maxlength="100"
                  show-word-limit
                  resize="none"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                >
                </el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="el-col-24" style="margin: 20px 40% 0 40%">
            <el-button type="primary" class="btn" style="width: 80px" @click="linkClick">流程信息</el-button>
            <el-button type="primary" class="btn">暂 存</el-button>
            <el-button type="primary" class="btn" @click="submit">提 交</el-button>
            <el-button type="primary" class="btn" @click="cancel">取 消</el-button>
          </div>
        </div>

        <!--      流程信息    -->
        <div>
          <template>
            <el-dialog title="流程信息" :visible.sync="open" customClass="customWidth" :close-on-click-modal="false"
                       width="500px">
              <link-log v-bind:taskInfoNo="taskInfoNo"/>
            </el-dialog>
          </template>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {listDisposalTrack, getDisposalTrackDetail, submitTrackInfo} from "@/api/workBenchDetail/disposalTrack.js"
  import LinkLog from "../linkLog/index";
  import redimgpng from "@/assets/png/redcircle.png"
  import orangeimgpng from "@/assets/png/orangecircle.png"
  import blueimgpng from "@/assets/png/bluecircle.png"
  import greenimgpng from "@/assets/png/greencircle.png"
  import yellowimgpng from "@/assets/png/yellowcircle.png"

  export default {
    name: "disposalTrack",
    components: {LinkLog},
    data() {
      return {
        // 自营业务
        isProprietary: true,
        riskLevelSelect:"",
        //  true 标志
        trueFlag: true,
        //  详情展示控制
        detailShow: false,
        openRiskIntroduce: false,
        onWayTaskDialog: false,
        open: false,
        detailListShow: true,
        //  自营处理跟踪集合
        disposalTrackList: [],
        // 非自营处理跟踪集合
        unProprietaryList: [],
        enclosureList: [],
        // 审核意见
        examinValue: "",
        feedbackForm: {
          dealProcess: undefined,
          riskStatus: undefined,
        },
        feedbackValue: undefined,
        taskInfoNo: "",
        redImg:redimgpng,
        orangeImg:orangeimgpng,
        blueImg:blueimgpng,
        greenImg:greenimgpng,
        yellowImg:yellowimgpng,
        // 详情
        detailInfo: null,
        // 在途任务列表
        onWayTaskList: [],
        dealProcessOptions: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        riskStatusOptions: [{
          value: '1',
          label: '变'
        }, {
          value: '0',
          label: '不变'
        }],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          dataSourceId: undefined,
        },
        custHistoryList: [],
        custHistoryDisposalList: []
      }
    },
    created() {
      this.getList();
    },
    methods: {
      onWayTaskShow(){
        this.onWayTaskDialog = true;
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
        submitTrackInfo(this.taskInfoNo, this.examinValue).then(res => {
          console.log("---submitTrackInfo");
          console.log(res);
          if (res.code === 200) {
            this.msgSuccess("提交成功");
            this.getList();
            this.detailShow = false;
            this.detailListShow = true;
          }
          loading.close();
        }).catch(() => {
          loading.close();
        })
      },
      cancel() {
        this.detailShow = false;
        this.detailListShow = true;
      },
      //  详情
      handleDetail(scope) {
        console.log(scope);
        this.detailShow = true;
        this.detailListShow = false;
        this.taskInfoNo = scope.taskInfoNo;
        this.detailInfo = scope;
        this.custHistoryList = [];
        this.custHistoryDisposalList = [];
        this.custHistoryList.push({
          custNo: "3190164965",
          doneDate: "2021-07-14",
          custName: scope.custName,
          riskCustNum: 500,
          createTime: "2021-07-16",
          state: "已完成"
        })
        this.custHistoryDisposalList.push({
          custNo: "3190162363",
          doneDate: "2021-07-11",
          custName: scope.custName,
          riskCustNum: 139
        })
        // 赋值
        getDisposalTrackDetail(this.taskInfoNo).then(res => {
          console.log("---res");
          console.log(res);
          if (200 === res.code) {
          }
        })

      },
      getList() {
        // 没出结果，一直等待
        let loading = this.$loading({
          lock: true,
          text: '.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        });
        listDisposalTrack(this.queryParams).then(res => {
          console.log("---getList");
          console.log(res);
          if (res.code === 200) {
            let temp_1 = [];
            let temp_2 = [];
            res.data.forEach(item => {
              if(item.isProprietary || item.isProprietary === '1') 
                temp_1.push(item);
              else
                temp_2.push(item);
            })
            this.unProprietaryList = temp_1;
            this.disposalTrackList = temp_2;
          }
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
  .tag-panel {
    width: 200px;
    height: 30px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
  }

  .tag-box {
    width: 45%;
    height: 100%;
    background-color: #E5E5EA;
    cursor: pointer;
  }

  .tag-box-badge {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }

  .tag-is-active {
    background-color: #70A6E9;
    color: white;
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
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }

  .cl_body {
    width: 100%;
    height: auto;
    padding: 20px 40px;
    background-color: #F9F9F9;
  }

  .cl_body >>> .el-form-item {
    margin: 20px 0;
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
