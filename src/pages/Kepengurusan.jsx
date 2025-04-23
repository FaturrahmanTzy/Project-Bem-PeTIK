import React from 'react';
import { FaUserTie, FaUsers, FaFileAlt, FaMoneyBillWave, FaBullhorn, FaCalendarAlt, FaChalkboardTeacher, FaBroom, FaHeartbeat, FaLightbulb, FaHandshake, FaUtensils, FaGraduationCap } from 'react-icons/fa';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./kepengurusan.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import anggota1 from "../assets/ketua.jpg";
import anggota2 from "../assets/sekretaris1.jpg";
import anggota3 from "../assets/dapur1.jpg";
import anggota4 from "../assets/bendahara1.jpg";
import anggota5 from "../assets/kesehatan1.jpg";
import anggota6 from "../assets/pendidikan1.jpg";
import anggota7 from "../assets/kebersihan1.jpg";

const PengurusBEM = () => {
    // Data pengurus BEM PeTIK dengan gambar lokal
    const pengurus = [
        {
            id: 1,
            name: "Sudarman",
            position: "Ketua BEM",
            division: "Pimpinan",
            bio: "Memimpin seluruh kegiatan BEM, bertanggung jawab atas visi dan misi organisasi serta koordinasi antar divisi",
            photo: anggota1,
            social: { email: "sudarman@petik.ac.id", instagram: "@sudarman_petik" },
            achievements: ["Juara 1 Hackathon Nasional 2023", "Best Leader Award 2022"]
        },
        {
            id: 2,
            name: "Muhammad Riza Al-Fahri",
            position: "Wakil Ketua",
            division: "Pimpinan",
            bio: "Mendampingi ketua dalam menjalankan tugas dan menggantikan ketua ketika berhalangan",
            photo: anggota2,
            social: { email: "riza@petik.ac.id", instagram: "@riza_alfahri" },
            achievements: ["Koordinator PeTIK Mengajar 2023", "Duta Kampus 2022"]
        },
        {
            id: 3,
            name: "Risky Agustian",
            position: "Koordinator Logistik",
            division: "Logistik",
            bio: "Bertanggung jawab atas pengelolaan logistik dan perlengkapan kegiatan BEM",
            photo: anggota3,
            social: { email: "risky@petik.ac.id", instagram: "@risky_agust" },
            achievements: ["Manajer Logistik Terbaik 2023", "Organizer Tech Week 2022"]
        },
        {
            id: 4,
            name: "Firdaus Al-Ayubi",
            position: "Bendahara",
            division: "Keuangan",
            bio: "Mengelola keuangan BEM, membuat laporan keuangan, dan bertanggung jawab atas dana organisasi",
            photo: anggota4,
            social: { email: "firdaus@petik.ac.id", instagram: "@firdaus_ayubi" },
            achievements: ["Best Financial Manager 2023", "Fundraising Champion 2022"]
        },
        {
            id: 5,
            name: "Muhammad Ilmiannur",
            position: "Koordinator Kesehatan",
            division: "Kesehatan",
            bio: "Mengkoordinasikan program kesehatan mahasiswa dan kegiatan olahraga kampus",
            photo: anggota5,
            social: { email: "ilmiannur@petik.ac.id", instagram: "@ilmiannur_health" },
            achievements: ["Penghargaan Kampus Sehat 2023", "Organizer PeTIK Marathon 2022"]
        },
        {
            id: 6,
            name: "Kholis Ibrohim",
            position: "Koordinator Pendidikan",
            division: "Pendidikan",
            bio: "Mengembangkan program akademik dan non-akademik untuk peningkatan kualitas belajar mahasiswa",
            photo: anggota6,
            social: { email: "kholis@petik.ac.id", instagram: "@kholis_edu" },
            achievements: ["Best Education Program 2023", "Creative Learning Award 2022"]
        },
        {
            id: 7,
            name: "Ikhsan Prasetyo",
            position: "Koordinator Kebersihan",
            division: "Kebersihan",
            bio: "Mengawasi kebersihan lingkungan pesantren PeTIK dan mengorganisir kegiatan bersih-bersih",
            photo: anggota7,
            social: { email: "ikhsan@petik.ac.id", instagram: "@ikhsan_clean" },
            achievements: ["Green Campus Award 2023", "Eco Warrior 2022"]
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
            case 'Pendidikan': return <FaChalkboardTeacher className="text-warning" />;
            case 'Kebersihan': return <FaBroom className="text-success" />;
            case 'Kesehatan': return <FaHeartbeat className="text-danger" />;
            case 'Logistik': return <FaUtensils className="text-info" />;
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
            case 'Pendidikan': return 'warning';
            case 'Kebersihan': return 'success';
            case 'Kesehatan': return 'danger';
            case 'Logistik': return 'info';
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
                        <p className="lead mb-4">Tim profesional yang berdedikasi untuk kemajuan kampus dan mahasiswa</p>
                        <div className="d-flex justify-content-center gap-3">
                            <Button variant="warning" size="lg" className="rounded-pill px-4 fw-bold">
                                Periode 2024/2025
                            </Button>
                            <Button variant="outline-light" size="lg" className="rounded-pill px-4 fw-bold">
                                Struktur Organisasi
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
                                <p className="mb-0 fs-5">Pengurus Inti</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-lg rounded-4 bg-gradient-green text-white h-100">
                            <Card.Body className="text-center py-4">
                                <h3 className="fw-bold display-5 mb-3">
                                    {new Set(pengurus.map(p => p.division)).size}
                                </h3>
                                <p className="mb-0 fs-5">Bidang Divisi</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-lg rounded-4 bg-gradient-orange text-white h-100">
                            <Card.Body className="text-center py-4">
                                <h3 className="fw-bold display-5 mb-3">12+</h3>
                                <p className="mb-0 fs-5">Program Unggulan</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Leadership Team */}
                <h2 className="text-center fw-bold mb-5 display-4 text-gradient" data-aos="fade-up">
                    <span className="text-primary">Struktur</span> <span className="text-warning">Pimpinan</span>
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
                    <span className="text-primary">Koordinator</span> <span className="text-warning">Divisi</span>
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