import React, { useState } from "react";
import { useGetCryptoHExchangeQuery } from "../services/cryptoApi";
import { Avatar, Col, Row, Typography } from "antd";
import HTMLReactParser from "html-react-parser";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const { data: exchangeList, isFetching } =
    useGetCryptoHExchangeQuery(exchanges);
  const cryptoExchange = exchangeList?.data;
  if (isFetching) return "Loading..";

  return (
    <div style={{ padding: "5%", textAlign: "center" }}>
      <div style={{ marginBottom: "5%" }}>
        <Typography.Title level={2}>Statistics</Typography.Title>
      </div>
      <Row gutter={[100, 50]} justify="center">
        <Col>
          <Typography.Title level={4}>Volume</Typography.Title>
          <Typography.Text>{cryptoExchange?.stats?.volume}</Typography.Text>
        </Col>
        <Col>
          <Typography.Title level={4}>Total</Typography.Title>
          <Typography.Text>{cryptoExchange?.stats?.total}</Typography.Text>
        </Col>
        <Col>
          <Typography.Title level={4}>Limit</Typography.Title>
          <Typography.Text>{cryptoExchange?.stats?.limit}</Typography.Text>
        </Col>
      </Row>
      <div style={{ padding: "5%"}}>
        <Typography.Title level={2}>Exchanges</Typography.Title>
      </div>
      <Row gutter={[32, 32]}>
        {cryptoExchange?.exchanges?.map((data) => (
          <div
            key={data.name}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "5%" }}
          >
            <div>
              <Typography.Title level={2}>{data?.name}</Typography.Title>
              <Avatar src={data?.iconUrl} />
            </div>
            <div style={{textAlign: "center"}} dangerouslySetInnerHTML={{ __html:(data.description) }} />
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Exchanges;
