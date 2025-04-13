import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, ProgressBar } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaChartLine, FaUsers, FaCalendarAlt, FaCheckCircle, FaFileAlt } from 'react-icons/fa';
import "./Laporan-Devisi.css";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LaporanDevisi = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  // Sample division report data
  const divisions = [
    {
      id: 1,
      name: "Divisi Pendidikan",
      icon: <FaChartLine className="text-primary" size={24} />,
      progress: 85,
      completedTasks: 12,
      totalTasks: 14,
      latestReport: "Menyelenggarakan program tutor sebaya untuk 5 mata kuliah dengan tingkat kepuasan 92%",
      status: "On Track"
    },
    {
      id: 2,
      name: "Divisi Media",
      icon: <FaUsers className="text-info" size={24} />,
      progress: 72,
      completedTasks: 18,
      totalTasks: 25,
      latestReport: "Meningkatkan engagement Instagram sebesar 45% melalui konten kreatif bulanan",
      status: "On Progress"
    },
    {
      id: 3,
      name: "Divisi Acara",
      icon: <FaCalendarAlt className="text-warning" size={24} />,
      progress: 90,
      completedTasks: 9,
      totalTasks: 10,
      latestReport: "Sukses menyelenggarakan Tech Week 2023 dengan 500+ peserta",
      status: "Excellent"
    },
    {
      id: 4,
      name: "Divisi Humas",
      icon: <FaCheckCircle className="text-success" size={24} />,
      progress: 65,
      completedTasks: 13,
      totalTasks: 20,
      latestReport: "Menjalin kerjasama dengan 3 sponsor baru untuk event mendatang",
      status: "On Progress"
    }
  ];

  const getStatusVariant = (status) => {
    switch(status) {
      case 'On Track': return 'success';
      case 'On Progress': return 'primary';
      case 'Excellent': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    
    <div className="laporan-devisi-page">
        <Header />
      <Container className="py-5">
        {/* Header Section */}
        <div className="text-center mb-5" data-aos="fade-down">
          <h1 className="display-4 fw-bold text-gradient mb-3">
            <span className="text-primary">Laporan</span> <span className="text-warning">Divisi</span>
          </h1>
          <p className="lead text-muted">
            Progress dan pencapaian terbaru dari setiap divisi BEM PeTIK
          </p>
        </div>

        {/* Division Reports */}
        <Row className="g-4">
          {divisions.map((division, index) => (
            <Col lg={6} key={division.id} data-aos="fade-up" data-aos-delay={index * 100}>
              <Card className="border-0 shadow-sm h-100 division-card">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-wrapper bg-primary bg-opacity-10 rounded-circle me-3">
                      {division.icon}
                    </div>
                    <div>
                      <h3 className="fw-bold mb-0">{division.name}</h3>
                      <Badge bg={getStatusVariant(division.status)} className="mt-1">
                        {division.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">Progress</span>
                      <span className="fw-bold">{division.progress}%</span>
                    </div>
                    <ProgressBar 
                      now={division.progress} 
                      variant={division.progress > 80 ? 'success' : division.progress > 50 ? 'primary' : 'warning'}
                      className="rounded-pill"
                      style={{ height: '8px' }}
                    />
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="text-muted">Tugas Selesai</span>
                      <h4 className="fw-bold mt-1">
                        {division.completedTasks}/{division.totalTasks}
                      </h4>
                    </div>
                    <div>
                      <span className="text-muted">Update Terakhir</span>
                      <h5 className="fw-bold mt-1">
                        {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                      </h5>
                    </div>
                  </div>

                  <Card className="border-0 bg-light p-3 mb-3">
                    <div className="d-flex">
                      <FaFileAlt className="me-2 mt-1 text-secondary" />
                      <p className="mb-0">{division.latestReport}</p>
                    </div>
                  </Card>

                  <Button variant="outline-primary" className="w-100 rounded-pill">
                    Lihat Detail Laporan
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Summary Section */}
        <Card className="border-0 shadow-sm mt-5" data-aos="fade-up">
          <Card.Body className="p-4">
            <h3 className="fw-bold mb-4 text-center">Rekap Keseluruhan</h3>
            <Row>
              <Col md={3} className="text-center mb-4 mb-md-0">
                <h1 className="display-5 fw-bold text-primary">78%</h1>
                <p className="text-muted">Rata-rata Progress</p>
              </Col>
              <Col md={3} className="text-center mb-4 mb-md-0">
                <h1 className="display-5 fw-bold text-success">52</h1>
                <p className="text-muted">Tugas Selesai</p>
              </Col>
              <Col md={3} className="text-center mb-4 mb-md-0">
                <h1 className="display-5 fw-bold text-warning">15</h1>
                <p className="text-muted">Tugas Berjalan</p>
              </Col>
              <Col md={3} className="text-center">
                <h1 className="display-5 fw-bold text-info">4</h1>
                <p className="text-muted">Divisi Aktif</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default LaporanDevisi;