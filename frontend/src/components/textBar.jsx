import React from 'react'
import useStore from './store';
import { useState } from 'react';


function TextBar() {

    const text = useStore((state) => state.text); // to get text input
    const setText = useStore((state) => state.setText); // to store text input
    const setAnalysis = useStore((state) => state.setAnalysis); // to store backend result
    const setEnterPressed = useStore((state) => state.setEnterPressed); // to store enter pressed state

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


    return (

        
            <div className="w-[800px] h-[250px] bg-base-100 rounded-xl p-6 shadow border border-base-200">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                            setEnterPressed(true); // Set enter pressed state
                            e.preventDefault(); // Prevent newline in textarea
                            handleSubmit(); // Call the submit function
                            setText(''); // Clear the input after submission
                            }
                        }}
                    
                    placeholder="Enter the sentence"
                    className="flex-1 w-full resize-none bg-transparent border-none outline-none text-neutral text-lg placeholder:text-neutral/60"
                />

            </div>            
        
                // {/* <div className="flex flex-col items-center justify-center min-h-screen">
                    
                //     <input
                //         type="text"
                //         placeholder="Enter a sentence"
                //         className="w-full max-w-md p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                //         value={text}
                //         onChange={(e) => setText(e.target.value)}
                //     />
                    
                // </div> */}



            

    );
}

export default TextBar
