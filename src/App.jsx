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

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/' element={<LoginPage/>}/>


          <Route path='/daftar-artikel' element={<ArticleListPage/>}/>
          <Route path='/tambah-artikel' element={<ArticleAddPage/>}/>
          <Route path='/galeri/:id' element={<GalleryDetailPage/>}/>


          <Route path='/data-pengumuman' element={<PengumumanListPage/>}/>
          <Route path='/tambah-pengumuman' element={<PengumumanAddPage/>}/>

          <Route path='/daftar-galeri' element={<GalleryListPage/>}/>
          <Route path='/tambah-galeri' element={<GalleryAddPage/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
