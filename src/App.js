import React, { memo } from 'react'
import { withRouter, HashRouter, Redirect } from 'react-router-dom';
import { routes }  from '@/router';

import { isToken } from '@/utils'
import { renderRoutes } from 'react-router-config';

export default withRouter(memo(function App(props) {            //判断有无登录，没登录跳回登录页
  const haveToken = isToken();

  return (
    haveToken ? (
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
