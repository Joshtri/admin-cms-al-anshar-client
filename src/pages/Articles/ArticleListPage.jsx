import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Import ikon
import Layout from '../Layout';
import Breadcrumbs from '../../components/BreadCrumbs';
import DataTable from '../../components/DataTable';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';

function ArticleListPage() {
  const articles = [
    { id: 1, title: 'Article 1', author: 'Author 1', date: '2024-11-01' },
    { id: 2, title: 'Article 2', author: 'Author 2', date: '2024-11-02' },
    { id: 3, title: 'Article 3', author: 'Author 3', date: '2024-11-03' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const breadcrumbItems = [
    { label: 'Beranda', href: '/dashboard', active: false },
    { label: 'Daftar Artikel', href: '/daftar-artikel', active: true },
  ];

  const handleDelete = (id) => {
    console.log(`Hapus artikel dengan ID: ${id}`);
    // Tambahkan logika hapus data di sini
  };

  const handleEdit = (id) => {
    console.log(`Edit artikel dengan ID: ${id}`);
    // Tambahkan logika edit data di sini
  };

  const handleDetail = (id) => {
    console.log(`Detail artikel dengan ID: ${id}`);
    // Tambahkan logika detail data di sini
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
            {/* <Button href='/tambah-artikel' variant="primary"></Button> */}
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable
              headers={['#', 'Title', 'Author', 'Date', 'Actions']}
              data={paginatedArticles.map((article, index) => ({
                '#': startIndex + index + 1,
                Title: article.title,
                Author: article.author,
                Date: article.date,
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

export default ArticleListPage;
