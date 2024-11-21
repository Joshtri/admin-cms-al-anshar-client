import React from 'react'
import Layout from '../Layout'
import { Row, Col } from 'react-bootstrap'
// import Breadcrumbs from '../../components/BreadCrumbs';



// const breadcrumbItems = [
//   { label: 'Beranda', href: '/dashboard', active: false },
//   { label: 'Daftar Artikel', href: '/daftar-artikel', active: true },
// ];



function ArticleDetailPage() {
  return (
    <div className='border border-3 border-danger'>
      
    <Layout>

      <div className='container border border-2'>
        <Row>
          <h3>Detail Artikel</h3>
        </Row>
      </div>
    </Layout>
    </div>
  )
}

export default ArticleDetailPage