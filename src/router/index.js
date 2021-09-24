import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    // 设置该路由进入的权限，支持多个权限叠加
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

// 公共路由
export const constantRoutes = [
  // 单点登录退出
  {
    path: '/sso/loginOut',
    component: ()=>import('@/views/ssologinOut'),
    hidden: true,
  },
  // 单点登录
  {
    path: '/sso/login',
    component: ()=>import('@/views/ssologin'),
    hidden: true,
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: '工作台',
        meta: { title: '工作台', icon: 'gztImg', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'type/data/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', icon: '' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'operation/detail/:applicationId/:jobId',
        component: () => import('@/views/operation/detail'),
        name: 'Detail',
        meta: { title: '作业详情', icon: '' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'operation/log/:applicationId/:taskmanagerId',
        component: () => import('@/views/operation/log'),
        name: 'log',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 预警任务路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'workBenchDetail/warningTasks',
        component: () => import('@/views/workBenchDetail/warningTasks'),
        name: 'warningTasks',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 预警认定路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'workBenchDetail/taskInfo',
        component: () => import('@/views/workBenchDetail/taskInfo'),
        name: 'taskInfo',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 处理跟踪路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'workBenchDetail/disposalTrack',
        component: () => import('@/views/workBenchDetail/disposalTrack'),
        name: 'disposalTrack',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 预警解除路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'workBenchDetail/removeRisk',
        component: () => import('@/views/workBenchDetail/removeRisk'),
        name: 'removeRisk',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 人工信号录入 路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'workBenchDetail/signalManual',
        component: () => import('@/views/workBenchDetail/signalManual'),
        name: 'signalManual',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 客户名单 路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'workBenchDetail/manageFlow',
        component: () => import('@/views/workBenchDetail/manageFlow'),
        name: 'manageFlow',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 改派任务 路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'workBenchDetail/reassignTask',
        component: () => import('@/views/workBenchDetail/reassignTask'),
        name: 'reassignTask',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 全景视图 路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'panoramicView',
        component: () => import('@/views/panoramicView'),
        name: 'panoramicView',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 效能分析 路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'efficiencyAnalysis',
        component: () => import('@/views/efficiencyAnalysis'),
        name: 'efficiencyAnalysis',
        meta: { title: 'log', icon: '' }
      }
    ]
  },
  // 作业详情路由
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'operation/vertices/:applicationId/:jobId/:verticesId',
        component: () => import('@/views/operation/detail/vertices'),
        name: 'vertices',
        meta: { title: '作业详情', icon: '' }
      }
    ]
  },
  {
    path: '/gen',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'edit',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置' }
      }
    ]
  }
]

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
