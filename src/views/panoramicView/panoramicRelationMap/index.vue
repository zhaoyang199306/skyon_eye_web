<template>
  <div>
    <div>
      <ul style="margin-left: 35%">
        <li><div style="width: 20px;height: 20px;background-color: #FFC9A6;float:left;border-radius: 50%; "></div><span style="float:left;margin-left: 15px">主体</span></li>
        <li><div style="width: 20px;height: 20px;background-color: #FEEDA6;float:left;border-radius: 50%; "></div><span style="float:left;margin-left: 15px">关联人</span></li>
        <li><div style="width: 20px;height: 20px;background-color: #6AECFF;float:left;border-radius: 50%; "></div><span style="float:left;margin-left: 15px">关联企业</span></li>
      </ul>
    </div>
    <template>
      <relation-map-d3  :custNo="custNo" :custType="custType" :custName = "custName"/>
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
    float: left;
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
