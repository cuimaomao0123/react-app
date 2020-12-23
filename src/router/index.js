import React from 'react';
import { Redirect } from 'react-router-dom';

const Main = React.lazy(() => import("@/pages/main"));          //路由懒加载
const Login = React.lazy(() => import("@/pages/login"));
const PageNotFound = React.lazy(() => import("@/pages/notFound"));
const View = React.lazy(() => import("@/pages/view"));
const AbnormalImage = React.lazy(() => import("@/pages/abnormalImage"));
const PersonalInfo = React.lazy(() => import("@/pages/personalInfo"));
const AbnormalTracking = React.lazy(() => import("@/pages/abnormalTracking"));
const DeviceDetail = React.lazy(() => import("@/pages/deviceDetail"));

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
        path: "/home/personalInfo", 
        title: '人员信息',
        component: PersonalInfo
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
    icon: "SettingOutlined",
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
  }
]

