import React from 'react';
import { Redirect, Route } from "react-router-dom";

const Login = React.lazy(() => import("@/pages/login"));
const PageNotFound = React.lazy(() => import("@/pages/notFound"));
const Test01 = React.lazy(() => import("@/pages/test01"));
const Test02 = React.lazy(() => import("@/pages/test02"));
const Test03 = React.lazy(() => import("@/pages/test03"));
const Test04 = React.lazy(() => import("@/pages/test04"));



export const loginRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/404',
    component: PageNotFound
  },
  {
    render: () => (
      <Route component={PageNotFound}/>
    )
  }
]
export const routes = [
  {
    path: "/info1",
    exact: true,
    render: () => (
      <Redirect to="/info1/test01"/>
    )
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

