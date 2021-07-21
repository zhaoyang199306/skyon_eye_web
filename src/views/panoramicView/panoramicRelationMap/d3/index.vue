<template>
  <div>
    <div style="height:calc(100vh - 50px);" class="relation-context">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick"
                     :on-line-click="onLineClick"/>
    </div>
  </div>
</template>

<script>
  import RelationGraph from 'relation-graph'
  import {getPanoramicRelation} from "@/api/panoramicView/panoramicRelationMap.js"

  export default {
    name: "RelationMapD3",
    components: {
      RelationGraph
    },
    props: {
      // 参数：客户号
      custNo: String,
      // 参数; 客户名
      custName: String,
      // 参数:
      custType: String,
      // 当前图谱层级
      currentIndex: Number
    },
    watch: {
      currentIndex(newVal) {
        this.changeData();
      }
    },
    data() {
      return {
        // 主节点
        rootId: 'id',
        // 图谱list
        relationList: {
          dtTyDpApCustIncidRelaW: [],
        },
        // 节点
        nodes: [],
        datas: [
          // 先确定一个主节点
          {
            id: 'id', // id
            text: this.custName, // 节点名
            color:'#FFC9A6',
          }
          ,{
            id: '1', //
            text: "B公司", // 节点名
            innerHTML:"<div style='background-color: rgb(255, 114, 114);margin-left: 20px'><div style='color: white'>财务风险</div></div><p>B公司</p>",
            color:'#6AECFF',
          },{
            id: '2', //
            text: "C公司", // 节点名
            color:'#6AECFF',
          },{
            id: '3', //
            text: "D公司", // 节点名
            color:'#6AECFF',
          },{
            id: '4', //
            text: "张某", // 节点名
            innerHTML:"<div style='background-color: rgb(255, 114, 114);margin-left: 20px'><div style='color: white'>存量贷款</div></div><p>张某</p>",
            color:'#FEEDA6',
          },{
            id: '6', //
            text: "张某某", // 节点名
            color:'#FEEDA6',
          },{
            id: '5', //
            text: "陈某某", // 节点名
            color:'#FEEDA6',
          },{
            id: '7', //
            text: "李梅", // 节点名
            color:'#FEEDA6',
          },{
            id: '8', //
            text: "H公司", // 节点名
            color:'#6AECFF',
          },{
            id: '9', //
            text: "Z公司", // 节点名
            color:'#6AECFF',
          },{
            id: '10', //
            text: "F公司", // 节点名
            color:'#6AECFF',
          },{
            id: '11', //
            text: "李某", // 节点名
            color:'#FEEDA6',
          }
        ],
        // 连接线
        links: [],
        link_datas: [
          {
          from: 'id',
          to: "1",
          text: "持股100%",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: 'id',
          to: "2",
          text: "持股30%",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: 'id',
          to: "3",
          text: "持股15%",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: 'id',
          to: "4",
          text: "法定代表人",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: 'id',
          to: "5",
          text: "提供担保",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: 'id',
          to: "6",
          text: "实际控制人",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: '7',
          to: "5",
          text: "配偶",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: '8',
          to: "7",
          text: "法定代表人",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: '3',
          to: "10",
          text: "持股30%",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: '2',
          to: "9",
          text: "持股15%",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: '2',
          to: "3",
          text: "持股10%",
          isHideArrow: 'false',
          fontColor: '#000000'
        },{
          from: '9',
          to: "11",
          text: "法定代表人",
          isHideArrow: 'false',
          fontColor: '#000000'
        }],
        //
        graphOptions: {
          allowSwitchLineShape: true, // 是否在工具栏中显示切换线条形状的按钮
          allowSwitchJunctionPoint: true, // 是否在工具栏中显示切换连接点位置的按钮
          defaultJunctionPoint: 'border', // 默认的连线与节点接触的方式（border:边缘/ltrb:上下左右/tb:上下/lr:左右）
          defaultNodeFontColor: '#00000', // 默认的节点文字颜色
          defaultNodeBorderColor: '#A6ECFF', // 默认的节点边框颜色
          // 布局方式
          'layouts': [{
            'label': '布局1',
            'layoutName': 'center',
            'layoutClassName': 'seeks-layout-center',
            useLayoutStyleOptions: true,
            'defaultNodeWidth': '80', // 默认的节点宽度
            'defaultNodeHeight': '80', // 默认的节点高度
            defaultNodeBorderWidth: 0,
            defaultLineWidth: 2, // 线条的大小
            defaultNodeColor: '#A6ECFF', // 默认的节点背景颜色
            defaultLineColor: '#A6ECFF', // 默认的线条颜色
            defaultLineShape: 1,
            'distance_coefficient': 1
          }]
          // isMoveByParentNode: true, // 是否在拖动节点后让子节点跟随
          // 这里可以参考"Graph 图谱"中的参数进行设置
        }
      }
    },
    created() {
      // this.getList();
    },
    mounted() {
      // 主节点 赋值
      // this.showSeeksGraph();
      this.getList();
      this.changeData();
    },
    methods: {
      // 查询关联关系图谱
      getList() {
        getPanoramicRelation(this.custNo, this.custType).then(res => {
          if (res.code === 200) {
            console.log("-----getPanoramicRelationsssssss-----")
            console.log(res)
            this.relationList = res.data;

            // if (this.relationList.dtTyDpApCustIncidRelaW){
            //   for (let i = 0; i < this.relationList.dtTyDpApCustIncidRelaW.length; i++) {
            //     let relation = this.relationList.dtTyDpApCustIncidRelaW[i];
            //     // 存量贷款的
            //     //"innerHTML": "<div style=\"background-color: yellow\"><div style='color:red'>存量贷款</div></div><p>d</p>",
            //     // 节点颜色
            //     if (relation.relaType === '关联人'){
            //       if (relation.riskFlag === '存量贷款'){
            //         this.nodes = this.nodes.concat(
            //             {id: relation.custNo + i,
            //             text: relation.relaParty,
            //             innerHTML:"<div style='background-color: rgb(255, 114, 114);margin-left: 20px'><div style='color: white'>存量贷款</div></div><p>"+relation.relaParty+"</p>",
            //             color:'#FEEDA6',disableDefaultClickEffect:true});
            //       } else {
            //         this.nodes = this.nodes.concat({id: relation.custNo + i, text: relation.relaParty,color:'#FEEDA6',disableDefaultClickEffect:true});
            //       }
            //     } else if (relation.relaType === '关联企业'){
            //       if (relation.riskFlag === '财务风险'){
            //         this.nodes = this.nodes.concat(
            //           {id: relation.custNo + i,
            //             text: relation.relaParty,
            //             innerHTML:"<div style='background-color: red;margin-left: 20px'><div style='color: white'>财务风险</div></div><p>"+relation.relaParty+"</p>",
            //             color:'#6AECFF',disableDefaultClickEffect:true});
            //       } else {
            //         this.nodes = this.nodes.concat({id: relation.custNo + i, text: relation.relaParty,color:'#6AECFF',disableDefaultClickEffect:true});
            //       }
            //
            //     }
            //     //
            //     this.links = this.links.concat({
            //       from: 'id', to: relation.custNo + i,
            //       text: relation.incidRela, isHideArrow: 'false', fontColor: '#000000'
            //     });
            //   }
            // }

            console.log("---------this.node---------");
            console.log(this.nodes);
            console.log(this.links);

            // this.showSeeksGraph();
          }
        });
      },
      // 主节点 赋值
      showSeeksGraph(query) {
        console.log("------showSeeksGraph-----");
        console.log(this.relationList);
        var __graph_json_data = {
          rootId: this.rootId,
          nodes: this.nodes,
          links: this.links
        }
        console.log(__graph_json_data)
        // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
        this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
          // Called when the relation-graph is completed
        })
      },
      onNodeClick(nodeObject, $event) {
        console.log('onNodeClick:', nodeObject)
      },
      onLineClick(lineObject, $event) {
        console.log('onLineClick:', lineObject)
      },
      getNodesList(arr) {
        let data = arr;
        arr.forEach(id => {
          this.link_datas.forEach(item => {
            if(item.from === id || item.to === id) {
              if(data.indexOf(item.from) === -1) {
                data.push(item.from)
              }
              else if(data.indexOf(item.to) === -1) {
                data.push(item.to)
              }
            }
          })
        })
        return data;
      },
      // 根据图谱层级切换图谱数据
      changeData() {
        let arr = [];
        arr.push(this.rootId);
        if(this.currentIndex === 1) {
          arr = this.getNodesList(arr);
        }
        else if(this.currentIndex === 2) {
          arr = this.getNodesList(arr);
          arr = this.getNodesList(arr);
        }
        else if(this.currentIndex === 3) {
          this.datas.forEach(item => {
            if(arr.indexOf(item.id) === -1) {
              arr.push(item.id);
            }
          })
        }
        console.log(arr);
        this.nodes = [];
        this.datas.forEach(item => {
          if(arr.indexOf(item.id) !== -1) {
            this.nodes.push(item);
          }
        })
        let list = [];
        this.link_datas.forEach(item => {
          if(arr.indexOf(item.from) !== -1 && arr.indexOf(item.to) !== -1) {
            list.push(item);
          }
        })
        this.links = list;
        console.log("===================")
        console.log(this.nodes);
        console.log(this.links);
        this.showSeeksGraph();
      }
    }
  }

</script>

<style scoped>

  .relation-context >>> .c-rg-link-text {
    fill: #888888;
    font-size: 14px;
  }

</style>
