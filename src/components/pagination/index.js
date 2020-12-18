import React, { memo } from 'react'
import { Row, Col, Pagination } from 'antd';
import { PageWrapper } from './style'

export default memo(function Page(props) {
  const { total, limitPage, limitCount } = props;

  return (
    <PageWrapper>
      <Row justify="space-between" style={{padding: '10px 10px 0 10px'}}>
        <Col>
          <p>显示第 {total === 0 ? 0 : (limitPage - 1) * limitCount + 1} 到第 {limitCount * limitPage < total ? limitCount * limitPage : total} 条记录，总共 {total} 条记录</p>
        </Col>
        <Col>
          <Pagination current={limitPage} 
                      pageSize={limitCount}
                      onChange={props.onChange}
                      onShowSizeChange={props.onShowSizeChange}
                      showSizeChanger
                      showQuickJumper
                      pageSizeOptions={[10,50,100]}
                      total={total} />
        </Col>
      </Row>
    </PageWrapper>
  )
})
