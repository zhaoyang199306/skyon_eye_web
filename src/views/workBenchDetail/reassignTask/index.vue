<template>
  <div style="padding: 0 1%;margin: 6px 0 0 0px">
    <div class="title">
      <span class="fz_icon"/>
      <div class="title_text">
        <p>改派任务列表</p>
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
            <el-button type="primary" size="mini" @click="artificialReassign">人工改派</el-button>
            <el-button type="primary" size="mini" @click="sysReassign">系统改派</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--    展示列表  -->
    <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
              header-cell-style="font-size:12px" :row-style="{height:'32px'}"
              :cell-style="{padding:'0px'}" :data="reassignTaskList" v-show="detailListShow">
      <el-table-column label="任务编号" align="center" prop="reassignTaskNo"/>
      <el-table-column label="申请人" align="center" prop="applicant"/>
      <el-table-column label="改派类型" align="center" prop="reassignType"/>
      <el-table-column label="改派日期" align="center" prop="reassignDate"/>
      <el-table-column label="改派开始日期" align="center" prop="t"/>
      <el-table-column label="改派结束日期" align="center" prop="y"/>
      <el-table-column label="状态" align="center" prop="u"/>
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

    <!--      人工改派-->
    <div style="margin-top: 20px" v-show="artificialShow" class="el-col-24">
      <div class="seaContainer">
        <el-form :model="rtificialForm" ref="queryForm" :inline="true" label-width="100px">
          <el-form-item label="改派人:" prop="reassignUser">
            <el-input
              v-model="rtificialForm.reassignUser"
              clearable
              size="small"
              readonly
              @click.native="getReassignUserList"
            />
          </el-form-item>
          <el-form-item label="改派原因:" prop="reassignReason">
            <el-input
              v-model="rtificialForm.reassignReason"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-form>
      </div>

      <div style="margin-top: 10px;margin-left: 10px">
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="reassigTaskList" @select="checkboxSelect"
                  @select-all="selectAll">
          <el-table-column type="selection"/>
          <el-table-column label="任务编号" align="center" prop="TASK_INFO_NO"/>
          <el-table-column label="任务类型" align="center" prop="APPLY_PEOPLE_NAME"/>
          <el-table-column label="客户编号" align="center" prop="CUST_NO"/>
          <el-table-column label="客户名称" align="center" prop="CUST_NAME"/>
          <el-table-column label="当前处理人" align="center" prop="USER_NAME"/>
          <el-table-column label="处理人岗位" align="center" prop="ROLE_NAME"/>
        </el-table>
      </div>
      <div slot="footer" class="el-col-24" style="margin: 20px 0% 0 45%">
        <el-button style="float: left" type="primary" class="btn" @click="submitArtificial">提 交</el-button>
        <el-button type="primary" class="btn" @click="cancel">取 消</el-button>
      </div>

    </div>

    <!--  人工改派  -用户信息清单    -->
    <div>
      <template>
        <el-dialog title="用户信息清单" :visible.sync="artificalOpen" customClass="customWidth" :close-on-click-modal="false"
                   width="500px">
          <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                    header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                    :cell-style="{padding:'0px'}" :data="reassigManList" @row-click="reassigTrClick">
            <el-table-column label="改派人id" align="center" prop="USER_ID" v-if="false"/>
            <el-table-column label="改派人登录名" align="center" prop="USER_NAME"/>
            <el-table-column label="改派人岗位" align="center" prop="ROLE_NAME"/>
          </el-table>
        </el-dialog>
      </template>
    </div>


    <!--    详情  -->
    <div v-show="detailShow">
      <div style="margin-top: 10px" class="el-col-24">
        <!--    详情基本信息    -->
        <el-form ref="form" :model="form" label-width="120px" class="el-col-24">
          <el-form-item label="申请人:" class="el-col-6">
            <el-input v-model="form.applicant" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="申请改派类型:" class="el-col-6">
            <el-input v-model="form.reassignType" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="改派人：" class="el-col-6">
            <el-input v-model="form.reassignUser"  readonly="readonly"/>
          </el-form-item>
          <el-form-item label="改派任务总数：" class="el-col-6">
            <el-input v-model="form.taskTotal" readonly="readonly"/>
          </el-form-item>
          <el-form-item label="改派原因说明：" class="el-col-24">
            <el-input v-model="form.reassignReason" type="textarea" :autosize="{ minRows: 5, maxRows: 20}" readonly="readonly"/>
          </el-form-item>
        </el-form>
      </div>
      <!--    详情 - 改派任务清单    -->
      <div class="el-col-24" style="margin-top: 15px">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">改派任务清单</p>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="form.reassignTaskDetails">
          <el-table-column label="任务编号" align="center" prop="taskInfoNo"/>
          <el-table-column label="客户编号" align="center" prop="custNo"/>
          <el-table-column label="客户名称" align="center" prop="custName"/>
          <el-table-column label="任务类型" align="center" prop="taskType"/>
          <el-table-column label="当前处理人" align="center" prop="newUser"/>
        </el-table>
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">流程信息</p>
        </div>
        <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                  header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                  :cell-style="{padding:'0px'}" :data="processList">
          <el-table-column label="任务编号" align="center" prop="TASK_NO"/>
          <el-table-column label="处理岗" align="center" prop="APPLY_PEOPLE_NAME"/>
          <el-table-column label="处理人" align="center" prop="APPLY_PEOPLE_NAME"/>
          <el-table-column label="操作" align="center" prop="APPLY_PEOPLE_NAME"/>
          <el-table-column label="时间" align="center" prop="CREATE_TIME"/>
          <el-table-column label="时间" align="center" prop="CREATE_TIME"/>
        </el-table>
      </div>
      <div slot="footer" class="el-col-24" style="margin-top: 20px">
        <el-button type="primary" style="margin: 0 50%;" class="btn" @click="cancel">取 消</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    listReassignTask, getReassignTask, getReassigTaskList,
    getOtherUserOnRole, submitReassignTask
  } from "@/api/workBenchDetail/reassignTask.js"

  export default {
    name: "reassignTask",
    data() {
      return {
        // 任务编号集合
        selectTaskInfoNos: [],
        selectTaskInfos: [],
        selectRoles: [],
        // 人工 改派人 列表
        reassigManList: [],
        // 人工改派dialog
        artificalOpen: false,
        // 改派任务列表
        reassigTaskList: [],
        artificialShow: false,
        rtificialForm: {
          reassignUser: undefined,
          reassignReason: undefined,
          reassignID: undefined,
          reassignTaskDetails:{
            taskInfoNo:undefined,
          },
        },
        form:{
          reassignTaskDetails: [],
        },
        //  true 标志
        trueFlag: true,
        //  预警认定集合
        reassignTaskList: [],
        // 流程信息 集合
        processList: [],
        // 改派任务清单

        // 详情展示列表控制
        detailShow: false,
        detailListShow: true,
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
      //  查看详情
      handleDetail(scope) {
        getReassignTask(scope.reassignTaskNo).then(res => {
          console.log("000");

          if (res.code === 200) {
            this.form = res.data;
          }
          console.log(this.form);
        })

        this.detailShow = true;
        this.detailListShow = false;

      },
      // 清空
      clearValue() {
        this.rtificialForm = {};
      },
      // 用户信息清单表 行 点击事件
      reassigTrClick(row) {
        console.log("---reassigTrClick");
        console.log(row);
        this.rtificialForm.reassignUser = row.USER_NAME;
        this.rtificialForm.reassignID = row.USER_ID;
        this.artificalOpen = false;
      },
      // 改派任务列表全选事件
      selectAll() {
        this.selectTaskInfos = [];
        for (let i in this.reassigTaskList) {
          this.selectTaskInfos.push(this.reassigTaskList[i]);
        }

      },
      // 改派任务列表选中事件
      checkboxSelect(row) {
        this.selectTaskInfos = [];
        for (let i = 0; i < row.length; i++) {
          this.selectTaskInfos.push(row[i]);
        }
      },
      // 获取改派人列表
      getReassignUserList() {
        let role;
        console.log("---getReassignUserList");
        if (this.selectTaskInfos.length === 0) {
          this.$alert("请先选中您要改派的任务", {type: "warning"});
          return
        }
        // 如果岗位不相等
        if (this.selectTaskInfos.length > 1) {
          if (this.selectTaskInfos.splice(0, this.selectTaskInfos[0]).length > 0) {
            this.$alert("请选择同一个岗位!", {type: "warning"});
            return
          } else {
            // 相同随便取一个
            role = this.selectTaskInfos[0].ROLE_NAME;
          }
        } else {
          role = this.selectTaskInfos[0].ROLE_NAME;
        }
        this.artificalOpen = true;
        // reassigManList  查询已选定的任务编号对应的处理人岗位  的 其他人员
        getOtherUserOnRole(role).then(res => {
          console.log("---getOtherUserOnRole");
          console.log(res);
          if (res.code === 200) {
            this.reassigManList = res.data;
          }
        })

      },
      // 人工提交
      submitArtificial() {
        console.log("-----------submitArtificial");
        console.log(this.rtificialForm);
        console.log(this.selectTaskInfos);
        let tmp = [];
        for (let i = 0; i < this.selectTaskInfos.length; i++) {
          let dmo = {taskInfoNo:undefined,custNo:undefined,custName:undefined,taskType:undefined,newUser:undefined};
          dmo.taskInfoNo =  this.selectTaskInfos[i].TASK_INFO_NO;
          dmo.custNo =  this.selectTaskInfos[i].CUST_NO;
          dmo.custName =  this.selectTaskInfos[i].CUST_NAME;
          dmo.taskType =  this.selectTaskInfos[i].APPLY_PEOPLE_NAME;
          dmo.newUser =  this.rtificialForm.reassignUser;
          tmp.push(dmo);
        }
        this.rtificialForm.reassignTaskDetails = tmp;
        console.log(this.rtificialForm);
        submitReassignTask(this.rtificialForm).then(res=>{
          if (res.code === 200){
            this.cancel();
            this.getList();
          }
        })
      },
      //  人工改派
      artificialReassign() {
        console.log("-----------artificialReassign");
        this.artificialShow = true;
        this.detailListShow = false;

        // reassigTaskList
        getReassigTaskList().then(res => {
          console.log("----getReassigTaskList");
          console.log(res);
          this.reassigTaskList = res.data;
        })


      },
      cancel() {

        this.artificialShow = false;
        this.detailShow = false;
        this.detailListShow = true;
        this.clearValue();
      },

      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      // 查询所有
      getList() {
        listReassignTask().then(res => {
          console.log("=");
          console.log(res);
          if (res.code === 200) {
            this.reassignTaskList = res.data;
            console.log(res.data)
          }
        })
      }
    },


  }
</script>

<style scoped>
  .seaContainer input {
    width: 300px;
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
