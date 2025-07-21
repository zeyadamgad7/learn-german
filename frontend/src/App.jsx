import React from 'react'
import Navbar from './components/navbar.jsx';
import TextBar from './components/textBar.jsx';
import OutputContainer from './components/outputContainer.jsx';
import SideContainer from './components/sideContainer.jsx';
import Test from './components/test.jsx';
import Footer from './components/footer.jsx';

function App() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="flex flex-col gap-6">
          <TextBar />
          <OutputContainer /> 
        </div>
      </div>
      <SideContainer />
      <Footer />
    </>
  )
}

export default App