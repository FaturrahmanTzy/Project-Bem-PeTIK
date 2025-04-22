import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaUsers, FaLightbulb, FaHandshake, FaChartLine, FaBookOpen, FaUserTie, FaUserFriends, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';
import aboutImage from "../assets/about.jpg";
import "./about.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Link } from "react-router-dom";

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-quart'
        });
    }, []);

    return (
        <div className="about-page">
            <Header/>
            
            {/* Hero Section */}
            <div className="about-hero bg-gradient-primary text-white py-5" data-aos="fade">
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
                            <h1 className="display-4 fw-bold mb-4">Tentang <span className="text-warning">BEM PeTIK</span></h1>
                            <p className="lead mb-4">
                                Badan Eksekutif Mahasiswa Pesantren Teknologi Informasi dan Komunikasi (BEM PeTIK) adalah organisasi mahasiswa yang menjadi wadah pengembangan diri, kreativitas, dan kepemimpinan mahasiswa.
                            </p>
                            <div className="d-flex gap-3">
                                <button className="btn btn-warning btn-lg px-4 rounded-pill fw-bold">
                                    Kenali Kami
                                </button>
                                <button className="btn btn-outline-light btn-lg px-4 rounded-pill fw-bold">
                                    <Link to="/kepengurusan" className="text-white text-decoration-none">Struktur Organisasi</Link>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
                            <img src={aboutImage} alt="BEM PeTIK Team" className="img-fluid rounded-4 shadow-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container my-5">
                {/* About Organization */}
                <div className="row mb-5" data-aos="fade-up">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-5">
                                <h2 className="text-primary fw-bold mb-4 text-center">Profil BEM PeTIK</h2>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p className="lead text-muted">
                                            BEM PeTIK merupakan organisasi mahasiswa yang berdiri sejak tahun 2015 dengan tujuan menjadi wadah aspirasi mahasiswa dan mitra strategis bagi pimpinan pesantren dalam mewujudkan visi pendidikan yang berkualitas.
                                        </p>
                                        <p className="text-muted">
                                            Sebagai bagian dari Pesantren Teknologi Informasi dan Komunikasi, kami berkomitmen untuk mengembangkan potensi mahasiswa di bidang teknologi sekaligus mempertahankan nilai-nilai pesantren.
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="text-muted">
                                            Dalam perjalanannya, BEM PeTIK telah melahirkan berbagai program unggulan yang berdampak positif baik bagi mahasiswa maupun masyarakat sekitar. Kami percaya bahwa mahasiswa adalah agen perubahan yang mampu memberikan kontribusi nyata.
                                        </p>
                                        <p className="text-muted">
                                            Dengan semangat kolaborasi dan inovasi, kami terus berupaya menciptakan lingkungan kampus yang dinamis, inklusif, dan berkarakter islami.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Vision & Mission */}
                    <div className="col-lg-6" data-aos="fade-right">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <h3 className="text-primary fw-bold mb-4">Visi & Misi</h3>
                                <div className="d-flex mb-4">
                                    <div className="me-3 text-warning">
                                        <FaLightbulb size={28} />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold">Visi</h5>
                                        <p className="text-muted">
                                            "Menjadi organisasi mahasiswa yang unggul dalam inovasi, kolaborasi, dan integritas untuk mewujudkan kampus yang dinamis serta mahasiswa yang berkarakter islami dan kompeten di bidang teknologi."
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="me-3 text-warning">
                                        <FaChartLine size={28} />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold">Misi</h5>
                                        <ul className="text-muted">
                                            <li className="mb-2">Mengembangkan program kerja yang solutif dan berdampak bagi mahasiswa</li>
                                            <li className="mb-2">Menjadi jembatan aspirasi antara mahasiswa dan pimpinan pesantren</li>
                                            <li className="mb-2">Menguatkan nilai-nilai islami dalam setiap kegiatan</li>
                                            <li className="mb-2">Mendorong pengembangan kompetensi teknologi mahasiswa</li>
                                            <li>Membangun jaringan kolaborasi dengan berbagai pihak</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Structure */}
                    <div className="col-lg-6" data-aos="fade-left">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <h3 className="text-primary fw-bold mb-4">Struktur Organisasi</h3>
                                <div className="d-flex mb-4">
                                    <div className="me-3 text-warning">
                                        <FaUsers size={28} />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold">Kepemimpinan</h5>
                                        <div className="row text-muted">
                                            <div className="col-12 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <FaUserTie className="me-2 text-primary" />
                                                    <span>Ketua BEM: IchWan Nurfitrah</span>
                                                </div>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <FaUserFriends className="me-2 text-primary" />
                                                    <span>Wakil Ketua: Izan Mar'i</span>
                                                </div>
                                            </div>
                                            <div className="col-12 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <FaFileAlt className="me-2 text-primary" />
                                                    <span>Sekretaris: Risky Agustian</span>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-flex align-items-center">
                                                    <FaMoneyBillWave className="me-2 text-primary" />
                                                    <span>Bendahara: Sudarman</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="me-3 text-warning">
                                        <FaHandshake size={28} />
                                    </div>
                                    <div>
                                        <h5 className="fw-bold">Divisi Utama</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="text-muted">
                                                    <li>Divisi Pendidikan</li>
                                                    <li>Divisi Kewirausahaan</li>
                                                    <li>Divisi Media</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="text-muted">
                                                    <li>Divisi Kesehatan</li>
                                                    <li>Divisi Kebersihan</li>
                                                    <li>Divisi Keuangan</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Programs Section */}
                <div className="card border-0 shadow-sm mt-5" data-aos="fade-up">
                    <div className="card-body p-5">
                        <h3 className="text-primary fw-bold mb-4 text-center">Program Unggulan</h3>
                        <div className="row g-4">
                            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                                <div className="program-card p-4 rounded-3 h-100">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mb-3">
                                        <FaBookOpen className="text-primary" size={24} />
                                    </div>
                                    <h5 className="fw-bold">PeTIK Mengajar</h5>
                                    <p className="text-muted">
                                        Program pengabdian masyarakat dengan memberikan pelatihan teknologi informasi kepada masyarakat sekitar pesantren.
                                    </p>
                                    <div className="mt-3">
                                        <span className="badge bg-primary bg-opacity-10 text-primary">Tahunan</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                                <div className="program-card p-4 rounded-3 h-100">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mb-3">
                                        <FaLightbulb className="text-primary" size={24} />
                                    </div>
                                    <h5 className="fw-bold">Tech Innovation Week</h5>
                                    <p className="text-muted">
                                        Ajang tahunan yang menampilkan inovasi teknologi karya mahasiswa dan kompetisi pengembangan aplikasi islami.
                                    </p>
                                    <div className="mt-3">
                                        <span className="badge bg-primary bg-opacity-10 text-primary">November 2024</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
                                <div className="program-card p-4 rounded-3 h-100">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mb-3">
                                        <FaHandshake className="text-primary" size={24} />
                                    </div>
                                    <h5 className="fw-bold">Leadership Camp</h5>
                                    <p className="text-muted">
                                        Pelatihan kepemimpinan intensif selama 3 hari untuk membentuk karakter pemimpin muda yang berintegritas.
                                    </p>
                                    <div className="mt-3">
                                        <span className="badge bg-primary bg-opacity-10 text-primary">Maret 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Join Us Section */}
                <div className="text-center mt-5 pt-4" data-aos="fade-up">
                    <h3 className="fw-bold mb-3">Tertarik Bergabung?</h3>
                    <p className="lead text-muted mb-4">
                        BEM PeTIK membuka kesempatan bagi seluruh mahasiswa untuk berkontribusi dan berkembang bersama.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-primary btn-lg px-4 rounded-pill fw-bold">
                            <a href="https://pmbt.petik.or.id/" target="_blank" className="text-decoration-none text-white">Daftar Sekarang</a>
                        </button>
                        <button className="btn btn-outline-primary btn-lg px-4 rounded-pill fw-bold">
                            <Link to="/divisi" className="text-decoration-none text-primary"> Lihat Kegiatan </Link>
                        </button>
                    </div>
                </div>
            </div>

            <Footer nama="Fatur" noHp="085709196913" email="ftr26022006@gmail.com" sekolah="Pesantren PeTIK" />
        </div>
    );
};

export default About;