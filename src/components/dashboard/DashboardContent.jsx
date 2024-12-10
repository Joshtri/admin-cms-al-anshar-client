import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import DashboardCard from './DashboardCard';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaRegChartBar } from 'react-icons/fa';
import axios from 'axios';

function DashboardContent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  // State untuk menyimpan data total
  const [totals, setTotals] = useState({
    articles: 0,
    announcements: 0,
    galleries: 0,
  });

  const cards = [
    { title: 'Artikel', content: `Memiliki ${totals.articles} Artikel`, Icon: AiOutlineUser },
    { title: 'Pengumuman', content: `Memiliki ${totals.announcements} Pengumuman`, Icon: AiOutlineShoppingCart },
    { title: 'Galeri', content: `Memiliki ${totals.galleries} Galeri`, Icon: FaRegChartBar },
  ];

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    const storedRole = localStorage.getItem('role');

    if (storedFirstName && storedLastName && storedRole) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
      setRole(storedRole);
    } else {
      console.error('User data not found in localStorage');
    }

    // Fetch data totals
    const fetchTotals = async () => {
      try {
        const [articleRes, announcementRes, galleryRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/article-count`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/pengumuman-total`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/galeri-count`),
        ]);

        setTotals({
          articles: articleRes.data.data.total || 0,
          announcements: announcementRes.data.data.total || 0,
          galleries: galleryRes.data.data.total || 0,
        });
      } catch (error) {
        console.error('Failed to fetch totals:', error);
      }
    };

    fetchTotals();
  }, []);

  return (
    <Container className="mt-4">
      {/* Welcome Message */}
      <Alert variant="info" className="text-center">
        {firstName && lastName ? (
          `Selamat Datang, ${firstName} ${lastName}! (${role.toUpperCase()})`
        ) : (
          'Welcome to the dashboard!'
        )}
      </Alert>

      <h2>Dashboard Overview</h2>
      <Row>
        {cards.map((card, index) => (
          <Col key={index} md={4}>
            <DashboardCard title={card.title} content={card.content} Icon={card.Icon} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DashboardContent;
