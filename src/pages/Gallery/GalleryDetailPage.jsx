import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout';
import { Row, Col, Card, Image, Spinner, Alert } from 'react-bootstrap';
// import Breadcrumbs from '../../components/BreadCrumbs';
import axios from 'axios';

const breadcrumbItems = [
  { label: 'Beranda', href: '/dashboard', active: false },
  { label: 'Daftar Galeri', href: '/daftar-galeri', active: false },
  { label: 'Detail Galeri', href: '/daftar-galeri', active: true },
];

function GalleryDetailPage() {
  const { id } = useParams(); // Get the gallery ID from the URL
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return (
      <Layout>
        {/* <Breadcrumbs items={breadcrumbItems} /> */}
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        {/* <Breadcrumbs items={breadcrumbItems} /> */}
        <Alert variant="danger" className="text-center my-5">
          {error}
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
      <Row className="mt-4">
        <Col>
          <h3 className="text-center mb-4">Detail Galeri</h3>
          <Card className="border shadow p-3">
            <Card.Body>
              <Row>
                <Col md={4} className="text-center">
                  <Image
                    src={gallery.imageGaleri}
                    alt={gallery.caption}
                    fluid
                    className="border rounded"
                  />
                </Col>
                <Col md={8}>
                  <h4>{gallery.caption}</h4>
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
        </Col>
      </Row>
    </Layout>
  );
}

export default GalleryDetailPage;
