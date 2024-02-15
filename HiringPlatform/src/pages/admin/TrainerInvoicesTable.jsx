import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTrainerModal from "./EditTrainerModal"; // Import the modal component

const TrainerInvoicesTable = () => {
  const [trainerInvoices, setTrainerInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/admintrainerinvoices"
        );
        setTrainerInvoices(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const generateInvoice = async (invoice) => {
    try {
      await axios.post("http://localhost:3001/adminbusinessinvoices", {
        poId: invoice.poId,
        businessId: invoice.businessId,

        totalAmount: invoice.amount,
        batches: "Some batches", // You can modify this as needed
        startDate: invoice.startDate,
        endDate: invoice.endDate,
        technologies: "Some technologies", // You can modify this as needed
        paymentStatus: false,
      });
      alert("Invoice generated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to generate invoice");
    }
  };

  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Trainer Invoices</h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">Contact Number</th>
                <th className="py-2 px-3 text-left">Amount</th>
                <th className="py-2 px-3 text-left">Start Date</th>
                <th className="py-2 px-3 text-left">End Date</th>
                <th className="py-2 px-3 text-left">Payment Status</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainerInvoices.map((invoice) => (
                <tr key={invoice._id} className="bg-white">
                  <td className="py-2 px-3">{invoice.name}</td>
                  <td className="py-2 px-3">{invoice.email}</td>
                  <td className="py-2 px-3">{invoice.contactNumber}</td>
                  <td className="py-2 px-3">{invoice.amount}</td>
                  <td className="py-2 px-3">
                    {new Date(invoice.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">
                    {new Date(invoice.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">
                    {invoice.paymentStatus ? "Paid" : "Not Paid"}
                  </td>
                  <td className="py-2 px-3">
                    <button
                      className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded mr-1"
                      onClick={() => generateInvoice(invoice)}
                    >
                      Generate Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TrainerInvoicesTable;
