import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardCard from './DashboardCard';
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaRegChartBar } from 'react-icons/fa';

function DashboardContent() {
  const cards = [
    { title: 'Users', content: 'You have 200 users.', Icon: AiOutlineUser },
    { title: 'Sales', content: 'Sales reached $5,000.', Icon: AiOutlineShoppingCart },
    { title: 'Reports', content: 'You have 12 new reports.', Icon: FaRegChartBar },
  ];

  return (
    <Container className="mt-4">
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
