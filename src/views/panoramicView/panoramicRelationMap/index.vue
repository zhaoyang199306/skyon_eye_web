<template>
  <div>
    <div style="display: flex;align-items: center;justify-content: center;height: 50px;">

      <div>
        <ul style="width: 500px;display: flex;">
          <li><div style="width: 20px;height: 20px;background-color: #FFC9A6;border-radius: 50%; display: inline-block;"></div><div style="margin-left: 15px; display: inline-block;">主体</div></li>
          <li><div style="width: 20px;height: 20px;background-color: #FEEDA6;border-radius: 50%; display: inline-block; "></div><div style="margin-left: 15px; display: inline-block;">关联人</div></li>
          <li><div style="width: 20px;height: 20px;background-color: #6AECFF;border-radius: 50%; display: inline-block; "></div><div style="margin-left: 15px; display: inline-block;">关联企业</div></li>
        </ul>
      </div>

    </div>

    <div style="position: absolute;left: 0;top: 0px;height: 50px;display: flex;align-items: center;">层级选择
     <select style="width: 100px;margin-left: 10px;" v-model="index">
       <option :value="1">一层</option>
       <option :value="2">二层</option>
       <option :value="3">三层</option>
     </select></div>

    <template v-if="show">
      <relation-map-d3 :currentIndex="currentIndex"  :custNo="custNo" :custType="custType" :custName = "custName"/>
    </template>
  </div>
</template>

<script>
  import RelationMapD3 from "./d3/index";

  export default {
    name: "panoramicRelationMap",
    components: {RelationMapD3},
    props: {
      custNo: String,
      custType: String,
      custName: String,
    },
    data() {
      return {
        // 子组件传参
        relationList:{},
        index: 1,
        currentIndex: 1,
        show: true
      }
    },
    watch:{
      index(newVal) {
        this.show = false;
        this.currentIndex = newVal;
        this.$nextTick(() => {
        	this.show = true;
        })
        
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped>

  li{
    width: 150px;
    list-style-type :none;
    display: flex;
    align-items: center;
  }

  .liStyle{
    width: 100px;
    height: 20px;
    background-color: rgb(255, 201, 166);
    border-width: 0px;
    border-style: none;
    border-color: unset;
    font-size: 18px;
    padding: 0px;
    text-align: center;
    line-height: 26px;
    font-weight: normal;
    font-style: normal;
  }

</style>
