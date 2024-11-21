import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'; // Untuk navigasi dan parameter ID artikel
import ReactQuill from 'react-quill';
import Layout from '../Layout';
import api from '../../config/api'; // Import Axios instance

function ArticleEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    deskripsiSingkat: '',
    statusArtikel: 'publish',
  });

  const [coverImage, setCoverImage] = useState(null); // State for the new cover image

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/article/${id}`);
        const { judul, konten, deskripsiSingkat, statusArtikel } = response.data.data;

        setFormData({
          judul,
          konten,
          deskripsiSingkat,
          statusArtikel,
        });
      } catch (error) {
        console.error('Error fetching article:', error);
        alert('Gagal mengambil data artikel.');
        navigate('/daftar-artikel');
      }
    };

    fetchArticle();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      konten: value,
    }));
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('judul', formData.judul);
      formDataToSend.append('konten', formData.konten);
      formDataToSend.append('deskripsiSingkat', formData.deskripsiSingkat);
      formDataToSend.append('statusArtikel', formData.statusArtikel);

      if (coverImage) {
        formDataToSend.append('coverImage', coverImage);
      }

      await api.put(`/article/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Artikel berhasil diperbarui.');
      navigate('/daftar-artikel');
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Gagal memperbarui artikel.');
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
              <Breadcrumb.Item active>Edit Artikel</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col className="d-flex align-items-center justify-content-between">
            <Button variant="secondary" onClick={() => navigate('/daftar-artikel')}>
              Kembali
            </Button>
          </Col>
          <h3 className="text-center mt-3">Edit Artikel</h3>
          <hr />
        </Row>

        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form onSubmit={handleSubmit}>
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

              <Form.Group className="mb-3" controlId="formKonten">
                <Form.Label>Konten Artikel</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={formData.konten}
                  onChange={handleContentChange}
                  style={{ height: '200px' }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCoverImage">
                <Form.Label>Cover Baru (Opsional)</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              </Form.Group>

              <div className="text-center mt-5 pt-3">
                <Button variant="primary" type="submit">
                  Simpan Perubahan
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ArticleEditPage;
