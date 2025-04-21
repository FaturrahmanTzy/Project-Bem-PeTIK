import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  FaUserTie, FaUserFriends, FaFileAlt, FaMoneyBillWave, 
  FaBullhorn, FaCalendarAlt, FaCameraRetro, FaArrowRight,
  FaHeartbeat, FaBroom, FaUtensils, FaGraduationCap, 
  FaMoneyBillAlt, FaPenAlt, FaLaptopCode, FaMicrophone, FaChalkboardTeacher, 
  FaPaintBrush
} from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import About from "../assets/about.jpg";
import Event1 from "../assets/event1.png";
import Event2 from "../assets/event2.png";
import Event3 from "../assets/event3.png";
import Achievement1 from "../assets/achievement1.png";
import Achievement2 from "../assets/achievement2.png";

// Import foto anggota
import anggota1 from "../assets/anggota1.jpeg";
import anggota2 from "../assets/anggota2.jpg";
import anggota3 from "../assets/anggota3.jpg";
import anggota4 from "../assets/anggota4.jpg";
import anggota5 from "../assets/anggota5.jpg";
import anggota6 from "../assets/anggota6.jpg";
import anggota7 from "../assets/anggota7.jpg";
import fatur from "../assets/fa.jpeg";
import { Link } from "react-router-dom";

const anggota = [
    { nama: "Sudarman", jabatan: "Ketua BEM", foto: anggota1, icon: <FaUserTie size={24} className="mb-2" /> },
    { nama: "Muhammad Riza Al-Fahri", jabatan: "Wakil Ketua", foto: anggota2, icon: <FaUserFriends size={24} className="mb-2" /> },
    { nama: "Risky Agustian", jabatan: "Koordinator Dapur", foto: anggota3, icon: <FaFileAlt size={24} className="mb-2" /> },
    { nama: "Firdaus Al-Ayubi", jabatan: "Bendahara", foto: anggota4, icon: <FaMoneyBillWave size={24} className="mb-2" /> },
    { nama: "Muhammad Ilmiannur", jabatan: "Kesehatan/olahraga", foto: anggota5, icon: <FaHeartbeat size={24} className="mb-2" /> },
    { nama: "Kholis Ibrohim", jabatan: "Koordinator Pendidikan", foto: anggota6, icon: <FaChalkboardTeacher size={24} className="mb-2" /> },
    { nama: "Ikhsan Prasetyo", jabatan: "Koordinator Kebersihan", foto: anggota7, icon: <FaCameraRetro size={24} className="mb-2" /> },
];

const events = [
  {
    title: "PeTIK Leadership Summit 2023",
    date: "15 November 2023",
    description: "Acara tahunan pelatihan kepemimpinan untuk mahasiswa dengan pembicara dari berbagai latar belakang industri",
    image: Event1,
    category: "Pelatihan"
  },
  {
    title: "Tech Innovation Week",
    date: "5-10 Desember 2023",
    description: "Serangkaian workshop dan kompetisi teknologi terkini untuk mengasah keterampilan digital mahasiswa",
    image: Event2,
    category: "Teknologi"
  },
  {
    title: "PeTIK Charity Festival",
    date: "20 Januari 2024",
    description: "Acara amal tahunan dengan berbagai pertunjukan dan bazaar untuk mendukung pendidikan anak kurang mampu",
    image: Event3,
    category: "Sosial"
  }
];

const achievements = [
  {
    title: "Juara 1 Lomba Debat Nasional 2023",
    description: "Tim debat BEM PeTIK meraih juara 1 dalam kompetisi debat antar perguruan tinggi se-Indonesia",
    image: Achievement1,
    year: 2023
  },
  {
    title: "Penghargaan Organisasi Terinovatif 2022",
    description: "BEM PeTIK mendapatkan penghargaan sebagai organisasi mahasiswa terinovatif dari Kemendikbud",
    image: Achievement2,
    year: 2022
  }
];

const programs = [
  {
    name: "PeTIK Mengajar",
    description: "Program mengajar di sekolah-sekolah terpencil oleh mahasiswa PeTIK",
    icon: <GiTeacher size={32} className="text-primary" />
  },
  {
    name: "Digital Literacy Camp",
    description: "Pelatihan literasi digital untuk masyarakat umum",
    icon: <FaLaptopCode size={32} className="text-primary" />
  },
  {
    name: "Public Speaking Club",
    description: "Klub latihan berbicara di depan umum setiap minggu",
    icon: <FaMicrophone size={32} className="text-primary" />
  },
  {
    name: "Art and Creativity Workshop",
    description: "Workshop pengembangan kreativitas melalui seni",
    icon: <FaPaintBrush size={32} className="text-primary" />
  }
];

const Home = () => {
    const pimpinan = anggota.filter(item =>
        item.jabatan.toLowerCase().includes("ketua")
    );

    const anggotaLain = anggota.filter(item =>
        !item.jabatan.toLowerCase().includes("ketua")
    );

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    const eventSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    useEffect(() => {
        AOS.init({ 
            duration: 800, 
            once: true,
            easing: 'ease-out-quart'
        });
    }, []);

    return (
        <div className="bg-light">
            <Header />
            <Carousel />
            
            {/* About Section */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="text-gradient-primary fw-bold">Tentang BEM PeTIK</h2>
                        <div className="divider mx-auto"></div>
                        <p className="text-muted">Organisasi penggerak mahasiswa yang inovatif dan inspiratif</p>
                    </div>
                    
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
                            <div className="position-relative">
                                <img 
                                    src={About} 
                                    alt="Tentang BEM" 
                                    className="img-fluid rounded-3 shadow-lg"
                                />
                                <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10 rounded-3"></div>
                            </div>
                        </div>
                        <div className="col-lg-6" data-aos="fade-left">
                            <div className="ps-lg-4">
                                <h3 className="fw-bold mb-4">Visi & Misi Kami</h3>
                                <p className="lead text-muted mb-4">
                                    Menjadi wadah pengembangan diri mahasiswa yang berkarakter, kreatif, dan bertanggung jawab melalui berbagai program kerja yang bermanfaat.
                                </p>
                                
                                <div className="mb-4">
                                    <div className="d-flex mb-3">
                                        <div className="me-3 text-primary">
                                            <FaUserTie size={20} />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1">Kepemimpinan</h5>
                                            <p className="text-muted mb-0">Membentuk pemimpin muda yang berintegritas dan visioner</p>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex mb-3">
                                        <div className="me-3 text-danger">
                                            <FaBullhorn size={20} />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1">Aspirasi</h5>
                                            <p className="text-muted mb-0">Menjadi jembatan komunikasi antara mahasiswa dan lembaga</p>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex mb-3">
                                        <div className="me-3 text-success">
                                            <FaCalendarAlt size={20} />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1">Kegiatan</h5>
                                            <p className="text-muted mb-0">Menyelenggarakan acara edukatif dan inspiratif</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="btn btn-primary rounded-pill px-4 py-2">
                                    Pelajari Lebih Lanjut <FaArrowRight className="ms-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="text-gradient-primary fw-bold">Program Unggulan</h2>
                        <div className="divider mx-auto"></div>
                        <p className="text-muted">Berbagai kegiatan yang kami selenggarakan untuk pengembangan mahasiswa</p>
                    </div>
                    
                    <div className="row g-4">
                        {programs.map((program, index) => (
                            <div className="col-md-6 col-lg-3" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="card border-0 shadow-sm h-100 program-card">
                                    <div className="card-body p-4 text-center">
                                        <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mx-auto mb-3 p-3">
                                            {program.icon}
                                        </div>
                                        <h5 className="fw-bold">{program.name}</h5>
                                        <p className="text-muted">{program.description}</p>
                                        <button className="btn btn-sm btn-outline-primary mt-2">
                                            Detail Program
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="text-gradient-primary fw-bold">Struktur Kepengurusan</h2>
                        <div className="divider mx-auto"></div>
                        <p className="text-muted">Tim pengurus BEM PeTIK yang berdedikasi dan profesional</p>
                    </div>
                    
                    <div className="row justify-content-center g-4 mb-5">
                        {pimpinan.map((item, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <div 
                                    className={`card border-0 shadow-sm h-100 overflow-hidden transition-all ${item.jabatan === "Ketua BEM" ? "highlight-leader" : ""}`}
                                    data-aos="zoom-in"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="position-relative">
                                        <img 
                                            src={item.foto} 
                                            className="card-img-top" 
                                            alt={item.nama}
                                            style={{ height: '300px', objectFit: 'cover' }}
                                        />
                                        {item.jabatan === "Ketua BEM" && (
                                            <div className="position-absolute top-0 end-0 bg-primary text-white px-3 py-1 rounded-bl">
                                                Ketua
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-body text-center">
                                        {item.icon}
                                        <h5 className="card-title fw-bold mt-2">{item.nama}</h5>
                                        <p className="card-text text-muted">{item.jabatan}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-5">
                        <h4 className="text-center mb-4 fw-bold">Anggota Inti</h4>
                        <Slider {...sliderSettings}>
                            {anggotaLain.map((item, index) => (
                                <div key={index} className="px-2">
                                    <div 
                                        className="card border-0 shadow-sm h-100 overflow-hidden transition-all"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    >
                                        <img 
                                            src={item.foto} 
                                            className="card-img-top" 
                                            alt={item.nama}
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body text-center">
                                            {item.icon}
                                            <h5 className="card-title fw-bold mt-2">{item.nama}</h5>
                                            <p className="card-text text-muted">{item.jabatan}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            {/* Divisions Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="text-gradient-primary fw-bold">Divisi dan Bidang Khusus</h2>
                        <div className="divider mx-auto"></div>
                        <p className="text-muted">Struktur organisasi yang komprehensif untuk menjalankan berbagai program</p>
                    </div>
                    
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-4" data-aos="fade-up">
                            <div className="card border-0 shadow-sm h-100 division-card">
                                <div className="card-body p-4 text-center">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mx-auto mb-3">
                                        <FaHeartbeat className="text-primary" size={24} />
                                    </div>
                                    <h5 className="fw-bold">Divisi Kesehatan/Olahraga</h5>
                                    <p className="text-muted">
                                        Mengurus program kesehatan kampus dan kegiatan olahraga mahasiswa
                                    </p>
                                    <span className="badge bg-primary bg-opacity-10 text-primary">5 Anggota</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="card border-0 shadow-sm h-100 division-card">
                                <div className="card-body p-4 text-center">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mx-auto mb-3">
                                        <FaBroom className="text-primary" size={24} />
                                    </div>
                                    <h5 className="fw-bold">Divisi Kebersihan</h5>
                                    <p className="text-muted">
                                        Bertanggung jawab atas kebersihan lingkungan kampus dan program eco-campus
                                    </p>
                                    <span className="badge bg-primary bg-opacity-10 text-primary">7 Anggota</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="card border-0 shadow-sm h-100 division-card">
                                <div className="card-body p-4 text-center">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mx-auto mb-3">
                                        <FaUtensils className="text-primary" size={24} />
                                    </div>
                                    <h5 className="fw-bold">Divisi Dapur</h5>
                                    <p className="text-muted">
                                        Mengelola dapur mahasiswa dan program makanan sehat dengan budget terjangkau
                                    </p>
                                    <span className="badge bg-primary bg-opacity-10 text-primary">4 Anggota</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4" data-aos="fade-up">
                            <div className="card border-0 shadow-sm h-100 division-card">
                                <div className="card-body p-4 text-center">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mx-auto mb-3">
                                        <FaGraduationCap className="text-primary" size={24} />
                                    </div>
                                    <h5 className="fw-bold">Divisi Pendidikan</h5>
                                    <p className="text-muted">
                                        Menyelenggarakan program akademik, tutor sebaya, dan pengembangan kurikulum
                                    </p>
                                    <span className="badge bg-primary bg-opacity-10 text-primary">8 Anggota</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="card border-0 shadow-sm h-100 division-card">
                                <div className="card-body p-4 text-center">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mx-auto mb-3">
                                        <FaMoneyBillAlt className="text-primary" size={24} />
                                    </div>
                                    <h5 className="fw-bold">Divisi Keuangan</h5>
                                    <p className="text-muted">
                                        Mengelola keuangan organisasi dan program financial literacy untuk mahasiswa
                                    </p>
                                    <span className="badge bg-primary bg-opacity-10 text-primary">3 Anggota</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="card border-0 shadow-sm h-100 division-card">
                                <div className="card-body p-4 text-center">
                                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle mx-auto mb-3">
                                        <FaPenAlt className="text-primary" size={24} />
                                    </div>
                                    <h5 className="fw-bold">Divisi Sekretariat</h5>
                                    <p className="text-muted">
                                        Mengurus administrasi, dokumentasi, dan korespondensi organisasi
                                    </p>
                                    <span className="badge bg-primary bg-opacity-10 text-primary">6 Anggota</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="text-gradient-primary fw-bold">Kegiatan Terkini</h2>
                        <div className="divider mx-auto"></div>
                        <p className="text-muted">Acara-acara yang sedang dan akan kami selenggarakan</p>
                    </div>
                    
                    <Slider {...eventSettings}>
                        {events.map((event, index) => (
                            <div key={index} className="px-2">
                                <div className="card border-0 shadow-sm h-100" data-aos="fade-up" data-aos-delay={index * 100}>
                                    <img 
                                        src={event.image} 
                                        className="card-img-top" 
                                        alt={event.title}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <span className="badge bg-primary bg-opacity-10 text-primary mb-2">{event.category}</span>
                                        <h5 className="fw-bold">{event.title}</h5>
                                        <p className="text-muted small mb-2">
                                            <FaCalendarAlt className="me-2" /> {event.date}
                                        </p>
                                        <p className="card-text">{event.description}</p>
                                        <button className="btn btn-sm btn-outline-primary">
                                            Detail Kegiatan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    
                    <div className="text-center mt-4">
                        <button className="btn btn-primary px-4">
                            Lihat Semua Kegiatan
                        </button>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="text-gradient-primary fw-bold">Prestasi Kami</h2>
                        <div className="divider mx-auto"></div>
                        <p className="text-muted">Penghargaan dan pencapaian yang telah kami raih</p>
                    </div>
                    
                    <div className="row g-4 justify-content-center">
                        {achievements.map((achievement, index) => (
                            <div className="col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="row g-0">
                                        <div className="col-md-5">
                                            <img 
                                                src={achievement.image} 
                                                className="img-fluid rounded-start h-100" 
                                                alt={achievement.title}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="col-md-7">
                                            <div className="card-body">
                                                <span className="badge bg-primary bg-opacity-10 text-primary mb-2">{achievement.year}</span>
                                                <h5 className="fw-bold">{achievement.title}</h5>
                                                <p className="card-text">{achievement.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="text-gradient-primary fw-bold">Apa Kata Mereka?</h2>
                        <div className="divider mx-auto"></div>
                        <p className="text-muted">Testimoni dari berbagai pihak tentang BEM PeTIK</p>
                    </div>
                    
                    <div className="row g-4">
                        <div className="col-md-4" data-aos="fade-up">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <img 
                                            src={anggota1}
                                            alt="Testimoni" 
                                            className="rounded-circle me-3" 
                                            width="50"
                                        />
                                        <div>
                                            <h6 className="fw-bold mb-0">Indra Ardianto</h6>
                                            <small className="text-muted">Dosen Pembina</small>
                                        </div>
                                    </div>
                                    <p className="card-text">
                                        "BEM PeTIK selalu menunjukkan kinerja yang luar biasa dalam mengorganisir kegiatan mahasiswa. Mereka sangat inovatif dan bertanggung jawab."
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <img 
                                            src={fatur} 
                                            alt="Testimoni" 
                                            className="rounded-circle me-3" 
                                            width="50"
                                        />
                                        <div>
                                            <h6 className="fw-bold mb-0">Muhammad Faturrahman</h6>
                                            <small className="text-muted">Mahasiswa 2024</small>
                                        </div>
                                    </div>
                                    <p className="card-text">
                                        "Bergabung dengan BEM PeTIK mengubah cara pandang saya tentang kepemimpinan. Banyak kesempatan berkembang yang diberikan."
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <img 
                                            src={anggota2}
                                            alt="Testimoni" 
                                            className="rounded-circle me-3" 
                                            width="50"
                                        />
                                        <div>
                                            <h6 className="fw-bold mb-0">Izan Mar'i</h6>
                                            <small className="text-muted">Mahasiswa 2025</small>
                                        </div>
                                    </div>
                                    <p className="card-text">
                                        "Program-program BEM PeTIK sangat bermanfaat bagi masyarakat sekitar. Kami sangat menghargai kerja sama dengan mereka."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

    
            <section className="py-5 bg-gradient-primary text-white">
                <div className="container text-center py-4">
                    <h2 className="fw-bold mb-3">Ayo Bergabung Bersama Kami!</h2>
                    <p className="lead mb-4">Jadilah bagian dari gerakan mahasiswa yang aktif, inspiratif, dan solutif.</p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <button className="btn btn-light btn-lg rounded-pill px-4 fw-bold shadow-sm">
                            Daftar Sekarang
                        </button>
                        <button className="btn btn-outline-light btn-lg rounded-pill px-4 fw-bold">
                            <Link to="/divisi" className="text-white text-decoration-none">Lihat Kegiatan </Link>
                        </button>
                        <button className="btn btn-outline-light btn-lg rounded-pill px-4 fw-bold">
                            Hubungi Kami
                        </button>
                    </div>
                </div>
            </section>
            <br />
            <br />

            <Footer
                nama="Fatur"
                noHp="085709196913"
                email="ftr2602006@gmail.com"
                sekolah="Pesantren PeTIK"
            />
        </div>
    );
};

export default Home;