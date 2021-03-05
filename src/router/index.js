import React from 'react';
import { Redirect } from 'react-router-dom';

// const Main = React.lazy(() => import("@/pages/main"));          //路由懒加载
// const Login = React.lazy(() => import("@/pages/login"));
// const PageNotFound = React.lazy(() => import("@/pages/notFound"));
// const View = React.lazy(() => import("@/pages/view"));
// const AbnormalImage = React.lazy(() => import("@/pages/abnormalImage"));
// const SampleInfo = React.lazy(() => import("@/pages/sampleInfo"));
// const AbnormalTracking = React.lazy(() => import("@/pages/abnormalTracking"));
// const DeviceDetail = React.lazy(() => import("@/pages/deviceDetail"));
// const Monitoring = React.lazy(() => import("@/pages/monitoring"));

import Main from '@/pages/main'
import Login from '@/pages/login'
import PageNotFound from '@/pages/notFound'
import View from '@/pages/view'
import AbnormalImage from '@/pages/abnormalImage'
import SampleInfo from '@/pages/sampleInfo'
import AbnormalTracking from '@/pages/abnormalTracking'
import DeviceDetail from '@/pages/deviceDetail'
import Monitoring from '@/pages/monitoring'
import UserControl from '@/pages/userControl'
import ParamsControl from '@/pages/paramsControl'
import SitesControl from '@/pages/sitesControl'


export const loginRoutes = [        //不需要权限的路由
  {
    path: '/login',
    component: Login
  },
  {
    path: '/404',
    component: PageNotFound
  }
]

export const routes = [           //需要权限的路由(登录进入主页面之后的路由)
  {
    path: "/home",
    title: '首页管理',
    component: Main,
    icon: "HomeOutlined",
    routes: [
      {
        path: "/home",
        exact: true,
        render: () => (
          <Redirect to="/home/view"/>
        )
      },
      {
        path: "/home/view",
        title: '可视化管理',
        component: View
      },
      {
        path: "/home/sampleInfo", 
        title: '样本信息',
        component: SampleInfo
      },
      {
        render: () => (
          <Redirect to="/404" from="*"/>
        )
      }
    ]
  },
  {
    path: "/infoCollect",
    title: '信息汇总',
    component: Main,
    icon: "UsergroupAddOutlined",
    routes: [
      {
        path: "/infoCollect",
        exact: true,
        render: () => (
          <Redirect to="/infoCollect/abnormalImage"/>
        )
      },
      {
        path: "/infoCollect/abnormalImage",
        title: "异常图像",
        component: AbnormalImage
      },
      {
        path: "/infoCollect/abnormalTracking",
        title: "异常追踪",
        component: AbnormalTracking
      },
      {
        render: () => (
          <Redirect to="/404" from="*"/>
        )
      }
    ]
  },
  {
    path: "/device",
    title: '设备管理',
    component: Main,
    icon: "DesktopOutlined",
    routes: [
      {
        path: "/device",
        exact: true,
        render: () => (
          <Redirect to="/device/deviceDetail"/>
        )
      },
      {
        path: "/device/deviceDetail",
        title: "设备查询",
        component: DeviceDetail
      },
      {
        render: () => (
          <Redirect to="/404" from="*"/>
        )
      }
    ]
  },
  {
    path: "/monitoring",
    title: '实时监控',
    component: Main,
    icon: "PlaySquareOutlined",
    routes: [
      {
        path: "/monitoring",
        exact: true,
        render: () => (
          <Redirect to="/monitoring/monitoring"/>
        )
      },
      {
        path: "/monitoring/monitoring",
        title: "视频输出",
        component: Monitoring
      },
      {
        render: () => (
          <Redirect to="/404" from="*"/>
        )
      }
    ]
  },
  {
    path: "/systemControl",
    title: '系统管理',
    component: Main,
    icon: "SettingOutlined",
    routes: [
      {
        path: "/systemControl",
        exact: true,
        render: () => (
          <Redirect to="/systemControl/userControl"/>
        )
      },
      {
        path: "/systemControl/userControl",
        title: "用户管理",
        component: UserControl
      },
      {
        path: "/systemControl/paramsControl",
        title: "参数管理",
        component: ParamsControl
      },
      {
        path: "/systemControl/sitesControl",
        title: "地点管理",
        component: SitesControl
      },
      {
        render: () => (
          <Redirect to="/404" from="*"/>
        )
      }
    ]
  }
]

