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
  Form,
} from 'react-bootstrap';
import { 
  FaBook,
  FaSearch, 
  FaInfoCircle,
  FaBoxes,
  FaCheck,
  FaExclamationTriangle,
  FaTools,
  FaArrowLeft,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AlatPendidikan = () => {
  // Local data for educational tools
  const localBarangPendidikan = [
    {
      id: 1,
      nama_barang: "Proyektor",
      stok: 5,
      kondisi: "Baik",
      keterangan: "Proyektor Epson dengan resolusi HD",
      image: "proyektor.jpg"
    },
    {
      id: 2,
      nama_barang: "Laptop",
      stok: 10,
      kondisi: "Baik",
      keterangan: "Laptop ASUS untuk presentasi",
      image: "laptop.jpg"
    },
    {
      id: 3,
      nama_barang: "Papan Tulis",
      stok: 8,
      kondisi: "Rusak Ringan",
      keterangan: "Beberapa bagian tergores",
      image: "papan-tulis.jpg"
    },
    {
      id: 4,
      nama_barang: "Speaker",
      stok: 3,
      kondisi: "Rusak Berat",
      keterangan: "Tidak mengeluarkan suara",
      image: "speaker.jpg"
    },
    {
      id: 5,
      nama_barang: "Microphone",
      stok: 6,
      kondisi: "Baik",
      keterangan: "Microphone wireless",
      image: "mic.jpg"
    },
    {
      id: 6,
      nama_barang: "Kursi",
      stok: 50,
      kondisi: "Baik",
      keterangan: "Kursi plastik untuk ruang kelas",
      image: "kursi.jpg"
    }
  ];

  const [barangPendidikan, setBarangPendidikan] = useState([]);
  const [loading, setLoading] = useState(false); // Changed to false since we're using local data
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

    // Simulate loading data
    const timer = setTimeout(() => {
      try {
        // Add image URLs to the local data
        const dataWithImages = localBarangPendidikan.map(item => ({
          ...item,
          imageUrl: item.image 
            ? `https://via.placeholder.com/300x200?text=${item.nama_barang}` 
            : 'https://via.placeholder.com/300x200?text=Alat+Pendidikan'
        }));
        
        setBarangPendidikan(dataWithImages);
      } catch (err) {
        setError('Gagal memuat data lokal');
      }
    }, 500); // Small delay to simulate async operation

    return () => clearTimeout(timer);
  }, []);

  const getKondisiBadge = (kondisi) => {
    switch(kondisi) {
      case 'Baik': 
        return <Badge bg="success" className="d-flex align-items-center px-3 py-2">
          <FaCheck className="me-1" /> Baik
        </Badge>;
      case 'Rusak Ringan': 
        return <Badge bg="warning" className="d-flex align-items-center px-3 py-2">
          <FaExclamationTriangle className="me-1" /> Rusak Ringan
        </Badge>;
      case 'Rusak Berat': 
        return <Badge bg="danger" className="d-flex align-items-center px-3 py-2">
          <FaTools className="me-1" /> Rusak Berat
        </Badge>;
      default:
        return <Badge bg="secondary" className="d-flex align-items-center px-3 py-2">
          <FaInfoCircle className="me-1" /> Tidak Diketahui
        </Badge>;
    }
  };

  const filteredBarang = barangPendidikan.filter(item =>
    item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.keterangan?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <FaBook className="text-primary me-3" />
          Inventaris Alat Pendidikan
        </h1>
        <p className="lead text-muted">Daftar alat dan bahan penunjang pendidikan</p>
      </div>

      {/* Search Bar */}
      <div className="mb-5" data-aos="fade-up">
        <InputGroup>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Cari alat pendidikan..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {/* Inventory Summary */}
      <Row className="mb-5 g-4" data-aos="fade-up">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <h3 className="text-primary">
                <FaBoxes className="me-2" />
                {barangPendidikan.length}
              </h3>
              <p className="mb-0">Total Alat</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <h3 className="text-success">
                {barangPendidikan.filter(item => item.kondisi === 'Baik').length}
              </h3>
              <p className="mb-0">Kondisi Baik</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <h3 className="text-danger">
                {barangPendidikan.filter(item => item.kondisi !== 'Baik').length}
              </h3>
              <p className="mb-0">Perlu Perbaikan</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Inventory List */}
      <section data-aos="fade-up">
        {filteredBarang.length === 0 ? (
          <Card className="text-center py-5 shadow-sm">
            <Card.Body>
              <img 
                src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                alt="No items" 
                style={{ height: '150px', opacity: 0.7 }}
                className="mb-4"
              />
              <h4 className="text-muted">Tidak ada alat pendidikan yang ditemukan</h4>
              {searchTerm && (
                <Button 
                  variant="outline-primary" 
                  onClick={() => setSearchTerm('')}
                  className="mt-3"
                >
                  Tampilkan Semua
                </Button>
              )}
            </Card.Body>
          </Card>
        ) : (
          <Row className="g-4">
            {filteredBarang.map((item, index) => (
              <Col key={item.id} md={6} lg={4} xl={3} data-aos="fade-up" data-aos-delay={index % 4 * 100}>
                <Card className="h-100 shadow-sm border-0">
                  <div className="ratio ratio-16x9">
                    <Image
                      src={item.imageUrl}
                      alt={item.nama_barang}
                      className="card-img-top object-fit-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Gambar+Tidak+Tersedia';
                      }}
                    />
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="fw-bold mb-0">{item.nama_barang}</Card.Title>
                      {getKondisiBadge(item.kondisi)}
                    </div>
                    <div className="mb-2">
                      <small className="text-muted">Stok:</small>
                      <span className="ms-2 fw-bold">{item.stok}</span>
                    </div>
                    {item.keterangan && (
                      <>
                        <small className="text-muted">Keterangan:</small>
                        <Card.Text className="mt-1">
                          {item.keterangan}
                        </Card.Text>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
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
        }
      `}</style>
    </Container>
  );
};

export default AlatPendidikan;