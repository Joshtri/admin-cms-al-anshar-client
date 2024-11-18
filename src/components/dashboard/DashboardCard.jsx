import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function DashboardCard({ title, content, Icon }) {
  return (
    <Card className="mb-3 text-center" style={{ width: '18rem' }}>
      <Card.Body>
        <div className="mb-3">
          <Icon size={40} className="text-primary" />
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired, // Expecting a React component for the icon
};

export default DashboardCard;
