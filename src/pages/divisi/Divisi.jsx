import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { 
  FaClinicMedical, 
  FaBroom, 
  FaUtensils, 
  FaBook, 
  FaMoneyBillWave, 
  FaClipboardList,
  FaArrowRight
} from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './divisi.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Import modern illustrations
import kesehatanImg from '../../assets/kesehatan.jpg';
import kebersihanImg from '../../assets/kebersihan.jpg';
import dapurImg from '../../assets/dapur.jpg';
import pendidikanImg from '../../assets/pendidikan.jpg';
import keuanganImg from '../../assets/keuangan.jpg';
import sekretarisImg from '../../assets/sekretaris.jpg';

const Divisi = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  // Data for divisions with icons
  const divisiData = [
    {
      id: 'kesehatan',
      title: "Divisi Kesehatan & Olahraga",
      description: "Bertanggung jawab atas kesehatan mahasantri dan kegiatan olahraga",
      image: kesehatanImg,
      icon: <FaClinicMedical size={40} className="text-primary" />,
      color: "primary"
    },
    {
      id: 'kebersihan',
      title: "Divisi Kebersihan",
      description: "Mengatur kebersihan lingkungan pesantren",
      image: kebersihanImg,
      icon: <FaBroom size={40} className="text-success" />,
      color: "success"
    },
    {
      id: 'dapur',
      title: "Divisi Dapur",
      description: "Mengelola kebutuhan dapur dan makanan",
      image: dapurImg,
      icon: <FaUtensils size={40} className="text-danger" />,
      color: "danger"
    },
    {
      id: 'pendidikan',
      title: "Divisi Pendidikan",
      description: "Mengatur kegiatan pembelajaran dan kurikulum",
      image: pendidikanImg,
      icon: <FaBook size={40} className="text-info" />,
      color: "info"
    },
    {
      id: 'keuangan',
      title: "Bagian Keuangan",
      description: "Mengelola keuangan dan transaksi BEM",
      image: keuanganImg,
      icon: <FaMoneyBillWave size={40} className="text-warning" />,
      color: "warning"
    },
    {
      id: 'sekretaris',
      title: "Bagian Sekretaris",
      description: "Mengurus administrasi dan dokumentasi",
      image: sekretarisImg,
      icon: <FaClipboardList size={40} className="text-secondary" />,
      color: "secondary"
    }
  ];

  const handleDivisiClick = (divisiId) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate(`/divisi/${divisiId}`);
    }, 800);
  };

  return (
    <div className="divisi-page">
      <Header />
      
      <div className="hero-section text-center py-5 bg-light">
        <Container>
          <h1 className="display-4 fw-bold mb-3 text-light" data-aos="fade-down">
            Divisi BEM PeTIK
          </h1>
          <p className="lead text-light" data-aos="fade-down" data-aos-delay="100">
            Temukan informasi lengkap tentang setiap divisi yang ada di BEM PeTIK
          </p>
        </Container>
      </div>

      <Container className="py-5">
        {error && (
          <div className="alert alert-danger" role="alert" data-aos="fade-up">
            {error}
          </div>
        )}

        <Row className="g-4 justify-content-center">
          {divisiData.map((divisi, index) => (
            <Col 
              key={divisi.id} 
              md={6} 
              lg={4} 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <Card 
                className={`h-100 divisi-card border-0 shadow-sm hover-effect bg-${divisi.color}-subtle`}
                onClick={() => handleDivisiClick(divisi.id)}
              >
                <div className="divisi-icon-container">
                  {divisi.icon}
                </div>
                <Card.Img 
                  variant="top" 
                  src={divisi.image} 
                  className="p-4 img-fluid" 
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold">{divisi.title}</Card.Title>
                  <Card.Text className="text-muted mb-3">
                    {divisi.description}
                  </Card.Text>
                  <Button 
                    variant={divisi.color} 
                    className="rounded-pill px-4"
                  >
                    Lihat Detail <FaArrowRight className="ms-2" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Memuat data divisi...</p>
          </div>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default Divisi;