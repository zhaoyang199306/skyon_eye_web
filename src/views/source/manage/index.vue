<!--<template>-->
<!--  <div class="app-container">-->
<!--    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="100px">-->
<!--      <el-form-item label="数据源中文名" prop="dataSourceName">-->
<!--        <el-input-->
<!--          v-model="queryParams.dataSourceName"-->
<!--          placeholder="请输入数据源中文名"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="连接器类型" prop="connectorType" label-width="100px">-->
<!--        <el-select-->
<!--          v-model="queryParams.connectorType"-->
<!--          placeholder="请选择连接器类型"-->
<!--          clearable-->
<!--          size="small"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dictSource in connectorTypeOptions"-->
<!--            :key="dictSource.dictValue"-->
<!--            :label="dictSource.dictLabel"-->
<!--            :value="dictSource.dictValue"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="描述" prop="description">-->
<!--        <el-input-->
<!--          v-model="queryParams.description"-->
<!--          placeholder="请输入描述"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item style="padding-left: 12px">-->
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
<!--          @click="handleUpdate"-->
<!--        >修改-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          @click="handleDelete"-->
<!--        >删除-->
<!--        </el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->

<!--    <el-table v-loading="loading" :data="sourceList" @selection-change="handleSelectionChange">-->
<!--      <el-table-column type="selection" width="55" align="center"/>-->
<!--      <el-table-column label="序号" width="55" align="center" type="index"/>-->
<!--      <el-table-column label="数据源中文名" align="center" prop="dataSourceName"/>-->
<!--      <el-table-column label="数据源英文名" align="center" prop="tableName"/>-->
<!--      <el-table-column-->
<!--        label="连接器类型"-->
<!--        align="center"-->
<!--        prop="connectorType"-->
<!--        :formatter="connectorTypeMatter"-->
<!--      />-->
<!--      <el-table-column label="数据来源" align="center" prop="dataSource"/>-->
<!--      <el-table-column label="创建时间" align="center" prop="createTime" width="160">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.createTime) }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="修改时间" align="center" prop="modifyTime" width="160">-->
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

<!--    &lt;!&ndash; 添加或修改数据源表对话框 &ndash;&gt;-->
<!--    <el-dialog :title="title" :visible.sync="open" width="1100px" :close-on-click-modal="false">-->
<!--      <el-form ref="form" :model="form" :rules="rules" label-width="130px">-->
<!--        <el-form-item label="数据源中文名" prop="dataSourceName" class="el-col-12">-->
<!--          <el-input v-model="form.dataSourceName" placeholder="请输入数据源中文名" :disabled="detailViem"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="数据源英文名" prop="tableName" class="el-col-12">-->
<!--          <el-input v-model="form.tableName" placeholder="请输入数据源英文名" :disabled="detailViem"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="连接器类型" prop="connectorType" class="el-col-12">-->
<!--          <el-select-->
<!--            v-model="form.connectorType"-->
<!--            placeholder="请选择连接器类型"-->
<!--            clearable-->
<!--            style="width: 100%"-->
<!--            :disabled="detailViem"-->
<!--          >-->
<!--            <el-option-->
<!--              v-for="dict in connectorTypeOptions"-->
<!--              :key="dict.dictValue"-->
<!--              :label="dict.dictLabel"-->
<!--              :value="dict.dictValue"-->
<!--            />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="数据来源" prop="dataSource" class="el-col-12">-->
<!--          <el-input v-model="form.dataSource" placeholder="请输入数据来源" :disabled="detailViem"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="topic名" prop="topicName" class="el-col-12">-->
<!--          <el-input v-model="form.topicName" placeholder="请输入topic名" :disabled="detailViem"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="消费组" prop="consumerGroup" class="el-col-12">-->
<!--          <el-input v-model="form.consumerGroup" placeholder="请输入消费组" :disabled="detailViem"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="消费模式" prop="consumerMode" class="el-col-12">-->
<!--          <el-select v-model="form.consumerMode" placeholder="请选择消费模式" clearable style="width: 100%"-->
<!--                     :disabled="detailViem">-->
<!--            <el-option v-for="dict in consumerModeOptions" :key="dict.dictValue" :label="dict.dictLabel"-->
<!--                       :value="dict.dictValue"/>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="zookeeper地址" prop="zookeeperAddress" class="el-col-12">-->
<!--          <el-input-->
<!--            v-model="form.zookeeperAddress"-->
<!--            placeholder="master:2181,slave:2181"-->
<!--            :disabled="detailViem"-->
<!--          />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="kafka地址" prop="kafkaAddress" class="el-col-12">-->
<!--          <el-input v-model="form.kafkaAddress" placeholder="master:9092,slave:9092" :disabled="detailViem"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="描述" prop="description" class="el-col-12">-->
<!--          <el-input v-model="form.description" placeholder="请输入描述" :disabled="detailViem"/>-->
<!--        </el-form-item>-->

<!--        <div v-for="(item, index) in form.dynamicItem" :key="index" class="el-col-24">-->
<!--          <el-form-item label="schema" class="el-col-5" :id="'label' + index"-->
<!--                        :prop="'dynamicItem.' + index + '.schemaDefine'"-->
<!--                        :rules="rules.dynamicItem.schemaDefine">-->
<!--              <el-input v-model="item.schemaDefine" @change="schemaDefineChange(index)"-->
<!--                        placeholder="请输入字段" @mouseover="mouseOver" style="width: 200px" :disabled="item.isUsed === '1'"/>-->
<!--          </el-form-item>-->
<!--          <el-form-item class="el-col-6 elementStyle" style="padding-left: 100px"-->
<!--                        :prop="'dynamicItem.' + index + '.dataBaseType'"-->
<!--                        :rules="rules.dynamicItem.dataBaseType">-->
<!--            <el-select v-model="item.dataBaseType" placeholder="请选择数据类型" clearable style="width: 220px"-->
<!--                       :disabled="item.isUsed === '1'">-->
<!--              <el-option v-for="dict in sysDataBaseTypes" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue"/>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item class="el-col-5"-->
<!--                        :prop="'dynamicItem.' + index + '.schemaFieldName'"-->
<!--                        :rules="rules.dynamicItem.schemaFieldName">-->
<!--            <el-input v-model="item.schemaFieldName" placeholder="请输入中文名" style="width: 200px" :disabled="detailViem"/>-->
<!--          </el-form-item>-->
<!--          <el-form-item class="el-col-2 elementStyle" :prop="'dynamicItem.' + index + '.primaryKey'">-->
<!--            <el-input v-model="item.primaryKey" :disabled="detailViem" v-show="false"/>-->
<!--            <el-button @click="primaryKeyCheck(index)" :ref="'ref' + index" :id="'ref' + index"-->
<!--                       :disabled="item.isUsed === '1'"  style="padding: 10px; margin-left: 90px">主键-->
<!--            </el-button>-->
<!--          </el-form-item>-->
<!--          <el-form-item class="el-col-6">-->
<!--            <span>-->
<!--              <el-button @click="addItem" :disabled="detailViem">-->
<!--                <i class="el-icon-plus"/>-->
<!--              </el-button>-->
<!--              <el-button @click="deleteItem(item, index)" :disabled="item.isUsed === '1'">-->
<!--                <i class="el-icon-minus"/>-->
<!--              </el-button>-->
<!--            </span>-->
<!--          </el-form-item>-->
<!--        </div>-->
<!--        &lt;!&ndash; 动态增加项目 &ndash;&gt;-->
<!--        &lt;!&ndash; 不止一项，用div包裹起来 &ndash;&gt;-->
<!--        <div class="el-col-24">-->
<!--          <el-form-item label="watermark">-->
<!--            <span><el-input v-model="form.waterMarkName" placeholder="请输入水印" style="width: 200px"-->
<!--                            :disabled="detailViem"/></span>-->
<!--            <span style="margin-left: 30px"><el-input value="TIMESTAMP(3)" style="width: 200px" disabled="disabled"/></span>-->
<!--            <span style="margin-left: 30px"><el-input-number :disabled="detailViem" v-model="form.waterMarkTime" :min="0" :max="1000000"/></span>-->
<!--            <span style="margin-left: 2px">秒</span>-->
<!--          </el-form-item>-->
<!--        </div>-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="submitForm" v-show="showSubmitForm">确 定</el-button>-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import {-->
<!--    listSource,-->
<!--    getSource,-->
<!--    delSource,-->
<!--    addSource,-->
<!--    updateSource,-->
<!--    exportSource-->
<!--  } from "@/api/source/manage.js";-->
<!--  import{isLegitimateName,unContainSpace} from "@/utils/validate.js";-->

<!--  export default {-->
<!--    name: "Manage",-->
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
<!--        // 数据源表表格数据-->
<!--        sourceList: [],-->
<!--        // 弹出层标题-->
<!--        title: "",-->
<!--        // 是否显示弹出层-->
<!--        open: false,-->
<!--        // 数据源类型数据-->
<!--        dataSourceTypeOptions: [],-->
<!--        // 连接器类型-->
<!--        connectorTypeOptions: [],-->
<!--        // 消费模式类型-->
<!--        consumerModeOptions: [],-->
<!--        // 数据类型-->
<!--        sysDataBaseTypes: [],-->

<!--        // dynamicItem: [{-->
<!--        //   schemaDefine:"",-->
<!--        //   dataBaseType:""-->
<!--        // }],-->
<!--        // 控制标签是否可修改-->
<!--        detailViem: false,-->
<!--        updateViem: false,-->
<!--        // 控制【确认】按钮是否显示-->
<!--        showSubmitForm: true,-->
<!--        // 查询参数-->
<!--        queryParams: {-->
<!--          pageNum: 1,-->
<!--          pageSize: 10,-->
<!--          dataSourceId: undefined,-->
<!--          dataSourceName: undefined,-->
<!--          dataSourceType: undefined,-->
<!--          connectorType: undefined,-->
<!--          dataSource: undefined,-->
<!--          topicName: undefined,-->
<!--          tableName: undefined,-->
<!--          consumerGroup: undefined,-->
<!--          consumerMode: undefined,-->
<!--          zookeeperAddress: undefined,-->
<!--          kafkaAddress: undefined,-->
<!--          schemaDefine: undefined,-->
<!--          dataBaseType: undefined,-->
<!--          description: undefined-->
<!--        },-->
<!--        // 表单参数-->
<!--        form: {},-->
<!--        // 表单校验-->
<!--        rules: {-->
<!--          dataSourceName: [-->
<!--            {required: true, message: "数据源名称不能为空", trigger: "blur"},-->
<!--            {validator: unContainSpace, message: "数据源名称不能包含空格", trigger: "blur"}-->
<!--          ],-->
<!--          dataSourceType: [-->
<!--            {required: true, message: "数据源类型不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          connectorType: [-->
<!--            {required: true, message: "连接器类型不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          dataSource: [-->
<!--            {required: true, message: "数据来源不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          topicName: [-->
<!--            {required: true, message: "topic名不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          tableName: [-->
<!--            {required: true, message: "表名不能为空", trigger: "blur"},-->
<!--            {validator: isLegitimateName, message: "格式：只能包含英文字母、数字、下划线且首字母必须是英文字母", trigger: "blur"}-->
<!--          ],-->
<!--          consumerGroup: [-->
<!--            {required: true, message: "消费组不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          consumerMode: [-->
<!--            {required: true, message: "消费模式不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          zookeeperAddress: [-->
<!--            {required: true, message: "zookeeper地址不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          kafkaAddress: [-->
<!--            {required: true, message: "kafka地址不能为空", trigger: "blur"}-->
<!--          ],-->
<!--          dynamicItem: {-->
<!--            schemaDefine: [-->
<!--              {required: true, message: "字段不能为空", trigger: "blur"},-->
<!--              {validator: isLegitimateName, message: "格式不合法", trigger: "blur"}-->
<!--            ],-->
<!--            dataBaseType: [-->
<!--              {required: true, message: "数据类型不能为空", trigger: "blur"}-->
<!--            ],-->
<!--            schemaFieldName: [-->
<!--              {required: true, message: "中文名不能为空", trigger: "blur"}-->
<!--            ]-->
<!--          }-->
<!--        }-->
<!--      };-->
<!--    },-->
<!--    created() {-->
<!--      this.getList();-->
<!--      this.getDicts("sys_source_type").then(response => {-->
<!--        this.dataSourceTypeOptions = response.data;-->
<!--      });-->
<!--      this.getDicts("sys_connector_type").then(response => {-->
<!--        this.connectorTypeOptions = response.data;-->
<!--      });-->
<!--      this.getDicts("sys_consumer_mode").then(response => {-->
<!--        this.consumerModeOptions = response.data;-->
<!--      });-->
<!--      this.getDicts("datasource_schema_type").then(response => {-->
<!--        this.sysDataBaseTypes = response.data;-->
<!--      });-->
<!--    },-->
<!--    methods: {-->

<!--      mouseOver(){-->
<!--        console.log("==");-->

<!--      },-->

<!--      schemaDefineChange(index){-->
<!--        if (this.form.dynamicItem[index].primaryKey !== "") {-->
<!--          this.form.dynamicItem[index].primaryKey = this.form.dynamicItem[index].schemaDefine;-->
<!--          this.form.schemaPrimaryKey = this.form.dynamicItem[index].schemaDefine;-->
<!--        }-->
<!--      },-->

<!--      // 主键选择-->
<!--      primaryKeyCheck(index) {-->
<!--        // 先删除其他的所有的颜色-->
<!--        for (let i = 0; i < this.form.dynamicItem.length; i++) {-->
<!--          let dom = document.querySelector('#ref' + i);-->
<!--          dom.style.backgroundColor = "#ffffff";-->
<!--          dom.style.color = "#C0C4CC";-->
<!--          if (index !== i) {-->
<!--            this.form.dynamicItem[i].primaryKey = "";-->
<!--          }-->
<!--        }-->

<!--        // 点击当前这个按钮变背景颜色-->
<!--        var dom1 = document.querySelector('#ref' + index);-->
<!--        // 如果已经为主键，则先取消-->
<!--        if (this.form.dynamicItem[index].primaryKey !== "") {-->
<!--          dom1.style.backgroundColor = "#ffffff";-->
<!--          this.form.dynamicItem[index].primaryKey = "";-->
<!--        } else {-->
<!--          dom1.style.backgroundColor = "#1890ff";-->
<!--          dom1.style.color = "#ffffff";-->
<!--          // 赋值-->
<!--          if (this.form.dynamicItem[index].schemaDefine === "") {-->
<!--            this.form.dynamicItem[index].primaryKey = "1";-->
<!--          } else {-->
<!--            this.form.dynamicItem[index].primaryKey = this.form.dynamicItem[index].schemaDefine;-->
<!--            this.form.schemaPrimaryKey = this.form.dynamicItem[index].schemaDefine;-->
<!--          }-->
<!--        }-->
<!--      },-->

<!--      // 增加行-->
<!--      addItem() {-->
<!--        this.form.dynamicItem.push({-->
<!--          schemaDefine: "",-->
<!--          dataBaseType: "",-->
<!--          schemaFieldName: "",-->
<!--          primaryKey: ""-->
<!--        });-->
<!--        // 增加的删除schema的label-->
<!--        this.$nextTick(function () {-->
<!--          for (let i = 1; i < this.form.dynamicItem.length; i++) {-->
<!--            document.querySelector('#label' + i).firstElementChild.innerHTML = "";-->
<!--          }-->
<!--        })-->
<!--      },-->
<!--      // 删除行-->
<!--      deleteItem(item, index) {-->
<!--        if (this.form.dynamicItem && this.form.dynamicItem.length === 1) {-->
<!--          this.$alert("不能删除所有的字段", {type: "error"});-->
<!--          return false;-->
<!--        }-->
<!--        this.form.dynamicItem.splice(index, 1);-->
<!--      },-->
<!--      // 数据源类型字典翻译-->
<!--      statusDataSourceType(row, column) {-->
<!--        return this.selectDictLabel(-->
<!--          this.dataSourceTypeOptions,-->
<!--          row.dataSourceType-->
<!--        );-->
<!--      },-->
<!--      // 连接器类型字典翻译-->
<!--      connectorTypeMatter(row, column) {-->
<!--        return this.selectDictLabel(this.connectorTypeOptions, row.connectorType);-->
<!--      },-->
<!--      /** 查询数据源表列表 */-->
<!--      getList() {-->
<!--        this.loading = true;-->
<!--        listSource(this.queryParams).then(response => {-->
<!--          this.sourceList = response.rows;-->
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
<!--          dataSourceId: undefined,-->
<!--          dataSourceName: undefined,-->
<!--          dataSourceType: undefined,-->
<!--          connectorType: undefined,-->
<!--          dataSource: undefined,-->
<!--          topicName: undefined,-->
<!--          tableName: undefined,-->
<!--          consumerGroup: undefined,-->
<!--          consumerMode: undefined,-->
<!--          zookeeperAddress: undefined,-->
<!--          kafkaAddress: undefined,-->
<!--          schemaDefine: undefined,-->
<!--          description: undefined,-->
<!--          schemaPrimaryKey: undefined,-->
<!--          waterMarkName: undefined,-->
<!--          waterMarkTime: undefined,-->
<!--          dynamicItem: [-->
<!--            {-->
<!--              schemaDefine: "",-->
<!--              dataBaseType: "",-->
<!--              schemaFieldName: "",-->
<!--              primaryKey: ""-->
<!--            }-->
<!--          ]-->
<!--        };-->
<!--        this.resetForm("form");-->
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
<!--        this.ids = selection.map(item => item.dataSourceId);-->
<!--        this.single = selection.length !== 1;-->
<!--        this.multiple = !selection.length;-->
<!--      },-->
<!--      /** 新增按钮操作 */-->
<!--      handleAdd() {-->
<!--        this.reset();-->
<!--        this.detailViem = false;-->
<!--        this.updateViem = false;-->
<!--        this.showSubmitForm = true;-->
<!--        this.open = true;-->
<!--        this.title = "添加数据源";-->
<!--      },-->
<!--      /** 修改按钮操作 */-->
<!--      handleUpdate(row) {-->
<!--        this.reset();-->
<!--        const dataSourceId = row.dataSourceId || this.ids;-->
<!--        getSource(dataSourceId).then(response => {-->
<!--          this.form = response.data;-->
<!--          this.open = true;-->
<!--          this.detailViem = false;-->
<!--          this.updateViem = true;-->
<!--          this.showSubmitForm = true;-->
<!--          this.title = "修改数据源";-->

<!--          this.$nextTick(function () {-->
<!--            for (let i = 0; i < this.form.dynamicItem.length; i++) {-->
<!--              if (this.form.dynamicItem[i].primaryKey !== "" && this.form.dynamicItem[i].primaryKey === this.form.schemaPrimaryKey) {-->
<!--                let dom1 = document.querySelector('#ref' + i);-->
<!--                dom1.style.backgroundColor = "#1890ff";-->
<!--                dom1.style.color = "#ffffff";-->
<!--              }-->
<!--            }-->
<!--          })-->
<!--        });-->
<!--      },-->
<!--      /** 详情按钮操作 */-->
<!--      handleDetail(row) {-->
<!--        this.reset();-->
<!--        const dataSourceId = row.dataSourceId || this.ids;-->
<!--        getSource(dataSourceId).then(response => {-->
<!--          this.form = response.data;-->
<!--          this.open = true;-->
<!--          this.detailViem = true;-->
<!--          this.updateViem = true;-->
<!--          this.showSubmitForm = false;-->
<!--          this.title = "查看数据源";-->
<!--          this.$nextTick(function () {-->
<!--            for (let i = 0; i < this.form.dynamicItem.length; i++) {-->
<!--              if (this.form.dynamicItem[i].primaryKey !== "" && this.form.dynamicItem[i].primaryKey === this.form.schemaPrimaryKey) {-->
<!--                console.log("+++");-->
<!--                let dom1 = document.querySelector('#ref' + i);-->
<!--                dom1.style.backgroundColor = "#1890ff";-->
<!--                dom1.style.color = "#ffffff";-->
<!--              }-->
<!--            }-->
<!--          })-->
<!--        });-->
<!--      },-->
<!--      /** 提交按钮 */-->
<!--      submitForm: function () {-->
<!--        this.$refs["form"].validate(valid => {-->
<!--          if (valid) {-->
<!--            if (this.form.dataSourceId !== undefined) {-->
<!--              console.log("&#45;&#45;11-&#45;&#45;");-->
<!--              console.log(this.form);-->
<!--              updateSource(this.form).then(response => {-->
<!--                if (response.code === 200) {-->
<!--                  this.msgSuccess("修改成功");-->
<!--                  this.open = false;-->
<!--                  this.getList();-->
<!--                } else {-->
<!--                  this.msgError(response.msg);-->
<!--                }-->
<!--              });-->
<!--            } else {-->
<!--              // primaryKey-->
<!--              for (let i = 0; i < this.form.dynamicItem.length; i++) {-->
<!--                this.$delete(this.form.dynamicItem[i], "primaryKey");-->
<!--              }-->
<!--              // this.form.dynamicItem = JSON.toString(this.form.dynamicItem);-->
<!--              addSource(this.form).then(response => {-->
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
<!--        const dataSourceIds = row.dataSourceId || this.ids;-->
<!--        this.$confirm("是否确认删除该数据项?", "警告", {-->
<!--          confirmButtonText: "确定",-->
<!--          cancelButtonText: "取消",-->
<!--          type: "warning"-->
<!--        })-->
<!--          .then(function () {-->
<!--            return delSource(dataSourceIds);-->
<!--          })-->
<!--          .then(() => {-->
<!--            this.getList();-->
<!--            this.msgSuccess("删除成功");-->
<!--          })-->
<!--          .catch(function () {-->
<!--          });-->
<!--      },-->
<!--      /** 导出按钮操作 */-->
<!--      handleExport() {-->
<!--        const queryParams = this.queryParams;-->
<!--        this.$confirm("是否确认导出所有数据源表数据项?", "警告", {-->
<!--          confirmButtonText: "确定",-->
<!--          cancelButtonText: "取消",-->
<!--          type: "warning"-->
<!--        })-->
<!--          .then(function () {-->
<!--            return exportSource(queryParams);-->
<!--          })-->
<!--          .then(response => {-->
<!--            this.download(response.msg);-->
<!--          })-->
<!--          .catch(function () {-->
<!--          });-->
<!--      }-->
<!--    }-->
<!--  };-->
<!--</script>-->

<!--<style scoped>-->
<!--  .elementStyle >>> .el-form-item__content {-->
<!--    margin-left: 45px !important;-->
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
        redirect:"/source/manage",
      }
    }
  }
</script>

