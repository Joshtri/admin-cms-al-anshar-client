import React from "react";
import PropTypes from "prop-types";
import Navbar from "../components/partials/Navbar";
import Footer from "../components/partials/Footer";
import { Container } from "react-bootstrap";

function Layout({ children }) {
  return (
    <>
        <Navbar/>
            <div className="mt-4 mb-5">
              <Container>
                {children}
              </Container>
            </div>
        <Footer/>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
