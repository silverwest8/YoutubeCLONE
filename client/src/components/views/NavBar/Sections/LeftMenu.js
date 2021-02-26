import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="home">
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="Subscription">
      <a href="/subscription">Subscription</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu