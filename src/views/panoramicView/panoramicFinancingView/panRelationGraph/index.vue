<template>
  <dev>
    <div style="height:calc(100vh - 50px);" class="relation-context">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions">
      </SeeksRelationGraph>
    </div>
  </dev>
</template>

<script>
  import SeeksRelationGraph from 'relation-graph';


  export default {
    name: "PanRelationGraph",


    components: {
      SeeksRelationGraph
    },
    props: {
      custNo: String,
      custType: String,
      custName: String,
      dtCustGraphicsOverviewW: Object,
    },
    data() {
      return {
        // 节点
        nodes: [{
          id: 'id',
          text: this.custName,
          color:'#A6ECFF',
          'disableDefaultClickEffect':true,
        }],
        // 连接线
        links: [],
        currentSize: 400,
        myGraphPanelSize: {width: 400, height: 400},
        graphOptions: {
          debug: true,
          'layouts': [
            {
              'label': '中心',
              'layoutName': 'tree',
              'layoutClassName': 'seeks-layout-center',
              'defaultJunctionPoint': 'border',
              'defaultNodeShape': 0, // 默认的节点形状，0:圆形；1:矩形
              'defaultLineShape': 1, // 默认的线条样式（1:直线/2:样式2/3:样式3/4:折线/5:样式5/6:样式6
              'from': 'left', // left:从左到右/top:从上到下/right:从右到左/bottom:从下到上
              // 通过这4个属性来调整 tree-层级距离&节点距离
              'min_per_width': '200', // 节点距离限制:节点之间横向距离最小值
              'max_per_width': '500', // 节点距离限制:节点之间横向距离最大值
              'min_per_height': '40', // 节点距离限制:节点之间纵向距离最小值
              'max_per_height': '60', // 节点距离限制:节点之间纵向距离最大值
              'levelDistance': '', // 如果此选项有值，则优先级高于上面那4个选项


            }
          ],
          'defaultLineMarker': {
            'markerWidth': 12,
            'markerHeight': 12,
            'refX': 6,
            'refY': 6,
            'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
          },
          "defaultExpandHolderPosition": "right", // 当useLayoutStyleOptions=true时有效，默认的节点展开/关闭按钮位置（left/top/right/bottom）
          'defaultNodeShape': 1, // 当useLayoutStyleOptions=true时有效，默认的节点形状，0:圆形；1:矩形
          'defaultNodeWidth': '200', // 当useLayoutStyleOptions=true时有效，默认的节点宽度
          'defaultNodeHeight': '40', // 当useLayoutStyleOptions=true时有效，默认的节点高度
          'defaultLineShape': 4, // 当useLayoutStyleOptions=true时有效，默认的线条样式（1:直线/2:样式2/3:样式3/4:折线/5:样式5/6:样式6）
          'defaultJunctionPoint': 'lr', // 默认的连线与节点接触的方式（border:边缘/ltrb:上下左右/tb:上下/lr:左右）
          'defaultNodeBorderWidth': 0,  // 默认的节点边框粗细（像素）
          'defaultLineColor': 'rgba(0, 186, 189, 1)', // 默认线条颜色
          'defaultNodeFontColor':'#000000',
        }
      }
    },

    created() {

    },
    mounted() {
      this.getList();
      // this.setGraphData();
    },
    methods: {

      // 获取融资视图
      getList() {
        console.log("===============getPanoramicFinacingView==========aa=============");
        console.log(this.dtCustGraphicsOverviewW);
        let financingDo = this.dtCustGraphicsOverviewW;
        if (financingDo) {
          let num = 0;

          // 本行信贷的值不为空
          if (financingDo.cgbLonAmt || financingDo.cgbLonBal) {
            this.nodes = this.nodes.concat({id: ++num, text: '本行信贷',color:'#FFC9A6',disableDefaultClickEffect:true});
            let n = num;
            this.links = this.links.concat({from: 'id', to: num.toString(), isHideArrow: 'false',});
            this.nodes = this.nodes.concat({
              id: ++num,
              text: '个人一手房住房贷款' + financingDo.cgbLonAmt + '万，余额' + financingDo.cgbLonBal + '万'
              ,color:'#FFC9A6',disableDefaultClickEffect:true
            });
            this.links = this.links.concat({from: n.toString(), to: num.toString(), isHideArrow: 'false'});
          }
          // 本行信用卡的值不为空
          if (financingDo.cgbCrdtCardAmt || financingDo.cgbCrdtCardBal) {
            if (this.custType === '个人') {
              this.nodes = this.nodes.concat({id: ++num, text: '本行信用卡',color:'#FEEDA6',disableDefaultClickEffect:true});
            } else if (this.custType === '小微企业') {
              this.nodes = this.nodes.concat({id: ++num, text: '本行商务卡',color:'#FEEDA6',disableDefaultClickEffect:true});
            }
            let n = num;
            this.links = this.links.concat({from: 'id', to: num.toString(), isHideArrow: 'false'});
            this.nodes = this.nodes.concat({
              id: ++num,
              text: '旅游达人特约卡' + financingDo.cgbCrdtCardAmt + '万，余额' + financingDo.cgbCrdtCardBal + '万'
              ,color:'#FEEDA6',disableDefaultClickEffect:true
            });
            this.links = this.links.concat({from: n.toString(), to: num.toString(), isHideArrow: 'false'});
          }
          // 本行对外担保的值不为空
          if (financingDo.cgbFGuarAmt || financingDo.cgbFGuarBal) {
            this.nodes = this.nodes.concat({id: ++num, text: '本行对外担保',color:'#B8D9FD',disableDefaultClickEffect:true});
            let n = num;
            this.links = this.links.concat({from: 'id', to: n.toString(), isHideArrow: 'false'});
            this.nodes = this.nodes.concat({
              id: ++num,
              text: '对李四担保提供' + financingDo.cgbFGuarAmt + '万，余额' + financingDo.cgbFGuarBal + '万'
              ,color:'#B8D9FD',disableDefaultClickEffect:true
            });
            this.links = this.links.concat({from: n.toString(), to: num.toString(), isHideArrow: 'false',});
          }
          //

          // 无表信息。。。写死的征信视图
          this.nodes = this.nodes.concat({id: 'a', text: '征信视图',color:'#7EE697',disableDefaultClickEffect:true});
          this.links = this.links.concat({from: 'id', to: 'a', isHideArrow: 'false',});
          this.nodes = this.nodes.concat({id: 'b', text: '信贷',color:'#FF9502B3',disableDefaultClickEffect:true});
          this.links = this.links.concat({from: 'a', to: 'b', isHideArrow: 'false',});
          this.nodes = this.nodes.concat({id: 'c', text: '信用卡',color:'#FFCB01B3',disableDefaultClickEffect:true});
          this.links = this.links.concat({from: 'a', to: 'c', isHideArrow: 'false',});
          this.nodes = this.nodes.concat({id: 'd', text: '担保',color:'#5AC8FAB3',disableDefaultClickEffect:true});
          this.links = this.links.concat({from: 'a', to: 'd', isHideArrow: 'false',});
          this.nodes = this.nodes.concat({id: 'e', text: '其他',color:'#E5E5EA',disableDefaultClickEffect:true});
          this.links = this.links.concat({from: 'a', to: 'e', isHideArrow: 'false',});
        }

        this.setGraphData();
      },

      setGraphData() {
        // 使用要点：通过节点属性expandHolderPosition: 'right' 和 expanded: false 可以让节点在没有子节点的情况下展示一个"展开"按钮
        //         通过onNodeExpand事件监听节点，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
        var __graph_json_data = {
          'rootId': 'id',
          'nodes': this.nodes,
          'links': this.links,
        }
        console.log(JSON.stringify(__graph_json_data))
        this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        })
      },
      onSizeOptionChanged() {
        // 图谱的大小会随着父元素的宽高自动适应，所以修改父元素的宽高就可以设置图谱的宽高
        this.myGraphPanelSize.width = this.currentSize
        this.myGraphPanelSize.height = this.currentSize
        // 你也可以在调整完大小后刷新一下图谱，确保位置是合理的
        // this.$nextTick(() => { // $nextTick的功能你懂的
        //   this.$refs.seeksRelationGraph.refresh()
        // })
      }
    },
  }
</script>

<style scoped>

</style>
