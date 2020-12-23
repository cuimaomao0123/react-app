import React, { memo } from 'react'
import { PageNotFoundWrapper } from './style'
import page404 from '@/assets/img/error-page/error-404.svg'
export default memo(function PageNotFound() {
  return (
    <PageNotFoundWrapper>
      <img src={page404}  className="img" alt="404"/>
      <div className="attention">
        <span className="title">404</span>
        <span className="tip">oh，no~~您的页面好像飞走了~</span>
      </div>
    </PageNotFoundWrapper>
  )
})
