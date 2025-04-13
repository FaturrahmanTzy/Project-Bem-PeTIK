import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import foto1 from "../assets/1.jpg";
import foto2 from "../assets/2.jpg";
import foto3 from "../assets/3.jpg";
import "./carousel.css";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";

const Carousel = () => {
    return (
        <div>
            <div>
                <div
                    id="bemCarousel"
                    className=" carousel slide carousel-fade overflow-hidden shadow-lg"
                    data-bs-ride="carousel"
                    data-bs-interval="5000"
                    data-bs-pause="hover"
                >
                    {/* Indicators */}
                    <div className="carousel-indicators">
                        <button 
                            type="button" 
                            data-bs-target="#bemCarousel" 
                            data-bs-slide-to="0" 
                            className="active" 
                            aria-current="true" 
                            aria-label="Slide 1"
                        ></button>
                        <button 
                            type="button" 
                            data-bs-target="#bemCarousel" 
                            data-bs-slide-to="1" 
                            aria-label="Slide 2"
                        ></button>
                        <button 
                            type="button" 
                            data-bs-target="#bemCarousel" 
                            data-bs-slide-to="2" 
                            aria-label="Slide 3"
                        ></button>
                    </div>

                    {/* Slides */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={foto1} className="d-block w-100 carousel-img" alt="BEM PeTIK Activities" />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
                                <div className="caption-content p-4 p-lg-5">
                                    <span className="badge bg-warning text-dark mb-3 px-3 py-2 fw-normal">BEM PeTIK 2024/2025</span>
                                    <h2 className="display-4 fw-bold mb-4">Penggerak Perubahan <br/>di Lingkungan Kampus</h2>
                                    <p className="lead mb-4">Mewujudkan kampus yang dinamis melalui program kerja inovatif dan kolaboratif</p>
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-warning btn-lg px-4 rounded-pill fw-bold d-flex align-items-center">
                                            Jelajahi Kegiatan <FaArrowRight className="ms-2" />
                                        </button>
                                        <button className="btn btn-outline-light btn-lg px-4 rounded-pill fw-bold">
                                            Tentang Kami
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="carousel-item">
                            <img src={foto2} className="d-block w-100 carousel-img" alt="BEM PeTIK Team" />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
                                <div className="caption-content p-4 p-lg-5">
                                    <span className="badge bg-warning text-dark mb-3 px-3 py-2 fw-normal">Kepemimpinan</span>
                                    <h2 className="display-4 fw-bold mb-4">Wadah Pengembangan <br/>Diri Mahasiswa</h2>
                                    <p className="lead mb-4">Membentuk pemimpin muda yang berkarakter dan berintegritas</p>
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-warning btn-lg px-4 rounded-pill fw-bold d-flex align-items-center">
                                            Lihat Struktur <FaArrowRight className="ms-2" />
                                        </button>
                                        <button className="btn btn-outline-light btn-lg px-4 rounded-pill fw-bold">
                                            Bergabung
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="carousel-item">
                            <img src={foto3} className="d-block w-100 carousel-img" alt="BEM PeTIK Events" />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
                                <div className="caption-content p-4 p-lg-5">
                                    <span className="badge bg-warning text-dark mb-3 px-3 py-2 fw-normal">Inovasi</span>
                                    <h2 className="display-4 fw-bold mb-4">Kolaborasi untuk <br/>Kemajuan Bersama</h2>
                                    <p className="lead mb-4">Menghadirkan solusi kreatif melalui program kerja yang berdampak</p>
                                    <div className="d-flex gap-3">
                                        <button className="btn btn-warning btn-lg px-4 rounded-pill fw-bold d-flex align-items-center">
                                            Program Kerja <FaArrowRight className="ms-2" />
                                        </button>
                                        <button className="btn btn-outline-light btn-lg px-4 rounded-pill fw-bold">
                                            Event Terbaru
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#bemCarousel" data-bs-slide="prev">
                        <FaChevronLeft className="control-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#bemCarousel" data-bs-slide="next">
                        <FaChevronRight className="control-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;