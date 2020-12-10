import React from 'react';
import { Redirect } from 'react-router-dom';

const Main = React.lazy(() => import("@/pages/main"));
const Login = React.lazy(() => import("@/pages/login"));
const PageNotFound = React.lazy(() => import("@/pages/notFound"));
const Test01 = React.lazy(() => import("@/pages/test01"));
const Test02 = React.lazy(() => import("@/pages/test02"));
const Test03 = React.lazy(() => import("@/pages/test03"));
const Test04 = React.lazy(() => import("@/pages/test04"));

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
    path: "/info01",
    component: Main,
    routes: [
      {
        path: "/info01",
        exact: true,
        render: () => (
          <Redirect to="/info01/test01"/>
        )
      },
      {
        path: "/info01/test01",
        component: Test01
      },
      {
        path: "/info01/test02",
        component: Test02
      }
    ]
  },
  {
    path: "/info02",
    component: Main,
    routes: [
      {
        path: "/info02",
        exact: true,
        render: () => (
          <Redirect to="/info02/test01"/>
        )
      },
      {
        path: "/info02/test01",
        component: Test03
      },
      {
        path: "/info02/test02",
        component: Test04
      }
    ]
  }
]

