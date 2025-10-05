import React from 'react'
import Navbar from '../components/navbar.jsx';
import TextBar from '../components/textBar.jsx';
import OutputContainer from '../components/outputContainer.jsx';
import SideContainer from '../components/sideContainer.jsx';
import Test from '../components/test.jsx';
import Footer from '../components/footer.jsx';
import LeftBar from '../components/leftBar.jsx'
import useStore from '../components/store.js';
import { useEffect } from 'react';

function analyze() {
  const setAction = useStore((state) => state.setAction)

  useEffect(() => {
      setAction('Analyze');
    }, [setAction]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="flex flex-col gap-4">
          <TextBar className='w-[800px] h-[250px]' />
          <OutputContainer className='w-[800px] min-h-[250px] max-h-[250px]' />
        </div>
      </div>
      <SideContainer />
    </>
  )
}

export default analyze