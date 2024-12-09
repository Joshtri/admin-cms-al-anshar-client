import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ArticleListPage from './pages/Articles/ArticleListPage';
import PengumumanListPage from './pages/Pengumuman/PengumumanListPage';
import GalleryListPage from './pages/Gallery/GalleryListPage';
import ArticleAddPage from './pages/Articles/ArticleAddPage';
import GalleryAddPage from './pages/Gallery/GalleryAddPage';
import ArticleDetailPage from './pages/Articles/ArticleDetailPage';
import GalleryDetailPage from './pages/Gallery/GalleryDetailPage';
import PengumumanAddPage from './pages/Pengumuman/PengumumanAddPage';
import PengumumanEditPage from './pages/Pengumuman/PengumumanEditPage';
import GalleryEditPage from './pages/Gallery/GalleryEditPage';
import ArticleEditPage from './pages/Articles/ArticleEditPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<ProtectedRoute element={DashboardPage} allowedRoles={['admin']}/>}/>
          
          <Route path='/' element={<LoginPage/>}/>


          <Route path='/daftar-artikel' element={<ProtectedRoute element={ArticleListPage} allowedRoles={['admin']}/>}/>
          <Route path='/tambah-artikel' element={<ProtectedRoute element={ArticleAddPage} allowedRoles={['admin']}/>}/>
          <Route path='/artikel/:id' element={<ProtectedRoute element={ArticleDetailPage} allowedRoles={['admin']}/>}/>
          <Route path='/artikel/edit/:id' element={<ProtectedRoute element={ArticleEditPage} allowedRoles={['admin']}/>}/>


          <Route path='/data-pengumuman' element={<ProtectedRoute element={PengumumanListPage} allowedRoles={['admin']}/>}/>
          <Route path='/tambah-pengumuman' element={<ProtectedRoute element={PengumumanAddPage} allowedRoles={['admin']}/>}/>
          <Route path="/pengumuman/edit/:id" element={<ProtectedRoute element={PengumumanEditPage} allowedRoles={['admin']}/>} />


          <Route path='/daftar-galeri' element={<ProtectedRoute element={GalleryListPage} allowedRoles={['admin']}/>}/>
          <Route path='/tambah-galeri' element={<ProtectedRoute element={GalleryAddPage} allowedRoles={['admin']}/>}/>
          <Route path='/galeri/:id' element={<ProtectedRoute element={GalleryDetailPage} allowedRoles={['admin']}/>}/>
          <Route path='/galeri/edit/:id' element={<ProtectedRoute element={GalleryEditPage} allowedRoles={['admin']}/>}/>

          

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
