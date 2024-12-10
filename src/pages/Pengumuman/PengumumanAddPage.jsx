import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Modal } from 'react-bootstrap';
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

  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        setFileName(file.name); // Set file name for modal
        setShowModal(true); // Show the modal
        return;
      }
      setFormData({
        ...formData,
        berkas_pengumuman_pdf: file,
      });
    }
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

        {/* Modal Notification */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>File Melebihi Batas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              File <strong>{fileName}</strong> melebihi batas ukuran maksimal 1 MB.
            </p>
            <p>
              Silakan gunakan situs seperti{' '}
              <a
                href="https://www.ilovepdf.com/compress_pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                iLovePDF
              </a>{' '}
              untuk memperkecil ukuran file PDF Anda.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
}

export default PengumumanAddPage;
