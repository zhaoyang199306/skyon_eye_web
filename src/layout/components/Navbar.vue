<template>
  <div class="navbar el-button--primary">
<!--    <hamburger id="hamburger-container" :is-active="sidebar.opened"-->
<!--                class="hamburger-container" @toggleClick="toggleSideBar" />-->

<!--    面包屑-->
<!--    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />-->

    <div>
      <logo :collapse="isCollapse"/>
      <div class="headline lt"/>
      <div class="breadcrumb-container">
        <el-scrollbar wrap-class="scrollbar-wrapper" style="font-weight: bold">
          <el-menu
            StaticEnableDefaultPopOutImage = false
            :default-active="activeMenu"
            :collapse="isCollapse"
            :text-color="variables.menuBg"
            :unique-opened="true"
            :active-text-color="variables.menuActiveText"
            :collapse-transition="false"
            mode="horizontal"
          >
            <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"/>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
<!--    <div class="right-menu">-->
<!--      <template v-if="device!=='mobile'">-->
<!--        <search id="header-search" class="right-menu-item" />-->
<!--        -->
<!--        <el-tooltip content="源码地址" effect="dark" placement="bottom">-->
<!--          <ruo-yi-git id="ruoyi-git" class="right-menu-item hover-effect" />-->
<!--        </el-tooltip>-->

<!--        <el-tooltip content="文档地址" effect="dark" placement="bottom">-->
<!--          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />-->
<!--        </el-tooltip>-->

<!--        <screenfull id="screenfull" class="right-menu-item hover-effect" />-->

<!--        <el-tooltip content="布局大小" effect="dark" placement="bottom">-->

<!--        </el-tooltip>-->

<!--      </template>-->

<!--      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">-->


<!--        <div class="avatar-wrapper">-->
<!--          用户头像-->
<!--          <img :src="avatar" class="user-avatar">-->
<!--          <i class="el-icon-caret-bottom" />-->
<!--        </div>-->

<!--        <el-dropdown-menu slot="dropdown">-->
<!--          <router-link to="/user/profile">-->
<!--            <el-dropdown-item>个人中心</el-dropdown-item>-->
<!--          </router-link>-->
<!--          <el-dropdown-item>-->
<!--            <span @click="setting = true">布局设置</span>-->
<!--          </el-dropdown-item>-->
<!--          <div style="padding-left: 18px;padding-top: 3px;font-size: 12px">-->
<!--            <size-select id="size-select" class="right-menu-item hover-effect" />-->
<!--          </div>-->
<!--          <el-dropdown-item divided>-->
<!--            <span @click="logout">退出登录</span>-->
<!--          </el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--      </el-dropdown>-->
<!--    </div>-->

    <div class="right-menu">
      <i class="fa fa-user"/>
      <span> {{name}}</span>
      <i class="fa fa-exchange fa-rotate-90"/>
      <span>
        <el-select v-model="roleValue" placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled">
          </el-option>
        </el-select>
      </span>
      <i class="fa fa-power-off" @click="logout"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'
import '@/assets/styles/element-variables.scss';
import SidebarItem from "./Sidebar/SidebarItem";
import variables from '@/assets/styles/variables.scss'
import Logo from "./Sidebar/Logo";

export default {
  data() {
    return {
      roleValue:"06",
      roleOptions:[{
        value: '01',
        label: '总行审查岗'
      }, {
        value: '02',
        label: '总行债券预警报表查询岗'
      }, {
        value: '03',
        label: '总行用户管理员'
      }, {
        value: '04',
        label: '总行检测审核岗'
      }, {
        value: '05',
        label: '总行全景指标查询岗'
      }],
    };
  },
  created() {
    console.log("--");
    console.log(this);
    let role = {value: '06',label: this.roles[0]};
    this.roleOptions = this.roleOptions.concat(role);
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
    SidebarItem,
    Logo
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'roles',
      'device',
      'permission_routes',
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      })
    }
  }
}
</script>
<!--span{-->
<!--color:rgb(6, 104, 179) !important;-->
<!--}-->
<style lang="scss" scoped>


  .navbar /deep/ .el-input.el-input--medium.el-input--suffix >input{
    border: 0px;
    background: none;
    color:#FFFFFF ;
    font-size: 14px;
  }

  .headline {
    width: 1px;
    border-right: 1px solid #8FCDEF;
    height: 58px;
    margin: 5px 10px 0 10px;
  }

  .lt {
    float: left;
  }


  .navbar {
    height: 68px;
    overflow: hidden;
    position: relative;
    background: -moz-linear-gradient(top, #00a0f1, #0075bd, #005d9f);
    background: -webkit-linear-gradient(top, #00a0f1, #0075bd, #005d9f);
    background: -o-linear-gradient(top, #00a0f1, #0075bd, #005d9f);
    background: -ms-linear-gradient(top, #00a0f1, #0075bd, #005d9f);
    background: linear-gradient(top, #00a0f1, #0075bd, #005d9f);
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      /*-webkit-tap-highlight-color:transparent;*/
      color: beige;

      &:hover {
        background: rgba(0, 0, 0, 0);
      }
    }

  /*background-color: #409EFF;*/

  .breadcrumb-container {
    float: left;
  }

  /* 水平样式 */
  .el-menu--horizontal>.menu-wrapper {
    float: left;
    background: -moz-linear-gradient(top,#00a0f1,#0075bd,#005d9f);
    background: -webkit-linear-gradient(top,#00a0f1,#0075bd,#005d9f);
    background: -o-linear-gradient(top,#00a0f1,#0075bd,#005d9f);
    background: -ms-linear-gradient(top,#00a0f1,#0075bd,#005d9f);
    background: linear-gradient(top,#00a0f1,#0075bd,#005d9f);
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 20px;
    margin-top: 10px;
    font-size: 14px;

    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      color: white;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -10px;
          top: 10px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
