import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Layout from '../Layout';
import axios from 'axios';

function PengumumanAddPage() {
  const [formData, setFormData] = useState({
    judul_pengumuman: '',
    tanggal_pengumuman: '',
    deskripsi_pengumuman: '',
    berkas_pengumuman_pdf: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      berkas_pengumuman_pdf: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formDataToSend = new FormData();
    formDataToSend.append('judul_pengumuman', formData.judul_pengumuman);
    formDataToSend.append('tanggal_pengumuman', formData.tanggal_pengumuman);
    formDataToSend.append('deskripsi_pengumuman', formData.deskripsi_pengumuman);
    if (formData.berkas_pengumuman_pdf) {
      formDataToSend.append('berkas_pengumuman_pdf', formData.berkas_pengumuman_pdf);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/pengumuman`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Pengumuman berhasil ditambahkan!');

      // Redirect to /daftar-galeri after success
      setTimeout(() => {
        navigate('/daftar-galeri'); // Navigate to /daftar-galeri
      }, 2000); // Optional: Delay for showing success message
    } catch (err) {
      setError('Gagal menambahkan pengumuman. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <Row className="my-4">
          <Col>
            <h1>Tambah Pengumuman Baru</h1>
          </Col>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="judulPengumuman" className="mb-3">
            <Form.Label>Judul Pengumuman</Form.Label>
            <Form.Control
              type="text"
              name="judul_pengumuman"
              value={formData.judul_pengumuman}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="tanggalPengumuman" className="mb-3">
            <Form.Label>Tanggal Pengumuman</Form.Label>
            <Form.Control
              type="date"
              name="tanggal_pengumuman"
              value={formData.tanggal_pengumuman}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="deskripsiPengumuman" className="mb-3">
            <Form.Label>Deskripsi Pengumuman</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="deskripsi_pengumuman"
              value={formData.deskripsi_pengumuman}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="berkasPengumumanPdf" className="mb-3">
            <Form.Label>Berkas Pengumuman (PDF)</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} accept=".pdf" />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Pengumuman'}
          </Button>
        </Form>
      </Container>
    </Layout>
  );
}

export default PengumumanAddPage;
