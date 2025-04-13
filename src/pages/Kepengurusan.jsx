import React from 'react';
import { FaUserTie, FaUserFriends, FaFileAlt, FaMoneyBillWave, FaBullhorn, FaCalendarAlt, FaCameraRetro, FaUsers, FaGraduationCap, FaUtensils, FaBroom, FaHeartbeat, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./kepengurusan.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import anggota1 from "../assets/anggota1.jpg";
import anggota2 from "../assets/anggota2.jpg";
import anggota3 from "../assets/anggota3.jpg";
import anggota4 from "../assets/anggota4.jpg";
import anggota5 from "../assets/anggota5.jpg";
import anggota6 from "../assets/anggota6.jpg";
import anggota7 from "../assets/anggota7.jpg";

const PengurusBEM = () => {
    // Data pengurus BEM PeTIK dengan gambar lokal
    const pengurus = [
        {
            id: 1,
            name: "IchWan Nurfitrah",
            position: "Ketua BEM",
            division: "Pimpinan",
            bio: "Mahasiswa Teknik Informatika angkatan 2020, berpengalaman dalam organisasi kampus dan pengembangan software",
            photo: anggota1,
            social: { email: "ichwan@petik.ac.id", instagram: "@ichwan_petik" },
            achievements: ["Juara 1 Hackathon Nasional 2023", "Best Leader Award 2022"]
        },
        {
            id: 2,
            name: "Izan Mar'i",
            position: "Wakil Ketua",
            division: "Pimpinan",
            bio: "Mahasiswa Sistem Informasi angkatan 2021, aktif dalam kegiatan kemahasiswaan dan pengabdian masyarakat",
            photo: anggota2,
            social: { email: "izan@petik.ac.id", instagram: "@izan_mar" },
            achievements: ["Koordinator PeTIK Mengajar 2023", "Duta Kampus 2022"]
        },
        {
            id: 3,
            name: "Risky Agustian",
            position: "Sekretaris",
            division: "Sekretariat",
            bio: "Mahasiswa Teknologi Informasi angkatan 2021, memiliki kemampuan administrasi dan dokumentasi yang baik",
            photo: anggota3,
            social: { email: "risky@petik.ac.id", instagram: "@risky_agust" },
            achievements: ["Penulis Terbaik BEM 2023", "Organizer Tech Week 2022"]
        },
        {
            id: 4,
            name: "Sudarman",
            position: "Bendahara",
            division: "Keuangan",
            bio: "Mahasiswa Akuntansi angkatan 2020, berpengalaman dalam pengelolaan keuangan organisasi dan fundraising",
            photo: anggota4,
            social: { email: "sudarman@petik.ac.id", instagram: "@sudarman_petik" },
            achievements: ["Best Financial Manager 2023", "Fundraising Champion 2022"]
        },
        {
            id: 5,
            name: "Muhammad Fatih",
            position: "Koordinator Humas",
            division: "Humas",
            bio: "Mahasiswa Komunikasi angkatan 2021, memiliki jaringan luas dan kemampuan komunikasi yang baik",
            photo: anggota5,
            social: { email: "fatih@petik.ac.id", instagram: "@fatih_humas" },
            achievements: ["Best Public Speaker 2023", "Media Partner Award 2022"]
        },
        {
            id: 6,
            name: "Eka Putri",
            position: "Koordinator Acara",
            division: "Acara",
            bio: "Mahasiswa Manajemen angkatan 2021, berpengalaman mengorganisir berbagai event kampus berskala besar",
            photo: anggota6,
            social: { email: "eka@petik.ac.id", instagram: "@eka_putri" },
            achievements: ["Best Event Organizer 2023", "Creative Award 2022"]
        },
        {
            id: 7,
            name: "Fikri Hidayat",
            position: "Koordinator Media",
            division: "Media",
            bio: "Mahasiswa Desain Komunikasi Visual angkatan 2022, ahli dalam desain grafis dan konten digital",
            photo: anggota7,
            social: { email: "fikri@petik.ac.id", instagram: "@fikri_media" },
            achievements: ["Best Design Award 2023", "Social Media Growth 200%"]
        }
    ];

    // Initialize AOS animations
    React.useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    const getDivisionIcon = (division) => {
        switch(division) {
            case 'Pimpinan': return <FaUserTie className="text-primary" />;
            case 'Sekretariat': return <FaFileAlt className="text-secondary" />;
            case 'Keuangan': return <FaMoneyBillWave className="text-success" />;
            case 'Humas': return <FaBullhorn className="text-danger" />;
            case 'Acara': return <FaCalendarAlt className="text-info" />;
            case 'Media': return <FaCameraRetro className="text-dark" />;
            default: return <FaUsers className="text-primary" />;
        }
    };

    const getDivisionColor = (division) => {
        switch(division) {
            case 'Pimpinan': return 'primary';
            case 'Sekretariat': return 'secondary';
            case 'Keuangan': return 'success';
            case 'Humas': return 'danger';
            case 'Acara': return 'info';
            case 'Media': return 'dark';
            default: return 'primary';
        }
    };

    return (
        <div className="kepengurusan-page">
            <Header />
            
            {/* Hero Section */}
            <section className="kepengurusan-hero bg-gradient-primary text-white py-5" data-aos="fade">
                <Container>
                    <div className="text-center py-5">
                        <h1 className="display-4 fw-bold mb-3">Kepengurusan BEM PeTIK</h1>
                        <p className="lead mb-4">Tim penggerak perubahan dan inovasi di lingkungan kampus</p>
                        <div className="d-flex justify-content-center gap-3">
                            <Button variant="warning" size="lg" className="rounded-pill px-4 fw-bold">
                                Periode 2024/2025
                            </Button>
                            <Button variant="outline-light" size="lg" className="rounded-pill px-4 fw-bold">
                                Lihat Struktur
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Main Content */}
            <Container className="py-5">
                {/* Statistics */}
                <Row className="g-4 mb-5" data-aos="fade-up">
                    <Col md={4}>
                        <Card className="border-0 shadow-lg rounded-4 bg-gradient-blue text-white h-100">
                            <Card.Body className="text-center py-4">
                                <h3 className="fw-bold display-5 mb-3">{pengurus.length}</h3>
                                <p className="mb-0 fs-5">Total Pengurus</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-lg rounded-4 bg-gradient-green text-white h-100">
                            <Card.Body className="text-center py-4">
                                <h3 className="fw-bold display-5 mb-3">
                                    {new Set(pengurus.map(p => p.division)).size}
                                </h3>
                                <p className="mb-0 fs-5">Divisi</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-lg rounded-4 bg-gradient-orange text-white h-100">
                            <Card.Body className="text-center py-4">
                                <h3 className="fw-bold display-5 mb-3">7+</h3>
                                <p className="mb-0 fs-5">Program Kerja</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Leadership Team */}
                <h2 className="text-center fw-bold mb-5 display-4 text-gradient" data-aos="fade-up">
                    <span className="text-primary">Tim</span> <span className="text-warning">Pimpinan</span>
                </h2>
                <Row className="g-4 mb-5">
                    {pengurus.filter(p => p.division === 'Pimpinan').map((pengurus, index) => (
                        <Col md={6} key={pengurus.id} data-aos="fade-up" data-aos-delay={index * 100}>
                            <Card className="border-0 shadow-lg rounded-4 h-100 leadership-card">
                                <Card.Body className="p-4 d-flex flex-column flex-md-row align-items-center">
                                    <div className="mb-3 mb-md-0 me-md-4">
                                        <img 
                                            src={pengurus.photo} 
                                            alt={pengurus.name}
                                            className="rounded-circle img-thumbnail"
                                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="text-center text-md-start">
                                        <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
                                            {getDivisionIcon(pengurus.division)}
                                            <h4 className="fw-bold ms-2 mb-0">{pengurus.name}</h4>
                                        </div>
                                        <Badge bg={getDivisionColor(pengurus.division)} className="mb-3">
                                            {pengurus.position}
                                        </Badge>
                                        <p className="mb-3">{pengurus.bio}</p>
                                        <div className="d-flex justify-content-center justify-content-md-start gap-2">
                                            <Button variant="outline-primary" size="sm" className="rounded-pill">
                                                <i className="bi bi-envelope me-1"></i> Email
                                            </Button>
                                            <Button variant="outline-info" size="sm" className="rounded-pill">
                                                <i className="bi bi-instagram me-1"></i> Instagram
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* All Members */}
                <h2 className="text-center fw-bold mb-5 display-4 text-gradient" data-aos="fade-up">
                    <span className="text-primary">Anggota</span> <span className="text-warning">BEM</span>
                </h2>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {pengurus.filter(p => p.division !== 'Pimpinan').map((pengurus, index) => (
                        <Col key={pengurus.id} data-aos="fade-up" data-aos-delay={index * 50}>
                            <Card className="border-0 shadow-lg rounded-4 h-100 pengurus-card">
                                <div className="position-relative">
                                    <img 
                                        src={pengurus.photo} 
                                        alt={pengurus.name}
                                        className="card-img-top rounded-top-4"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <Badge 
                                        pill 
                                        bg={getDivisionColor(pengurus.division)}
                                        className="position-absolute top-0 end-0 m-2"
                                    >
                                        {pengurus.division}
                                    </Badge>
                                </div>
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex align-items-center mb-2">
                                        {getDivisionIcon(pengurus.division)}
                                        <h5 className="fw-bold ms-2 mb-0">{pengurus.name}</h5>
                                    </div>
                                    <Badge bg="secondary" className="mb-3 align-self-start">
                                        {pengurus.position}
                                    </Badge>
                                    <p className="small mb-3">{pengurus.bio}</p>
                                    
                                    <div className="mt-auto">
                                        <div className="mb-3">
                                            {pengurus.achievements.map((achievement, idx) => (
                                                <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                                                    {achievement}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-between small text-muted mb-3">
                                            <span>📧 {pengurus.social.email}</span>
                                        </div>
                                        <Button 
                                            variant="outline-primary" 
                                            className="w-100 rounded-pill"
                                            href={`mailto:${pengurus.social.email}`}
                                        >
                                            Hubungi
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Footer nama="Fatur" noHp="085709196913" email="ftr26022006@gmail.com" sekolah="Pesantren PeTIK" />
        </div>
    );
};

export default PengurusBEM;