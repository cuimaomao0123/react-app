import React, { memo, useEffect, useReducer } from 'react';
import { Row, Col, Button, Table, message, Modal } from 'antd';
import { ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Page from '@/components/pagination'
import AddComponent from './addComponent'
import EditComponent from './editComponent'
import reducer from './reducer'
import { SitesControlWrapper } from './style'
import { getList, deleteSite } from '@/services/sitesControl'
import { columns1 } from './tableData'

export default memo(function SitesControl() {
  const [state, dispatch] = useReducer(reducer, {
    pageNum: 1,
    size: 10,
    total: 0,
    list: [],
    columns: [],
    selectionKey: [],
    loading: false,
    isShow: false,
    editObj: {},
    isAddShow: false
  })
  useEffect(() => {
    dealColumns();
    refresh(1,10);                           //eslint-disable-next-line
  },[])
  const dealColumns = () => {
    const columns = [...columns1]
    columns.forEach(item => {
      if(item.key === 'operate'){
        item['render'] = (text, data) => {
          return <a onClick={e => editAdmin(data)} style={{fontWeight: 'bold'}}>编辑</a>;
        }
      }
    })
    dispatch({type: 'change_columns', payload: columns});
  }
  const editAdmin = (data) => {
    dispatch({type: 'change_is_show', payload: true});
    dispatch({type: 'change_edit_obj', payload: data});
  }
  const refresh = async(pageNum, size) => {
    dispatch({type: 'change_loading', payload: true});
    const res = await getList({
      pageNum: pageNum,
      size: size
    })
    if(res.code === 200){
      dispatch({type: 'change_total', payload: res.data.total})
      const list = res.data;
      list.forEach((item, index) => {
        item['index'] = index + 1;
      })
      dispatch({type: 'change_list', payload: list});
      dispatch({type: 'change_loading', payload: false});
    }
  }
  const deleteWithId = () => {
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
    const res = await deleteSite({
      ids: state.selectionKey
    })
    if(res.code === 200){
      refresh(state.pageNum, state.size); 
      message.success('删除成功')
    }else{
      message.error(res.msg)
    }
  }
  const onSelectChange = (selectedRowKeys) => {
    dispatch({type: 'change_selection_key', payload: selectedRowKeys})
  }
  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    columnWidth: '60px',
    onChange: onSelectChange,
  };
  const pageChange = (page, pageSize) => {
    !(page === state.pageNum) && refresh(page, pageSize);
    dispatch({type: 'change_page_num', payload: page})
  }
  const paegSizeChange = (current, size) =>{
    dispatch({type: 'change_size', payload: size})
    refresh(current, size);
  }
  const close = (e) => {
    dispatch({type: 'change_is_show', payload: false});
    if(e){
      refresh(state.pageNum, state.size);
    }
  }
  const addClose = (e) => {
    dispatch({type: 'change_is_add_show', payload: false});
    if(e){
      refresh(state.pageNum, state.size);
    }
  }
  const addSite = () => {
    dispatch({type: 'change_is_add_show', payload: true});
  }
  return (
    <SitesControlWrapper>
      <AddComponent isShow={state.isAddShow} close={addClose}/>
      <EditComponent isShow={state.isShow} close={close} editObj={state.editObj}/>
      <Row justify="space-between" align="middle" style={{marginTop: '15px'}}>
        <Col>
          <Button icon={<ReloadOutlined/>} onClick={e => refresh(state.pageNum, state.size)}></Button>
        </Col>
        <Col>
          <Button type="primary" onClick={addSite}>新增</Button>
          <Button type="primary" danger style={{marginLeft: '5px'}} onClick={deleteWithId}>删除</Button>
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
    </SitesControlWrapper>
  )
})
