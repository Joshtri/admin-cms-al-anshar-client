import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import api from '../../config/api'; // Import Axios instance

function GalleryAddPage() {
  const navigate = useNavigate();

  // State untuk formulir
  const [formData, setFormData] = useState({
    caption: '',
    tanggal_caption: '',
    deskripsi_caption: '',
  });

  const [imageGaleri, setImageGaleri] = useState(null);
  const [loading, setLoading] = useState(false); // State untuk loading

  // Handle perubahan input teks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle perubahan input file
  const handleFileChange = (e) => {
    setImageGaleri(e.target.files[0]);
  };

  // Handle submit formulir
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageGaleri) {
      alert('Harap pilih gambar untuk diunggah.');
      return;
    }

    setLoading(true); // Set loading ke true saat proses dimulai

    try {
      // Buat FormData untuk mengirimkan data ke backend
      const formDataToSend = new FormData();
      formDataToSend.append('caption', formData.caption);
      formDataToSend.append('tanggal_caption', formData.tanggal_caption);
      formDataToSend.append('deskripsi_caption', formData.deskripsi_caption);
      formDataToSend.append('imageGaleri', imageGaleri);

      // Kirim data ke backend menggunakan Axios instance
      const response = await api.post('/galeri', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Galeri berhasil ditambahkan.');
      navigate('/daftar-galeri'); // Navigasi kembali ke daftar galeri
    } catch (error) {
      console.error('Error saat menambahkan galeri:', error);
      alert('Terjadi kesalahan saat menambahkan galeri.');
    } finally {
      setLoading(false); // Set loading ke false saat proses selesai
    }
  };

  return (
    <Layout>
      <Container>
        {/* Breadcrumbs */}
        <Row className="my-4">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
              <Breadcrumb.Item href="/daftar-galeri">Daftar Galeri</Breadcrumb.Item>
              <Breadcrumb.Item active>Tambah Galeri Baru</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        {/* Header */}
        <Row className="mb-4">
          <Col className="d-flex align-items-center justify-content-between">
            <Button variant="secondary" onClick={() => navigate('/daftar-galeri')}>
              Kembali
            </Button>
          </Col>
          <h3 className="text-center mt-3">Tambah Galeri Baru</h3>
          <hr />
        </Row>

        {/* Form */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form onSubmit={handleSubmit}>
              {/* Caption */}
              <Form.Group className="mb-3" controlId="formCaption">
                <Form.Label>Caption</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan caption"
                  name="caption"
                  value={formData.caption}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Tanggal Caption */}
              <Form.Group className="mb-3" controlId="formTanggalCaption">
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggal_caption"
                  value={formData.tanggal_caption}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Deskripsi Caption */}
              <Form.Group className="mb-3" controlId="formDeskripsiCaption">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Masukkan deskripsi"
                  name="deskripsi_caption"
                  value={formData.deskripsi_caption}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Gambar */}
              <Form.Group className="mb-3" controlId="formImageGaleri">
                <Form.Label>Gambar</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </Form.Group>

              {/* Tombol Submit */}
              <div className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading} // Nonaktifkan tombol saat loading
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{' '}
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan Galeri'
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default GalleryAddPage;
