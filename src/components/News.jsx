import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 20
  });
  const { data } = useGetCryptosQuery(100);
  if (!cryptoNews?.value) return "Loading..";
  console.log(cryptoNews);
  return (
    <>
      <Row gutter={[24, 24]} style={{ margin: "1%" }}>
        {!simplified && (
          <Col span={24} style={{ marginTop: "1%" }}>
            <Select
              showSearch
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => {
                setNewsCategory(value);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} s={12} lg={8} key={i}>
            <Card hoverable>
              <a href={news.url} target="_blank" rel="noreferrer">
                <div
                  style={{ display: "grid", gridTemplateColumns: "2fr 2fr" }}
                >
                  <div>
                    <Title level={4}>{news.name}</Title>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <img
                      src={news?.image?.thumbnail?.contentUrl}
                      alt="news thumbnail"
                    />
                  </div>
                </div>

                <p
                  style={{ textAlign: "left", color: "grey", marginTop: "6%" }}
                >
                  {news?.description}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "0.5fr 2.5fr 1fr",
                  }}
                >
                  <div>
                    <Avatar
                      src={news.provider[0]?.image?.thumbnail?.contentUrl}
                      alt="news"
                      style={{ height: "4vh" }}
                    />
                  </div>
                  <div>
                    <Text style={{ paddingLeft: "3%" }}>
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <div>
                    <Text>
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
