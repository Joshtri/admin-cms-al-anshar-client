import { NavLink, Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function Navbar() {
  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
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
            <NavDropdown title="Data" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/daftar-artikel">
                Data Artikel
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/data-pengumuman">
                Data Pengumuman
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/daftar-galeri">
                Galeri Kegiatan
              </NavDropdown.Item>
            </NavDropdown>
          </ul>

          {/* Right side: Profil dropdown */}
          <ul className="navbar-nav ms-auto">
            <NavDropdown
              title={
                <>
                  <img
                    src="https://via.placeholder.com/30"
                    alt="User Avatar"
                    className="rounded-circle me-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span>Profil</span>
                </>
              }
              id="profile-dropdown"
              align="end"
            >
              {/* <NavDropdown.Item as={NavLink} to="/profil">
                Lihat Profil
              </NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
