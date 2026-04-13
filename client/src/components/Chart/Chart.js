import React from 'react';
import './Chart.css';

const Chart = ({ title, subtitle, data = [] }) => {
  // Default data if none provided
  const chartData = data.length > 0 ? data : [
    { time: '08:00', value: 4 },
    { time: '10:00', value: 3 },
    { time: '10:30', value: 5 },
    { time: '12:00', value: 6 },
    { time: '12:30', value: 8 },
    { time: '14:00', value: 6 },
    { time: '16:00', value: 5 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">{title}</h3>
          <p className="chart-subtitle">{subtitle}</p>
        </div>
        <button className="chart-menu-btn">⋮</button>
      </div>

      <div className="chart-container">
        <div className="chart-bars">
          {chartData.map((item, index) => (
            <div key={index} className="bar-wrapper">
              <div 
                className="bar"
                style={{ 
                  height: `${(item.value / maxValue) * 250}px`,
                  backgroundColor: index === 4 ? '#10b981' : '#cbd5e1'
                }}
              />
              <span className="bar-label">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chart;
