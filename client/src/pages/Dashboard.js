import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import dashboardService from '../features/dashboard/dashboardService';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getStats();
      setStats(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load dashboard');
      toast.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4">Dashboard</h1>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row>
            <Col md={4} className="mb-3">
              <Card className="bg-success text-white">
                <Card.Body>
                  <Card.Title>Total Sales</Card.Title>
                  <h3>fcfa{stats?.totalSales.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card className="bg-info text-white">
                <Card.Body>
                  <Card.Title>Total Profit</Card.Title>
                  <h3>fcfa{stats?.totalProfit.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-3">
              <Card className="bg-warning text-white">
                <Card.Body>
                  <Card.Title>Transactions</Card.Title>
                  <h3>{stats?.totalTransactions}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
