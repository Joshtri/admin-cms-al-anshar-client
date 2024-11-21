import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Image, Modal } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Layout';
// import Breadcrumbs from '../../components/BreadCrumbs';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';

function GalleryListPage() {
  const [galleries, setGalleries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const itemsPerPage = 5;
  const navigate = useNavigate();

  // Fetch data dari API
  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/galeri`);
        setGalleries(response.data.data);
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

  const handleDelete = (id) => {
    setSelectedGallery(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/galeri/${selectedGallery}`);
      setGalleries(galleries.filter((gallery) => gallery._id !== selectedGallery));
      setShowModal(false);
    } catch (err) {
      console.error('Gagal menghapus galeri:', err);
      setShowModal(false);
    }
  };

  return (
    <Layout>
        <Row className="my-4">
          <Col>
            {/* <Breadcrumbs
              items={[
                { label: 'Beranda', href: '/dashboard', active: false },
                { label: 'Daftar Galeri', href: '/daftar-galeri', active: true },
              ]}
            /> */}
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

        {/* Konfirmasi Modal */}
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
