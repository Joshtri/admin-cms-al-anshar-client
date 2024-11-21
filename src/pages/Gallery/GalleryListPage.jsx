import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Image, Modal, Breadcrumb } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';

function GalleryListPage() {
  const [galleries, setGalleries] = useState([]); // State galeri
  const [searchQuery, setSearchQuery] = useState(''); // State pencarian
  const [currentPage, setCurrentPage] = useState(1); // State halaman pagination
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(''); // State error
  const [showModal, setShowModal] = useState(false); // State modal konfirmasi
  const [selectedGallery, setSelectedGallery] = useState(null); // ID galeri yang akan dihapus

  const itemsPerPage = 5; // Jumlah item per halaman
  const navigate = useNavigate();

  // Fetch data dari API
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/galeri`);
        setGalleries(response.data.data); // Set data galeri ke state
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data galeri.');
        setLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  // Filter galeri berdasarkan pencarian
  const filteredGalleries = galleries.filter((gallery) =>
    gallery.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredGalleries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGalleries = filteredGalleries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Tampilkan modal konfirmasi
  const handleDelete = (id) => {
    setSelectedGallery(id); // Set ID galeri yang akan dihapus
    setShowModal(true); // Tampilkan modal konfirmasi
  };

  // Konfirmasi hapus galeri
  const confirmDelete = async () => {
    try {
      // Kirim permintaan DELETE ke backend
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/galeri/${selectedGallery}`);

      // Perbarui daftar galeri
      setGalleries(galleries.filter((gallery) => gallery._id !== selectedGallery));

      setShowModal(false); // Sembunyikan modal
      alert('Galeri berhasil dihapus!');
    } catch (err) {
      console.error('Gagal menghapus galeri:', err);
      alert('Terjadi kesalahan saat menghapus galeri.');
      setShowModal(false); // Sembunyikan modal
    }
  };

  return (
    <Layout>
      {/* Breadcrumbs */}
      <Row className="my-3">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
            <Breadcrumb.Item active>Daftar Galeri</Breadcrumb.Item>
          </Breadcrumb>
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={6} className="text-end">
          <Link to="/tambah-galeri" className="btn btn-primary">
            Tambah Galeri Baru
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <DataTable
              headers={['#', 'Image', 'Caption', 'Description', 'Date', 'Actions']}
              data={paginatedGalleries.map((gallery, index) => ({
                '#': startIndex + index + 1,
                Image: (
                  <Image
                    src={gallery.imageGaleri}
                    alt={gallery.caption}
                    thumbnail
                    width={50}
                    height={50}
                  />
                ),
                Caption: gallery.caption,
                Description: gallery.deskripsi_caption,
                Date: new Date(gallery.tanggal_caption).toLocaleDateString(),
                Actions: (
                  <div className="d-flex justify-content-evenly">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => navigate(`/galeri/${gallery._id}`)}
                      title="Detail"
                    >
                      <FaEye />
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => navigate(`/galeri/edit/${gallery._id}`)}
                      title="Edit"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(gallery._id)}
                      title="Hapus"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ),
              }))}
            />
          )}
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

      {/* Modal Konfirmasi */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus galeri ini?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default GalleryListPage;
