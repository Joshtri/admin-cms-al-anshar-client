import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import Layout from '../Layout';
import api from '../../config/api'; // Import Axios instance

function ArticleDetailPage() {
  const { id } = useParams(); // Dapatkan ID dari URL
  const [article, setArticle] = useState(null); // State untuk artikel
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State error

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/article/${id}`); // API untuk mendapatkan artikel
        setArticle(response.data.data); // Set data artikel ke state
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Gagal memuat detail artikel.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center my-5">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center my-5">
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Row className="my-3">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
            <Breadcrumb.Item href="/daftar-artikel">Daftar Artikel</Breadcrumb.Item>
            <Breadcrumb.Item active>Detail Artikel</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row>
        <Col md={8} className="mx-auto">
          <div className="border rounded p-4 shadow-sm">
            <h3 className="mb-4">{article.judul}</h3>
            {article.coverImageUrl && (
              <div className="text-center mb-4">
                <img
                  src={article.coverImageUrl}
                  alt="Cover"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  className="rounded"
                />
              </div>
            )}
            <p>
              <strong>Deskripsi Singkat:</strong> {article.deskripsiSingkat || 'Tidak ada deskripsi.'}
            </p>
            <p>
              <strong>Konten:</strong>
            </p>
            <div dangerouslySetInnerHTML={{ __html: article.konten }}></div>
            <p>
              <strong>Status:</strong> {article.statusArtikel}
            </p>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default ArticleDetailPage;
