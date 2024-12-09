import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function LoginPage() {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!data.email || !data.password) {
      setError('Email dan password tidak boleh kosong.');
      return;
    }

    setError('');
    setLoading(true);


    

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/auth`; // Ensure correct endpoint
      const response = await axios.post(url, data);

      // Extract token, user data, and role from the response
      const { token, user } = response.data;

      // Store token and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('firstName', user.firstName);
      localStorage.setItem('lastName', user.lastName);
      localStorage.setItem('role', user.role);
      localStorage.setItem('id', user.id);

      // Redirect to the dashboard
      window.location = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);

      

      if (error.response && error.response.status === 401) {
        setError('Email atau password salah.');
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }

      if (error.response) {
        console.error("Error Response Data: ", error.response.data);
        console.error("Error Response Status: ", error.response.status);
        console.error("Error Response Headers: ", error.response.headers);
      } else {
        console.error("Error Message: ", error.message);
      }

      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '900px', width: '100%' }}>
        {/* Left Side - Welcome Section */}
        <Col md={6} className="d-none d-md-block bg-primary text-white p-5">
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h2 className="fw-bold">Selamat Datang</h2>
            <p>Silakan masuk untuk melanjutkan ke dashboard</p>
          </div>
        </Col>

        {/* Right Side - Login Form */}
        <Col md={6} className="bg-white p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Jumpa Lagi</h2>
            <p className="text-muted">Kami senang Anda kembali</p>
          </div>

          <Form onSubmit={handleSubmit}>
            {/* Email Field */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Error Message */}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {/* Submit Button */}
            <div className="d-grid">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Memproses...' : 'Masuk'}
              </Button>
            </div>
          </Form>

          <div className="text-center mt-3">
            <p className="text-muted">
              {/* Placeholder for future links */}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
