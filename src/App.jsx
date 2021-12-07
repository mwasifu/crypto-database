import React from "react";

import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import Navbar from "./components/Navbar";
import Exchanges from "./components/Exchanges";
import Homepage from "./components/Homepage";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";
import "antd/dist/antd.css";

const App = () => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 6fr"
        }}
      >
        <div className="navbar">
          <Navbar />
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route exact path="/" element={<Homepage />} />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />
                <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                <Route path="/news" element={<News />} />
              </Routes>
            </div>
          </Layout>
        </div>
      </div>
      <div className="footer" style={{textAlign:"center", zIndex: "999"}}>
        <Typography.Title
          level={5}
          style={{
            color: "white",
            textAlign: "center",
            backgroundColor: "#1A1838",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            fontWeight: "lighter",
            lineHeight: "2"
          }}
        >
          Creepto <br />
          Mohammed Wasif Uddin <br />
          All Rights Reserved <br />
          <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>

          <Link to="/news">News</Link>
        </Space>
        </Typography.Title>

      </div>
    </div>
  );
};

export default App;
