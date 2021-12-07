import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectionOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/logo.png";
import "antd/dist/antd.css";
import "./styles.css";

const Navbar = () => {
  const [activeWindow, setActiveWindow] = useState(true);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size < 768) {
      setActiveWindow(false);
    } else {
      setActiveWindow(true);
    }
  }, [size]);
  return (
    <div className="nav-container" style={{ }}>
      <div className="logo-container" style={{ padding: "10%", textAlign: "center", backgroundColor: "#333436" }}>
        <Typography.Title level={1} style={{ fontWeight: "200", margin:"0"}}>
          <Link to="/" style={{color: "white"}}>Creepto</Link>
        </Typography.Title>
      </div>
      
      <Menu
        theme="dark"
        style={{
          alignContent: "stretch",
            display: "flex",
            flexWrap: "wrap",

          padding: "1rem",
        }}
      >
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<MenuOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
