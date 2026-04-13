import React, { useState } from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import StatCard from '../components/StatCard/StatCard';
import Chart from '../components/Chart/Chart';
import LowStockAlerts from '../components/LowStockAlerts/LowStockAlerts';
import RecentTransactions from '../components/RecentTransactions/RecentTransactions';
import './Reports.css';

const Reports = () => {
  const [dateRange, setDateRange] = useState('today');

  const stats = [
    {
      title: 'Daily Revenue',
      value: '$12,482.00',
      trend: 16.2,
      icon: '💰',
      color: 'blue'
    },
    {
      title: 'Transactions',
      value: '482',
      trend: 8.5,
      icon: '🛍️',
      color: 'green'
    },
    {
      title: 'Avg. Ticket',
      value: '$25.89',
      trend: -1.2,
      icon: '📊',
      color: 'purple'
    },
  ];

  const chartData = [
    { time: '08:00', value: 4 },
    { time: '10:00', value: 3 },
    { time: '10:30', value: 5 },
    { time: '12:00', value: 6 },
    { time: '12:30', value: 8 },
    { time: '14:00', value: 6 },
    { time: '16:00', value: 5 },
  ];

  return (
    <MainLayout>
      <div className="reports-page">
        <div className="reports-header">
          <h1>Sales Analytics</h1>
          <div className="date-filter">
            <select 
              className="date-select" 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="reports-content">
          {/* Left Column */}
          <div className="left-column">
            {/* Chart */}
            <Chart
              title="Hourly Sales Velocity"
              subtitle="Real-time performance tracking across all terminals"
              data={chartData}
            />

            {/* Low Stock Alerts */}
            <LowStockAlerts />
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Recent Transactions */}
            <RecentTransactions />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
