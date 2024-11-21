import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Breadcrumb, Modal } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Layout from '../Layout';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../config/api';

function ArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/article');
        const articlesData = Array.isArray(response.data) ? response.data : response.data.data;
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
        alert('Gagal mengambil data artikel.');
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.judul.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    if (!id) {
      alert('ID artikel tidak ditemukan.');
      return;
    }
    setSelectedArticle(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedArticle) {
      alert('Artikel tidak ditemukan.');
      setShowModal(false);
      return;
    }

    try {
      await api.delete(`/article/${selectedArticle}`);
      setArticles(prevArticles => prevArticles.filter(article => article._id !== selectedArticle));
      alert('Artikel berhasil dihapus.');
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Gagal menghapus artikel.');
      setShowModal(false);
    }
  };

  const handleEdit = (id) => {
    if (!id) {
      alert('ID artikel tidak ditemukan.');
      return;
    }
    navigate(`/artikel/edit/${id}`); // Navigasi ke halaman detail dengan ID artikel
  };

  const handleDetail = (id) => {
    if (!id) {
      alert('ID artikel tidak ditemukan.');
      return;
    }
    navigate(`/artikel/${id}`); // Navigasi ke halaman detail dengan ID artikel
  };

  return (
    <Layout>
      <Row className="my-3">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
            <Breadcrumb.Item active>Data Artikel</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <h1>Daftar Artikel</h1>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Cari Artikel..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={6} className="text-end">
          <Link to="/tambah-artikel" className="btn btn-primary">
            Tambah Artikel Baru
          </Link>
        </Col>
      </Row>

      <Row>
        <Col>
          <DataTable
            headers={['#', 'Judul', 'Konten', 'Deskripsi Singkat', 'Cover', 'Status', 'Actions']}
            data={paginatedArticles.map((article, index) => ({
              '#': startIndex + index + 1,
              Judul: article.judul,
              Konten: `${article.konten.slice(0, 50)}...`,
              'Deskripsi Singkat': article.deskripsiSingkat || 'Tidak Ada',
              Cover: article.coverImageUrl ? (
                <img
                  src={article.coverImageUrl}
                  alt="Cover"
                  style={{ width: '50px', height: '50px' }}
                />
              ) : (
                'Tidak Ada'
              ),
              Status: article.statusArtikel,
              Actions: (
                <div className="d-flex justify-content-evenly">
                  <Button variant="info" size="sm" onClick={() => handleDetail(article._id)} title="Detail">
                    <FaEye />
                  </Button>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(article._id)} title="Edit">
                    <FaEdit />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(article._id)} title="Hapus">
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus artikel ini?</Modal.Body>
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

export default ArticleListPage;
