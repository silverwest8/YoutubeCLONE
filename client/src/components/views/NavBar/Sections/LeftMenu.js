import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="home" style={{paddingTop: "13px"}}>
      <a href="/">Home</a>
    </Menu.Item>
    <Menu.Item key="Subscription">
      <a href="/subscription">Subscription</a>
    </Menu.Item>
  </Menu>
  )
}

export default LeftMenu