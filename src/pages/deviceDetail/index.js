import React, { memo, useEffect, useReducer } from 'react';
import { ReloadOutlined, SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Row, Col, Button, Input, Table, message, Modal } from 'antd';
import Page from '@/components/pagination'
import { getList, deleteById, search } from '@/services/deviceDetail'
import reducer from './reducer'
import { columns1 } from './tableData'
import { DeviceDetailWrapper } from './style'
export default memo(function DeviceDetail() {
  const [state, dispatch] = useReducer(reducer, {
    pageNum: 1,
    size: 10,
    total: 0,
    list: [],
    columns: columns1,
    selectionKey: [],
    loading: true,
    timer: null
  })
  useEffect(() => {
    refresh(1,10);                           //eslint-disable-next-line
  },[])
  const refresh = async (pageNum, size) => {
    dispatch({type: 'change_loading', payload: true});
    const res = await getList({
      pageNum: pageNum,
      size: size
    });
    if(res.code === 200){
      dispatch({type: 'change_total', payload: res.data.total})
      const list = res.data.records;
      list.forEach((item, index) => {
        item['index'] = index + 1;
      })
      dispatch({type: 'change_list', payload: list});
      dispatch({type: 'change_loading', payload: false});
    }
  }
  const pageChange = (page, pageSize) => {
    !(page === state.pageNum) && refresh(page, pageSize);
    dispatch({type: 'change_page_num', payload: page})
  }
  const paegSizeChange = (current, size) =>{
    dispatch({type: 'change_size', payload: size})
    refresh(current, size);
  }
  const onSelectChange = (selectedRowKeys) => {
    dispatch({type: 'change_selection_key', payload: selectedRowKeys})
  }
  const deleteWithId = async () => {
    if(state.selectionKey.length <= 0){
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
  const deleteOk = async() => {
    const res = await deleteById({
      ids: state.selectionKey
    })
    if(res.code === 200){
      refresh(state.pageNum, state.size); 
      message.success('删除成功')
    }
  }
  const searchName = async (e) => {
    const res = await search({
      name: e.target.value
    });
    dispatch({type: 'change_list', payload: res.data});
  }
  const searchInput = (e) => {
    const timer = setTimeout(() => {
      searchName(e)
    },600)
    if(state.timer){
      clearTimeout(state.timer)
      dispatch({type: 'change_timer', payload: timer})
    }else{
      dispatch({type: 'change_timer', payload: timer})
    }
  }
  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    columnWidth: '60px',
    onChange: onSelectChange,
  };
  return (
    <DeviceDetailWrapper>
      <Row justify="space-between" align="middle" style={{marginTop: '15px'}}>
        <Col>
          <Button icon={<ReloadOutlined/>} onClick={e => refresh(state.pageNum, state.size)}></Button>
        </Col>
        <Col>
          <Button style={{marginLeft: '5px'}} onClick={deleteWithId}>删除</Button>
          <Input style={{width: '170px', marginLeft: '5px'}} placeholder="(设备名)搜索..." onChange={searchInput} suffix={<SearchOutlined />}/>
        </Col>
      </Row>
      <Table className="table"
            columns={state.columns} 
            dataSource={state.list} 
            bordered={true}
            rowSelection={rowSelection}
            pagination={false}
            loading={state.loading}
            rowKey="id"/>
      <Page {...{total: state.total, limitPage: state.pageNum, limitCount: state.size, onChange: pageChange, onShowSizeChange: paegSizeChange}}></Page>
    </DeviceDetailWrapper>
  )
})
