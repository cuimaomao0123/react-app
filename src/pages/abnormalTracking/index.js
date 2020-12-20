import React, { memo, useReducer, useEffect, useCallback } from 'react'
import { Row, Col, Button, Input, Table, message } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import Page from '@/components/pagination'
import { on, off } from '@/utils'
import request from '@/network/request'
import reducer from './reducer'
import { column1 } from './tableData'
import { AbnormalTrackingWrapper } from './style'

export default memo(function AbnormalTracking() {
  const [state, dispatch] = useReducer(reducer, {
    current: 1,
    size: 50,
    data: [],
    total: 0,
    y: 650,
    loading: true,
    selection: []
  })
  useEffect(() => {    
    refresh(state.current, state.size);                                   
    dealTableHeight();           //计算表格高度
    on(window, 'resize', dealTableHeight);
    return () => {
      off(window, 'resize', dealTableHeight);
    }                                           //eslint-disable-next-line
  },[])     
  const refresh = (current, size) => {
    dispatch({type: 'add_selection', payload: []})
    !state.loading && dispatch({type: "change_loading", payload: true})
    request({
      url: '/user/select',
      method: 'get',
      params: {
        current: current,
        size: size
      }
    }).then(res => {
      const data = res.data ? res.data.records : []
      data.forEach((item,index) => {
        item['index'] = index + 1;
      })
      dispatch({type: "add_list", payload: data})
      dispatch({type: "change_total", payload: res.data ? res.data.total : 0})
      dispatch({type: "change_loading", payload: false})
    })
  }
  const paegChange = useCallback((page, pageSize) => {
    dispatch({type: 'change_page', payload: page})
    !(page === state.current) && refresh(page, state.size);   //eslint-disable-next-line
  },[state])
  const paegSizeChange = useCallback((current, size) => {
    dispatch({type: 'change_page_size', payload: size})
    dispatch({type: 'change_page', payload: current})
    refresh(state.current, size);                             //eslint-disable-next-line
  },[state])
  const onSelectChange = (selectedRowKeys) => {
    dispatch({type: 'add_selection', payload: selectedRowKeys})
  };
  const rowSelection = {
    selectedRowKeys: state.selection,
    columnWidth: '60px',
    onChange: onSelectChange,
  };
  const dealTableHeight = () => {
    dispatch({type: 'change_y', payload: document.body.offsetHeight - 270});
  }
  const setRowClass = (record, index) => {
    return record.flag && 'flag_class';
  }
  const deleteRow = () => {
    if(state.selection.length <=0){
      message.warning('请选择删除项');
    }else{
      request({
        url: '/user/deleteByIds',
        method: 'post',
        data: {
          ids: state.selection
        }
      }).then(res => {
        if(res.code === 200){
          refresh(state.current, state.size); 
          message.success('操作成功')
        }
      })
    }
  }
  const flag = (flag) => {
    if(state.selection.length <=0){
      message.warning('请选择标记项');
    }else{
      request({
        url: '/user/updateToFlag',
        method: 'post',
        data: {
          ids: state.selection,
          flag: flag
        }
      }).then(res => {
        if(res.code === 200){
          refresh(state.current, state.size); 
          message.success('操作成功')
        }
      })
    }
  }
  return (
    <AbnormalTrackingWrapper>
      <Row justify="space-between" align="middle">
        <Col>
          <Button icon={<ReloadOutlined/>} onClick={e => refresh(state.current, state.size)}></Button>
        </Col>
        <Col>
          <Button>新增</Button>
          <Button className="flag" onClick={e => flag(true)}>标记</Button>
          <Button className="delete_flag" onClick={e => flag(false)}>解除标记</Button>
          <Button className="delete" onClick={deleteRow}>删除</Button>
          <Input className="search" placeholder="搜索..." suffix={<SearchOutlined />}/>
        </Col>
      </Row>
      <Row style={{marginTop: '10px'}}>
        <Table columns={column1} 
               dataSource={state.data} 
               bordered={true}
               rowSelection={rowSelection}
               pagination={false}
               scroll={{y: state.y}}
               rowClassName={setRowClass}
               loading={state.loading}
               rowKey="id"/>
      </Row>
      <Page {...{total: state.total, limitPage: state.current, limitCount: state.size, onChange: paegChange, onShowSizeChange: paegSizeChange}}></Page>
    </AbnormalTrackingWrapper>
  )
})
