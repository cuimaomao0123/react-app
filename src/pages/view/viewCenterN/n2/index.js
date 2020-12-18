import React, { memo } from 'react'
import { ArrowDownOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { column1 } from '../tableData'
import { N2Wrapper } from './style'

export default memo(function N2() {
  const data = [
    {id: 1, state: true, time: '2020-12-16', loc: '某地', img: 'https://zmage.caldis.me/imgSet/childsDream/1.jpg'},
    {id: 2, state: true, time: '2020-12-16', loc: '某地', img: 'https://zmage.caldis.me/imgSet/childsDream/2.jpg'},
    {id: 3, state: true, time: '2020-12-16', loc: '某地', img: 'https://zmage.caldis.me/imgSet/childsDream/3.jpg'},
    {id: 4, state: true, time: '2020-12-16', loc: '某地', img: 'https://zmage.caldis.me/imgSet/childsDream/5.jpg'},
    {id: 5, state: true, time: '2020-12-15', loc: '某地', img: 'https://zmage.caldis.me/imgSet/childsDream/7.jpg'},
    {id: 6, state: true, time: '2020-12-15', loc: '某地', img: 'https://zmage.caldis.me/imgSet/childsDream/7.jpg'},
    {id: 7, state: true, time: '2020-12-15', loc: '某地', img: 'https://zmage.caldis.me/imgSet/childsDream/7.jpg'}
  ];  
  return (
    <N2Wrapper>
      <div className="title">最新异常快照</div>
      <div className="center">
        <Table  rowKey="id"
                dataSource={data} 
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
