import React, { memo, Suspense } from 'react'
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Login from "@/pages/login"
import Main from "@/pages/main"
import store from './store';

export default memo(function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>page loading</div>}>
        <div id="app">
          <Provider store={store}>
            <Login/>
          </Provider>
        </div>
      </Suspense>
    </HashRouter>
  )
})
