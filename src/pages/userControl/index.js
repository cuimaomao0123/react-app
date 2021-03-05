import React, { memo, useEffect, useReducer } from 'react';
import { Row, Col, Button, Table, message, Modal } from 'antd';
import { ReloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Page from '@/components/pagination'
import AddComponent from './addComponent'
import EditComponent from './editComponent'
import { UserControlWrapper } from './style'
import { getList, deleteSite, forbiddenUser } from '@/services/userControl'
import reducer from './reducer'
import { columns1 } from './tableData'

export default memo(function UserControl() {
  const [state, dispatch] = useReducer(reducer, {
    pageNum: 1,
    size: 10,
    total: 0,
    list: [],
    columns: [],
    selectionKey: [],
    loading: false,
    isShow: false,
    editShow: false,
    editObj: {}
  })
  useEffect(() => {
    dealColumn();
    refresh(1,10);                           //eslint-disable-next-line
  },[])
  const dealColumn = () => {
    const columns = [...columns1]
    columns.forEach(item => {
      if(item.key === 'forbidden'){
        item['render'] = (text, data) => {
          if(data['username'] === 'system'){
            return <span>启用中</span>
          }else{
            return <Button danger={text} type={text? 'primary':''} onClick={e => changeForbidden(text, data)}>{text ? '禁用中' : '启用中'}</Button>;
          }
        }
      }
      if(item.key === 'operate'){
        item['render'] = (text, data) => {
          if(data['username'] === 'system'){
            return <span>系统账户,不可修改</span>
          }else{
            return <a onClick={e => editAdmin(data)} style={{fontWeight: 'bold'}}>编辑</a>;
          }
        }
      }
    })
    dispatch({type: 'change_columns', payload: columns});
  }
  const changeForbidden = async(text, data) => {
    const res = await forbiddenUser({
      id: data.id,
      forbidden: !data.forbidden
    })
    if(res.code === 200){
      message.success(text ? '已启用': '已禁用');
      refresh(state.pageNum, state.size);
    }
  }
  const refresh = async(pageNum, size) => {
    dispatch({type: 'change_loading', payload: true});
    const res = await getList({
      pageNum: pageNum,
      size: size
    })
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
    if(state.selectionKey.find(item => Number(item) === 4) !== undefined){    //system账户不允许删除
      message.error('选项中包含system账户，禁止删除！');
      return;
    }else{
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
  }
  const setRowClass = (record, index) => {
    return record.username === 'system' && 'flag_class';
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
  const add = () => {
    dispatch({type: 'change_is_show', payload: true});
  }
  const close = (e) => {
    dispatch({type: 'change_is_show', payload: false});
    if(e){
      refresh(state.pageNum, state.size);
    }
  }
  const editClose = (e) => {
    dispatch({type: 'change_edit_show', payload: false});
    if(e){
      refresh(state.pageNum, state.size);
    }
  }
  const editAdmin = (data) => {
    dispatch({type: 'change_edit_show', payload: true});
    dispatch({type: 'change_edit_obj', payload: data});
  }
  
  return (
    <UserControlWrapper>
      <AddComponent isShow={state.isShow} close={close}/>
      <EditComponent isShow={state.editShow} close={editClose} editObj={state.editObj}/>
      <Row justify="space-between" align="middle" style={{marginTop: '15px'}}>
        <Col>
          <Button icon={<ReloadOutlined/>} onClick={e => refresh(state.pageNum, state.size)}></Button>
        </Col>
        <Col>
          <Button type="primary" style={{marginLeft: '5px'}} onClick={add}>新增</Button>
          <Button type="primary" danger style={{marginLeft: '5px'}} onClick={deleteWithId}>删除</Button>
        </Col>
      </Row>
      <Table className="table"
            columns={state.columns} 
            dataSource={state.list} 
            bordered={true}
            rowSelection={rowSelection}
            rowClassName={setRowClass}
            pagination={false}
            loading={state.loading}
            rowKey="id"/>
      <Page {...{total: state.total, limitPage: state.pageNum, limitCount: state.size, onChange: pageChange, onShowSizeChange: paegSizeChange}}></Page>
    </UserControlWrapper>
  )
})
