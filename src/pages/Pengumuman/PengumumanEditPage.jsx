import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Spinner, Alert, Row, Col, Breadcrumb } from 'react-bootstrap';
import Layout from '../Layout';

function PengumumanEditPage() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();

  const [pengumuman, setPengumuman] = useState({
    judul_pengumuman: '',
    tanggal_pengumuman: '',
    deskripsi_pengumuman: '',
  });
  const [file, setFile] = useState(null); // File PDF baru
  const [loading, setLoading] = useState(false);

  // Fetch data pengumuman
  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/pengumuman/${id}`);
        if (response.data.data) {
          setPengumuman({
            judul_pengumuman: response.data.data.judul_pengumuman || '',
            tanggal_pengumuman: response.data.data.tanggal_pengumuman || '',
            deskripsi_pengumuman: response.data.data.deskripsi_pengumuman || '',
          });
        } else {
          console.error('Data pengumuman tidak ditemukan.');
        }
      } catch (error) {
        console.error('Error fetching pengumuman:', error);
        alert('Gagal memuat data pengumuman.');
      } finally {
        setLoading(false);
      }
    };
    fetchPengumuman();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPengumuman({ ...pengumuman, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('judul_pengumuman', pengumuman.judul_pengumuman);
    formData.append('tanggal_pengumuman', pengumuman.tanggal_pengumuman);
    formData.append('deskripsi_pengumuman', pengumuman.deskripsi_pengumuman);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/pengumuman/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {
        alert('Pengumuman berhasil diperbarui!');
        navigate('/pengumuman'); // Redirect ke halaman pengumuman
      } else {
        alert('Terjadi kesalahan saat memperbarui pengumuman.');
      }
    } catch (error) {
      console.error('Error updating pengumuman:', error);
      alert('Gagal memperbarui pengumuman.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      <Row className="my-4">
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">Beranda</Breadcrumb.Item>
            <Breadcrumb.Item href="/data-pengumuman">Daftar Pengumuman</Breadcrumb.Item>
            <Breadcrumb.Item active>Tambah Pengumuman</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="d-flex align-items-center justify-content-between">
          <Button variant="secondary" onClick={() => navigate('/daftar-artikel')}>
            Kembali
          </Button>
        </Col>
        <h3 className="text-center mt-3">Edit Pengumuman</h3>
        <hr />
      </Row>


      {/* <h1 className="text-center mb-4">Edit Pengumuman</h1> */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
          <Form.Group className="mb-3">
            <Form.Label>Judul Pengumuman</Form.Label>
            <Form.Control
              type="text"
              name="judul_pengumuman"
              value={pengumuman.judul_pengumuman}
              onChange={handleChange}
              placeholder="Masukkan judul pengumuman"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tanggal Pengumuman</Form.Label>
            <Form.Control
              type="date"
              name="tanggal_pengumuman"
              value={pengumuman.tanggal_pengumuman}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deskripsi Pengumuman</Form.Label>
            <Form.Control
              as="textarea"
              name="deskripsi_pengumuman"
              value={pengumuman.deskripsi_pengumuman}
              onChange={handleChange}
              rows={5}
              placeholder="Masukkan deskripsi pengumuman"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>File PDF Baru (Opsional)</Form.Label>
            <Form.Control type="file" accept=".pdf" onChange={handleFileChange} />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => navigate('/data-pengumuman')}>
              Batal
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </Form>
      )}
    </Layout>
  );
}

export default PengumumanEditPage;
