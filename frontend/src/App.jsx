import React from 'react'
import Analyze from './pages/analyze.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar.jsx'
import Home from './pages/home.jsx'
import LeftBar from './components/leftBar.jsx'
import Footer from './components/footer.jsx'
import Translate from './pages/translate.jsx'
import Review from './pages/review.jsx'

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/analyze' element={<Analyze />} />
          <Route path='/translate' element={<Translate />} />
          <Route path='/review' element={<Review />} />
        </Routes>
        <LeftBar />
        <Footer />
      </Router>
    </>
  )
}

export default App