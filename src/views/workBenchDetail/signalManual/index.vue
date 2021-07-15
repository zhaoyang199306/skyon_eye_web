<template>
  <div style="padding: 0 1%;margin: 6px 0 0 0px">
    <div class="title">
      <span class="fz_icon"/>
      <div class="title_text">
        <p>人工信号录入</p>
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
          <el-form-item style="padding-left: 12px">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" icon="el-icon-circle-plus" size="mini" @click="insertButton">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--    展示列表  -->
    <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
              header-cell-style="font-size:12px" :data="signalManualList" v-show="detailListShow">
      <el-table-column label="客户编号" align="center" prop="custNo"/>
      <el-table-column label="客户名称" align="center" prop="custName"/>
      <el-table-column label="客户经理" align="center" prop="custManager"/>
      <el-table-column label="所属支行" align="center" prop="branch"/>
      <el-table-column label="所属分行" align="center" prop="nextBranch"/>
      <el-table-column label="风险提示单" align="center"/>
      <el-table-column label="日期" align="center" prop="INPUT_DT"/>
      <el-table-column label="审批权限" align="center" prop="limits"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleDetail(scope.row)"
          >详情
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--      详情-->

    <div v-show="detailShow">
      <div class="cl_title" style="margin-bottom:5px;">
        <div class="radioball lt"></div>
        <p class="lt" style="margin: 0 0">客户信息</p>
      </div>
      <div style="margin-top: 10px" class="el-col-24">
        <!--    详情基本信息    -->
        <el-form ref="form" :model="form" label-width="120px" class="el-col-24">
          <el-form-item label="客户名称：" class="el-col-6">
            <el-input v-model="form.custName"/>
          </el-form-item>
          <el-form-item label="客户编号:" class="el-col-6">
            <el-input v-model="form.custNo"/>
          </el-form-item>
          <el-form-item label="所属支行：" class="el-col-6">
            <el-input v-model="form.branch"/>
          </el-form-item>
          <el-form-item label="管户客户经理：" class="el-col-6">
            <el-input v-model="form.custManager"/>
          </el-form-item>
        </el-form>
      </div>
      <!--    详情 - 改派任务清单    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">授信信息</p>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="creditInformationList">
          <el-table-column label="客户名称" align="center" prop="CUST_NAME"/>
          <el-table-column label="分行" align="center" prop="ADMIN_BRANCH_NAME"/>
          <el-table-column label="类型" align="center" prop="TYPE"/>
          <el-table-column label="签约合同号" align="center" prop="CONTRACT_NO"/>
          <el-table-column label="到期日" align="center" prop="DUE_DATE"/>
          <el-table-column label="授信余额(万元)" align="center" prop="CREDIT_BALANCE"/>
          <el-table-column label="主要担保方式" align="GUARANTEE_METHOD"/>
          <el-table-column label="操作" align="center"/>
        </el-table>
        <!--      人工输入相关债券信息    -->
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">人工输入相关债券信息</p>
        </div>
        <el-button type="primary" size="mini" @click="addBondInfo">添加</el-button>


        <el-table
          :data="form.bondInfoList"
          tooltip-effect="dark"
          border
          stripe
          style="width: 100%">
          <el-table-column label="债券名称"  align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bondName"  :disabled="detailViem"/>
            </template>
          </el-table-column>
          <el-table-column label="投组名称"  align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bondGroupName"  :disabled="detailViem"/>
            </template>
          </el-table-column>
          <el-table-column label="投组类型"  align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bondGroupType"  :disabled="detailViem"/>
            </template>
          </el-table-column>
          <el-table-column label="债券到期日"  align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.bondEndDate"  :disabled="detailViem"/>
            </template>
          </el-table-column>
          <el-table-column label="余额(万元)" align="center" >
            <template slot-scope="scope">
              <el-input v-model="scope.row.balance"  :disabled="detailViem"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" >
            <template slot-scope="scope">
              <el-button type="primary" @click="deleteBondInfo(scope)" :disabled="detailViem">删除</el-button>
            </template>
          </el-table-column>
        </el-table>



      </div>
      <!--      人工预警信息    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">人工预警信息</p>
        </div>
        <div style="background-color: #e5e5e5;height: 40px;margin: auto 0">
          <p style="font-size: 12px;margin: auto 0; padding-top: 15px;padding-left: 20px;">信号风险等级:一级预警 信号大类:人工录入</p>
        </div>
        <div class="titleTable">
          <div class="title_table_div">
            <p class="title_table_p">
              风险信息描述:
            </p>
            <p class="title_table_p_color">
              (限制1000字)
            </p>
          </div>
          <div class="title_table_textarea">
            <el-input type="textarea" v-model="waringValue" :autosize="{ minRows: 3, maxRows: 3}"/>
          </div>
        </div>
      </div>

      <!--      风险提示单设置    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">风险提示单设置</p>
        </div>

        <div style="background-color: #e5e5e5;height: 40px;margin: auto 0">
          <span
            style="font-size: 12px;margin: auto 0; padding-top: 15px;padding-left: 20px;float: left">是否生成风险提示单</span>
          <div style="float: left;padding-top: 12px;padding-left: 20px;">
            <el-radio v-model="radio" label="1">生成</el-radio>
            <el-radio v-model="radio" label="2">不生成</el-radio>
          </div>
        </div>

        <div class="titleTable">
          <div class="title_table_div">
            <p class="title_table_p">
              应对措施及管控建议:
            </p>
            <p class="title_table_p_color">
              (限制1000字)
            </p>
          </div>
          <div class="title_table_textarea">
            <el-input type="textarea" v-model="riskValue" :autosize="{ minRows: 3, maxRows: 3}"/>
          </div>
        </div>

      </div>
      <!--      风险提示单设置    -->
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
            <p class="title_table_p_color">
              (限制1000字)
            </p>
          </div>
          <div class="title_table_textarea">
            <el-input type="textarea" v-model="examineValue" :autosize="{ minRows: 3, maxRows: 3}"/>
          </div>
        </div>

      </div>
      <!--      流程信息    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">流程信息</p>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="processList">
          <el-table-column label="任务编号" label-width="160px" align="center" prop="TASK_NO"/>
          <el-table-column label="处理岗" align="center" prop="APPLY_PEOPLE_NAME"/>
          <el-table-column label="处理人" align="center" prop="APPLY_PEOPLE_NAME"/>
          <el-table-column label="操作" align="center" prop="APPLY_PEOPLE_NAME"/>
          <el-table-column label="时间" align="center" prop="APPLY_PEOPLE_NAME"/>
          <el-table-column label="审核意见" align="center" prop="APPLY_PEOPLE_NAME"/>
        </el-table>
      </div>

      <div slot="footer" class="el-col-24" style="margin: 20px 40% 0 45%">
        <el-button type="primary" class="btn" style="width:80px">提示单预览</el-button>
        <el-button type="primary" class="btn" @click="submitForm">提 交</el-button>
        <el-button type="primary" class="btn" @click="cancel">取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {listSignalManual, getSignalManualDetail, submitSignalManualForm} from "@/api/workBenchDetail/signalManual.js";

  export default {
    name: "signalManual",
    data() {
      return {
        // 总条数
        total: 0,
        //  true 标志
        trueFlag: true,
        //  详情展示控制
        detailShow: false,
        detailListShow: true,
        // 债券信息

        //  预警认定集合
        signalManualList: [],
        creditInformationList: [],
        // 人工预警信息
        waringValue: "",
        radio: undefined,
        radioExamine: undefined,
        riskValue: "",
        examineValue: "",
        form: {
          bondInfoList: [{
            bondName: '',
            bondGroupName:'',
            bondGroupType:'',
            bondEndDate:'',
            balance:'',
          }]
        },
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          dataSourceId: undefined,
          dataSourceName: undefined,
        },

      }
    },
    created() {
      // 查询初始数据
      this.getList();
    },
    methods: {
      // 删除指定列
      deleteBondInfo(scope) {
        this.form.bondInfoList.splice(scope.$index, 1);
      },
      //  添加债券信息行
      addBondInfo() {
        console.log("----addBondInfo");
        this.form.bondInfoList.push({
          bondName: '',
          bondGroupName:'',
          bondGroupType:'',
          bondEndDate:'',
          balance:'',
        });
      },
      //  保存人工录入信息
      submitForm() {
        console.log("--------submitForm");
        console.log(this.form);
        submitSignalManualForm(this.form).then(res => {
          console.log("----res");
          console.log(res);
          this.detailShow = false;
          this.detailListShow = true;
          this.getList();
        })
      },
      insertButton() {
        this.detailShow = true;
        this.detailListShow = false;
      },
      cancel() {
        this.detailShow = false;
        this.detailListShow = true;
      },
      //  详情
      handleDetail(scope) {
        console.log("sss");
        console.log(scope);
        this.detailShow = true;
        this.detailListShow = false;
        // 赋值
        getSignalManualDetail(scope.custNo).then(res => {
          console.log("---res");
          console.log(res);
          if (200 === res.code) {
            // this.creditInformationList = res.data[0];
            // this.waringValue = res.data[1].waringValue;
            // this.radio = res.data[2][0].radio;
            // this.riskValue = res.data[2][0].riskValue;
            // this.radioExamine = res.data[3][0].radioExamine;
            // this.examineValue = res.data[3][0].examineValue;
          }
        })

      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      // 查询初始数据
      getList() {
        listSignalManual(this.queryParams).then(response => {
          if (response.code === 200) {
            this.signalManualList = response.data;
          }

        });
      }
    }
  }
</script>

<style scoped>


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
