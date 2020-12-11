import React, { memo, useState, useCallback, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux';
import { Menu } from 'antd';
import  * as Icon from '@ant-design/icons';
import { MenuWrap } from './style.js'

const { SubMenu } = Menu;
export default memo(function MenuComp(props) {
  const [submenu, setsubmenu] = useState([props.route.path])
  const [selectKeys, setselectKeys] = useState([props.location.pathname])

  const changeMenu = useCallback((openKeys) => {
    setsubmenu([openKeys[openKeys.length - 1]]);
  },[])
  
  const { width, isCollapse } = useSelector(state => ({
    width: state.getIn(["menuData", "width"]),
    isCollapse: state.getIn(["menuData", "isCollapse"])
  }), shallowEqual);
  const { menuList } = useSelector(state =>({
    menuList: state.getIn(["menuData", "menuList"])
  }),shallowEqual);
  
  useEffect(() => {
    setsubmenu([props.route.path])
    setselectKeys([props.location.pathname])
  },[props.route.path, props.location.pathname])

  const handleClick = e => {
    setselectKeys([e.key])
    props.history.push(e.key)
  };
  return (
    <MenuWrap>
      <Menu
        theme={'dark'}
        style={{ width: width }}
        inlineCollapsed={isCollapse}
        defaultOpenKeys={submenu}
        defaultSelectedKeys={selectKeys}
        openKeys={submenu}
        selectedKeys={selectKeys}
        onOpenChange={changeMenu}
        onClick={handleClick}
        mode="inline"
      >
        {
          menuList.map(item => {
            return (
              <SubMenu key={item.path} icon={
                React.createElement(
                  Icon[item.icon]
                )
              } title={item.title}>
                {
                  item.routes.map(it => {
                  return <Menu.Item key={it.path}>{it.title}</Menu.Item>;
                  })
                }
              </SubMenu>
            );
          })
        }
        {/* <SubMenu key="sub1" icon={<SettingOutlined />} title="信息管理1">
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
        </SubMenu> */}
      </Menu>
    </MenuWrap>
  )
})
