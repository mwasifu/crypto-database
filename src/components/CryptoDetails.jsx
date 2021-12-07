import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select, Avatar } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import LineChart from "./LineChart";
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data: coinDetail, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: cryptoHistory } = useGetCryptoHistoryQuery({coinId, timePeriod});
  const coinHistory = cryptoHistory?.data;
  if (isFetching) return "Loading...";
  const cryptoDetails = coinDetail?.data?.coin;
  const time = ["24h", "7d", "30d", "1y", "5y"];

  const stats = [
    {
      title: "Price in USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All Time High",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails.allTimeHigh.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.totalSupply && millify(cryptoDetails?.totalSupply)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.circulatingSupply &&
        millify(cryptoDetails?.circulatingSupply)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];



  return (
    <Col style={{ textAlign: "center" }}>
      <Col>
        <div>
          <div style={{ textAlign: "center" }}>
            <Avatar
              src={cryptoDetails.iconUrl}
              style={{ margin: "2%", height: "7vh", width: "7vh" }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Title level={2} style={{ fontWeight: "200" }}>
              {cryptoDetails.name} ({cryptoDetails.slug})
            </Title>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{}}>{cryptoDetails.name} Live Statistics</p>
            <Select
              defaultValue="7d"
              placeholder="Select Time Period"
              onChange={(value) => setTimePeriod(value)}
              style={{ marginTop: "2%" }}
            >
              {time.map((date) => (
                <Option key={date}>{date}</Option>
              ))}
            </Select>
            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/>
          </div>
          {stats.map(({ icon, title, value }) => (
            <div
              style={{
                alignItems: "center",
                display: "inline-grid",
                padding: "2%",
                paddingTop: "5%",
              }}
            >
              <div>
                <Text>{icon}</Text>
                <br />
                <Text
                  style={{
                    color: "grey",
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                >
                  {title}
                </Text>
              </div>
              <div>
                <Text style={{ fontWeight: "bold", color: "#797ef6" }}>
                  {value}
                </Text>
              </div>
            </div>
          ))}
          <br />
          {genericStats.map(({ icon, title, value }) => (
            <Col
              style={{
                alignItems: "center",
                display: "inline-grid",
                padding: "2%",
                paddingTop: "5%",
              }}
            >
              <div>
                <Text>{icon}</Text>
                <br />
                <Text
                  style={{
                    color: "grey",
                    textAlign: "center",
                    fontSize: "1rem",
                  }}
                >
                  {title}
                </Text>
              </div>
              <div>
                <Text style={{ fontWeight: "bold", color: "#ffa500" }}>
                  {value}
                </Text>
              </div>
            </Col>
          ))}
          <Col style={{marginTop: "4%"}}>
            <Row justify="center">
              <Title level={3} style={{ textAlign: "center" }}>What is {cryptoDetails.name}?</Title>
              <p style={{ fontWeight: "light", margin: "0 18% 0 18%", padding: "3%", textAlign: "left"}}>{HTMLReactParser(cryptoDetails.description)}</p>
            </Row>
          </Col>
          <br />
          <Title level={3}>{cryptoDetails.name} links</Title>
          <br />
          {cryptoDetails.links.map((link) => (
              
              <Row justify="center" style={{margin: "1%"}}>
                  <Title level={5} key={link.name}>{link.type}</Title>
                  
                  <Title level={3}><a href={link.url}>{link.name}</a></Title>
              </Row>
              
          ))}
        </div>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
