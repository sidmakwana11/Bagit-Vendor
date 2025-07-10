import React from "react";
import HomePage from "../homePage/HomePage";
import "./Orders.css";

const orders = [
  { id: 1, product:"shoes", customer: "John Doe", status: "Pending", amount: "$120.00" },
  { id: 2, product:"watch", customer: "Jane Smith", status: "Shipped", amount: "$80.50" },
  { id: 3, product:"jeans", customer: "Sam Wilson", status: "Delivered", amount: "$200.00" },
  { id: 4, product:"shirt", customer: "Lisa Ray", status: "Pending", amount: "$95.00" },
];

const Orders = () => {
  return (
    <HomePage>
    <div className="orders-container">
      <h1 className="orders-header">Orders Dashboard</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.customer}</td>
              <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
              <td>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </HomePage>

  );
};

export default Orders;
