import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Layout from '../Layout';
import Breadcrumbs from '../../components/BreadCrumbs';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';

function GalleryListPage() {
  // Dummy data untuk galeri
  const galleries = [
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      title: 'Gallery 1',
      description: 'This is gallery 1',
      date: '2024-11-01',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      title: 'Gallery 2',
      description: 'This is gallery 2',
      date: '2024-11-02',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/100',
      title: 'Gallery 3',
      description: 'This is gallery 3',
      date: '2024-11-03',
    },
  ];

  // State untuk pencarian dan pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter galeri berdasarkan pencarian
  const filteredGalleries = galleries.filter(gallery =>
    gallery.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredGalleries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGalleries = filteredGalleries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Breadcrumbs items
  const breadcrumbItems = [
    { label: 'Beranda', href: '/dashboard', active: false },
    { label: 'Daftar Galeri', href: '/daftar-galeri', active: true },
  ];

  // Aksi tombol
  const handleDelete = (id) => {
    console.log(`Hapus galeri dengan ID: ${id}`);
    // Tambahkan logika hapus data
  };

  const handleEdit = (id) => {
    console.log(`Edit galeri dengan ID: ${id}`);
    // Tambahkan logika edit data
  };

  const handleDetail = (id) => {
    console.log(`Detail galeri dengan ID: ${id}`);
    // Tambahkan logika detail data
  };

  return (
    <Layout>
      <Container>
        <Row className="my-4">
          <Col>
            <Breadcrumbs items={breadcrumbItems} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <h1>Daftar Galeri</h1>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Cari Galeri..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col md={6} className="text-end">
            <Link to='/tambah-galeri' className="btn btn-primary">Tambah Galeri Baru</Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable
              headers={['#', 'Image', 'Title', 'Description', 'Date', 'Actions']}
              data={paginatedGalleries.map((gallery, index) => ({
                '#': startIndex + index + 1,
                Image: (
                  <Image
                    src={gallery.image}
                    alt={gallery.title}
                    thumbnail
                    width={50}
                    height={50}
                  />
                ),
                Title: gallery.title,
                Description: gallery.description,
                Date: gallery.date,
                Actions: (
                  <div className="d-flex justify-content-evenly">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleDetail(gallery.id)}
                      title="Detail"
                    >
                      <FaEye />
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(gallery.id)}
                      title="Edit"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(gallery.id)}
                      title="Hapus"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ),
              }))}
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default GalleryListPage;
