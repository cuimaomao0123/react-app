import React, { memo, useReducer, useEffect, useCallback } from 'react'
import { Row, Col, Button, Input, Table, message, Modal } from 'antd';
import AddComponent from './addComponent'
import { ReloadOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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
    name: "",
    data: [],
    total: 0,
    y: 650,
    loading: true,
    selection: [],
    isShow: false,
    timer: null
  })
  useEffect(() => {    
    refresh(state.current, state.size, state.name);                                   
    dealTableHeight();           //计算表格高度
    on(window, 'resize', dealTableHeight);
    return () => {
      off(window, 'resize', dealTableHeight);
    }                                           //eslint-disable-next-line
  },[])     
  const refresh = (current, size, name) => {
    dispatch({type: 'add_selection', payload: []})
    !state.loading && dispatch({type: "change_loading", payload: true})
    request({
      url: '/user/select',
      method: 'get',
      params: {
        current: current,
        size: size,
        name: name
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
  const pageChange = useCallback((page, pageSize) => {
    dispatch({type: 'change_page', payload: page})
    !(page === state.current) && refresh(page, state.size, state.name);   //eslint-disable-next-line
  },[state])
  const paegSizeChange = useCallback((current, size) => {
    dispatch({type: 'change_page_size', payload: size})
    dispatch({type: 'change_page', payload: current})
    refresh(state.current, size, state.name);                             //eslint-disable-next-line
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
      Modal.confirm({
        title: '警告',
        icon: <ExclamationCircleOutlined />,
        content: '确认删除选内容吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: deleteOk
      })
    }
  }
  const deleteOk = () => {
    request({
      url: '/user/deleteByIds',
      method: 'post',
      data: {
        ids: state.selection
      }
    }).then(res => {
      if(res.code === 200){
        refresh(state.current, state.size, state.name); 
        message.success('操作成功')
      }
    })
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
          refresh(state.current, state.size, state.name); 
          message.success('操作成功')
        }
      })
    }
  }
  const add = () => {
    dispatch({type: 'change_is_show', payload: true});
  }
  const close = (e) => {
    if(e){      //说明添加成功
      refresh(state.current, state.size, state.name);
    }
    dispatch({type: 'change_is_show', payload: false});
  }
  const search = (value) => {           //包含防抖
    const timer = setTimeout(() => {
      dispatch({type: 'change_name', payload: value.target.value});
      refresh(state.current, state.size, value.target.value);
    },600)
    if(state.timer){
      clearTimeout(state.timer)
      dispatch({type: 'change_timer', payload: timer});
    }else{
      dispatch({type: 'change_timer', payload: timer});
    }
  }
  return (
    <AbnormalTrackingWrapper>
      <AddComponent isShow={state.isShow} close={close}/>
      <Row justify="space-between" align="middle" style={{marginTop: '15px'}}>
        <Col>
          <Button icon={<ReloadOutlined/>} onClick={e => refresh(state.current, state.size, state.name)}></Button>
        </Col>
        <Col>
          <Button onClick={e => add()}>新增</Button>
          <Button className="flag" onClick={e => flag(true)}>标记</Button>
          <Button className="delete_flag" onClick={e => flag(false)}>解除标记</Button>
          <Button className="delete" onClick={deleteRow}>删除</Button>
          <Input className="search" placeholder="(姓名)搜索..." suffix={<SearchOutlined />} onChange={search}/>
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
      <Page {...{total: state.total, limitPage: state.current, limitCount: state.size, onChange: pageChange, onShowSizeChange: paegSizeChange}}></Page>
    </AbnormalTrackingWrapper>
  )
})
