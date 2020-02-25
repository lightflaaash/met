import React from "react";

import "./App.css";

import { Layout, Menu } from "antd";

const { Header } = Layout;

function Nav() {
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
        <Menu.Item key="1">Home</Menu.Item>
      </Menu>
    </Header>
  );
}

export default Nav;
