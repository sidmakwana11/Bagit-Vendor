import React from 'react'
import HomePage from '../homePage/HomePage';

const Dashboard = () => {
  return (
    <HomePage>
    <header className="header">
        <h1>Welcome, Admin 👋</h1>
        <p>Here is your Bagit dashboard overview.</p>
      </header>
      <section className="dashboard-cards">
        <div className="card"><h3>Total Orders</h3><p>1,245</p></div>
        <div className="card"><h3>Total Revenue</h3><p>$58,420</p></div>
        <div className="card"><h3>Active Customers</h3><p>870</p></div>
        <div className="card"><h3>Pending Shipments</h3><p>96</p></div>
      </section>
      </HomePage>
  )
}

export default Dashboard;