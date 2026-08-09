import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    // Helper function to close the drawer after clicking a link
    const closeDrawer = () => {
        const drawerCheckbox = document.getElementById('nav-drawer');
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    };

    return (
        <div className="navbar bg-base-100 shadow-sm text-base-content">
            
            {/* --- Left Side: Drawer Menu --- */}
            <div className="navbar-start">
                <div className="drawer z-50">
                    <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
                    
                    <div className="drawer-content">
                        <label htmlFor="nav-drawer" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> 
                            </svg>
                        </label>
                    </div> 
                    
                    <div className="drawer-side">
                        <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-100 min-h-full w-80 p-4 text-base-content">
                            <li className="mb-4 text-xl font-bold text-primary px-4 mt-2">Menu</li>
                            <li><Link to="/" onClick={closeDrawer}>Homepage</Link></li>
                            <li><Link to="/analyze" onClick={closeDrawer}>Analyze</Link></li>
                            <li><Link to="/translate" onClick={closeDrawer}>Translate</Link></li>
                            <li><Link to="/review" onClick={closeDrawer}>Review</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* --- Center: Brand/Logo --- */}
            <div className="navbar-center">
                <Link to="/" className="btn btn-ghost text-xl font-bold tracking-wide text-primary">
                    Learn-German
                </Link>
            </div>
            
            {/* --- Right Side: Profile Dropdown --- */}
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full border border-primary/20">
                            {/* Make sure the path to your image is correct based on your folder structure */}
                            <img src='./src/assets/images/profile.svg' alt="Profile" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge badge-primary badge-sm">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
            
        </div>
    );
};

export default Navbar;
