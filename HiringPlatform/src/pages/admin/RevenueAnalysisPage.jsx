import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import MostTechStackSell from "./MostTechStackSell";

function RevenueAnalysisPage() {
  const [quarterlyRevenue, setQuarterlyRevenue] = useState([]);

  useEffect(() => {
    fetchQuarterlyRevenue();
  }, []);

  const fetchQuarterlyRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/adminbusinessrequestsGraph"
      );
      setQuarterlyRevenue(response.data);
    } catch (error) {
      console.error("Error fetching quarterly revenue:", error);
    }
  };

  const quarterlyRevenueData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Quarterly Revenue",
        data: quarterlyRevenue,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <MostTechStackSell />
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-grey-700 text-center">
            Quarterly Revenue Analysis
          </h2>
          <div className="mb-4 mx-auto w-3/4 bg-white rounded-lg shadow-lg">
            <Bar
              data={quarterlyRevenueData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              width={400}
              height={200}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RevenueAnalysisPage;
