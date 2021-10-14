<template>
<!--  <div style="text-align: center;">-->
<!--    <div style="margin-top: 11%">-->
<!--      <img src="@/assets/image/indexPh4.png" style="margin: 0 auto;width: 40%;" />-->
<!--    </div>-->
<!--  </div>-->

  <div class="radarbg">
    <!-- <div style="width:100%;position:absolute;top:68; left:0;overflow:auto;height:100%"> -->
      <div>
      <div class="radar">
        <div class="radarleft">
<!--          <div class="radarleftbox">-->
<!--            <div class="textlist">-->
<!--              <div class="title">-->
<!--                <span class="fz_icon rwcl_icon"></span>-->
<!--                <div class="title_text  lt">-->
<!--                  <p>未分配列表任务</p>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="task_list">-->
<!--              <ul class="ul_this">-->
<!--                <li>-->
<!--&lt;!&ndash;                  <router-link to="/workBenchDetail/taskInfo">&ndash;&gt;-->
<!--                    <div>-->
<!--                      <p>预警认定</p>-->
<!--                      <p class="tasknum">{{taskInfoCount}}</p>-->
<!--                    </div>-->
<!--&lt;!&ndash;                  </router-link>&ndash;&gt;-->
<!--                </li>-->
<!--                <li>-->
<!--&lt;!&ndash;                  <router-link to="/workBenchDetail/disposalTrack">&ndash;&gt;-->
<!--                    <div>-->
<!--                      <p>处置跟踪</p>-->
<!--                      <p class="tasknum">{{disposalTrackCount}}</p>-->
<!--                    </div>-->
<!--&lt;!&ndash;                  </router-link>&ndash;&gt;-->
<!--                </li>-->
<!--                <li>-->
<!--&lt;!&ndash;                  <router-link to="/workBenchDetail/removeRisk">&ndash;&gt;-->
<!--                    <div>-->
<!--                      <p>预警解除</p>-->
<!--                      <p class="tasknum">{{removeRiskCount}}</p>-->
<!--                    </div>-->
<!--&lt;!&ndash;                  </router-link>&ndash;&gt;-->
<!--                </li>-->
<!--                <li>-->
<!--&lt;!&ndash;                  <router-link to="/workBenchDetail/signalManual">&ndash;&gt;-->
<!--                    <div>-->
<!--                      <p>人工信号</p>-->
<!--                      <p class="tasknum">{{signalManualCount}}</p>-->
<!--                    </div>-->
<!--&lt;!&ndash;                  </router-link>&ndash;&gt;-->
<!--                </li>-->
<!--                <li>-->
<!--&lt;!&ndash;                  <router-link to="/workBenchDetail/manageFlow">&ndash;&gt;-->
<!--                    <div>-->
<!--                      <p>客户名单</p>-->
<!--                      <p class="tasknum">{{manageFlowCount}}</p>-->
<!--                    </div>-->
<!--&lt;!&ndash;                  </router-link>&ndash;&gt;-->
<!--                </li>-->
<!--                <li>-->
<!--&lt;!&ndash;                  <router-link to="/workBenchDetail/reassignTask">&ndash;&gt;-->
<!--                    <div>-->
<!--                      <p>改派任务</p>-->
<!--                      <p class="tasknum">{{reassignTaskCount}}</p>-->
<!--                    </div>-->
<!--&lt;!&ndash;                  </router-link>&ndash;&gt;-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->

          <div class="radarleftbox">
            <div class="textlist">
              <div class="title">
                <span class="fz_icon rwcl_icon"></span>
                <div class="title_text  lt">
                  <p>个人列表任务</p>
                </div>
              </div>
            </div>
            <div class="task_list">
              <ul class="ul_this">
                <li>
                  <router-link to="/workBenchDetail/taskInfo">
                    <div>
                      <p>预警任务</p>
                      <p class="tasknum">{{taskInfoSelfCount}}</p>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/workBenchDetail/disposalTrack">
                    <div>
                      <p>处置跟踪</p>
                      <p class="tasknum">{{disposalTrackSelfCount}}</p>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/workBenchDetail/removeRisk">
                    <div>
                      <p>预警解除</p>
                      <p class="tasknum">{{removeRiskSelfCount}}</p>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/workBenchDetail/signalManual">
                    <div>
                      <p>人工信号</p>
                      <p class="tasknum">{{signalManualSelfCount}}</p>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/workBenchDetail/manageFlow">
                    <div>
                      <p>客户名单</p>
                      <p class="tasknum">{{manageFlowSelfCount}}</p>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/workBenchDetail/reassignTask">
                    <div>
                      <p>改派任务</p>
                      <p class="tasknum">{{reassignTaskSelfCount}}</p>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>



        </div>
        <!--   列表     -->
        <div class="radarright">
          <div class="noticandtop">
            <div class="notop lt" style="width:1220px">
              <div class="title">
                <span class="fz_icon yjjc_icon"></span>
                <div class="title_text  lt">
                  <p>预警统计排名</p>
                </div>
              </div>
              <div style="overflow:hidden;margin-top:10px">
                <div class="notop" style="width:1220px">
                  <!--      预警认定分行统计            -->
                  <div class="tabtenbox lt" style="width:600px;">
                    <p>预警认定分行统计</p>

                    <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                              :header-cell-style="{fontSize:'12px'}" :row-style="{height:'32px'}"
                              :cell-style="{padding:'0px'}" :data="taskInfoList">
                      <el-table-column label="排名" width="50px"  align="center" type="index"/>
                      <el-table-column label="机构名称" align="center" prop="q"/>
                      <el-table-column label="一级预警信号数"  align="center" prop="w"/>
                      <el-table-column label="二级预警信号数"  align="center" prop="e"/>
                      <el-table-column label="三级预警信号数"  align="center" prop="r"/>
                      <el-table-column label="触发客户数"  align="center" prop="t"/>

                    </el-table>

                  </div>
                  <!--      处置跟踪分行统计            -->
                  <div class="tabtenbox rt" style="width:600px;">
                    <p>处置跟踪分行统计</p>

                    <el-table width="600" :stripe="trueFlag" :border="trueFlag" :highlight-current-row="trueFlag"
                              :header-cell-style="{fontSize:'12px'}" :row-style="{height:'32px'}"
                              :cell-style="{padding:'0px'}"  :data="disposalTrackList">
                      <el-table-column label="排名" width="50px"  align="center" type="index"/>
                      <el-table-column label="机构名称" align="center" prop="q"/>
                      <el-table-column label="一级预警信号数"  align="center" prop="w"/>
                      <el-table-column label="二级预警信号数"  align="center" prop="e"/>
                      <el-table-column label="三级预警信号数"  align="center" prop="r"/>
                      <el-table-column label="触发客户数"  align="center" prop="t"/>

                    </el-table>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script>
  import {countQuery,taskInfoQuery,disposalTrackQuery} from "@/api/workbench/workbench.js";

  export default {
    name:"index",
    data (){
      return {
        taskInfoCount:"",
        disposalTrackCount:"",
        removeRiskCount:"",
        signalManualCount:"",
        manageFlowCount:"",
        reassignTaskCount:"",
        taskInfoSelfCount:"",
        disposalTrackSelfCount:"",
        removeRiskSelfCount:"",
        signalManualSelfCount:"",
        manageFlowSelfCount:"",
        reassignTaskSelfCount:"",
        trueFlag:true,
        // 预警认定分行统计
        taskInfoList:[],
        // 处置跟踪分行统计
        disposalTrackList:[],
      }
    },
    created() {
      this.getList();
    },

    methods: {
      // 根据不同的url跳转
      redictByUrl(type){
        console.log("--");
        console.log(type);
        if ("taskInfoCount" === type) {
          this.$router.push("dddddd");
        }
      },
      getList(){
        // 没出结果，一直等待
        let loading = this.$loading({
          lock: true,
          text: '.......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.2)'
        });

        // 查询列表任务
        countQuery().then(response => {
          console.log("---res");
          console.log(response);
          if (response.code === 200) {
            this.taskInfoCount = response.data[0].taskInfoCount;
            this.disposalTrackCount = response.data[0].disposalTrackCount;
            this.removeRiskCount = response.data[0].removeRiskCount;
            this.signalManualCount = response.data[0].signalManualCount;
            this.manageFlowCount = response.data[0].manageFlowCount;
            this.reassignTaskCount = response.data[0].reassignTaskCount;
            this.taskInfoSelfCount = response.data[1].taskInfoSelfCount;
            this.disposalTrackSelfCount = response.data[1].disposalTrackSelfCount;
            this.removeRiskSelfCount = response.data[1].removeRiskSelfCount;
            this.signalManualSelfCount = response.data[1].signalManualSelfCount;
            this.manageFlowSelfCount = response.data[1].manageFlowSelfCount;
            this.reassignTaskSelfCount = response.data[1].reassignTaskSelfCount;
          }
          loading.close();
        }).catch(()=>{
          loading.close();
        });

        // 查询预警统计排名
        taskInfoQuery().then(res =>{
          if (res.code === 200) {
            this.taskInfoList = res.data;
          }
        })

        // 查询处置跟踪分行统计
        disposalTrackQuery().then(res =>{
          if (res.code === 200) {
            this.disposalTrackList = res.data;
          }
        })
      }
    },
  }

</script>



<style lang="scss" scoped>

  .el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background-color: #ffe48d;
  }

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.radarleft {
  position: relative;
}
.radarleft, .radarright {
  width: 100%;
  overflow: hidden;
}
/* 图片  */
.title .rwcl_icon {
  background: url(../assets/png/rwcl1.png);
  display: block;
  width: 30px;
  height: 30px;
  float: left;
  margin: 10px 5px 0 0;
}
.title .yjjc_icon {
  background: url(../assets/png/yjjc1.png);
  display: block;
  width: 30px;
  height: 30px;
  float: left;
  margin: 2px 5px 0 0;
}
.title {
  overflow: hidden;
  position: relative;
  margin-top: 5px;
}

.textlist {
  height: 46%;
  position: relative;
}

.task_list li {
  float: left;
  width: 190px;
  border: 1px solid #f1f1f1;
  height: 60px;
  margin-right: 10px;
  border-radius: 5px;
  background: #fff;
}

li {
  list-style: none;
}

.radarleftbox {
  width: 1220px;
  margin: 0 auto;
}

.task_list {
  overflow: hidden;
  width: 1220px;
  /*margin: 10px auto;*/
  text-align: center;
}
.task_list li:nth-child(1) {
  background: #F36872;
}
.task_list li:nth-child(2) {
  background: #FFC108;
}
.task_list li:nth-child(3) {
  background: #28C1F5;
}
.task_list li:nth-child(4) {
  background: #A8C984;
}
.task_list li:nth-child(5) {
  background: #A89CBD;
}
.task_list li:nth-child(6) {
  background: #79E4BB;
}

.task_list li p {
  text-align: center;
  height: 30px;
  line-height: 30px;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin: 0 0;
}

.task_list li .tasknum {
  font-size: 22px;
  color: #fff;
}
.radarbg {
  height: 100%;
  background: #fff;
}
.radar {
  height: 100%;
  margin: 0 auto;
  border-bottom: 0;
  border-top: 0;
}
.title_text {
  margin: 6px 0 0 0px;
}
.lt {
  float: left;
}
.title_text p {
  color: #0062bd;
  font-size: 12px;
  margin-bottom: 5px;
  letter-spacing: 1px;
  font-weight: bold;
}
.ul_this {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin: 6px 0px;
}

.radarright {
  position: relative;
}
.noticandtop {
  width: 1220px;
  overflow: hidden;
  margin: 0 auto;
}
.tabtenbox p {
  font-size: 12px;
  color: #fff;
  background: #807878;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  margin: 0px;
}

.notop {
  overflow: hidden;
  width: 600px;
}
.rt {
  float: right;
}

</style>
