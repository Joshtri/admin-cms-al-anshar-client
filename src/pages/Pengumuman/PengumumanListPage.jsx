import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Ikon untuk aksi
import Layout from '../Layout';
import Breadcrumbs from '../../components/BreadCrumbs';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';

function PengumumanListPage() {
  // Dummy data untuk pengumuman
  const announcements = [
    { id: 1, title: 'Pengumuman 1', author: 'Admin 1', date: '2024-11-01' },
    { id: 2, title: 'Pengumuman 2', author: 'Admin 2', date: '2024-11-02' },
    { id: 3, title: 'Pengumuman 3', author: 'Admin 3', date: '2024-11-03' },
  ];

  // State untuk pencarian dan pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter pengumuman berdasarkan pencarian
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAnnouncements = filteredAnnouncements.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Breadcrumbs items
  const breadcrumbItems = [
    { label: 'Beranda', href: '/dashboard', active: false },
    { label: 'Daftar Pengumuman', href: '/daftar-pengumuman', active: true },
  ];

  // Aksi tombol
  const handleDelete = (id) => {
    console.log(`Hapus pengumuman dengan ID: ${id}`);
    // Tambahkan logika hapus data
  };

  const handleEdit = (id) => {
    console.log(`Edit pengumuman dengan ID: ${id}`);
    // Tambahkan logika edit data
  };

  const handleDetail = (id) => {
    console.log(`Detail pengumuman dengan ID: ${id}`);
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
            <h1>Daftar Pengumuman</h1>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Cari Pengumuman..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary">Tambah Pengumuman Baru</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable
              headers={['#', 'Title', 'Author', 'Date', 'Actions']}
              data={paginatedAnnouncements.map((announcement, index) => ({
                '#': startIndex + index + 1,
                Title: announcement.title,
                Author: announcement.author,
                Date: announcement.date,
                Actions: (
                  <div className="d-flex justify-content-evenly">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleDetail(announcement.id)}
                      title="Detail"
                    >
                      <FaEye />
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(announcement.id)}
                      title="Edit"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(announcement.id)}
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

export default PengumumanListPage;
