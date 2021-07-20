<template>
  <transition name = "fade">
    <div v-show = "fadeShow" >
  <div class="panoramic-cust-info-context">

    <!--    小微企业板块  -->
    <div v-show="!companyPlate">
      <el-form :model="form" ref="form" label-width="120px" class="el-col-24">
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">基本信息</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px;">
            <el-form-item label="客户名称" class="el-col-8">
              <el-input v-model="form.custName" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="证件类型" class="el-col-8">
              <el-input v-model="form.certType" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="证件号码" class="el-col-8">
              <el-input v-model="form.certNo" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="客户编号" class="el-col-8">
              <el-input v-model="form.custNo" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="年龄" class="el-col-8">
              <el-input v-model="form.age" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="婚姻状况" class="el-col-8">
              <el-input v-model="form.marriageStatusCd" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="客户类型" class="el-col-8">
              <el-input value="个人" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="性别" class="el-col-8">
              <el-input v-model="form.genderCd" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="居住地址" class="el-col-8">
              <el-input v-model="form.resdntAddr" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="出生日期" class="el-col-8">
              <el-input v-model="form.birthDt" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="民族" class="el-col-8">
              <el-input v-model="form.ethnicCd" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="最高学历" class="el-col-8">
              <el-input v-model="form.higtEduDegreeCd" readonly="readonly"/>
            </el-form-item>


          </div>

        </div>
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">职业信息</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <el-form-item label="就业状况" class="el-col-8">
              <el-input v-model="form.employSitu" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="工作单位" class="el-col-8">
              <el-input v-model="form.salaryCorp" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="单位性质" class="el-col-8">
              <el-input v-model="form.corpChar" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="行业" class="el-col-8">
              <el-input v-model="form.indus" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="单位地址" class="el-col-8">
              <el-input v-model="form.corpAddr" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="单位电话" class="el-col-8">
              <el-input v-model="form.corpTel" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="职业" class="el-col-8">
              <el-input v-model="form.career" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="职务" class="el-col-8">
              <el-input v-model="form.pos" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="职称" class="el-col-8">
              <el-input v-model="form.title" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="进入该单位年份" class="el-col-8">
              <el-input v-model="form.enterCorpYear" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="信息更新日期" class="el-col-8">
              <el-input v-model="form.infoUpdateDt" readonly="readonly"/>
            </el-form-item>
          </div>

        </div>
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">联系信息</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <el-form-item label="联系电话" class="el-col-8">
              <el-input v-model="form.phone" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="居住地址" class="el-col-8">
              <el-input v-model="form.resdntAddr" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="EMAIL" class="el-col-8">
              <el-input v-model="form.email" readonly="readonly"/>
            </el-form-item>

          </div>

        </div>
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">婚姻状况</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <el-form-item label="配偶名称" class="el-col-8">
              <el-input v-model="form.spouseName" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="配偶证件类型" class="el-col-8">
              <el-input v-model="form.spouseCertTypeCd" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="配偶证件号码" class="el-col-8">
              <el-input v-model="form.spouseCertNo" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="配偶工作单位" class="el-col-8">
              <el-input v-model="form.spouseWorkUnitName" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="配偶联系电话" class="el-col-8">
              <el-input v-model="form.rgstCap" readonly="readonly"/>
            </el-form-item>

          </div>

        </div>
        <div>
          <div>
            <div class="el-col-24 context_module" style="">
              <div class="context_module_title">
                <p class="context_module_title_p">管护信息</p>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <el-form-item label="所属分行" class="el-col-8">
              <el-input v-model="form.belongBrch" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="客户经理" class="el-col-8">
              <el-input v-model="form.custMgr" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="客户经理电话" class="el-col-8">
              <el-input v-model="form.custMgrTel" readonly="readonly"/>
            </el-form-item>
          </div>

        </div>
      </el-form>
    </div>

    <!--    小微企业板块  -->
    <div v-show="companyPlate">
      <el-form :model="form" ref="form" label-width="120px" class="el-col-24">
        <div>
          <div>
            <div>
              <div class="el-col-24 context_module" style="">
                <div class="context_module_title">
                  <p class="context_module_title_p">基本信息</p>
                </div>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <el-form-item label="客户名称" class="el-col-8">
              <el-input v-model="form.custName" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="成立日期" class="el-col-8">
              <el-input v-model="form.foundDt" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="注册资本" class="el-col-8">
              <el-input v-model="form.rgstCap" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="客户编号" class="el-col-8">
              <el-input v-model="form.custNo" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="所属行业" class="el-col-8">
              <el-input v-model="form.belongBank" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="中征码" class="el-col-8">
              <el-input v-model="form.eigenCode" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="客户类型" class="el-col-8">
              <el-input value="小微企业" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="组织机构代码" class="el-col-8">
              <el-input v-model="form.orgnzCd" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="注册地址" class="el-col-8">
              <el-input v-model="form.rgstAddr" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="门店地址" class="el-col-8">
              <el-input v-model="form.addr" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="法定代表人" class="el-col-8">
              <el-input v-model="form.legalRep" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="实际控制人" class="el-col-8">
              <el-input v-model="form.actlCtrler" readonly="readonly"/>
            </el-form-item>

            <el-form-item label="经营范围" class="el-col-24">
              <el-input v-model="form.operRange" readonly="readonly"/>
            </el-form-item>
          </div>

        </div>
        <div>
          <div>
            <div>
              <div class="el-col-24 context_module" style="">
                <div class="context_module_title">
                  <p class="context_module_title_p">管护信息</p>
                </div>
              </div>
            </div>
          </div>
          <div style="padding-left: 20px">
            <el-form-item label="所属分行" class="el-col-8">
              <el-input v-model="form.belongBrch" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="客户经理" class="el-col-8">
              <el-input v-model="form.custMgr" readonly="readonly"/>
            </el-form-item>
            <el-form-item label="客户经理电话" class="el-col-8">
              <el-input v-model="form.custMgrTel" readonly="readonly"/>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>

  </div>
    </div>
  </transition>
</template>

<script>
  import {getPanoramicCustInfo} from "@/api/panoramicView/panoramicCustInfo.js"

  export default {
    name: "panoramicCustInfo",
    // 父传子组件传参
    props: {
      // 客户号
      custNo: String,
      // 客户类型
      custType: String,
    },
    data() {
      return {
        fadeShow:false,
        // 是否小微企业板块
        companyPlate: false,
        form: {},
      }
    },
    // 初始化
    created() {
      console.log("-----------------");
      console.log(this.custNo);
      console.log(this.custType);
      this.getList();
    },
    methods: {
      // 查询详细信息
      getList() {
        console.log(this.custNo);
        getPanoramicCustInfo(this.custNo, this.custType).then(res => {
          console.log("-----------+++++++++++++++++++++");
          console.log(res);
          if (res.code === 200) {
            this.companyPlate = this.custType === "小微企业";
            this.form = res.data;
          }
          this.fadeShow = true;
        })
      }
    }
  }
</script>

<style scoped>

  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0
  }


  .panoramic-cust-info-context >>> .el-form-item__label {
    text-align: left;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .context_module_title {
    height: 40px;
    background-color: rgb(247, 247, 247)
  }

  .context_module_title_p {
    line-height: 40px;
    padding-left: 20px;
    font-weight: bolder;
    font-size: 14px
  }

  .el-input >>> input {
    border: 0px;
    color: rgb(74, 138, 215);
  }

  .panoramic-cust-info-context >>> .el-form-item__content {
    line-height: 30px;
  }

</style>

<style>

</style>
