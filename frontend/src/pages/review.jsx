import React, { act } from 'react'
import TextBar from '../components/textBar'
import OutputContainer from '../components/outputContainer'
import SideContainer from '../components/sideContainer'
import useStore from '../components/store'
import { useEffect } from 'react'

function review() {

  const setAction = useStore((state) => state.setAction)

  useEffect(() => {
    setAction('Review');
  }, [setAction]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="flex flex-col gap-4">
          <TextBar className='w-[800px] h-[250px]' />
          <OutputContainer className='w-[800px] min-h-[250px] max-h-[250px]' />
        </div>
      </div>
    </>
  )
}

export default review