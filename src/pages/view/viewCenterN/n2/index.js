import React, { memo } from 'react'
import { ArrowDownOutlined } from '@ant-design/icons';
import Zmage from 'react-zmage'        //第三方预览图片组件
import { Table } from 'antd';
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
  const column = [
    { title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      textWrap: 'word-break',
      ellipsis: true,
      render: () =>  <i className="iconfont icon-tubiaoshangshengqushi"></i> 
    },
    { title: '时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      textWrap: 'word-break',
      ellipsis: true
    },
    { title: '地点',
      dataIndex: 'loc',
      key: 'loc',
      align: 'center',
      textWrap: 'word-break',
      ellipsis: true
    },
    { title: '图像',
      dataIndex: 'img',
      key: 'img',
      align: 'center',
      textWrap: 'word-break',
      ellipsis: true,
      render: (img) => 
        <Zmage className="zmage" 
               src={img} 
               alt="加载中..."
               controller={{zoom: false, rotate: false, flip: false, pagination: false, close: false}}
        />
    }
  ]
  return (
    <N2Wrapper>
      <div className="title">最新异常快照</div>
      <div className="center">
        <Table  rowKey="id"
                dataSource={data} 
                columns={column} 
                pagination={false}
                size="small"
                scroll={{y: 175}}
        />
        <div className="bottom">
          <p style={{textDecoration: 'underline'}}><ArrowDownOutlined style={{fontSize: '15px', marginRight: '5px'}}/>向下滚动查看更多内容</p>
          <p>异常推送数据实时更新</p>
        </div>
      </div>
    </N2Wrapper>
  )
})
