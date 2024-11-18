import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Untuk navigasi tombol kembali
import ReactQuill from 'react-quill';
import Layout from '../Layout';

function ArticleAddPage() {
  const navigate = useNavigate(); // Hook untuk navigasi
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    deskripsiSingkat: '',
    statusArtikel: 'publish', // Nilai default
  });

  // Handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle perubahan Quill editor untuk konten
  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      konten: value,
    }));
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Artikel:', formData);
    // Tambahkan logika untuk menyimpan data ke backend
  };

  return (
    <Layout>
      <Container>
        {/* Breadcrumbs */}
        <Row className="my-4">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
              <Breadcrumb.Item href="/daftar-artikel">Daftar Artikel</Breadcrumb.Item>
              <Breadcrumb.Item active>Tambah Artikel Baru</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        {/* Header */}
        <Row className="mb-4">
          <hr />
          <Col className="d-flex align-items-center justify-content-between">
            
            <Link to="/daftar-artikel" className="btn btn-secondary">
              Kembali
            </Link>
          </Col>
          <h3 className='text-center'>Tambah Artikel Baru</h3>
        </Row>

        {/* Form */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form onSubmit={handleSubmit}>
              {/* Judul */}
              <Form.Group className="mb-3" controlId="formJudul">
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
              <Form.Group className="mb-3" controlId="formDeskripsiSingkat">
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
              <Form.Group className="mb-3" controlId="formStatusArtikel">
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
              <Form.Group className="mb-3" controlId="formKonten">
                <Form.Label>Konten Artikel</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={formData.konten}
                  onChange={handleContentChange}
                  style={{ height: '200px' }}
                  className='pb-3'
                />
              </Form.Group>



              {/* Tombol Submit */}
              <div className="text-center mt-5 pt-3">
                <Button variant="primary" type="submit">
                  Simpan Artikel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ArticleAddPage;
