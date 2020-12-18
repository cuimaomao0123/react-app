import React, { memo, useEffect, useState, useCallback, useReducer } from 'react'
import { Row, Col, Button, Input, Table } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Page from '@/components/pagination'
import { on, off } from '@/utils'
import { PersonalInfoWrapper } from './style'
import{ column1, tableData } from './tableData'  
import reducer from './reducer'

export default memo(function PersonalInfo() {

  const [data, setdata] = useState(tableData);
  const [selection, setselection] = useState([]);
  const [y, sety] = useState(650);
  const [state, dispatch] = useReducer(reducer, {
    total: 30,
    limitPage: 1,
    limitCount: 10
  });
  useEffect(() => {
    const data = [...tableData];
    data.forEach((item,index) => {
      item['index'] = index + 1;
    })
    setdata(data)
    sety(document.body.offsetHeight - 270);
    on(window, 'resize', dealTableHeight)
    return () => {
      off(window, 'resize', dealTableHeight)
    }
  },[])
  const paegChange = useCallback((page, pageSize) => {
    dispatch({type: 'change_page', payload: page})
  })
  const paegSizeChange = useCallback((current, size) => {
    dispatch({type: 'change_page_size', payload: size})
  })
  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselection(selectedRowKeys);
  };
  const rowSelection = {
    selection,
    columnWidth: '60px',
    onChange: onSelectChange,
  };
  const dealTableHeight = () => {
    sety(document.body.offsetHeight - 270);
  }
  return (
    <PersonalInfoWrapper>
      <Row justify="space-between" align="middle">
        <Col>
          <Button icon={<ReloadOutlined/>}></Button>
        </Col>
        <Col>
          <Button>删除</Button>
          <Input className="search" placeholder="搜索..." suffix={<SearchOutlined />}/>
        </Col>
      </Row>
      <Row style={{marginTop: '10px'}}>
        <Table columns={column1} 
               dataSource={data} 
               bordered={true}
               rowSelection={rowSelection}
               pagination={false}
               scroll={{y: y}}
               rowKey="id"/>
      </Row>
      <Page {...{total: state.total, limitPage: state.limitPage, limitCount: state.limitCount, onChange: paegChange, onShowSizeChange: paegSizeChange}}></Page>
    </PersonalInfoWrapper>
  )
})
