import React, { memo } from 'react'
import { withRouter, HashRouter, Redirect, Route } from 'react-router-dom';
import { routes }  from '@/router';

import PageNotFound from '@/pages/notFound'
import Main from '@/pages/main'
import { isToken } from '@/utils'


export default withRouter(memo(function App() {
  return (
    isToken() ? (
      <HashRouter>
        <div id="app">
          <Main>
            {
              routes.map(item => {
                return <Route key={item.path} {...item} />;
              })
            }
          </Main>
        </div>
      </HashRouter>
      ) 
    : 
    <Redirect to="/login"/>
  )
}))
