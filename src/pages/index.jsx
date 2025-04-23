import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { 
  FaUserTie, FaUserFriends, FaFileAlt, FaMoneyBillWave, 
  FaBullhorn, FaCalendarAlt, FaCameraRetro, FaArrowRight,
  FaHeartbeat, FaBroom, FaUtensils, FaGraduationCap, 
  FaMoneyBillAlt, FaPenAlt, FaLaptopCode, FaMicrophone, FaChalkboardTeacher, 
  FaPaintBrush,
} from "react-icons/fa";
import { FaBriefcase, FaQuoteLeft,FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa";
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



// Import foto anggota
import ketua from "../assets/anggota1.jpeg";
import anggota1 from "../assets/ketua.jpg";
import anggota2 from "../assets/sekretaris1.jpg";
import anggota3 from "../assets/dapur1.jpg";
import anggota4 from "../assets/bendahara1.jpg";
import anggota5 from "../assets/kesehatan1.jpg";
import anggota6 from "../assets/pendidikan1.jpg";
import anggota7 from "../assets/kebersihan1.jpg";
import dosen from "../assets/dosen.png";
import wakil from "../assets/wakil.jpg";


import alumni1 from "../assets/alumni1.png"; 
import alumni2 from "../assets/alumni2.png";
import alumni3 from "../assets/alumni3.png";
import alumni4 from "../assets/alumni4.png";
import { Link } from "react-router-dom";

const alumniData = [
  {
    id: 1,
    name: "Muhammad Firdaus",
    graduationYear: 2023,
    currentPosition: "Peminatan Pemrograman Web",
    testimonial: "Di Pesantren PeTIK Depok, Firdaus memilih jurusan Peminatan Pemrograman Web. Untuk menjaga semangatnya dalam menjalani perkuliahan, Firdaus selalu mengingat orang tuanya, terutama ibunya yang kini menjadi tumpuan harapannya sejak ayahnya meninggal saat Firdaus masih kelas 3 MTs. “Ayah saya meninggal saat saya kelas 3 mts, waktu itu saya sedang tes wisuda tapi nggak lama ayah saya meninggal dan tidak sempat melihat saya wisuda, jadi saya sangat ingin membuat orangtua saya bangga melihat saya.” Kenang Firdaus.",
    photo: alumni1,
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    id: 2,
    name: "Abdul Kadir Jailani",
    graduationYear: 2018,
    currentPosition: "Network Engineer - PT Data Trust",
    testimonial: "Selama belajar di Pesantren PeTIK, banyak ilmu yang saya dapatkan baik dari ilmu IT maupun Ilmu agama. Walaupun bukan berlatar belakang dari jurusan IT di sekolah sebelumnya, saya terus berusaha untuk dapat menguasainya ketika menjalani pendidikan di Pesantren PeTIK. Saat ini saya bekerja di PT Data Trust sebagai Network Engineer.” Abdul Kadir Jailani, Alumni Mahasantri PeTIK angkatan 4.",
    photo: alumni2,
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    id: 3,
    name: "Aris Sandi",
    graduationYear: 2017,
    currentPosition: "Senior Java Developer",
    testimonial: "Pertama kali masuk Pesantren PeTIK, saya tidak banyak mengetahui tentang komputer bahkan tidak bisa mengoperasikannya. Alhamdulillah setelah menjalani pendidikan di Pesantren PeTIK, saya bisa memiliki kompetensi IT khususnya bidang programing. Saat ini saya bekerja di PT Mitracom Ekasarana Kawasan Mega Kuningan, Gedung The East Tower sebagai Senior Java Developer Aris Sandi Alumni Pesantren PeTIK Angkatan 5",

    photo: alumni3,
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#"
    }
  },
  {
    id: 4,
    name: "Teafanno Entant Anantya Putra",
    graduationYear: 2017,
    currentPosition: "Desainer Grafis - PT. Lanqi Lightbox",
    testimonial: "Saya banyak menerapkan kemampuan yang saya pelajari saat belajar di pesantren PeTIK, terutama dalam hal bersosialisasi dan bekerjasama, sehingga saya bisa mendapatkan pekerjaan sesuai minat saya,",
    photo: alumni4,
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#"
    }
  }
];

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
                                    <Link to="/about" className="text-white text-decoration-none">Pelajari Lebih Lanjut <FaArrowRight className="ms-2" /></Link>
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
            



    
{/* Alumni Section */}
<section className="py-5 bg-light">
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="text-gradient-primary fw-bold">Tentang Alumni</h2>
      <div className="divider mx-auto"></div>
      <p className="text-muted">Mereka yang pernah menjadi bagian dari BEM PeTIK dan kini sukses di berbagai bidang</p>
    </div>
    
    <div className="row g-4">
      {alumniData.map((alumni, index) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const truncatedTestimonial = alumni.testimonial.length > 150 
          ? alumni.testimonial.substring(0, 150) + "..."
          : alumni.testimonial;

        return (
          <div className="col-md-6 col-lg-3" key={alumni.id} data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="card border-0 shadow-sm h-100 alumni-card">
              <div className="card-img-top position-relative overflow-hidden" style={{height: '200px'}}>
                <img 
                  src={alumni.photo} 
                  alt={alumni.name}
                  className="w-100 h-100 object-fit-cover"
                />
                <div className="position-absolute bottom-0 start-0 end-0 p-3 text-white" 
                  style={{background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)'}}>
                  <h5 className="mb-0 fw-bold">{alumni.name}</h5>
                  <small>Lulus {alumni.graduationYear}</small>
                </div>
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                  <FaGraduationCap className="text-primary me-2" />
                  <small className="text-muted">Angkatan {alumni.graduationYear}</small>
                </div>
                <p className="mb-3">
                  <FaBriefcase className="text-primary me-2" />
                  {alumni.currentPosition}
                </p>
                <div className="bg-light p-3 rounded mb-3 position-relative flex-grow-1">
                  <FaQuoteLeft className="text-primary opacity-25" size={24} />
                  <p className="mb-0 testimonial-text">
                    {isExpanded ? alumni.testimonial : truncatedTestimonial}
                    {alumni.testimonial.length > 150 && (
                      <button 
                        className="btn btn-link p-0 ms-2 text-primary"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? 'Lebih Sedikit' : 'Selengkapnya'}
                      </button>
                    )}
                  </p>
                </div>
                <div className="d-flex justify-content-center gap-2 mt-auto">
                  <a href={alumni.social.linkedin} className="btn btn-sm btn-outline-primary rounded-circle">
                    <FaLinkedin />
                  </a>
                  <a href={alumni.social.twitter} className="btn btn-sm btn-outline-primary rounded-circle">
                    <FaTwitter />
                  </a>
                  <a href={alumni.social.instagram} className="btn btn-sm btn-outline-primary rounded-circle">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    
    <div className="text-center mt-5">
      <button className="btn btn-primary px-4 py-2 rounded-pill">
        <Link to="/alumni" className="text-white text-decoration-none">
          Lihat Semua Alumni <FaUserFriends className="ms-2" />
        </Link>
      </button>
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
                                            src={dosen}
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
                                            src={ketua} 
                                            alt="Testimoni" 
                                            className="rounded-circle me-3" 
                                            width="50"
                                        />
                                        <div>
                                            <h6 className="fw-bold mb-0">Muhammad Faturrahman</h6>
                                            <small className="text-muted">Ketua BEM PeTIK 2024</small>
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
                                            src={wakil}
                                            alt="Testimoni" 
                                            className="rounded-circle me-3" 
                                            width="50"
                                        />
                                        <div>
                                            <h6 className="fw-bold mb-0">Muhammad Riza Al-Fahri</h6>
                                            <small className="text-muted">Sekretaris BEM PeTIK 2024</small>
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
                            <a href="https://pmbt.petik.or.id/" target="_blank" className="text-decoration-none text-black">Daftar Sekarang</a>
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
            <style>
                
            </style>
        </div>
    );
};

export default Home;