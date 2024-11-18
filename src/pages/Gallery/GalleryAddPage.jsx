import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import api from '../../config/api'; // Import instance Axios

function GalleryAddPage() {
  const navigate = useNavigate();

  // State untuk formulir
  const [formData, setFormData] = useState({
    caption: '',
    tanggal_caption: '',
    deskripsi_caption: '',
  });

  const [imageGaleri, setImageGaleri] = useState(null);

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
    }
  };

  return (
    <Layout>
      <Container>

        {/* Header */}
        <Row className="mb-4">

          <Col className="d-flex align-items-center justify-content-between">

            <Button variant="secondary" onClick={() => navigate(-1)}>
              Kembali
            </Button>
          </Col>
            <hr />
          <h3 className='text-center'>Tambah Galeri Baru</h3>
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
                <Button variant="primary" type="submit">
                  Simpan Galeri
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
