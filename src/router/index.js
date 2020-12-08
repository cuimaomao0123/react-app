import React from 'react';
import { Redirect } from "react-router-dom";

const Login = React.lazy(() => import("@/pages/login"));
const Test01 = React.lazy(() => import("@/pages/test01"));
const Test02 = React.lazy(() => import("@/pages/test02"));
const Test03 = React.lazy(() => import("@/pages/test03"));
const Test04 = React.lazy(() => import("@/pages/test04"));

const routes = [

  // {
  //   path: "/",
  //   exact: true,
  //   render: () => (
  //     <Redirect to="/info1/test01"/>
  //   )
  // },
  {
    path: '/login',
    component: Login
  },
  {
    path: ''
  },
  {
    path: "/info1/test01",
    component: Test01,
  },
  {
    path: "/info1/test02",
    component: Test02,
  },
  {
    path: "/info2/test01",
    component: Test03,
  },
  {
    path: "/info2/test02",
    component: Test04,
  }
]
export default routes;
