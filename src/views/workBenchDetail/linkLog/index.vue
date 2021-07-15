<template>
  <div>

    <div v-show="noLogs" style="align-content: center;text-align: center;color: red;font-size: 20px">
      暂无环节流转信息!
    </div>
    <div v-show="!noLogs">
      <!--      <el-button @click="clearWF">清除流程信息</el-button>-->
      <div>
        <el-steps direction="vertical" :space="80" :active="linkLogList.length">
          <el-step @dblclick.native="clearWF(index)" v-for="(item,index) in linkLogList"
                   :key="item.dealRole"
                   class="stepSuc"
                   style="line-height: 25px;"
                   :title="item.dealRole"
                   description="item.description">
            <template slot="description">
              <span>【{{item.dealUser}}】{{item.operation}},审核意见：{{item.examinValue}}<br/>{{item.createTime}}</span>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
  import {listLinkLog, clearWF} from "@/api/workBenchDetail/linkLog.js";
  import {listTaskInfo, getTaskInfoDetail, submitTaskInfo} from "@/api/workBenchDetail/taskInfo.js";

  export default {
    name: "linkLog",
    props: ["taskInfoNo"],
    data() {
      return {
        // 流程信息集合
        linkLogList: [],
        //
        noLogs: false,
      }
    },
    created() {
      this.getList();
    },
    methods: {

      clearWF(index) {
        if (index === 0) {
          this.$confirm('此操作将清除该流程, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            // 没出结果，一直等待
            let loading = this.$loading({
              lock: true,
              text: '.......',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.2)'
            });
            clearWF(this.taskInfoNo).then(res => {
              if (res.code === 200) {
                this.$alert("清除成功", {type: "warning"});
                this.getList();
              } else {
                this.$alert("清除失败", {type: "error"});
              }
              loading.close();
            }).catch(() => {
                loading.close();
              }
            );

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消清除'
            });
          });
        }
      },
      getList() {
        listLinkLog(this.taskInfoNo).then(res => {
          if (res.code === 200) {
            if (res.msg === "noData") {
              this.noLogs = true;
            } else if (res.msg === "操作成功") {
              this.linkLogList = res.data;
            }
          }
        })
      }
    },
  }

</script>

<style scoped>

</style>
