import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import Blogs from './pages/Blogs'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BlogDetail from './pages/BlogDetail';
const App = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/result' element={<Result/>} />
        <Route path='/buy' element={<BuyCredit/>} />
        <Route path='/blogs' element={<Blogs/>} />
  <Route path='/blogs/:id' element={<BlogDetail />} />
        

      </Routes>
      <Footer />
    </div>
  )
}

export default App
