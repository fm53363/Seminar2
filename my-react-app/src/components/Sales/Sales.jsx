// Sales.js
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { Bar } from "react-chartjs-2"; // Import Bar component from react-chartjs-2

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const Sales = ({ country, server }) => {
  const [salesData, setSalesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/infostat/${server}`,
          {}
        );

        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [server]);

  let perDayData;
  let perMonthData;

  // Check if salesData is not empty before processing
  if (Object.keys(salesData).length > 0) {
    // Constructing "codes per day" map
    const codesPerDay = {};
    for (const item of JSON.parse(salesData.codes_per_day)) {
      codesPerDay[item.dat] = item.qty;
    }

    // Constructing "codes per month" map
    const codesPerMonth = {};
    for (const item of JSON.parse(salesData.codes_per_month)) {
      codesPerMonth[item.month] = item.qty;
    }

    console.log("Codes per day:", codesPerDay);
    console.log("Codes per month:", codesPerMonth);

    perDayData = {
      labels: Object.keys(codesPerDay),
      datasets: [
        {
          label: `Data`,
          data: Object.values(codesPerDay), // Example data
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    perMonthData = {
      labels: Object.keys(codesPerMonth),
      datasets: [
        {
          label: `Data`,
          data: Object.values(codesPerMonth), // Example data
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <div class="contanier fluid">
      <h2>{`${country} Sales Data`}</h2>

      <h2>Po danima</h2>
      <div>{perDayData && <Bar data={perDayData} />}</div>

      <h2>Po mjesecima</h2>
      <div>{perMonthData && <Bar data={perMonthData} />}</div>
    </div>
  );
};

export default Sales;
