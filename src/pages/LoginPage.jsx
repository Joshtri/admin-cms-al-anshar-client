import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
// import logoYayasan from '../assets/logoYayasan.jpg';

function LoginPage() {
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/v1/auth`;
      const response = await axios.post(url, data);
      console.log('Full API response:', response);

      // Extract the token, user data, and role from response
      const res = response.data;

      // Store the token, user details, and role in localStorage
      localStorage.setItem('token', res.token);
      localStorage.setItem('firstName', res.user.firstName);
      localStorage.setItem('lastName', res.user.lastName);
      localStorage.setItem('role', res.user.role); // Store the role
      localStorage.setItem('id', res.user.id); // Store the id

      // Redirect to the dashboard
      window.location = '/dashboard';
    } catch (error) {
      console.error('Error occurred:', error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: '900px', width: '100%' }}>
        {/* Bagian Kiri - Gambar dan Informasi */}
        <Col md={6} className="d-none d-md-block bg-primary text-white p-5">
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            {/* <img
              src={logoYayasan}
              alt="Be Verified"
              className="img-fluid mb-4"
            /> */}
            <h2 className="fw-bold">Silahkan Masuk</h2>
            <p className="text-center"></p>
          </div>
        </Col>

        {/* Bagian Kanan - Form Login */}
        <Col md={6} className="bg-white p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Jumpa Lagi</h2>
            <p className="text-muted">Kami senang anda kembali lagi</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Check type="checkbox" label="Ingat Password" />
              {/* <Link to="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </Link> */}
            </div>

            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" className="mb-2">
                Masuk
              </Button>

              {/* <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center">
                <FcGoogle className="me-2" />
                Sign In with Google
              </Button> */}
            </div>
          </Form>

          <div className="text-center mt-3">
            {/* <span>Don't have an account? </span> */}
            {/* <Link to="/signup" className="text-decoration-none fw-bold">
              Sign Up
            </Link> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;