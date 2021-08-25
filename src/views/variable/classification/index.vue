<!--<template>-->
<!--  <div class="app-container">-->
<!--    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">-->
<!--      <el-form-item label="变量分类" prop="variableClassificationName">-->
<!--        <el-input-->
<!--          v-model="queryParams.variableClassificationName"-->
<!--          placeholder="请输入变量分类"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="关联数据源表" label-width="100px" prop="sourceDabRelation">-->
<!--        <el-input-->
<!--          v-model="queryParams.sourceDabRelation"-->
<!--          placeholder="请输入关联数据源表"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--        >新增-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--        >修改-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->

<!--    <el-table v-loading="loading" :data="classificationList" @selection-change="handleSelectionChange">-->
<!--      <el-table-column type="selection" width="55" align="center"/>-->
<!--      <el-table-column label="变量分类" align="center" prop="variableClassificationName"/>-->
<!--      <el-table-column label="关联数据源表" align="center" prop="sourceDabRelation"/>-->
<!--      <el-table-column label="备注" align="center" prop="description"/>-->
<!--      <el-table-column label="创建时间" align="center" prop="createTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.createTime) }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="修改时间" align="center" prop="modifyTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.modifyTime) }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-view"-->
<!--            @click="handleDetail(scope.row)"-->
<!--          >详情-->
<!--          </el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--          >修改-->
<!--          </el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--          >删除-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

<!--    <pagination-->
<!--      v-show="total>0"-->
<!--      :total="total"-->
<!--      :page.sync="queryParams.pageNum"-->
<!--      :limit.sync="queryParams.pageSize"-->
<!--      @pagination="getList"-->
<!--    />-->

<!--    &lt;!&ndash; 添加或修改变量分类对话框 &ndash;&gt;-->
<!--    <el-dialog :title="title" :visible.sync="open" width="900px" :close-on-click-modal="false">-->
<!--      <el-form ref="form" :model="form" :rules="rules" label-width="140px">-->
<!--        <el-form-item label="变量分类名" prop="variableClassificationName">-->
<!--          <el-input v-model="form.variableClassificationName" placeholder="请输入变量分类名" style="width: 100%"-->
<!--                    :disabled="detailViem"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="数据源表" prop="sourceDabRelation">-->
<!--          <el-select v-model="form.sourceDabRelation" placeholder="请选择数据源表"-->
<!--                     @change="sourceDabRelationChange" clearable style="width: 100%" :disabled="detailViem">-->
<!--            <el-option-->
<!--              v-for="data in sourceDataOptions"-->
<!--              :key="data.value"-->
<!--              :label="data.name"-->
<!--              :value="data.value"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->


<!--        &lt;!&ndash; 动态增加项目 &ndash;&gt;-->
<!--        &lt;!&ndash; 不止一项，用div包裹起来 &ndash;&gt;-->
<!--        <div v-for="(item, index) in form.dimensionRelation" :key="index" class="el-col-24">-->

<!--          <el-form-item label="关联数据维表" class="el-col-10">-->
<!--            <el-select v-model="item.dimensionName" placeholder="请选择关联数据维表" clearable-->
<!--                       style="width: 100%"-->
<!--                       :disabled="detailViem" :id="'label' + index">-->
<!--              <el-option v-for="dict in dimensionRelationOptions" :key="dict.value" :label="dict.label"-->
<!--                         :value="dict.value"/>-->
<!--            </el-select>-->
<!--          </el-form-item>-->

<!--          <el-form-item label="数据源表关联字段" class="el-col-10">-->
<!--            <el-select v-model="item.sourceDabField" placeholder="请选择关联数据源表字段" no-data-text="请先选择数据源表"-->
<!--                       style="width: 100%" :disabled="detailViem">-->
<!--              <el-option-->
<!--                v-for="data in sourceDabFieldOptions"-->
<!--                :key="data.value"-->
<!--                :label="data.name"-->
<!--                :value="data.value"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->

<!--          <el-form-item class="el-col-4 elementStyle">-->
<!--            <span>-->
<!--              <el-button @click="dimensionAddItem" :disabled="detailViem">-->
<!--                <i class="el-icon-plus"/>-->
<!--              </el-button>-->
<!--              <el-button @click="dimensionDeleteItem(item, index)" :disabled="detailViem">-->
<!--                <i class="el-icon-minus"/>-->
<!--              </el-button>-->
<!--            </span>-->
<!--          </el-form-item>-->
<!--        </div>-->
<!--        <div class="el-col-24">-->
<!--          <el-form-item label="备注" prop="description">-->
<!--            <el-input v-model="form.description" type="textarea" placeholder="请输入备注内容"-->
<!--                      style="width: 100%" :disabled="detailViem"/>-->
<!--          </el-form-item>-->
<!--        </div>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="submitForm" :disabled="detailViem">确 定</el-button>-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import {-->
<!--    listClassification, getClassification, delClassification, addClassification,-->
<!--    updateClassification, exportClassification-->
<!--  } from "@/api/variable/classification";-->
<!--  import axios from "axios";-->
<!--  import {getToken} from '@/utils/auth'-->

<!--  export default {-->
<!--    name: "Classification",-->
<!--    data() {-->
<!--      return {-->
<!--        // 遮罩层-->
<!--        loading: true,-->
<!--        // 选中数组-->
<!--        ids: [],-->
<!--        // 非单个禁用-->
<!--        single: true,-->
<!--        // 非多个禁用-->
<!--        multiple: true,-->
<!--        // 总条数-->
<!--        total: 0,-->
<!--        // 变量分类表格数据-->
<!--        classificationList: [],-->
<!--        // 弹出层标题-->
<!--        title: "",-->
<!--        // 是否显示弹出层-->
<!--        open: false,-->
<!--        // 数据源表options-->
<!--        sourceDataOptions: [],-->
<!--        // 数据维表options-->
<!--        dimensionRelationOptions: [],-->
<!--        // 数据源表关联字段opyions-->
<!--        sourceDabFieldOptions: [],-->
<!--        detailViem: false,-->
<!--        // 查询参数-->
<!--        queryParams: {-->
<!--          pageNum: 1,-->
<!--          pageSize: 10,-->
<!--          variableClassificationName: undefined,-->
<!--          sourceDabRelation: undefined,-->
<!--          description: undefined,-->
<!--        },-->
<!--        // 表单参数-->
<!--        form: {},-->
<!--        // 表单校验-->
<!--        rules: {-->
<!--          variableClassificationName: [-->
<!--            {required: true, message: "变量分类名不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          sourceDabRelation: [-->
<!--            {required: true, message: "数据源表不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          sourceDabField: [-->
<!--            {required: true, message: "数据源表关联不能为空", trigger: "blur"}-->
<!--          ],-->
<!--        }-->
<!--      };-->
<!--    },-->
<!--    created() {-->
<!--      this.getList();-->
<!--    },-->
<!--    methods: {-->

<!--      // jdbc增加行-->
<!--      dimensionAddItem() {-->
<!--        this.form.dimensionRelation.push({-->
<!--          dimensionName: "",-->
<!--          sourceDabField: "",-->
<!--        });-->
<!--      },-->
<!--      // jdbc删除行-->
<!--      dimensionDeleteItem(item, index) {-->
<!--        if (this.form.dimensionRelation && this.form.dimensionRelation.length === 1) {-->
<!--          this.$alert("不能删除所有的列！", {type: "error"});-->
<!--          return false;-->
<!--        }-->
<!--        this.form.dimensionRelation.splice(index, 1);-->
<!--      },-->
<!--      // 数据源表切换-->
<!--      sourceDabRelationChange(value) {-->
<!--        this.form.sourceDabField = "";-->
<!--        let that = this;-->
<!--        if (value !== "") {-->
<!--          const baseUrl = process.env.VUE_APP_BASE_API;-->
<!--          axios({-->
<!--            method: 'get',-->
<!--            url: baseUrl + '/source/manage/querySchema',-->
<!--            headers: {'AuthorizationEye': 'Bearer ' + getToken()},-->
<!--            responseType: 'json',-->
<!--            params: {-->
<!--              dataSourceName: value-->
<!--            },-->
<!--          }).then(function (resp) {-->
<!--            that.sourceDabFieldOptions = [];-->
<!--            for (let i = 0; i < resp.data.rows[0].length; i++) {-->
<!--              that.sourceDabFieldOptions.push({-->
<!--                value: resp.data.rows[0][i].key,-->
<!--                name: resp.data.rows[0][i].key,-->
<!--              })-->
<!--            }-->
<!--            // that.$forceUpdate();-->
<!--          }).catch(resp => {-->
<!--            console.log('获取数据源表请求失败!');-->
<!--          });-->
<!--        } else {-->
<!--          that.sourceDabFieldOptions = [];-->
<!--        }-->
<!--      },-->
<!--      // 查询数据维表-->
<!--      getDimensionData() {-->
<!--        let that = this;-->
<!--        const baseUrl = process.env.VUE_APP_BASE_API;-->
<!--        axios({-->
<!--          method: 'get',-->
<!--          url: baseUrl + '/system/Dimension/list',-->
<!--          headers: {'AuthorizationEye': 'Bearer ' + getToken()},-->
<!--          responseType: 'json'-->
<!--        }).then(function (resp) {-->
<!--          for (let i = 0; i < resp.data.rows.length; i++) {-->
<!--            // 排除01 - redis ， redis 不作为维表关联-->
<!--            if ('01' !== resp.data.rows[i].connectorType) {-->
<!--              that.dimensionRelationOptions.push({-->
<!--                value: resp.data.rows[i].dimensionName,-->
<!--                label: resp.data.rows[i].dimensionName,-->
<!--              });-->
<!--            }-->
<!--          }-->
<!--        }).catch(resp => {-->
<!--          console.log('获取数据源表请求失败：' + resp.status + ',' + resp.statusText);-->
<!--        });-->
<!--      },-->

<!--      // 查询数据源表-->
<!--      getSourceData() {-->
<!--        let that = this;-->
<!--        const baseUrl = process.env.VUE_APP_BASE_API;-->
<!--        axios({-->
<!--          method: 'get',-->
<!--          url: baseUrl + '/source/manage/list',-->
<!--          headers: {'AuthorizationEye': 'Bearer ' + getToken()},-->
<!--          responseType: 'json'-->
<!--        }).then(function (resp) {-->
<!--          for (let i = 0; i < resp.data.rows.length; i++) {-->
<!--            that.sourceDataOptions.push({-->
<!--              value: resp.data.rows[i].tableName,-->
<!--              name: resp.data.rows[i].tableName,-->
<!--            });-->
<!--          }-->
<!--        }).catch(resp => {-->
<!--          console.log('获取数据源表请求失败：' + resp.status + ',' + resp.statusText);-->
<!--        });-->
<!--      },-->
<!--      /** 查询变量分类列表 */-->
<!--      getList() {-->
<!--        this.loading = true;-->
<!--        listClassification(this.queryParams).then(response => {-->
<!--          this.classificationList = response.rows;-->
<!--          this.total = response.total;-->
<!--          this.loading = false;-->
<!--        });-->
<!--      },-->
<!--      // 取消按钮-->
<!--      cancel() {-->
<!--        this.open = false;-->
<!--        this.reset();-->
<!--      },-->
<!--      // 表单重置-->
<!--      reset() {-->
<!--        this.form = {-->
<!--          variableClassificationId: undefined,-->
<!--          variableClassificationName: undefined,-->
<!--          sourceDabRelation: undefined,-->
<!--          description: undefined,-->
<!--          createTime: undefined,-->
<!--          modifyTime: undefined,-->
<!--          sourceDabField: undefined,-->
<!--          dimensionRelation: [-->
<!--            {-->
<!--              dimensionName: "",-->
<!--              sourceDabField: "",-->
<!--            }-->
<!--          ]-->
<!--        };-->
<!--        this.resetForm("form");-->
<!--        this.sourceDataOptions = [];-->
<!--        this.dimensionRelationOptions = [];-->
<!--        this.sourceDabFieldOptions = [];-->
<!--      },-->
<!--      /** 搜索按钮操作 */-->
<!--      handleQuery() {-->
<!--        this.queryParams.pageNum = 1;-->
<!--        this.getList();-->
<!--      },-->
<!--      /** 重置按钮操作 */-->
<!--      resetQuery() {-->
<!--        this.resetForm("queryForm");-->
<!--        this.handleQuery();-->
<!--      },-->
<!--      // 多选框选中数据-->
<!--      handleSelectionChange(selection) {-->
<!--        this.ids = selection.map(item => item.variableClassificationId);-->
<!--        this.single = selection.length !== 1;-->
<!--        this.multiple = !selection.length-->
<!--      },-->
<!--      /** 新增按钮操作 */-->
<!--      handleAdd() {-->
<!--        this.detailViem = false;-->
<!--        this.reset();-->
<!--        this.open = true;-->
<!--        this.title = "添加变量分类";-->
<!--        this.getSourceData();-->
<!--        this.getDimensionData();-->
<!--        this.rules.sourceDabField[0].required = false;-->
<!--      },-->
<!--      /** 详情按钮操作 */-->
<!--      handleDetail(row) {-->
<!--        this.detailViem = true;-->
<!--        this.reset();-->
<!--        this.getSourceData();-->
<!--        this.getDimensionData();-->
<!--        const variableClassificationId = row.variableClassificationId || this.ids;-->
<!--        getClassification(variableClassificationId).then(response => {-->
<!--          this.form = response.data;-->
<!--          let parse = JSON.parse(this.form.dimensionRelation);-->
<!--          this.form.dimensionRelation = JSON.parse(this.form.dimensionRelation);-->
<!--          this.open = true;-->
<!--          this.detailViem = true;-->
<!--          this.title = "查看变量分类";-->
<!--        });-->
<!--      },-->
<!--      /** 修改按钮操作 */-->
<!--      handleUpdate(row) {-->
<!--        this.reset();-->
<!--        this.detailViem = false;-->
<!--        this.getSourceData();-->
<!--        this.getDimensionData();-->
<!--        const variableClassificationId = row.variableClassificationId || this.ids-->
<!--        getClassification(variableClassificationId).then(response => {-->
<!--          this.form = response.data;-->
<!--          console.log(this.form);-->
<!--          this.form.dimensionRelation = JSON.parse(this.form.dimensionRelation);-->
<!--          this.open = true;-->
<!--          this.title = "修改变量分类";-->
<!--          let tmp = this.form.sourceDabField;-->
<!--          this.form.sourceDabField = tmp;-->
<!--          let that = this;-->
<!--          const baseUrl = process.env.VUE_APP_BASE_API;-->
<!--          axios({-->
<!--            method: 'get',-->
<!--            url: baseUrl + '/source/manage/querySchema',-->
<!--            headers: {'AuthorizationEye': 'Bearer ' + getToken()},-->
<!--            responseType: 'json',-->
<!--            params: {-->
<!--              dataSourceName: that.form.sourceDabRelation-->
<!--            },-->
<!--          }).then(function (resp) {-->
<!--            that.sourceDabFieldOptions = [];-->
<!--            for (let i = 0; i < resp.data.rows[0].length; i++) {-->
<!--              that.sourceDabFieldOptions.push({-->
<!--                value: resp.data.rows[0][i].key,-->
<!--                name: resp.data.rows[0][i].key,-->
<!--              })-->
<!--            }-->
<!--            // this.$forceUpdate();-->
<!--          }).catch(resp => {-->
<!--            console.log('获取数据源表请求失败!' + resp);-->
<!--          });-->
<!--        });-->
<!--      },-->
<!--      /** 提交按钮 */-->
<!--      submitForm: function () {-->
<!--        this.$refs["form"].validate(valid => {-->
<!--          if (valid) {-->
<!--            if (this.form.variableClassificationId !== undefined) {-->
<!--              updateClassification(this.form).then(response => {-->
<!--                if (response.code === 200) {-->
<!--                  this.msgSuccess("修改成功");-->
<!--                  this.open = false;-->
<!--                  this.getList();-->
<!--                } else {-->
<!--                  this.msgError(response.msg);-->
<!--                }-->
<!--              });-->
<!--            } else {-->
<!--              // this.form.dimensionRelation = JSON.stringify(this.form.dimensionRelation);-->
<!--              addClassification(this.form).then(response => {-->
<!--                if (response.code === 200) {-->
<!--                  this.msgSuccess("新增成功");-->
<!--                  this.open = false;-->
<!--                  this.getList();-->
<!--                } else {-->
<!--                  this.msgError(response.msg);-->
<!--                }-->
<!--              });-->
<!--            }-->
<!--          }-->
<!--        });-->
<!--      },-->
<!--      /** 删除按钮操作 */-->
<!--      handleDelete(row) {-->
<!--        const variableClassificationIds = row.variableClassificationId || this.ids;-->
<!--        this.$confirm('是否确认删除变量分类编号为"' + variableClassificationIds + '"的数据项?', "警告", {-->
<!--          confirmButtonText: "确定",-->
<!--          cancelButtonText: "取消",-->
<!--          type: "warning"-->
<!--        }).then(function () {-->
<!--          return delClassification(variableClassificationIds);-->
<!--        }).then(() => {-->
<!--          this.getList();-->
<!--          this.msgSuccess("删除成功");-->
<!--        }).catch(function () {-->
<!--        });-->
<!--      },-->
<!--      /** 导出按钮操作 */-->
<!--      handleExport() {-->
<!--        const queryParams = this.queryParams;-->
<!--        this.$confirm('是否确认导出所有变量分类数据项?', "警告", {-->
<!--          confirmButtonText: "确定",-->
<!--          cancelButtonText: "取消",-->
<!--          type: "warning"-->
<!--        }).then(function () {-->
<!--          return exportClassification(queryParams);-->
<!--        }).then(response => {-->
<!--          this.download(response.msg);-->
<!--        }).catch(function () {-->
<!--        });-->
<!--      }-->
<!--    }-->
<!--  };-->
<!--</script>-->
<!--<style scoped>-->
<!--  .elementStyle >>> .el-form-item__content {-->
<!--    margin-left: 10px !important;-->
<!--  }-->
<!--</style>-->

<template>
  <div>
    <ferghana-common :redirect="redirect"/>
  </div>
</template>

<script>

  import FerghanaCommon from '../../ferghana/common/index'
  export default {
    components: { FerghanaCommon },
    data(){
      return{
        redirect:"/variable/classification",
      }
    }
  }
</script>
