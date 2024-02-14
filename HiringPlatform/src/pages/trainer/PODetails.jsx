import React, { useState, useEffect } from 'react';
 
const PODetails = ({ email }) => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/purchase-orders/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPurchaseOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };
 
    fetchData();
  }, [email]);
 
  const handleAccept = async (id, status) => {
    if (status === true) return; // Do nothing if already accepted
    try {
      const response = await fetch(`http://localhost:3001/purchase-orders/${id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: true })
      });
      if (!response.ok) {
        throw new Error('Failed to accept order');
      }
      // Update status locally
      setPurchaseOrders(prevOrders => prevOrders.map(order => order._id === id ? { ...order, status: true } : order));
    } catch (error) {
      console.error('Error accepting order:', error);
      setError('Failed to accept order. Please try again later.');
    }
  };
 
  const handleReject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/purchase-orders/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: false })
      });
      if (!response.ok) {
        throw new Error('Failed to reject order');
      }
      // Remove the rejected order from the local state
      setPurchaseOrders(prevOrders => prevOrders.filter(order => order._id !== id));
    } catch (error) {
      console.error('Error rejecting order:', error);
      setError('Failed to reject order. Please try again later.');
    }
  };
 
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Purchase Orders</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <div>
          {purchaseOrders.map(order => (
            <div key={order._id} className="border shadow-md p-4 rounded-md mb-4">
              <div>Business ID: {order.businessId}</div>
              <div>Trainer Email: {order.trainerEmail}</div>
              <div>Amount: {order.amount}</div>
              <div>Status: {order.status ? 'Accepted' : 'Pending'}</div>
              <div>Start Date: {new Date(order.startDate).toLocaleDateString()}</div>
              <div>End Date: {new Date(order.endDate).toLocaleDateString()}</div>
              <div className="mt-4">
                <button onClick={() => handleAccept(order._id, order.status)} disabled={order.status} className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 ${order.status ? 'opacity-50 cursor-not-allowed' : ''}`}>Accept</button>
                <button onClick={() => handleReject(order._id)} disabled={order.status} className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ${order.status ? 'opacity-50 cursor-not-allowed' : ''}`}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
export default PODetails;
 