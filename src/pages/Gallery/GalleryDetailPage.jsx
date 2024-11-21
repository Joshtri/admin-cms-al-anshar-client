import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import { Row, Col, Card, Image, Spinner, Alert, Breadcrumb, Button } from 'react-bootstrap';
import axios from 'axios';

function GalleryDetailPage() {
  const { id } = useParams(); // Ambil ID galeri dari URL
  const navigate = useNavigate(); // Untuk navigasi kembali
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch detail galeri
  useEffect(() => {
    const fetchGalleryDetail = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/galeri/${id}`);
        setGallery(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat detail galeri.');
        setLoading(false);
      }
    };

    fetchGalleryDetail();
  }, [id]);

  // Jika loading, tampilkan spinner
  if (loading) {
    return (
      <Layout>
        <Row className="justify-content-center my-5">
          <Spinner animation="border" />
        </Row>
      </Layout>
    );
  }

  // Jika terjadi error, tampilkan pesan error
  if (error) {
    return (
      <Layout>
        <Row className="justify-content-center my-5">
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        </Row>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumbs */}
      <Row className="my-3">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
            <Breadcrumb.Item href="/daftar-galeri">Daftar Galeri</Breadcrumb.Item>
            <Breadcrumb.Item active>Detail Galeri</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h3 className="text-center">Detail Galeri</h3>
          <hr />
        </Col>
      </Row>

      {/* Detail Galeri */}
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="border shadow-sm p-3">
            <Card.Body>
              <Row>
                {/* Gambar Galeri */}
                <Col md={5} className="text-center">
                  <Image
                    src={gallery.imageGaleri}
                    alt={gallery.caption}
                    fluid
                    className="border rounded mb-3"
                  />
                </Col>

                {/* Informasi Galeri */}
                <Col md={7}>
                  <h4 className="mb-3">{gallery.caption}</h4>
                  <p>
                    <strong>Tanggal: </strong>
                    {new Date(gallery.tanggal_caption).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Deskripsi: </strong>
                    {gallery.deskripsi_caption}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Tombol Kembali */}
          <div className="text-center mt-4">
            <Button variant="secondary" onClick={() => navigate('/daftar-galeri')}>
              Kembali
            </Button>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default GalleryDetailPage;
