import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import Layout from '../Layout';
import Breadcrumbs from '../../components/BreadCrumbs';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PengumumanListPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const itemsPerPage = 5;

  // Fetch data from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/v1/pengumuman');
        console.log('API Response:', response.data); // Log API response
        setAnnouncements(response.data.data || []); // Default to empty array if no data
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch pengumuman.');
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Filter pengumuman berdasarkan pencarian
  const filteredAnnouncements = announcements.filter((announcement) =>
    (announcement.judul_pengumuman || '').toLowerCase().includes(searchQuery.toLowerCase())
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
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/pengumuman/${id}`);
        setAnnouncements(announcements.filter((announcement) => announcement._id !== id));
        alert("Pengumuman berhasil dihapus.");
      } catch (error) {
        console.error("Error menghapus pengumuman:", error.message);
        alert("Gagal menghapus pengumuman. Silakan coba lagi.");
      }
    }
  };
  

  const handleEdit = (id) => {
    console.log(`Edit pengumuman dengan ID: ${id}`);
    // Tambahkan logika edit data
  };

  const handleDetail = (id) => {
    console.log(`Detail pengumuman dengan ID: ${id}`);
    // Tambahkan logika detail data
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <Alert variant="danger" className="text-center my-5">
            {error}
          </Alert>
        </Container>
      </Layout>
    );
  }

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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
          <Col md={6} className="text-end">
            <Link className="btn btn-primary" to="/tambah-pengumuman">
              Tambah Pengumuman Baru
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable
              headers={['#', 'Title', 'Deskripsi', 'Date', 'Berkas (PDF)', 'Actions']}
              data={paginatedAnnouncements.map((announcement, index) => ({
                '#': startIndex + index + 1,
                Title: announcement.judul_pengumuman || '(No Title)',
                Deskripsi: announcement.deskripsi_pengumuman || '(No Description)',
                Date: announcement.tanggal_pengumuman || '(No Date)',
                Berkas: announcement.berkas_pengumuman_pdf ? (
                  <div className="d-flex justify-content-center">
                    <a
                      href={announcement.berkas_pengumuman_pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Lihat Berkas"
                    >
                      <FaFilePdf color="red" className="fs-4" /> {/* Tambahkan class fs-4 untuk ukuran besar */}
                    </a>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">(No File)</div>
                ),
                
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
                      onClick={() => handleDelete(announcement._id)}
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
