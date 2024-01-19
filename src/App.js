import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { Home, About, Cart, Checkout, Error, PrivateRoute, Products, SingleProduct } from './pages'

function App() {
  return <>
  {/* Router configuration */}
    <Router>
      {/* Share Navbar (Desktop) and Sidebar (Mobile) in all routes*/}
      <Navbar />
      <Sidebar />
      {/* Application routes */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='cart' element={<Cart />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:id' element={<SingleProduct />} />
        {/* Restrict checkout page access to logged users. */}
        <Route path='checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  </>
}

export default App
