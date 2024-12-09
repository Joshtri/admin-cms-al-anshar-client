import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner, Alert, Breadcrumb } from 'react-bootstrap';
import Layout from '../Layout';
import axios from 'axios';

function GalleryEditPage() {
  const { id } = useParams(); // Ambil ID galeri dari URL
  const navigate = useNavigate(); // Untuk navigasi kembali

  const [formData, setFormData] = useState({
    caption: '',
    tanggal_caption: '',
    deskripsi_caption: '',
  });
  const [imageGaleri, setImageGaleri] = useState(null); // File baru yang akan diunggah
  const [currentImage, setCurrentImage] = useState(''); // URL gambar lama
  const [loading, setLoading] = useState(false); // Indikator loading
  const [error, setError] = useState(''); // Error pesan

  // Fetch data galeri saat halaman dimuat
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/galeri/${id}`);
        const data = response.data.data;
        setFormData({
          caption: data.caption || '',
          tanggal_caption: data.tanggal_caption || '',
          deskripsi_caption: data.deskripsi_caption || '',
        });
        setCurrentImage(data.imageGaleri || ''); // Set gambar saat ini
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data galeri.');
        setLoading(false);
      }
    };

    fetchGallery();
  }, [id]);

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
    setLoading(true); // Set loading menjadi true

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('caption', formData.caption);
      formDataToSend.append('tanggal_caption', formData.tanggal_caption);
      formDataToSend.append('deskripsi_caption', formData.deskripsi_caption);
      if (imageGaleri) {
        formDataToSend.append('imageGaleri', imageGaleri); // Tambahkan file baru
      }

      await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/galeri/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Galeri berhasil diperbarui!');
      navigate('/daftar-galeri'); // Kembali ke halaman daftar galeri
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui galeri.');
    } finally {
      setLoading(false); // Set loading menjadi false
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

        {loading ? (
          <Row className="justify-content-center">
            <Spinner animation="border" />
          </Row>
        ) : error ? (
          <Row className="justify-content-center">
            <Alert variant="danger">{error}</Alert>
          </Row>
        ) : (
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <Form onSubmit={handleSubmit}>
                {/* Caption */}
                <Form.Group className="mb-3" controlId="formCaption">
                  <Form.Label>Caption</Form.Label>
                  <Form.Control
                    type="text"
                    name="caption"
                    placeholder="Masukkan caption"
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
                    name="deskripsi_caption"
                    placeholder="Masukkan deskripsi"
                    rows={4}
                    value={formData.deskripsi_caption}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                {/* Gambar Lama */}
                {currentImage && (
                  <div className="mb-3 text-center">
                    <img
                      src={currentImage}
                      alt="Gambar Saat Ini"
                      className="img-thumbnail"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}

                {/* Gambar Baru */}
                <Form.Group className="mb-3" controlId="formImageGaleri">
                  <Form.Label>Gambar Baru (Opsional)</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                {/* Tombol */}
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </Button>
                  <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={() => navigate('/daftar-galeri')}
                  >
                    Batal
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  );
}

export default GalleryEditPage;
