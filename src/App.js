import React, { memo, Suspense } from 'react'
import { Provider } from 'react-redux';
import { HashRouter, Route, Redirect} from 'react-router-dom';
import { loginRoutes } from '@/router'
import { renderRoutes } from 'react-router-config';

import Main from "@/pages/main"
import store from './store';

export default memo(function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>page loading</div>}>
        <div id="app">
          <Provider store={store}>
            <Route path="/info1" render={ routeProps => <Main {...routeProps}/> }/>
            {renderRoutes(loginRoutes)}
            <Redirect to="/info1" from="/" />
          </Provider>
        </div>
      </Suspense>
    </HashRouter>
  )
})
