import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import { loginRoutes, routes } from '@/router'

import store from './store';
import { Provider } from 'react-redux';

import App from './App';
import Global from '@/pages/global'
import PageNotFound from '@/pages/notFound'
import "@/assets/css/reset.css";

ReactDOM.render(
  <Provider store={store}>
    <Global></Global> 
    <HashRouter>
      <Suspense fallback={<div>page loading</div>}>
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
          <Redirect to="/home" from="/" />
          <Route component={PageNotFound}/>
        </Switch>
      </Suspense>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
