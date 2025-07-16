import React from 'react';

const Navbar = () => {
    return (
        <nav className="w-full flex justify-end items-center p-4 bg-gray-100 shadow-md fixed top-0 left-0 z-50">
            <button className="mr-4 px-4 py-2 border-none bg-blue-700 text-white rounded cursor-pointer">
                Sign In
            </button>
            <button className="px-4 py-2 border-none bg-green-700 text-white rounded cursor-pointer">
                Sign Up
            </button>
        </nav>
    );
};

export default Navbar;
