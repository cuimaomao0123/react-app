import React, { memo } from 'react'
import { withRouter, HashRouter, Redirect, Route } from 'react-router-dom';
import { routes }  from '@/router';

import { isToken } from '@/utils'
import { renderRoutes } from 'react-router-config';

export default withRouter(memo(function App(props) {
  return (
    isToken() ? (
      <HashRouter>
        <div id="app">
          { renderRoutes(routes) }
        </div>
      </HashRouter>
      ) 
    : 
    <Redirect to="/login"/>
  )
}))
