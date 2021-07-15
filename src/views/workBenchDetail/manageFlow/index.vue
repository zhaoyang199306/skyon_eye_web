<template>
    <div style="padding: 0 1%;margin: 6px 0 0 0px">
      <div class="title">
        <span class="fz_icon"/>
        <div class="title_text">
          <p>客户名单任务列表</p>
        </div>


      </div>
      <div></div>

    <!--    展示列表  -->
      <el-tabs v-model="activeName" v-show="detailListShow" type="card" >
        <!--        搜索框-->
        <div class="seaContainer">
          <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="0px">
            <el-form-item  prop="dataSourceName">
              <el-input
                v-model="queryParams.dataSourceName"
                placeholder="申请人名称"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
            <el-form-item  prop="description">
              <el-input
                v-model="queryParams.description"
                placeholder="任务编号"
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
        <el-tab-pane label="待办" name="first">
          <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                    header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                    :cell-style="{padding:'0px'}" :data="manageFlowAgencyList">
            <el-table-column label="任务编号" align="center" prop="q"/>
            <el-table-column label="任务名称"  align="center" prop="w"/>
            <el-table-column label="任务类型"  align="center" prop="e"/>
            <el-table-column label="申请人"  align="center" prop="r"/>
            <el-table-column label="申请时间"  align="center" prop="t"/>
            <el-table-column label="操作"  align="center" prop="s">
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
        </el-tab-pane>
        <el-tab-pane label="已办" name="second">
          <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                    header-cell-style="font-size:12px" :row-style="{height:'32px'}"
                    :cell-style="{padding:'0px'}" :data="manageFlowAlreadyList">
            <el-table-column label="任务编号" align="center" prop="q"/>
            <el-table-column label="参与节点"  align="center" prop="w"/>
            <el-table-column label="任务类型"  align="center" prop="e"/>
            <el-table-column label="申请人"  align="center" prop="r"/>
            <el-table-column label="申请时间"  align="center" prop="t"/>
            <el-table-column label="流程是否结束"  align="center" prop="y"/>
            <el-table-column label="操作"  align="center" prop="u">
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
        </el-tab-pane>
      </el-tabs>

      <!--      详情-->

      <div v-show="detailShow">
        <div class="cl_title" style="margin-bottom:5px;">
          <div class="radioball lt"></div>
          <p class="lt" style="margin: 0 0">客户基本信息</p>
        </div>
        <div style="margin-top: 10px" class="el-col-24" >
          <!--    详情基本信息    -->
          <el-form ref="form" label-width="120px" class="el-col-24">
            <el-form-item label="客户编号："  class="el-col-8">
              <el-input value="100013048" readonly="readonly" />
            </el-form-item>
            <el-form-item label="客户名称:"  class="el-col-8">
              <el-input value="张山" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="组织机构代码："  class="el-col-8">
              <el-input value="752047089" readonly="readonly"/>
            </el-form-item>
          </el-form>
        </div>
        <!--    详情 - 关联企业    -->
<!--        <div class="el-col-24" style="margin-top: 15px">-->
<!--          <div class="cl_title" style="margin-bottom:5px;">-->
<!--            <div class="radioball lt"></div>-->
<!--            <p class="lt" style="margin: 0 0">关联企业</p>-->
<!--          </div>-->
<!--          <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"-->
<!--                    header-cell-style="font-size:12px" :data="relationCompanyList">-->
<!--            <el-table-column label="关联企业" align="center" prop="q"/>-->
<!--          </el-table>-->
<!--        </div>-->
        <!--      申请信息    -->
        <div class="el-col-24" style="margin-top: 15px">
          <div class="cl_title" style="margin-bottom:5px;">
            <div class="radioball lt"></div>
            <p class="lt" style="margin: 0 0">申请信息</p>
          </div>
          <div class="titleTable">
            <div class="title_table_textarea">
              <el-input type="textarea" v-model="applyValue" :autosize="{ minRows: 3, maxRows: 3}"/>
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
              <el-input type="textarea" v-model="examineValue"  placeholder="请输入审核意见" :autosize="{ minRows: 3, maxRows: 3}"/>
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
                    header-cell-style="font-size:12px" :data="processList">
            <el-table-column label="任务编号" label-width="160px" align="center" prop="TASK_NO"/>
            <el-table-column label="处理岗" align="center" prop="APPLY_PEOPLE_NAME"/>
            <el-table-column label="处理人" align="center" prop="APPLY_PEOPLE_NAME"/>
            <el-table-column label="操作" align="center" prop="APPLY_PEOPLE_NAME"/>
            <el-table-column label="时间" align="center" prop="APPLY_PEOPLE_NAME"/>
            <el-table-column label="审核意见" align="center" prop="APPLY_PEOPLE_NAME"/>
          </el-table>
        </div>

        <div slot="footer" class="el-col-24" style="margin-top: 20px">
          <el-button type="primary" class="btn" @click="cancel">取 消</el-button>
        </div>
      </div>

    </div>
</template>

<script>
  import {listManageFlow,getManageFlowDetail} from "@/api/workBenchDetail/manageFlow.js"

    export default {
        name: "manageFlow",
        data(){
          return {
          //  true 标志
            trueFlag:true,
          //  待办集合
            manageFlowAgencyList:[],
            // 已办集合
            manageFlowAlreadyList:[],
            // 关联企业
            relationCompanyList:[],
            // 申请信息
            applyValue:"",
            examineValue:"",
            // 流程信息
            processList:"",
            // 详情展示
            detailShow :false,
            // 详情列表
            detailListShow :true,
            activeName:"first",
            radio:undefined,
            radioExamine:undefined,
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
      methods:{
        //  取消
        cancel(){
          this.detailShow = false;
          this.detailListShow = true;
        },
        //  详情
        handleDetail(){
          this.detailShow = true;
          this.detailListShow = false;
          // 赋值
          getManageFlowDetail().then(res=>{
            console.log("---res");
            console.log(res);
            if (200 === res.code) {
              this.applyValue = res.data[0].applyValue;
            }
          })

        },
          // 查询所有数据
        getList(){
          listManageFlow(this.queryParams).then(res => {
            if (res.code === 200){
              this.manageFlowAgencyList = res.data[0];
              this.manageFlowAlreadyList = res.data[1];
            }
          }).catch(

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
    margin: 0 50%;
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
