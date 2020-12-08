import React, { memo, useState, useCallback } from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import { Menu } from 'antd';
import { MenuWrap } from './style.js'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
export default memo(function MenuComp() {
  const [submenu, setsubmenu] = useState(['sub1'])
  const [selectKeys, setselectKeys] = useState(['1'])
  
  const { width, isCollapse } = useSelector(state => ({
    width: state.getIn(["menuData", "width"]),
    isCollapse: state.getIn(["menuData", "isCollapse"])
  }), shallowEqual);

  const changeMenu = useCallback((openKeys) => {
    setsubmenu([openKeys[openKeys.length - 1]]);
  },[])
  const handleClick = e => {
    setselectKeys([e.key]);
  };
  return (
    <MenuWrap>
      <Menu
        theme={'dark'}
        style={{ width: width }}
        inlineCollapsed={isCollapse}
        defaultOpenKeys={['sub1']}
        defaultSelectedKeys={['1']}
        openKeys={submenu}
        selectedKeys={selectKeys}
        onOpenChange={changeMenu}
        onClick={handleClick}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<SettingOutlined />} title="信息管理1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<MailOutlined />} title="信息管理2">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </Menu>
    </MenuWrap>
  )
})
