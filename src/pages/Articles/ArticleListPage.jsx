import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Layout from '../Layout';
import Breadcrumbs from '../../components/BreadCrumbs';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import api from '../../config/api'; // Import Axios instance

function ArticleListPage() {
  // State untuk artikel
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Ambil artikel dari API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/article'); // Endpoint API

        // Pastikan respons berupa array
        const articlesData = Array.isArray(response.data) ? response.data : response.data.data;
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching articles:', error);
        alert('Gagal mengambil data artikel.');
      }
    };

    fetchArticles();
  }, []);

  // Filter artikel berdasarkan pencarian
  const filteredArticles = Array.isArray(articles)
    ? articles.filter(article =>
        article.judul.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const breadcrumbItems = [
    { label: 'Beranda', href: '/dashboard', active: false },
    { label: 'Daftar Artikel', href: '/daftar-artikel', active: true },
  ];

  const handleDelete = async (id) => {
    try {
      await api.delete(`/article/${id}`); // Endpoint untuk menghapus artikel
      alert('Artikel berhasil dihapus.');
      setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Gagal menghapus artikel.');
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit artikel dengan ID: ${id}`);
    // Tambahkan navigasi ke halaman edit
  };

  const handleDetail = (id) => {
    console.log(`Detail artikel dengan ID: ${id}`);
    // Tambahkan navigasi ke halaman detail
  };

  return (
    <Layout>
        {/* Breadcrumbs */}
        <Row className="my-4">
          <Col>
            <Breadcrumbs items={breadcrumbItems} />
          </Col>
        </Row>

        {/* Header */}
        <Row className="mb-3">
          <Col>
            <h1>Daftar Artikel</h1>
          </Col>
        </Row>

        {/* Search and Add Button */}
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

        {/* Data Table */}
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
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleDetail(article.id)}
                      title="Detail"
                    >
                      <FaEye />
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(article.id)}
                      title="Edit"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
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

        {/* Pagination */}
        <Row>
          <Col className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Col>
        </Row>

    </Layout>
  );
}

export default ArticleListPage;
