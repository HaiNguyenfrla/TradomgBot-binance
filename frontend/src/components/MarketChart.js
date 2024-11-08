import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const MarketChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/market-data', {
          params: { symbol: 'BTCUSDT', interval: '1h' }
        });
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
        console.error('Error details:', error.response ? error.response : error.message);
      }
    };
    

    fetchData();
  }, []);

  if (!chartData) return <div>Loading...</div>;

  const { marketData, signals } = chartData;

  // Prepare data for Chart.js
  const chartDataset = {
    labels: marketData.map(d => d.time),
    datasets: [
      {
        label: 'Price',
        data: marketData.map(d => d.close),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'TEMA',
        data: signals.map(d => d.TEMA),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'WMA',
        data: signals.map(d => d.WMA),
        borderColor: 'orange',
        fill: false,
      },
      {
        label: 'LSMA',
        data: signals.map(d => d.LSMA),
        borderColor: 'red',
        fill: false,
      }
    ],
  };

  const buySellPoints = {
    datasets: [
      {
        label: 'Buy Signals',
        data: signals.filter(signal => signal.signal === 'buy').map(signal => ({
          x: signal.time,
          y: signal.price,
        })),
        backgroundColor: 'green',
        pointRadius: 5,
      },
      {
        label: 'Sell Signals',
        data: signals.filter(signal => signal.signal === 'sell').map(signal => ({
          x: signal.time,
          y: signal.price,
        })),
        backgroundColor: 'red',
        pointRadius: 5,
      }
    ],
  };

  return (
    <div>
      <Line data={chartDataset} />
      <Line data={buySellPoints} />
    </div>
  );
};

export default MarketChart;
