import React, { memo, useEffect, useState, useCallback, useReducer } from 'react'
import { Row, Col, Button, Input, Checkbox } from 'antd';
import { ReloadOutlined, SearchOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { on, off } from '@/utils'
import { PersonalInfoWrapper } from './style'
import{ column1, tableData } from './tableData'  
import reducer from './reducer'
import VirtualTable from './components/virtualTable'
import Page from '@/components/pagination'
export default memo(function PersonalInfo() {

  const [data, setdata] = useState(tableData);
  const [column, setcolumn] = useState(column1);
  const [y, sety] = useState(650);
  const [state, dispatch] = useReducer(reducer, {
    total: 30,
    limitPage: 1,
    limitCount: 10,
    indeterminate: false,
    isSelectAll: false
  });
  useEffect(() => {
    sety(document.body.offsetHeight - 270);
    on(window, 'resize', dealTableHeight)
    return () => {
      off(window, 'resize', dealTableHeight)
    }   
  },[])
  useEffect(() => {
    const column = [...column1]
    const data = [...tableData];
    data.forEach((item,index) => {
      item['index'] = index + 1;
      item['selection'] = false;
    })
    column.forEach(item => {
      if(item.dataIndex === 'selection'){                       
        item['title'] = () => <Checkbox onClick={selectAll} checked={state.isSelectAll} indeterminate={state.indeterminate}/>     
      }
    })
    setcolumn(column);
    setdata(data);                                  //eslint-disable-next-line
  },[state])                                                           
  const selectAll = useCallback(() => {
    const data = [...tableData];
    if(data.every(item => item.isSelect === true)){                       //全部选中，取消
      dispatch({type: 'change_is_select_all', payload: false})    
      data.forEach(item => item.isSelect = false);
    }else if(data.some(item => item.isSelect === true)){                  //部分选中，全选
      dispatch({type: 'change_is_select_all', payload: true})
      data.forEach(item => item.isSelect = true);
    }else{                                                                //都没选中，全选
      dispatch({type: 'change_is_select_all', payload: true})
      data.forEach(item => item.isSelect = true);
    }
    dispatch({type: 'change_indeterminate', payload: false})
    setdata(data);
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
        item.isSelect = !item.isSelect;
        return;
      }
    })
    if(tableData.every(item => item.isSelect === true)){              //所有都被选中
      dispatch({type: 'change_indeterminate', payload: false})
      dispatch({type: 'change_is_select_all', payload: true})
      return;
    }else if(tableData.find(item => item.isSelect === true)){         //部分被选中
      dispatch({type: 'change_indeterminate', payload: true})
      dispatch({type: 'change_is_select_all', payload: false})
      return;
    }else{                                                            //都没有选中
      dispatch({type: 'change_indeterminate', payload: false})
      dispatch({type: 'change_is_select_all', payload: false})
    }
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
          <Button icon={<VerticalAlignBottomOutlined style={{fontSize: '16px'}}/>}>下载表格数据</Button>
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
