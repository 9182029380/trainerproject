import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

function MostTechStackSell() {
  const [technologyData, setTechnologyData] = useState([]);

  useEffect(() => {
    fetchTechnologyData();
  }, []);

  const fetchTechnologyData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/adminTechnologySell");
      setTechnologyData(response.data);
    } catch (error) {
      console.error("Error fetching technology data:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">
          Most Sold Technology Stack
        </h2>
        <div
          className="mb-4 mx-auto"
          style={{ width: "600px", height: "600px" }}
        >
          <Pie
            data={{
              labels: technologyData.map((item) => item.technology),
              datasets: [
                {
                  data: technologyData.map((item) => item.count),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                  ],
                  hoverBackgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
            }}
          />
        </div>
        {/* <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">
            Most Sold Technology Stacks:
          </h3>
          <ul>
            {technologyData.map((item, index) => (
              <li key={index}>{item.technology}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default MostTechStackSell;
