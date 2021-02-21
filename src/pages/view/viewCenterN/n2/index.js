import React, { memo } from 'react'
import { ArrowDownOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { column1 } from './tableData'
import { N2Wrapper } from './style'

export default memo(function N2(props) {
  const { list } = props; 
  return (
    <N2Wrapper>
      <div className="title">
        <p>最新异常快照</p>
        <p>*显示最新十条数据</p>
        </div>
      <div className="center">
        <Table  rowKey="id"
                dataSource={list} 
                columns={column1} 
                pagination={false}
                size="small"
                scroll={{y: 175}}
        />
        <div className="bottom">
          <p style={{textDecoration: 'underline'}}><ArrowDownOutlined style={{fontSize: '15px', marginRight: '5px'}}/>向下滚动查看更多内容</p>
          <p>异常快照实时更新</p>
        </div>
      </div>
    </N2Wrapper>
  )
})
