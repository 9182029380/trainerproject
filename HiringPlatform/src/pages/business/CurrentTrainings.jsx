import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
 
const CurrentTrainings = () => {
  const { email: businessEmail } = useParams();
  const [invoices, setInvoices] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/finalinvoices/${businessEmail}`);
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
 
    fetchData();
  }, [businessEmail]);
 
  return (
    <div className="container mx-auto my-5">
      <h2 className="text-3xl font-semibold mb-4">All Training details of {businessEmail}</h2>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="border border-gray-300 py-2 px-4">Company Name</th>
            <th className="border border-gray-300 py-2 px-4">Amount</th>
            <th className="border border-gray-300 py-2 px-4">Batches</th>
            <th className="border border-gray-300 py-2 px-4">Start Date</th>
            <th className="border border-gray-300 py-2 px-4">End Date</th>
            <th className="border border-gray-300 py-2 px-4">Technologies</th>
            <th className="border border-gray-300 py-2 px-4">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id} className="border border-gray-300">
              <td className="border border-gray-300 py-2 px-4">{invoice.companyName}</td>
              <td className="border border-gray-300 py-2 px-4">{invoice.amount}</td>
              <td className="border border-gray-300 py-2 px-4">{invoice.batches}</td>
              <td className="border border-gray-300 py-2 px-4">
                {new Date(invoice.startDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 py-2 px-4">
                {new Date(invoice.endDate).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 py-2 px-4">{invoice.technologies}</td>
              <td className="border border-gray-300 py-2 px-4">
                {invoice.paymentStatus ? 'Paid' : 'Not Paid'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
export default CurrentTrainings;