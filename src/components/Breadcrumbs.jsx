// import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Breadcrumbs({ items }) {
  return (
    <Breadcrumb>
      {items.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          href={item.href || '#'}
          active={item.active}
        >
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
};

export default Breadcrumbs;
