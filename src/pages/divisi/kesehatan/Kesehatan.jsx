import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Spinner, 
  Alert, 
  Badge,
  InputGroup,
  Form,
  Table,
  Image
} from 'react-bootstrap';
import { 
  FaMedkit, 
  FaUserMd, 
  FaSearch, 
  FaInfoCircle,
  FaUsers,
  FaClock,
  FaCheck,
  FaArrowLeft,
  FaPills,
  FaProcedures
} from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Kesehatan = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [obatData, setObatData] = useState([]);
  const [santriSakitData, setSantriSakitData] = useState([]);
  const navigate = useNavigate();

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  // Fetch medicine data
// Di dalam komponen Kesehatan, perbaiki useEffect seperti ini:
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak ditemukan, silakan login kembali');
      }

      // Gunakan Promise.all untuk menunggu kedua request selesai
      const [obatResponse, santriResponse] = await Promise.all([
        axios.get('https://profur.rikpetik.site/api/v1/kesehatan/obat', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://profur.rikpetik.site/api/v1/kesehatan/sakit', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      // Proses data obat
      const obatApiData = obatResponse.data?.data || obatResponse.data || [];
      const obatWithImages = Array.isArray(obatApiData)
        ? obatApiData.map(item => ({
            ...item,
            imageUrl: item.image ? `https://profur.rikpetik.site/${item.image}` : null
          }))
        : [];
      
      // Proses data santri sakit
      const santriApiData = santriResponse.data?.data || santriResponse.data || [];

      setObatData(obatWithImages);
      setSantriSakitData(santriApiData);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Gagal memuat data');
      console.error('Error:', err);
    } finally {
      setLoading(false); // Pastikan loading di-set false baik sukses maupun error
    }
  };

  fetchData();
}, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'sembuh': return <Badge bg="success">Sembuh</Badge>;
      case 'proses pemulihan': return <Badge bg="warning">Proses Pemulihan</Badge>;
      case 'belum sembuh': return <Badge bg="danger">Belum Sembuh</Badge>;
      default: return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const filteredObat = obatData.filter(obat => 
    obat.nama_obat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSantriSakit = santriSakitData.filter(santri => 
    santri.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    santri.jenis_penyakit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-3">Memuat data kesehatan...</p>
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
      {/* Back Button */}
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4 d-flex align-items-center"
        data-aos="fade-right"
      >
        <FaArrowLeft className="me-2" />
        Kembali
      </Button>

      {/* Header Section */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="display-5 fw-bold mb-3">
          <FaUserMd className="text-primary me-3" />
          Manajemen Kesehatan
        </h1>
        <p className="lead text-muted">Kelola data kesehatan santri dan stok obat</p>
      </div>

      {/* Navigation Buttons */}
      <div className="d-flex flex-wrap gap-3 justify-content-center mb-5" data-aos="fade-up">
        <Button 
          variant={activeTab === 'overview' ? 'primary' : 'outline-primary'}
          onClick={() => setActiveTab('overview')}
          className="d-flex align-items-center px-4 py-2"
        >
          <FaInfoCircle className="me-2" /> Overview
        </Button>
        <Button 
          variant={activeTab === 'obat' ? 'primary' : 'outline-primary'}
          onClick={() => setActiveTab('obat')}
          className="d-flex align-items-center px-4 py-2"
        >
          <FaPills className="me-2" /> Data Obat
        </Button>
        <Button 
          variant={activeTab === 'santri-sakit' ? 'primary' : 'outline-primary'}
          onClick={() => setActiveTab('santri-sakit')}
          className="d-flex align-items-center px-4 py-2"
        >
          <FaProcedures className="me-2" /> Santri Sakit
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div data-aos="fade-up">
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center">
                  <FaPills className="text-primary mb-3" size={48} />
                  <h3>Total Stok Obat</h3>
                  <h2 className="display-4 fw-bold">
                    {obatData.reduce((total, obat) => total + (obat.stok || 0), 0)}
                  </h2>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setActiveTab('obat')}
                    className="mt-3"
                  >
                    Lihat Detail Obat
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="text-center">
                  <FaProcedures className="text-danger mb-3" size={48} />
                  <h3>Santri Sedang Sakit</h3>
                  <h2 className="display-4 fw-bold">
                    {santriSakitData.filter(s => s.status_penyembuhan !== 'sembuh').length}
                  </h2>
                  <Button 
                    variant="outline-danger" 
                    onClick={() => setActiveTab('santri-sakit')}
                    className="mt-3"
                  >
                    Lihat Detail Santri Sakit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="mt-4 shadow-sm border-0">
            <Card.Body>
              <h4 className="mb-4">
                <FaClock className="text-warning me-2" />
                Obat Akan Kadaluarsa
              </h4>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Nama Obat</th>
                    <th>Stok</th>
                    <th>Tanggal Kadaluarsa</th>
                  </tr>
                </thead>
                <tbody>
                  {obatData
                    .filter(obat => {
                      const expDate = new Date(obat.tgl_kadaluarsa);
                      const now = new Date();
                      const diffTime = expDate - now;
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      return diffDays <= 30; // Show medicines expiring in the next 30 days
                    })
                    .sort((a, b) => new Date(a.tgl_kadaluarsa) - new Date(b.tgl_kadaluarsa))
                    .slice(0, 5) // Show only top 5
                    .map(obat => (
                      <tr key={obat.id}>
                        <td>{obat.nama_obat}</td>
                        <td>{obat.stok}</td>
                        <td>{new Date(obat.tgl_kadaluarsa).toLocaleDateString()}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Medicine Data Tab */}
      {activeTab === 'obat' && (
        <div data-aos="fade-up">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 fw-bold mb-0">
              <FaPills className="text-primary me-2" />
              Data Obat
            </h2>
            <div className="w-25">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari obat..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>

          {filteredObat.length === 0 ? (
            <Card className="text-center py-5 shadow-sm">
              <Card.Body>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                  alt="No medicine" 
                  style={{ height: '150px', opacity: 0.7 }}
                  className="mb-4"
                />
                <h4 className="text-muted">Belum ada data obat</h4>
              </Card.Body>
            </Card>
          ) : (
            <Row className="g-4">
              {filteredObat.map((obat, index) => (
                <Col key={obat.id} md={6} lg={4} xl={3} data-aos="fade-up" data-aos-delay={index % 4 * 100}>
                  <Card className="h-100 shadow-sm border-0">
                    <div className="ratio ratio-16x9">
                      <Image
                        src={obat.imageUrl || 'https://via.placeholder.com/300x200?text=Gambar+Obat'}
                        alt={obat.nama_obat}
                        className="card-img-top object-fit-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Gambar+Tidak+Tersedia';
                        }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold">{obat.nama_obat}</Card.Title>
                      <Card.Text>
                        <strong>Stok:</strong> {obat.stok}
                      </Card.Text>
                      <Card.Text>
                        <strong>Kadaluarsa:</strong> {new Date(obat.tgl_kadaluarsa).toLocaleDateString()}
                      </Card.Text>
                      {obat.keterangan && (
                        <Card.Text className="text-muted small">
                          {obat.keterangan}
                        </Card.Text>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}

      {/* Sick Students Tab */}
      {activeTab === 'santri-sakit' && (
        <div data-aos="fade-up">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h4 fw-bold mb-0">
              <FaProcedures className="text-danger me-2" />
              Data Santri Sakit
            </h2>
            <div className="w-25">
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari santri..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
          </div>

          {filteredSantriSakit.length === 0 ? (
            <Card className="text-center py-5 shadow-sm">
              <Card.Body>
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                  alt="No sick students" 
                  style={{ height: '150px', opacity: 0.7 }}
                  className="mb-4"
                />
                <h4 className="text-muted">Tidak ada data santri sakit</h4>
              </Card.Body>
            </Card>
          ) : (
            <Card className="shadow-sm border-0">
              <Card.Body className="p-0">
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Kelas</th>
                      <th>Penyakit</th>
                      <th>Penanganan</th>
                      <th>Tanggal</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSantriSakit.map(santri => (
                      <tr key={santri.id}>
                        <td>{santri.nama}</td>
                        <td>{santri.kelas}</td>
                        <td>{santri.jenis_penyakit}</td>
                        <td>{santri.penanganan}</td>
                        <td>{new Date(santri.tanggal).toLocaleDateString()}</td>
                        <td>{getStatusBadge(santri.status_penyembuhan)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </div>
      )}

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

export default Kesehatan;