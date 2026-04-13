import React, { useState } from 'react';
import MainLayout from '../components/MainLayout/MainLayout';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [settings, setSettings] = useState({
    // Store Settings
    storeName: 'SuperMart POS',
    storeLocation: 'Main Store - Terminal 04',
    storePhone: '+1 (555) 123-4567',
    storeEmail: 'store@supermart.com',

    // User Preferences
    language: 'English',
    timeFormat: '12-hour',
    currencyFormat: 'USD ($)',
    theme: 'light',

    // Display Settings
    itemsPerPage: 25,
    showProductImages: true,
    showLowStockWarnings: true,
    enableReceipts: true,

    // Payment Settings
    enableCash: true,
    enableCard: true,
    enableMobilePayment: true,
    cardProcessor: 'Stripe',
    taxRate: '10%',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleToggle = (name) => {
    setSettings({
      ...settings,
      [name]: !settings[name],
    });
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      alert('Settings reset to defaults');
    }
  };

  return (
    <MainLayout>
      <div className="settings-page">
        <div className="settings-container">
          {/* Header */}
          <div className="settings-header">
            <h1>Settings</h1>
            <p>Manage store configuration and preferences</p>
          </div>

          {/* Tabs */}
          <div className="settings-tabs">
            <button
              className={`tab-btn ${activeTab === 'store' ? 'active' : ''}`}
              onClick={() => setActiveTab('store')}
            >
              🏪 Store
            </button>
            <button
              className={`tab-btn ${activeTab === 'user' ? 'active' : ''}`}
              onClick={() => setActiveTab('user')}
            >
              👤 User
            </button>
            <button
              className={`tab-btn ${activeTab === 'display' ? 'active' : ''}`}
              onClick={() => setActiveTab('display')}
            >
              🎨 Display
            </button>
            <button
              className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
              onClick={() => setActiveTab('payment')}
            >
              💳 Payment
            </button>
            <button
              className={`tab-btn ${activeTab === 'system' ? 'active' : ''}`}
              onClick={() => setActiveTab('system')}
            >
              ⚙️ System
            </button>
          </div>

          {/* Store Settings */}
          {activeTab === 'store' && (
            <div className="settings-content">
              <h2>Store Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Store Name</label>
                  <input
                    type="text"
                    name="storeName"
                    value={settings.storeName}
                    onChange={handleInputChange}
                    placeholder="Enter store name"
                  />
                </div>

                <div className="form-group">
                  <label>Store Location</label>
                  <input
                    type="text"
                    name="storeLocation"
                    value={settings.storeLocation}
                    onChange={handleInputChange}
                    placeholder="Enter store location"
                  />
                </div>

                <div className="form-group">
                  <label>Store Phone</label>
                  <input
                    type="tel"
                    name="storePhone"
                    value={settings.storePhone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="form-group">
                  <label>Store Email</label>
                  <input
                    type="email"
                    name="storeEmail"
                    value={settings.storeEmail}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* User Preferences */}
          {activeTab === 'user' && (
            <div className="settings-content">
              <h2>User Preferences</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Language</label>
                  <select name="language" value={settings.language} onChange={handleInputChange}>
                    <option>English</option>
                    <option>Français</option>
                    <option>Español</option>
                    <option>Deutsch</option>
                    <option>中文</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Time Format</label>
                  <select name="timeFormat" value={settings.timeFormat} onChange={handleInputChange}>
                    <option>12-hour</option>
                    <option>24-hour</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Currency Format</label>
                  <select name="currencyFormat" value={settings.currencyFormat} onChange={handleInputChange}>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>JPY (¥)</option>
                    <option>CAD (C$)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Theme</label>
                  <select name="theme" value={settings.theme} onChange={handleInputChange}>
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Display Settings */}
          {activeTab === 'display' && (
            <div className="settings-content">
              <h2>Display Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Items Per Page</label>
                  <select name="itemsPerPage" value={settings.itemsPerPage} onChange={handleInputChange}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>

                <div className="toggle-group">
                  <label>Show Product Images</label>
                  <button
                    className={`toggle-btn ${settings.showProductImages ? 'on' : 'off'}`}
                    onClick={() => handleToggle('showProductImages')}
                  >
                    {settings.showProductImages ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="toggle-group">
                  <label>Show Low Stock Warnings</label>
                  <button
                    className={`toggle-btn ${settings.showLowStockWarnings ? 'on' : 'off'}`}
                    onClick={() => handleToggle('showLowStockWarnings')}
                  >
                    {settings.showLowStockWarnings ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="toggle-group">
                  <label>Enable Receipts</label>
                  <button
                    className={`toggle-btn ${settings.enableReceipts ? 'on' : 'off'}`}
                    onClick={() => handleToggle('enableReceipts')}
                  >
                    {settings.enableReceipts ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="settings-content">
              <h2>Payment Settings</h2>
              <div className="settings-form">
                <div className="toggle-group">
                  <label>Enable Cash Payments</label>
                  <button
                    className={`toggle-btn ${settings.enableCash ? 'on' : 'off'}`}
                    onClick={() => handleToggle('enableCash')}
                  >
                    {settings.enableCash ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="toggle-group">
                  <label>Enable Card Payments</label>
                  <button
                    className={`toggle-btn ${settings.enableCard ? 'on' : 'off'}`}
                    onClick={() => handleToggle('enableCard')}
                  >
                    {settings.enableCard ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="toggle-group">
                  <label>Enable Mobile Payments</label>
                  <button
                    className={`toggle-btn ${settings.enableMobilePayment ? 'on' : 'off'}`}
                    onClick={() => handleToggle('enableMobilePayment')}
                  >
                    {settings.enableMobilePayment ? 'ON' : 'OFF'}
                  </button>
                </div>

                <div className="form-group">
                  <label>Card Processor</label>
                  <select name="cardProcessor" value={settings.cardProcessor} onChange={handleInputChange}>
                    <option>Stripe</option>
                    <option>PayPal</option>
                    <option>Square</option>
                    <option>Adyen</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tax Rate</label>
                  <input
                    type="text"
                    name="taxRate"
                    value={settings.taxRate}
                    onChange={handleInputChange}
                    placeholder="Enter tax rate"
                  />
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="settings-content">
              <h2>System Settings</h2>
              <div className="system-info">
                <div className="info-item">
                  <span className="info-label">System Version:</span>
                  <span className="info-value">v1.2.4</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Updated:</span>
                  <span className="info-value">April 12, 2026</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Database:</span>
                  <span className="info-value">MongoDB Atlas</span>
                </div>
                <div className="info-item">
                  <span className="info-label">API Status:</span>
                  <span className="info-value" style={{ color: '#10b981' }}>
                    🟢 Connected
                  </span>
                </div>
              </div>

              <div className="system-actions">
                <button className="action-btn backup-btn">💾 Backup Data</button>
                <button className="action-btn update-btn">🔄 Check for Updates</button>
                <button className="action-btn export-btn">📤 Export Settings</button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="settings-actions">
            <button className="btn-reset" onClick={handleResetSettings}>
              ↺ Reset to Defaults
            </button>
            <button className="btn-save" onClick={handleSaveSettings}>
              ✓ Save Settings
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
