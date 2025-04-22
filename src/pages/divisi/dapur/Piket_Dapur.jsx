import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  Row, 
  Col, 
  Badge,
  InputGroup,
  Form,
  Spinner,
  Alert,
  ListGroup,
  Button,
} from 'react-bootstrap';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUsers,
  FaUserFriends,
  FaChevronRight,
  FaArrowLeft,
} from 'react-icons/fa';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';



const Piket_Dapur = () => {
  const [piketList, setPiketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const fetchPiket = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const response = await axios.get("https://profur.rikpetik.site/api/v1/dapur/piket", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPiketList(response.data.data || []);
    } catch (err) {
      console.error('Error fetching piket:', err);
      setError('Gagal memuat data piket. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPiket();
  }, []);

  const filteredPiketList = piketList.filter(piket => 
    piket.nama_kelompok.toLowerCase().includes(searchTerm.toLowerCase()) ||
    piket.anggota_kelompok.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="py-4">
        <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4 d-flex align-items-center bg-primary text-white border-0 shadow-sm"
        >
        <FaArrowLeft className="me-2" />
        Kembali
        </Button>
      <h1 className="text-center mb-4" data-aos="fade-down">
        <FaCalendarAlt className="text-primary me-3" />
        Jadwal Piket Dapur
      </h1>
      
      {/* Search Section */}
      <Card className="mb-4 shadow-sm" data-aos="fade-up">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8} className="mx-auto">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari kelompok atau anggota..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="animated fadeIn">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Memuat data piket...</p>
        </div>
      ) : (
        <>
          {filteredPiketList.length === 0 ? (
            <Card className="text-center py-5 shadow-sm" data-aos="fade-up">
              <Card.Body>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                  alt="No data" 
                  style={{ height: '150px', opacity: 0.7 }}
                  className="mb-4"
                />
                <h4 className="text-muted">
                  {searchTerm ? 'Piket tidak ditemukan' : 'Belum ada data piket'}
                </h4>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              {filteredPiketList.map((piket, index) => (
                <Col key={piket.id} md={6} lg={4} className="mb-4">
                  <Card 
                    className="h-100 shadow-sm" 
                    data-aos="fade-up" 
                    data-aos-delay={index % 3 * 100}
                  >
                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                      <div>
                        <FaUsers className="me-2" />
                        <strong>{piket.nama_kelompok}</strong>
                      </div>
                      <Badge bg="light" text="dark" pill>
                        Kelompok {index + 1}
                      </Badge>
                    </Card.Header>
                    <Card.Body>
                      <h5 className="mb-3 text-muted">
                        <FaUserFriends className="me-2" />
                        Anggota Kelompok:
                      </h5>
                      
                      <ListGroup variant="flush">
                        {piket.anggota_kelompok.split(',').map((anggota, i) => (
                          <ListGroup.Item key={i} className="d-flex align-items-center">
                            <FaChevronRight className="text-primary me-2" size={10} />
                            {anggota.trim()}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                    <Card.Footer className="bg-light text-muted small">
                      Terakhir diperbarui: {new Date().toLocaleDateString()}
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      <style>{`
        .card {
          border-radius: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          overflow: hidden;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
        
        .card-header {
          font-weight: 600;
          border-bottom: none;
        }
        
        .list-group-item {
          border-left: none;
          border-right: none;
          padding: 12px 20px;
        }
        
        .list-group-item:first-child {
          border-top: none;
        }
        
        .list-group-item:last-child {
          border-bottom: none;
        }
        
        .badge {
          font-weight: 500;
          padding: 5px 10px;
        }
        
        body {
          background-color: #f8f9fa;
        }
        
        .text-muted {
          color: #6c757d !important;
        }
      `}</style>
    </Container>
  );
};

export default Piket_Dapur;