import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  console.log(data);
  if (isFetching) return "Loading..";

  return (
    <div style={{ padding: "3rem"}}>
        <div style={{textAlign: "center", marginBottom: "10%"}}>
      <Title level={2} style={{fontWeight:"200"}}>Global Crypto Stats</Title>
      <br />
      <br />
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      </div>
      <div
        style={{
          marginTop: "2.5rem",
          display: "grid",
          gridTemplateColumns: "6fr 1fr",
        }}
      >
        <div>
          <Title level={2} style={{marginBottom:"3rem", fontWeight:"200"}}>Top 10 Cryptocurrencies in the World</Title>
        </div>
        <div>
          <Title
            level={3}
            style={{ textAlign: "center", fontWeight: "lighter" }}
          >
            <Link to="/cryptocurrencies">Show more</Link>
          </Title>
        </div>
        </div>

        <Cryptocurrencies simplified/>

        <div
          style={{
            marginTop: "2.5rem",
            display: "grid",
            gridTemplateColumns: "6fr 1fr",
          }}
        >
          <div>
            <Title level={2} style={{marginBottom:"3rem", fontWeight:"200"}}>Latest Crypto News</Title>
          </div>
          <div>
            <Title
              level={3}
              style={{ textAlign: "center", fontWeight: "lighter" }}
            >
              <Link to="/news">Show more</Link>
            </Title>
          </div>
        </div>
        <News simplified/>
      </div>
  );
};

export default Homepage;
