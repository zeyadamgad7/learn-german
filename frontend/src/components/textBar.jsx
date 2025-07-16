import React from 'react'
import useStore from './store';


function textBar() {

    const text = useStore((state) => state.text); // to get text input
    const setText = useStore((state) => state.setText); // to store text input

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            
            <input
                type="text"
                placeholder="Enter a sentence"
                className="w-full max-w-md p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            
        </div>
    );
}

export default textBar
