import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import { loginRoutes, routes } from '@/router'

import store from './store';
import { Provider } from 'react-redux';

import { ConfigProvider } from 'antd';          //antd提供的国际化语言包
import zhCN from 'antd/lib/locale/zh_CN';       //antd提供的国际化语言包
import App from './App';
import Global from '@/pages/global'
import PageNotFound from '@/pages/notFound'
import "@/assets/css/reset.css";
import "@/assets/fonts/iconfont/iconfont.css"

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
    <Global></Global> 
    <HashRouter>
      <Suspense fallback={<></>}>                     {/*页面还在请求中，什么也不显示其实效果更好(首屏空白) */}
        <Switch>                                      {/*Switch层级放错，不起效果，要尽量保证最内层，才会只匹配一个路由！！！ */}
          {
            loginRoutes.map(item => {
              return <Route key={item.path} {...item}/>
            })
          }
          {
            routes.map(item => {
              return <Route key={item.path} path={item.path} render={routeProps => <App {...routeProps}/>} />
            })
          }
          <Redirect to="/home" from="/" exact/>
          <Route component={PageNotFound}/>
        </Switch>
      </Suspense>
    </HashRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
