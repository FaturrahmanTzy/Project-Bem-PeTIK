import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { FaExclamationTriangle, FaArrowLeft, FaHome } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import './error.css';

const ErrorPage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    return (
        <div className="error-page bg-light">
            <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
                <Card className="border-0 shadow-lg overflow-hidden" data-aos="zoom-in">
                    <Row className="g-0">
                        {/* Illustration Column */}
                        <Col md={6} className="d-none d-md-flex bg-gradient-error align-items-center justify-content-center p-5">
                            <div className="error-illustration">
                                <div className="error-circle"></div>
                                <div className="error-circle-small"></div>
                                <FaExclamationTriangle className="error-icon text-white" />
                            </div>
                        </Col>
                        
                        {/* Content Column */}
                        <Col md={6}>
                            <Card.Body className="p-5 text-center">
                                <div className="error-number mb-3" data-aos="fade-up">
                                    <span className="text-primary">4</span>
                                    <span className="text-warning">0</span>
                                    <span className="text-primary">4</span>
                                </div>
                                
                                <h2 className="fw-bold mb-3" data-aos="fade-up" data-aos-delay="100">
                                    Halaman Tidak Ditemukan
                                </h2>
                                
                                <p className="text-muted mb-4" data-aos="fade-up" data-aos-delay="150">
                                    Maaf, halaman yang Anda cari tidak tersedia di BEM PeTIK.
                                </p>
                                
                                <div className="d-flex justify-content-center gap-3" data-aos="fade-up" data-aos-delay="200">
                                    <Button 
                                        variant="primary" 
                                        onClick={() => navigate(-1)}
                                        className="rounded-pill px-4 d-flex align-items-center"
                                    >
                                        <FaArrowLeft className="me-2" />
                                        Kembali
                                    </Button>
                                    
                                    <NavLink 
                                        to="/" 
                                        className="btn btn-warning rounded-pill px-4 d-flex align-items-center"
                                    >
                                        <FaHome className="me-2" />
                                        Beranda
                                    </NavLink>
                                </div>
                                
                                <div className="mt-4" data-aos="fade-up" data-aos-delay="250">
                                    <p className="small text-muted">
                                        Atau laporkan masalah ini ke tim kami di{' '}
                                        <a href="mailto:support@bempetik.ac.id" className="text-primary">
                                            support@bempetik.ac.id
                                        </a>
                                    </p>
                                </div>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
};

export default ErrorPage;