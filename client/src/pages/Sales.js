import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Spinner, Alert, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import productService from '../features/product/productService';
import saleService from '../features/sale/saleService';
import Navbar from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ productId: '', quantity: '' });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, salesRes] = await Promise.all([
        productService.getAll(),
        saleService.getAll(),
      ]);
      setProducts(productsRes.data);
      setSales(salesRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await saleService.update(editingId, formData);
        toast.success('Sale updated successfully!');
      } else {
        await saleService.create(formData);
        toast.success('Sale recorded successfully!');
      }
      fetchData();
      setFormData({ productId: '', quantity: '' });
      setEditingId(null);
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to record sale');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sale?')) return;
    try {
      await saleService.delete(id);
      toast.success('Sale deleted successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete sale');
    }
  };

  const handleEdit = (sale) => {
    setFormData({ productId: sale.productId._id, quantity: sale.quantity });
    setEditingId(sale._id);
    setShowModal(true);
  };

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4">Record Sale</h1>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <div className="mb-5">
              <Form onSubmit={handleSubmit} className="bg-light p-4 rounded">
                <Form.Group className="mb-3">
                  <Form.Label>Select Product</Form.Label>
                  <Form.Select
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a product...</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name} (Stock: {product.stock})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    min="1"
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Record Sale
                </Button>
              </Form>
            </div>

            <h3>Recent Sales</h3>
            {sales.length === 0 ? (
              <Alert variant="info">No sales recorded yet.</Alert>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Profit</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale._id}>
                      <td>{sale.productId?.name}</td>
                      <td>{sale.quantity}</td>
                      <td>₦{sale.totalPrice.toFixed(2)}</td>
                      <td>₦{sale.profit.toFixed(2)}</td>
                      <td>{new Date(sale.createdAt).toLocaleDateString()}</td>
                      <td>
                        <Button variant="info" size="sm" disabled>
                        View
                       </Button>
                        <Button variant="warning" size="sm" disabled className="mx-2"
                        onClick={()=>handleEdit(sale)}
                        >
                          Edit
                        </Button>
                        <Button variant="danger" size="sm" disabled>
                          Delete
                        </Button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{editingId ? 'Edit Sale' : 'Record Sale'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Select Product</Form.Label>
                    <Form.Select
                      name="productId"
                      value={formData.productId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose a product...</option>
                      {products.map((product) => (
                        <option key={product._id} value={product._id}>
                          {product.name} (Stock: {product.stock})
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="Enter quantity"
                      min="1"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    {editingId ? 'Update Sale' : 'Record Sale'}
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </>
        )}
      </Container>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
