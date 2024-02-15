import React, { useEffect, useState } from "react";
import axios from "axios";

function PurchaseOrderComponent() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/adminpurchase-orders-details"
      );
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error("Error fetching purchase orders:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Purchase Orders Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-2 px-3 text-left">Trainer Name</th>
                <th className="py-2 px-3 text-left">Trainer Email</th>
                <th className="py-2 px-3 text-left">Skills</th>
                <th className="py-2 px-3 text-left">Charge Per Day</th>
                <th className="py-2 px-3 text-left">Company Name</th>
                <th className="py-2 px-3 text-left">Location</th>
                <th className="py-2 px-3 text-left">Company Email</th>
                <th className="py-2 px-3 text-left">Company Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {purchaseOrders.map((purchaseOrder) => (
                <tr key={purchaseOrder._id} className="bg-white">
                  <td className="py-2 px-3">{purchaseOrder.trainerName}</td>
                  <td className="py-2 px-3">{purchaseOrder.trainerEmail}</td>
                  <td className="py-2 px-3">{purchaseOrder.skills}</td>
                  <td className="py-2 px-3">{purchaseOrder.chargePerDay}</td>
                  <td className="py-2 px-3">{purchaseOrder.companyName}</td>
                  <td className="py-2 px-3">{purchaseOrder.location}</td>
                  <td className="py-2 px-3">{purchaseOrder.companyEmail}</td>
                  <td className="py-2 px-3">{purchaseOrder.companyPhone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PurchaseOrderComponent;
