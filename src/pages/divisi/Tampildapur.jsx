import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Spinner, 
  Alert, 
  Image,
  Badge,
  InputGroup,
  Form
} from 'react-bootstrap';
import { 
  FaUtensils, 
  FaSearch, 
  FaCalendarAlt, 
  FaInfoCircle,
  FaUsers,
  FaClock,
  FaCheck,
  FaHourglassHalf,
  FaTimes
} from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TampilDapur = () => {
  const [makanan, setMakanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Data kegiatan dapur lokal
  const [kegiatanDapur] = useState([
    { id: 1, aktivitas: 'Memasak nasi goreng spesial', waktu: '10:00 - 11:30', status: 'Selesai' },
    { id: 2, aktivitas: 'Menyiapkan bahan untuk makan siang', waktu: '11:30 - 12:15', status: 'Proses' },
    { id: 3, aktivitas: 'Membersihkan area memasak', waktu: '13:00 - 13:30', status: 'Menunggu' },
    { id: 4, aktivitas: 'Menyiapkan makanan penutup', waktu: '14:00 - 15:00', status: 'Menunggu' },
  ]);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  useEffect(() => {
    const fetchDataMakanan = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://profur.rikpetik.site/api/v1/kesehatan/makanan', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Add image URLs to the data
        const dataWithImages = Array.isArray(response.data.data)
        ? response.data.data.map(item => ({
            ...item,
            imageUrl: item.image ? `https://profur.rikpetik.site${item.image}` : null
          }))
        : [];
      
        
        setMakanan(dataWithImages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || 'Gagal memuat data makanan');
        setLoading(false);
      }
    };

    fetchDataMakanan();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Selesai': return <FaCheck className="text-success me-1" />;
      case 'Proses': return <FaHourglassHalf className="text-warning me-1" />;
      case 'Menunggu': return <FaTimes className="text-secondary me-1" />;
      default: return <FaClock className="text-info me-1" />;
    }
  };

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Memuat data dapur...</p>
    </div>
  );

  if (error) return (
    <Alert variant="danger" className="mx-3 my-5">
      <FaInfoCircle className="me-2" />
      {error}
    </Alert>
  );

  return (
    <Container className="py-4">
      {/* Header Section */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="display-5 fw-bold mb-3">
          <FaUtensils className="text-primary me-3" />
          Dapur Modern
        </h1>
        <p className="lead text-muted">Kelola makanan dan aktivitas dapur dengan mudah</p>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex flex-wrap gap-3 justify-content-center mb-5" data-aos="fade-up">
        <Button 
          variant="outline-warning" 
          onClick={() => navigate('/divisi/dapur/menumakanan`')}
          className="d-flex align-items-center px-4 py-2"
        >
          <FaCalendarAlt className="me-2" /> Menu Makanan
        </Button>
        <Button 
          variant="outline-info" 
          onClick={() => navigate('/divisi/dapur/piketdapur`')}
          className="d-flex align-items-center px-4 py-2"
        >
          <FaInfoCircle className="me-2" /> Lihat Piket
        </Button>
      </div>

      {/* Food Menu Section */}
      <section className="mb-5" data-aos="fade-up">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold mb-0">
            <FaUtensils className="text-warning me-2" />
            Menu Makanan Hari Ini
          </h2>
          <div className="w-25">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Cari makanan..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>

        {makanan.length === 0 ? (
          <Card className="text-center py-5 shadow-sm">
            <Card.Body>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                alt="No food" 
                style={{ height: '150px', opacity: 0.7 }}
                className="mb-4"
              />
              <h4 className="text-muted">Belum ada menu makanan</h4>
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {makanan.map((item, index) => (
              <Col key={item.id} md={6} lg={4} xl={3} data-aos="fade-up" data-aos-delay={index % 4 * 100}>
                <Card className="h-100 shadow-sm border-0">
                  <div className="ratio ratio-16x9">
                    <Image
                      src={item.imageUrl || 'https://via.placeholder.com/300x200?text=Gambar+Makanan'}
                      alt={item.nama_makanan}
                      className="card-img-top object-fit-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Gambar+Tidak+Tersedia';
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold">{item.nama_makanan}</Card.Title>
                    <Card.Text className="text-muted">
                      {item.deskripsi || 'Tidak ada deskripsi'}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>

      {/* Kitchen Activities Section */}
      <section data-aos="fade-up">
        <h2 className="h4 fw-bold mb-4">
          <FaUsers className="text-info me-2" />
          Jadwal Kegiatan Dapur
        </h2>
        
        <Card className="shadow-sm border-0">
          <Card.Body className="p-0">
            {kegiatanDapur.map((kegiatan, index) => (
              <div 
                key={kegiatan.id} 
                className={`p-4 ${index !== kegiatanDapur.length - 1 ? 'border-bottom' : ''}`}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{kegiatan.aktivitas}</h5>
                    <small className="text-muted">
                      <FaClock className="me-1" />
                      {kegiatan.waktu}
                    </small>
                  </div>
                  <Badge 
                    bg={kegiatan.status === 'Selesai' ? 'success' : 
                        kegiatan.status === 'Proses' ? 'warning' : 'secondary'}
                    className="d-flex align-items-center px-3 py-2"
                  >
                    {getStatusIcon(kegiatan.status)}
                    {kegiatan.status}
                  </Badge>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </section>

      <style>{`
        .card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        
        .object-fit-cover {
          object-fit: cover;
        }
        
        .ratio-16x9::before {
          padding-top: 56.25%;
        }
        
        .badge {
          font-weight: 500;
          border-radius: 8px;
        }
        
        @media (max-width: 768px) {
          .w-25 {
            width: 100% !important;
            margin-top: 1rem;
          }
          
          .d-flex.justify-content-between {
            flex-direction: column;
          }
        }
      `}</style>
    </Container>
  );
};

export default TampilDapur;