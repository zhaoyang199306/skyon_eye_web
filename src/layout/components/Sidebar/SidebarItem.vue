<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"/>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
  import path from 'path'
  import {isExternal} from '@/utils/validate'
  import Item from './Item'
  import AppLink from './Link'
  import FixiOSBug from './FixiOSBug'

  export default {
    name: 'SidebarItem',
    components: {Item, AppLink},
    mixins: [FixiOSBug],
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      this.onlyOneChild = null
      return {}
    },

    methods: {


      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
          return true
        }

        return false
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      }
    }
  }
</script>

<style lang="scss">

  .menu-wrapper.nest-menu .el-submenu .el-submenu__title{
    color: #687178  !important;
    background-color: #BAD8F0 ;
  }

  .el-select-dropdown.el-popper {
    min-width: 198px;
    transform-origin: center top;
    z-index: 2004;
    position: absolute;
    top: 40px;
    left: 1666px
  }

  .el-select-dropdown__item {
    font-size: 12px;
    padding: 0 10px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 20px;
    line-height: 20px;
    box-sizing: border-box;
    cursor: pointer;
  }


  .el-menu--horizontal .el-menu .el-menu-item,
  .el-menu--horizontal .el-menu .el-submenu__title {
    line-height: 25px;
    height: 25px;
    padding-left: 10px;
    font-size: 12px;
  }

  .el-menu-item {
    line-height: 30px;
    padding: 0 10px;
    font-size: 12px;
  }

  .el-submenu__title {
    line-height: 30px;
    padding: 0 10px;
    font-size: 12px;
  }

  .el-menu--horizontal > .el-menu--popup-bottom-start {
    margin-top: -28px !important;

    .el-menu-item:hover {
      color: white !important;
      background-color: #0075bd !important;
      /*border-radius: 20px;*/
      /*overflow: auto;*/
    }
  }

  .el-menu--horizontal > .el-menu--popup {
    z-index: 100;
    min-width: 200px;
    border: none;
    padding: 0px 10px;
    background-color: #BAD8F0;

    > .menu-wrapper {
      height: 25px;
    }
  }


  .el-menu--horizontal {
    & .el-menu .el-menu-item {
      background-color: #BAD8F0 !important;
      color: #687178 !important;
      border-radius: 20px;
    }

  }


</style>

