import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import { loginRoutes, routes } from '@/router'

import store from './store';
import { Provider } from 'react-redux';

import App from './App';
import PageNotFound from '@/pages/notFound'
import "@/assets/css/reset.css";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Suspense fallback={<div>page loading</div>}>
        <Provider store={store}>
          {
            loginRoutes.map(item => {
              return <Route key={item.path} {...item}/>
            })
          }
          {
            routes.map(item => {
              return <Route key={item.path} path={item.path} render={routeProps => <App {...routeProps}/>} />;
            })
          }
          <Route component={PageNotFound}/>
          <Redirect to="/info01" from="/" />
        </Provider>
      </Suspense>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
