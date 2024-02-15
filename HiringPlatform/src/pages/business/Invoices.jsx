// Import necessary libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Invoices = ({ email }) => {
  const { email: businessEmail } = useParams(); // Extract email id from the URL
  const [businessInvoices, setBusinessInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all details for a particular business using businessEmail
        const response = await axios.get(`http://localhost:3001/businessinvoices/${businessEmail}`);
        setBusinessInvoices(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [businessEmail]); // Fetch data whenever businessEmail changes


// Accepting or Rejecting Invoice
const handleInvoiceAction = async (invoice, action) => {
  try {
    // Update paymentStatus based on the action (accept or reject)
    const response = await axios.put(`http://localhost:3001/businessinvoices/${invoice._id}/${action}`);
    const updatedInvoice = response.data;

    // Fetch updated data
    const updatedInvoices = businessInvoices.map((inv) => (inv._id === updatedInvoice._id ? updatedInvoice : inv));
    setBusinessInvoices(updatedInvoices);

    alert(action === "accept" ? "Invoice accepted successfully!" : "Invoice rejected successfully!");
  } catch (err) {
    console.error(err); // Log the error details
    alert("Rejected Sucessfully");
  }
};



  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Business Invoices</h2>
        <div>
          {businessInvoices.map((invoice) => (
            <div key={invoice._id} className="border shadow-md p-4 rounded-md mb-4">
              <div>Company Name: {invoice.companyName}</div>
              <div>Amount: {invoice.amount}</div>
              <div>Batch: {invoice.batches}</div>
              <div>Start Date: {new Date(invoice.startDate).toLocaleDateString()}</div>
              <div>End Date: {new Date(invoice.endDate).toLocaleDateString()}</div>
              <div>Payment Status: {invoice.paymentStatus ? 'Paid' : 'Not Paid'}</div>
              <div className="mt-4">
                <button
                  onClick={() => handleInvoiceAction(invoice, "accept")}
                  disabled={invoice.paymentStatus}
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 ${invoice.paymentStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleInvoiceAction(invoice, "reject")}
                  disabled={invoice.paymentStatus}
                  className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${invoice.paymentStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Invoices;