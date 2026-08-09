import React from 'react'
import useStore from './store';

function button() {

    const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),  // send it as JSON
      });
      if (!response.ok) throw new Error('Request failed');

            const data = await response.json();
            setAnalysis(data); // store the result

    } catch (err) {
      console.error('Error:', err);
    }
  };

  const text = useStore((state) => state.text); // to get text input
  const setAnalysis = useStore((state) => state.setAnalysis); // to store backend result

  return (
    <div className="fixed bottom-86 right-111">
            <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" 
                onClick={()=>{handleSubmit();}}
            >Enter</button>
        </div>
  )
}

export default button