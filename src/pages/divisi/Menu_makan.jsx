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
  Alert
} from 'react-bootstrap';
import { 
  FaSearch, 
  FaCalendarAlt, 
  FaUtensils,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaInfoCircle
} from 'react-icons/fa';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MenuMakan = () => {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    bulan: '',
    pekan: '',
    hari: '',
    waktu: ''
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const token = localStorage.getItem("token"); // ambil token dari localStorage
  
      const response = await axios.get('https://profur.rikpetik.site/api/v1/dapur/menu', {
        headers: {
          Authorization: `Bearer ${token}` // kirim token di header
        }
      });
  
      setMenuList(response.data.data || []);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Gagal memuat data menu. Silakan login ulang atau cek koneksi.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMenu();
  }, []);

  const bulanOptions = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const pekanOptions = [1, 2, 3, 4];
  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const waktuOptions = ['Pagi', 'Siang', 'Malam'];

  const filteredMenuList = menuList.filter(menu => {
    const matchesSearch = menu.menu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         menu.keterangan.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = 
      (filters.bulan === '' || menu.bulan === filters.bulan) &&
      (filters.pekan === '' || menu.pekan.toString() === filters.pekan) &&
      (filters.hari === '' || menu.hari === filters.hari) &&
      (filters.waktu === '' || menu.waktu === filters.waktu);
    
    return matchesSearch && matchesFilters;
  });

  const getTimeIcon = (waktu) => {
    switch(waktu) {
      case 'Pagi': return <FaSun className="text-warning me-2" />;
      case 'Siang': return <FaCloudSun className="text-orange me-2" />;
      case 'Malam': return <FaMoon className="text-secondary me-2" />;
      default: return <FaUtensils className="text-primary me-2" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Sesuai':
        return <Badge bg="success" className="ms-2">Sesuai</Badge>;
      case 'Tidak Sesuai':
        return <Badge bg="danger" className="ms-2">Tidak Sesuai</Badge>;
      default:
        return <Badge bg="secondary" className="ms-2">Belum Dicek</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4" data-aos="fade-down">
        <FaUtensils className="text-primary me-3" />
        Menu Makanan
      </h1>
      
      {/* Search and Filter Section */}
      <Card className="mb-4 shadow-sm" data-aos="fade-up">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari menu atau keterangan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <div className="d-flex gap-2">
                <Form.Select
                  value={filters.bulan}
                  onChange={(e) => setFilters({...filters, bulan: e.target.value})}
                >
                  <option value="">Semua Bulan</option>
                  {bulanOptions.map(bulan => (
                    <option key={bulan} value={bulan}>{bulan}</option>
                  ))}
                </Form.Select>
                <Form.Select
                  value={filters.pekan}
                  onChange={(e) => setFilters({...filters, pekan: e.target.value})}
                >
                  <option value="">Semua Pekan</option>
                  {pekanOptions.map(pekan => (
                    <option key={pekan} value={pekan}>Pekan {pekan}</option>
                  ))}
                </Form.Select>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="animated fadeIn">
          <FaInfoCircle className="me-2" />
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Memuat data menu...</p>
        </div>
      ) : (
        <>
          {filteredMenuList.length === 0 ? (
            <Card className="text-center py-5 shadow-sm" data-aos="fade-up">
              <Card.Body>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                  alt="No data" 
                  style={{ height: '150px', opacity: 0.7 }}
                  className="mb-4"
                />
                <h4 className="text-muted">
                  {searchTerm || Object.values(filters).some(f => f) 
                    ? 'Menu tidak ditemukan' 
                    : 'Belum ada data menu'}
                </h4>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              {filteredMenuList.map((menu, index) => (
                <Col key={menu.id} md={6} lg={4} className="mb-4">
                  <Card 
                    className="h-100 shadow-sm" 
                    data-aos="fade-up" 
                    data-aos-delay={index % 3 * 100}
                  >
                    <Card.Header className="bg-primary text-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                          {menu.hari}, Pekan {menu.pekan}
                        </h5>
                        <small>{menu.bulan}</small>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        {getTimeIcon(menu.waktu)}
                        <h4 className="mb-0">{menu.waktu}</h4>
                        {getStatusBadge(menu.status_kesesuaian)}
                      </div>
                      
                      <div className="mb-3">
                        <h6 className="text-muted">Menu:</h6>
                        <p className="mb-0">{menu.menu}</p>
                      </div>
                      
                      <div>
                        <h6 className="text-muted">Keterangan:</h6>
                        <p className="mb-0">{menu.keterangan}</p>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-light">
                      <small className="text-muted">
                        Terakhir diperbarui: {new Date().toLocaleDateString()}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      <style>{`
        .text-orange {
          color: #fd7e14;
        }
        
        .card {
          border-radius: 15px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        
        .card-header {
          border-radius: 15px 15px 0 0 !important;
          font-weight: 600;
        }
        
        .form-select {
          border-radius: 10px;
        }
        
        .badge {
          font-weight: 500;
          padding: 5px 10px;
          border-radius: 10px;
        }
        
        body {
          background-color: #f8f9fa;
        }
      `}</style>
    </Container>
  );
};

export default MenuMakan;