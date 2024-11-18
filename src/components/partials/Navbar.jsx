// import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
// import { useEffect, useState } from 'react';

function Navbar() {
  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CMS | Masjid Al-Anshar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left side links */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/dashboard">
                Dashboard
              </NavLink>
            </li>

            
            {/* <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/posted-article">
                Posting Artikel
              </NavLink>
            </li> */}
            

           
            <NavDropdown title='Data' id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/daftar-artikel">
                    Data Artikel
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/data-pengumuman">
                    Data Pengumuman
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/galeri-kegiatan">
                    Galeri Kegiatan
                </NavDropdown.Item>
            </NavDropdown>
            
          </ul>

          {/* Right side logout button */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/* <button className='btn btn-danger' onClick={handleLogout}>
                Logout
              </button> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar