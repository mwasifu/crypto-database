import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Typography } from "antd";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const timeStamps = [];

  for (let i = 0; i < coinHistory?.history?.length; i++) {
    coinPrice.push(coinHistory?.history[i]?.price);
    timeStamps.push(
      new Date(coinHistory.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: timeStamps,
    datasets: [
      {
        label: "USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "silver",
        borderColor: "cyan"
      },
    ],
  };

  const options = {
      maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          tick: {
            beginAtZero: true
          },
        },
      ],
    },
  };

  return (
    <>
      <Col style={{ marginTop: "5%" }}>
        <Typography.Title level={4} style={{fontWeight: "200", color: "orchid"}}>
          Daily Change: {coinHistory?.change}
        </Typography.Title>
        <Typography.Title level={4} style={{fontWeight: "200", color: "#ea3333"}}>
          Current Price: {currentPrice}
        </Typography.Title>
        <div style={{margin: "8%"}}>
            <Line data={data} options={options}/>
        </div>
        
      </Col>
    </>
  );
};

export default LineChart;
