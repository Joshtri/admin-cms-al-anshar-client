import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Layout from '../Layout';

function ArticleAddPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    deskripsiSingkat: '',
    statusArtikel: 'publish',
  });
  const [coverImage, setCoverImage] = useState(null); // Untuk cover image
  const [loading, setLoading] = useState(false); // Indikator loading
  const [showModal, setShowModal] = useState(false); // Untuk notifikasi modal
  const [fileName, setFileName] = useState(''); // Nama file yang terlalu besar

  // Handle perubahan input teks
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle perubahan Quill editor
  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      konten: value,
    }));
  };

  // Handle perubahan file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 500 * 1024; // 500 KB in bytes

    if (file && file.size > maxSize) {
      setFileName(file.name); // Set nama file untuk modal
      setShowModal(true); // Tampilkan modal
      return;
    }

    setCoverImage(file); // Set file jika ukurannya sesuai
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('judul', formData.judul);
      formDataToSend.append('konten', formData.konten);
      formDataToSend.append('deskripsiSingkat', formData.deskripsiSingkat);
      formDataToSend.append('statusArtikel', formData.statusArtikel);

      if (coverImage) {
        formDataToSend.append('coverImage', coverImage);
      }

      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/article`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Artikel berhasil ditambahkan!');
      navigate('/daftar-artikel'); // Navigasi kembali ke daftar artikel
    } catch (error) {
      console.error('Gagal menambahkan artikel:', error.message);
      alert('Terjadi kesalahan saat menambahkan artikel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <Row className="my-4">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
              <Breadcrumb.Item href="/daftar-artikel">Daftar Artikel</Breadcrumb.Item>
              <Breadcrumb.Item active>Tambah Artikel</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col className="d-flex align-items-center justify-content-between">
            <Button variant="secondary" onClick={() => navigate('/daftar-artikel')}>
              Kembali
            </Button>
          </Col>
          <h3 className="text-center mt-3">Detail Artikel</h3>
          <hr />
        </Row>

        {/* Form */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form onSubmit={handleSubmit}>
              {/* Judul */}
              <Form.Group className="mb-3">
                <Form.Label>Judul Artikel</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan judul artikel"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              {/* Deskripsi Singkat */}
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi Singkat</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Masukkan deskripsi singkat artikel"
                  name="deskripsiSingkat"
                  value={formData.deskripsiSingkat}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {/* Status Artikel */}
              <Form.Group className="mb-3">
                <Form.Label>Status Artikel</Form.Label>
                <Form.Select
                  name="statusArtikel"
                  value={formData.statusArtikel}
                  onChange={handleInputChange}
                >
                  <option value="draft">Draft</option>
                  <option value="publish">Publish</option>
                </Form.Select>
              </Form.Group>

              {/* Konten Artikel */}
              <Form.Group className="mb-3">
                <Form.Label>Konten Artikel</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={formData.konten}
                  onChange={handleContentChange}
                  style={{ height: '200px' }}
                />
              </Form.Group>

              {/* Cover Image */}
              <Form.Group className="mb-3">
                <Form.Label>Cover Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              </Form.Group>

              {/* Tombol Submit */}
              <div className="text-center">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan Artikel'}
                </Button>
                <Link to="/daftar-artikel" className="btn btn-secondary ms-2">
                  Kembali
                </Link>
              </div>
            </Form>
          </Col>
        </Row>

        {/* Modal Notification */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>File Melebihi Batas</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              File <strong>{fileName}</strong> melebihi batas ukuran maksimal 500 KB.
            </p>
            <p>
              Silakan gunakan situs seperti{' '}
              <a
                href="https://www.iloveimg.com/compress-image"
                target="_blank"
                rel="noopener noreferrer"
              >
                iLoveIMG
              </a>{' '}
              untuk memperkecil ukuran gambar Anda.
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

export default ArticleAddPage;
