import React, { memo, useEffect, useState, useCallback, useReducer } from 'react'
import { Row, Col, Button, Input, Checkbox } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { on, off } from '@/utils'
import { PersonalInfoWrapper } from './style'
import{ column1, tableData } from './tableData'  
import reducer from './reducer'
import VirtualTable from '@/components/virtualTable'
import Page from '@/components/pagination'
export default memo(function PersonalInfo() {

  const [data, setdata] = useState(tableData);
  const [column, setcolumn] = useState(column1)
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
      item['selection'] = false;
    })
    const column = [...column1]
    column.forEach(item => {
      if(item.dataIndex === 'selection'){
        item['title'] = () => <Checkbox />
      }
    })
    setcolumn(column);
    setdata(data);
    sety(document.body.offsetHeight - 270);
    on(window, 'resize', dealTableHeight)
    return () => {
      off(window, 'resize', dealTableHeight)
    }
  },[])
  const paegChange = useCallback((page, pageSize) => {
    dispatch({type: 'change_page', payload: page})
  },[])
  const paegSizeChange = useCallback((current, size) => {
    dispatch({type: 'change_page_size', payload: size})
  },[])
  const onSelectChange = (rowData) => {
    const tableData = [...data];
    tableData.forEach(item => {
      if(item.id === rowData.id){
        item.selection = !item.selection;
        return;
       }
    })
    setdata(tableData)
    // console.log('selectedRowKeys changed: ', rowData);
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
      <VirtualTable dataSource={data}
                    columns={column} 
                    bordered={true}
                    scroll={{y: y, x:'100vw'}}
                    tableClassName="table"
                    onSelectChange={onSelectChange}
      />
      <Page {...{total: state.total, limitPage: state.limitPage, limitCount: state.limitCount, onChange: paegChange, onShowSizeChange: paegSizeChange}}></Page>
    </PersonalInfoWrapper>
  )
})
