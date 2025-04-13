import { NavLink } from 'react-router-dom';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";
import { FaHome, FaBook, FaUsers, FaInfoCircle, FaSignInAlt, FaSitemap } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-gradient-primary text-white sticky-top shadow-lg">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark py-3">
                    <div className="container-fluid">
                        <NavLink 
                            className="navbar-brand d-flex align-items-center fw-bold me-5" 
                            to="/"
                        >
                            <span className="logo-text">
                                <span className="text-warning">BEM</span> 
                                <span className="text-white"> PeTIK</span>
                            </span>
                        </NavLink>
                        
                        <button 
                            className="navbar-toggler border-0" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#navbarNav" 
                            aria-controls="navbarNav" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto align-items-lg-center">
                                <li className="nav-item mx-3">
                                    <NavLink 
                                        to="/" 
                                        className={({ isActive }) => 
                                            `nav-link d-flex align-items-center ${isActive ? "active-link" : ""}`
                                        }
                                    >
                                        <FaHome className="me-2" />
                                        Beranda
                                    </NavLink>
                                </li>
                                
                                <li className="nav-item mx-3">
                                    <NavLink 
                                        to="/divisi" 
                                        className={({ isActive }) => 
                                            `nav-link d-flex align-items-center ${isActive ? "active-link" : ""}`
                                        }
                                    >
                                        <FaSitemap className="me-2" />
                                        Divisi
                                    </NavLink>
                                </li>
                                
                                <li className="nav-item mx-3">
                                    <NavLink 
                                        to="/laporandevisi" 
                                        className={({ isActive }) => 
                                            `nav-link d-flex align-items-center ${isActive ? "active-link" : ""}`
                                        }
                                    >
                                        <FaBook className="me-2" />
                                        Laporan Divisi
                                    </NavLink>
                                </li>
                                
                                <li className="nav-item mx-3">
                                    <NavLink 
                                        to="/kepengurusan" 
                                        className={({ isActive }) => 
                                            `nav-link d-flex align-items-center ${isActive ? "active-link" : ""}`
                                        }
                                    >
                                        <FaUsers className="me-2" />
                                        Kepengurusan
                                    </NavLink>
                                </li>
                                
                                <li className="nav-item mx-3">
                                    <NavLink 
                                        to="/about" 
                                        className={({ isActive }) => 
                                            `nav-link d-flex align-items-center ${isActive ? "active-link" : ""}`
                                        }
                                    >
                                        <FaInfoCircle className="me-2" />
                                        Tentang Kami
                                    </NavLink>
                                </li>
                            </ul>

                            <div className="d-flex align-items-center auth-buttons">
                                <NavLink 
                                    to="/login" 
                                    className="btn btn-outline-light rounded-pill px-3 py-2 d-flex align-items-center"
                                >
                                    <FaSignInAlt className="me-2" />
                                    Login
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;