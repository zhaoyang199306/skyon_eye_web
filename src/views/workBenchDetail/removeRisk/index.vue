<template>
  <div style="padding: 0 1%;margin: 6px 0 0 0px">
    <div class="title">
      <span class="fz_icon"/>
      <div class="title_text">
        <p>客户预警解除列表</p>
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
    <el-table width="600" :stripe="trueFlag" v-show="detailListShow" :border="trueFlag"
              :highlight-current-row="trueFlag" :row-style="{height:'32px'}"
              :cell-style="{padding:'0px'}"
              header-cell-style="font-size:12px" :data="removeRiskList">
      <el-table-column label="客户编号" align="center" prop="custNo"/>
      <el-table-column label="客户名称" align="center" prop="custName"/>
      <el-table-column label="队列ID" align="center"  prop="queueId"/>
      <el-table-column label="队列名称" align="center" prop="queueName"/>
      <el-table-column label="产品发行部门" align="center" prop="publishDepartment"/>
      <el-table-column label="所属支行" align="center" prop="branch"/>
      <el-table-column label="所属分行" align="center" prop="nextBranch"/>
      <el-table-column label="任务申请时间" align="center">2021-02-03</el-table-column>
      <el-table-column label="解除开始时间" align="center">2021-02-09</el-table-column>
      <el-table-column label="解除结束时间" align="center"/>
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

    <!--      详情-->

    <div v-show="detailShow">
      <!--客户信息-->
      <div class="cl_title" style="margin-bottom:5px;">
        <div class="radioball lt"></div>
        <p class="lt" style="margin: 0 0">客户信息</p>
      </div>
      <div style="margin-top: 10px" class="el-col-24">
        <!--    详情基本信息    -->
        <el-form ref="form" label-width="120px" class="el-col-24">
          <el-form-item label="客户编号：" class="el-col-4">
            <el-input value="3000110584" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="客户名称:" class="el-col-4">
            <el-input value="李15" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="证件号码:" class="el-col-4">
            <el-input value="113002199602154889" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="手机号码:" class="el-col-4">
            <el-input value="13956785619" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="跟踪完成日期：" label-width="140px" class="el-col-4">
            <el-input value="2021-01-05" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="风险等级：" class="el-col-4">
            <el-input value="黄色" readonly="readonly"/>
          </el-form-item>
        </el-form>
      </div>

      <div class="cl_title el-col-24" style="margin-bottom:5px;margin-top: 10px">
        <div class="radioball lt"></div>
        <p class="lt" style="margin: 0 0">申请信息</p>
        <div class="btnTask rt showMoreone" style="float: right" @click="onWayTaskShow">历史跟踪记录</div>
      </div>
      <div class="el-col-24">
        <div style="margin-top: 10px" class="el-col-12">
          <!--    详情基本信息    -->
          <el-form ref="form" label-width="120px" class="el-col-24">
            <el-form-item label="解除开始日期：" class="el-col-12">
              <el-input value="2021-02-24" disabled="disabled"/>
            </el-form-item>
            <el-form-item label="解除结束日期:" class="el-col-12">
              <el-input value="2021-02-28" disabled="disabled"/>
            </el-form-item>
            <el-form-item label="解除原因:" class="el-col-24">
              <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 8}" value="test" disabled="disabled"/>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 10px;margin-left: 100px" class="el-col-10">
          <div style="float: left">
              <span>
                附件材料
              </span>
            <el-button type="primary" class="btnTwo">上 传</el-button>
          </div>

          <div style="margin-top: 40px">
            <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                      header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                      :cell-style="{padding:'0px'}" :data="materialList">
              <el-table-column label="文件名" label-width="160px" align="center" prop="q"/>
              <el-table-column label="上传人" align="center" prop="w"/>
              <el-table-column label="上传时间" align="center" prop="e"/>
              <el-table-column label="操作" align="center"/>
            </el-table>
          </div>

        </div>
      </div>

      <!--      审核意见    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">审核意见</p>
        </div>

        <div style="background-color: #e5e5e5;height: 40px;margin: auto 0">
          <span style="font-size: 12px;margin: auto 0; padding-top: 15px;padding-left: 20px;float: left">是否同意</span>
          <div style="float: left;padding-top: 12px;padding-left: 20px;">
            <el-radio v-model="radioExamine" label="1">是</el-radio>
            <el-radio v-model="radioExamine" label="2">否</el-radio>
          </div>
        </div>

        <div class="titleTable">
          <div class="title_table_div">
            <p class="title_table_p">
              审核意见:
            </p>
          </div>
          <div class="title_table_textarea">
            <el-input type="textarea" v-model="examineValue" placeholder="请输入审核意见"
                      :autosize="{ minRows: 3, maxRows: 3}"/>
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
          <el-table-column label="解除任务编号" align="center" prop="custNo"/>
          <el-table-column label="任务申请时间" align="center" prop="custName"/>
          <el-table-column label="解除申请开始日期" align="center" prop="testSubType"/>
          <el-table-column label="解除申请结束日期" align="center" prop="oneNum"/>
          <el-table-column label="解除原因" align="center" prop="twoNum"/>
          <el-table-column label="详情" align="center" />
        </el-table>
      </el-dialog>


      <div slot="footer" class="el-col-24" style="margin: 20px 40% 0 40%">
        <el-button type="primary" class="btn" style="width: 80px" @click="linkClick">流程信息</el-button>
        <el-button type="primary" class="btn">暂 存</el-button>
        <el-button type="primary" class="btn" @click="submit">提 交</el-button>
        <el-button type="primary" class="btn" @click="cancel">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {listRemoveRisk, getRemoveRiskDetail, submitRemoveInfo} from "@/api/workBenchDetail/removeRisk.js"
  import LinkLog from "../linkLog/index";

  export default {
    name: "removeRisk",
    components: {LinkLog},
    data() {
      return {
        enclosureList:"",
        //  true 标志
        trueFlag: true,
        //  解除预警集合
        removeRiskList: [],
        // 附加材料
        materialList: [],
        // 流程
        processList: [],
        // 详情展示
        detailShow: false,
        onWayTaskDialog: false,
        open: false,
        // 详情列表
        detailListShow: true,
        radio: undefined,
        radioExamine: undefined,
        taskInfoNo: "",
        examineValue: "",
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          dataSourceId: undefined,
        },

      }
    },
    created() {
      this.getList();
    },
    methods: {
      onWayTaskShow(){
        this.onWayTaskDialog = true;
      },
      // 流程按钮
      linkClick() {
        this.open = true;
      },
      //  提交
      submit() {
        console.log("---ww");
        console.log(this.examineValue); // 没出结果，一直等待
        let loading = this.$loading({
          lock: true,
          text: '.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        });
        submitRemoveInfo(this.taskInfoNo, this.examineValue).then(res => {
          console.log("---submitRemoveInfo");
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
      //  取消
      cancel() {
        this.detailShow = false;
        this.detailListShow = true;
      },
      //  详情
      handleDetail(scope) {
        this.detailShow = true;
        this.detailListShow = false;
        this.taskInfoNo = scope.taskInfoNo;
        // 赋值
        getRemoveRiskDetail().then(res => {
          console.log("---res");
          console.log(res);
          if (200 === res.code) {
            this.processList = res.data[0];
          }
        })

      },
      // 查询所集合
      getList() {
        let loading = this.$loading({
          lock: true,
          text: '.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        });
        listRemoveRisk(this.queryParams).then(res => {
            console.log("----getList");
            console.log(res);
            if (res.code === 200) {
              this.removeRiskList = res.data;
            }
            loading.close();
          }
        ).catch(() => {
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
    height: 105px;
    margin: auto 0;
  }

  .title_table_div {
    height: 100%;
    width: 160px;
    float: left
  }

  .btnTwo {
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
