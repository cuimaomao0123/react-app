import React, { memo, useEffect, useState, useCallback, useReducer } from 'react'
import { Row, Col, Button, Checkbox, message, Modal } from 'antd';
import { ReloadOutlined, VerticalAlignBottomOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import VirtualTable from './components/virtualTable'
import { getList, deleteSample } from '@/services/sampleInfo'
import { on, off } from '@/utils'
import { BASE_URL } from '@/network/config'
import { SampleInfoWrapper } from './style'
import{ column1 } from './tableData'  
import reducer from './reducer'

export default memo(function SampleInfo() {

  const [list, setlist] = useState([]);
  const [column, setcolumn] = useState(column1);
  const [y, sety] = useState(650);
  const [state, dispatch] = useReducer(reducer, {
    indeterminate: false,
    isSelectAll: false,
    size: 1000,
    current: 1,
    siteId: "",
    selectedArray: []
  });
  useEffect(() => {
    sety(document.body.offsetHeight - 270);
    on(window, 'resize', dealTableHeight)
    refresh(state.current, state.size, state.siteId);
    return () => {
      off(window, 'resize', dealTableHeight)
    }               //eslint-disable-next-line
  },[])
  useEffect(() => {
    const column = [...column1]
    column.forEach(item => {
      if(item.dataIndex === 'selection'){                       
        item['title'] = () => <Checkbox onClick={selectAll} checked={state.isSelectAll} indeterminate={state.indeterminate}/>     
      }
    })
    setcolumn(column);  //eslint-disable-next-line
  },[list, state])    

  const refresh = async(current, size, siteId) => {
    const res = await getList({
      current,
      size,
      siteId
    });
    if(res.code === 200){
      const list = dealList(res.data.records);
      dispatch({type: 'change_is_select_all', payload: false})
      dispatch({type: 'change_indeterminate', payload: false})
      setlist(list);                                  
    }
  }
  const dealList = (array) => {
    const data = [...array];
    data.forEach((item,index) => {
      item['index'] = index + 1;
      item['selection'] = false;
      item['isSelect'] = false;
    })
    return data;
  }                                                      
  const selectAll = useCallback(() => {
    const data = [...list];
    if(data.every(item => item.isSelect === true)){                       //全部选中，取消
      dispatch({type: 'change_is_select_all', payload: false})    
      data.forEach(item => item.isSelect = false);
      dispatch({type: 'change_selected_array', payload: []})
    }else if(data.some(item => item.isSelect === true)){                  //部分选中，全选
      dispatch({type: 'change_is_select_all', payload: true})
      let selectedArray = [];
      data.forEach(item => {
        item.isSelect = true;
        selectedArray.push(item.id)
      })
      dispatch({type: 'change_selected_array', payload: selectedArray})
    }else{                                                                //都没选中，全选
      dispatch({type: 'change_is_select_all', payload: true})
      let selectedArray = [];
      data.forEach(item => {
        item.isSelect = true;
        selectedArray.push(item.id)
      })
      dispatch({type: 'change_selected_array', payload: selectedArray})
    }
    dispatch({type: 'change_indeterminate', payload: false})
    setlist(data);
    
  },[list])
  const onSelectChange = (rowData) => {
    dealSelect(rowData.id);
    const tableData = [...list];
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
    setlist(tableData)
  };
  const dealSelect = (id) => {
    const selectedArray = [...state.selectedArray];
    const index = selectedArray.findIndex(item => {
      return item === id;
    })
    if(index === -1){        //没找到则添加
      selectedArray.push(id)
      dispatch({type: 'change_selected_array', payload: selectedArray})
    }else{
      selectedArray.splice(index, 1)
      dispatch({type: 'change_selected_array', payload: selectedArray})
    }
  }
  const dealTableHeight = () => {
    sety(document.body.offsetHeight - 270);
  }
  const downLoad = () => {
    window.location.href = `${BASE_URL}sample/export`;
  }
  const iconRefresh = () => {
    refresh(state.current, state.size, state.siteId);
  }
  const deleteSampleInfo = () => {
    if(state.selectedArray.length <=0){
      message.warning('请选择删除项')
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
    const res = await deleteSample({
      ids: state.selectedArray
    });
    if(res.code === 200){
      message.success('删除成功')
      refresh(state.current, state.size, state.siteId);
    }else{
      message.error(res.msg)
    }
  }

  return (
    <SampleInfoWrapper>
      <Row justify="space-between" align="middle">
        <Col>
          <Button onClick={iconRefresh} icon={<ReloadOutlined/>}></Button>
        </Col>
        <Col>
          <Button type="primary" onClick={downLoad} icon={<VerticalAlignBottomOutlined style={{fontSize: '16px'}}/>}>数据导出</Button>
          <Button type="primary" danger style={{marginLeft: '5px'}} onClick={deleteSampleInfo}>删除</Button>
        </Col>
      </Row>
      <VirtualTable dataSource={list}
                    columns={column}
                    bordered={true}
                    scroll={{y: y, x:'100vw'}}
                    tableClassName="table"
                    onSelectChange={onSelectChange}
      />
      <p style={{marginTop:'10px', fontSize: '15px'}}>*该表格为虚拟滚动表格，直接展示全部数据，无需分页</p>
    </SampleInfoWrapper>
  )
})
