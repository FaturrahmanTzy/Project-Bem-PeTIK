import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Table, 
  Button, 
  Spinner, 
  Alert, 
  Card, 
  Badge,
  Row,
  Col,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import { 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaSearch,
  FaCalendarAlt,
  FaUsers
} from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../../layout/Layout';
import { useNavigate } from 'react-router-dom';

const PiketDapur = () => {
  const [piketList, setPiketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'https://profur.rikpetik.site/api/v1',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const fetchPiket = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Anda harus login terlebih dahulu');
      }

      const response = await api.get('/dapur/piket');
      setPiketList(response.data.data || []);
    } catch (err) {
      console.error('Error fetching piket:', err);
      
      let errorMessage = 'Gagal memuat data piket. Silakan coba lagi.';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Sesi Anda telah habis. Silakan login kembali.';
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPiket();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Data piket akan dihapus permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        backdrop: true,
        allowOutsideClick: () => !Swal.isLoading()
      });

      if (result.isConfirmed) {
        await api.delete(`/dapur/piket/${id}`);
        
        await Swal.fire({
          title: 'Dihapus!',
          text: 'Data piket berhasil dihapus.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        
        fetchPiket();
      }
    } catch (err) {
      console.error('Error deleting piket:', err);
      
      let errorMessage = 'Gagal menghapus data piket';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Sesi Anda telah habis. Silakan login kembali.';
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      }
      
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const filteredPiketList = piketList.filter(piket => 
    piket.nama_kelompok.toLowerCase().includes(searchTerm.toLowerCase()) ||
    piket.anggota_kelompok.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Container className="piket-dapur-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button 
            variant="outline-primary" 
            onClick={() => navigate(-1)}
            className="back-button"
          >
            <FaArrowLeft className="me-2" /> Kembali
          </Button>
          
          <Button 
            variant="primary" 
            onClick={() => navigate('/dapur/piketdapur/add')}
            className="add-button"
          >
            <FaPlus className="me-2" /> Tambah Piket
          </Button>
        </div>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6}>
                <h2 className="mb-0">
                  <FaCalendarAlt className="me-2 text-primary" />
                  Jadwal Piket Dapur
                </h2>
              </Col>
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <FormControl
                    placeholder="Cari kelompok atau anggota..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible className="animated fadeIn">
            <Alert.Heading>Terjadi Kesalahan!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" size="lg" />
            <p className="mt-3 text-muted">Memuat data piket...</p>
          </div>
        ) : (
          <>
            {filteredPiketList.length === 0 ? (
              <Card className="text-center py-5 shadow-sm">
                <Card.Body>
                  <img 
                    src="/images/empty-state.svg" 
                    alt="No data" 
                    style={{ height: '150px', opacity: 0.7 }}
                    className="mb-4"
                  />
                  <h4 className="text-muted">
                    {searchTerm ? 'Piket tidak ditemukan' : 'Belum ada data piket'}
                  </h4>
                  <p className="text-muted">
                    {searchTerm ? 'Coba dengan kata kunci lain' : 'Tambahkan piket baru dengan tombol di atas'}
                  </p>
                </Card.Body>
              </Card>
            ) : (
              <Card className="shadow-sm">
                <Table hover responsive className="mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th style={{ width: '5%' }}>No</th>
                      <th style={{ width: '25%' }}>Kelompok</th>
                      <th style={{ width: '60%' }}>Anggota</th>
                      <th style={{ width: '10%' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPiketList.map((item, index) => (
                      <tr key={item.id} className="align-middle">
                        <td>
                          <Badge bg="primary" pill>
                            {index + 1}
                          </Badge>
                        </td>
                        <td>
                          <div className="fw-bold">{item.nama_kelompok}</div>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-2">
                            {item.anggota_kelompok.split(',').map((anggota, i) => (
                              <Badge key={i} bg="light" text="dark" className="d-flex align-items-center">
                                <FaUsers className="me-1 text-secondary" size={12} />
                                {anggota.trim()}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                              className="action-button"
                              title="Hapus"
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            )}
          </>
        )}
      </Container>
        <style> {`
            .piket-dapur-container {
                max-width: 1200px;
                }

                .back-button {
                border-radius: 20px;
                padding: 8px 16px;
                font-weight: 500;
                transition: all 0.3s ease;
                }

                .back-button:hover {
                transform: translateX(-3px);
                }

                .add-button {
                border-radius: 20px;
                padding: 8px 16px;
                font-weight: 500;
                transition: all 0.3s ease;
                }

                .add-button:hover {
                transform: translateY(-3px);
                box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
                }

                .action-button {
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                }

                .action-button:hover {
                transform: scale(1.1);
                }

                .table-primary th {
                font-weight: 600;
                text-transform: uppercase;
                font-size: 0.85rem;
                letter-spacing: 0.5px;
                }

                .table td {
                vertical-align: middle;
                }

                .badge {
                font-weight: 500;
                padding: 6px 10px;
                }

                /* Animation */
                @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
                }

                .animated {
                animation: fadeIn 0.3s ease-out;
                }
        ` }
        </style>
    </Layout>
  );
};

export default PiketDapur;