import React, { memo, useEffect, useState, useCallback, useReducer } from 'react'
import { Row, Col, Button, Select, Table, Modal, message, DatePicker, Input } from 'antd';
import { ReloadOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import Page from '@/components/pagination'
import { on, off } from '@/utils'
import { AbnormalImageWrapper } from './style'
import{ column1 } from './tableData'  
import { getList, getSelectList, deleteList } from '@/services/abnormalImage'
import reducer from './reducer'

const { Option } = Select;
const { RangePicker } = DatePicker;
export default memo(function AbnormalImage() {
  const [selection, setselection] = useState([]);
  const [y, sety] = useState(650);
  const [state, dispatch] = useReducer(reducer, {
    total: 0,
    pageNum: 1,
    size: 20,
    list: [],
    siteId: "",
    startTime: null,
    endTime: null,
    id: null,
    selectList: [],
    timer: null,
    loading: false
  });
  useEffect(() => {
    refresh(1, 20, '', null, null, null);
    selectList();
    sety(document.body.offsetHeight - 270);
    on(window, 'resize', dealTableHeight)
    return () => {
      off(window, 'resize', dealTableHeight)
    }
  },[])
  const refresh = async (pageNum, size, siteId, id, startTime, endTime) => {
    dispatch({type: 'change_loading', payload: true})
    const res = await getList({
      current: pageNum,
      size: size,
      siteId: siteId,
      id,
      startTime,
      endTime
    })
    if(res.code === 200){
      let list = [...res.data.records];
      list.forEach((item,index) => {
        item['index'] = index + 1;
      })
      dispatch({type: 'change_loading', payload: false})
      dispatch({type: 'change_total', payload: res.data.total})
      dispatch({type: 'change_list', payload: list})
    }
  }
  const selectList = async () => {
    const res = await getSelectList();
    if(res.code === 200){
      let select = [...res.data];
      select.unshift({
        id: 'title',
        value: '全部',
        key: null
      })
      dispatch({type: 'change_select_list', payload: select})
    }
  }
  const search = async (id) => {
    dispatch({type: 'change_page_num', payload: 1})
    refresh(1, state.size, id, state.startTime, state.id, state.startTime, state.endTime);
  }
  const paegChange = useCallback((page, pageSize) => {
    dispatch({type: 'change_page_num', payload: page})
    !(page === state.pageNum) && refresh(page, state.size, state.siteId, state.id, state.startTime, state.endTime);   //eslint-disable-next-line
  },[state])
  const paegSizeChange = useCallback((current, size) => {
    dispatch({type: 'change_page_size', payload: size})
    dispatch({type: 'change_page', payload: current})
    refresh(current, size, state.siteId, state.id, state.startTime, state.endTime);                             //eslint-disable-next-line
  },[state])
  const onSelectChange = (selectedRowKeys) => {
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
  const handleChange = (value) => {
    if(value === '全部'){
      refresh(1, 20, '', null, null, null);
    }else{
      const id = state.selectList.find(item => {
        return item.value === value;
      }).id;
      dispatch({type: 'change_site_id', payload: id})
      search(Number(id));
    }
  }
  const deleteById = () => {
    if(selection.length >0){
      Modal.confirm({
        title: '警告',
        icon: <ExclamationCircleOutlined />,
        content: '确认删除选内容吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: deleteOk
      })
    }else{
      message.warning('请选择删除项');
    }
  }
  const deleteOk = async() => {
    const res = await deleteList({
      ids: selection
    })
    if(res.code === 200){
      message.success('删除成功!');
      refresh(1, 20, "", null, null, null)
    }else{
      message.error(res.msg)
    }
  }
  const dateChange = (date) => {
    let startTime = null;
    let endTime = null;
    if(date){
      startTime = date[0].format("YYYY-MM-DD");
      endTime = date[1].format("YYYY-MM-DD");
    }
    dispatch({type: 'change_start_time', payload: startTime});
    dispatch({type: 'change_end_time', payload: endTime});
    refresh(state.pageNum, state.size, state.siteId, state.id, startTime, endTime);
  }
  const pictureIdSearch = (value) => {
    const id = Number(value.target.value);
    const timer = setTimeout(() => {
      dispatch({type: 'change_id', payload: id});
      refresh(state.pageNum, state.size, state.siteId, id, state.startTime, state.endTime);
    },600)
    if(state.timer){
      clearTimeout(state.timer)
      dispatch({type: 'change_timer', payload: timer});
    }else{
      dispatch({type: 'change_timer', payload: timer});
    }
  }
  return (
    <AbnormalImageWrapper>
      <Row justify="space-between" align="middle" style={{marginTop:'10px'}}>
        <Col>
          <Button icon={<ReloadOutlined/>} onClick={e => refresh(state.pageNum, state.size, state.siteId, state.id, state.startTime, state.endTime)}></Button>
        </Col>
        <Col>
          <Button type="primary" danger onClick={deleteById}>删除</Button>
          <RangePicker style={{marginLeft: '5px', width: '220px'}} onChange={dateChange}/>
          <Select placeholder="按地点查询..." style={{ marginLeft: '5px', width: '160px'}} onChange={handleChange}>
            {
              state.selectList.map(item => {
                return <Option key={item.id} value={item.value}>{item.value}</Option>;
              })
            }
          </Select>
          <Input placeholder="按图片编号查询..." style={{width: '170px', marginLeft: '5px'}} suffix={<SearchOutlined />} onChange={pictureIdSearch}/>
        </Col>
      </Row>
      <Row style={{marginTop: '10px'}}>
        <Table columns={column1} 
               dataSource={state.list} 
               bordered={true}
               rowSelection={rowSelection}
               loading={state.loading}
               pagination={false}
               scroll={{y: y}}
               rowKey="id"/>
      </Row>
      <Page {...{total: state.total, limitPage: state.pageNum, limitCount: state.size, onChange: paegChange, onShowSizeChange: paegSizeChange}}></Page>
    </AbnormalImageWrapper>
  )
})
