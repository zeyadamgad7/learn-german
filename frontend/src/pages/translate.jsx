import React from 'react'
import DropDown from '../components/dropDown'
import TextBar from '../components/textBar'
import OutputContainer from '../components/outputContainer'
import useStore from '../components/store'
import { useEffect } from 'react'

function translate() {

  const setSourceLanguage = useStore((state) => state.setSourceLanguage)
  const setTargetLanguage = useStore((state) => state.setTargetLanguage)
  const sourceLabel = useStore((state) => state.sourceLabel)
  const setSourceLabel = useStore((state) => state.setSourceLabel)
  const targetLabel = useStore((state) => state.targetLabel)
  const setTargetLabel = useStore((state) => state.setTargetLabel)
  const label = useStore((state) => state.label)
  const setLabel = useStore((state) => state.setLabel)
  const setAction = useStore((state) => state.setAction)

  useEffect(() => {
    setAction('Translate');
  }, [setAction]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-base-200 gap-4">
        {/* Left column (Source) */}
        <div className="flex flex-col items-start">
          <DropDown setLanguage={setSourceLanguage} label={sourceLabel} setLabel={setSourceLabel} />
          <TextBar className="w-[500px] h-[200px] mt-2" />
        </div>

        {/* Right column (Target) */}
        <div className="flex flex-col items-start">
          <DropDown setLanguage={setTargetLanguage} label={targetLabel} setLabel={setTargetLabel} />
          <OutputContainer className="w-[500px] h-[200px] mt-2" />
        </div>
      </div>




      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="flex flex-row space-x-4 mb-0">
          <DropDown setLanguage={setSourceLanguage} label="Select Source" />
          <DropDown setLanguage={setTargetLanguage} label="Select Target" />
        </div>
        <HorizontalDivider />
      </div> */}


    </>
  )
}

export default translate