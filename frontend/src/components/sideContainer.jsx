import React from 'react';

const SideContainer = () => {
    return (
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 w-[300px] flex flex-col items-start bg-base-100 rounded-xl shadow-lg p-4 space-y-2 text-neutral border border-base-200">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <h1 >Nominative</h1>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-200"></div>
                <h1 >Accusative</h1>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <h1 >Dative</h1>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                <h1 >Genitive</h1>
            </div>
        </div>

    );
};

export default SideContainer;