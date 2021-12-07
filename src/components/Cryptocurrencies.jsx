import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);
  console.log(cryptos);

  if (isFetching) return "Loading...";

  return (
    <>
    {!simplified && (
      <div style={{width:"25%", padding:"1.5rem"}}>
      <Input
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    )}

      <Row gutter={[24, 24]} style={{margin:"1%"}}>
        {cryptos?.map((currency) => (
          <Col xs={24} s={12} lg={6} key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    src={`${currency.iconUrl}`}
                    alt="crypto icon"
                    style={{ height: "4vh" }}
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
