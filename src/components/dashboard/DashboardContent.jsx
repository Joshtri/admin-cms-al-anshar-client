import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import DashboardCard from './DashboardCard';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaRegChartBar } from 'react-icons/fa';

function DashboardContent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');

  const cards = [
    { title: 'Artikel', content: 'Memiliki 1 Artikel', Icon: AiOutlineUser },
    { title: 'Pengumuman', content: 'Memiliki 1 Pengumuman', Icon: AiOutlineShoppingCart },
    { title: 'Galeri', content: 'Memiliki 12 galeri.', Icon: FaRegChartBar },
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
