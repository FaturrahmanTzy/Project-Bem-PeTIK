import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tab, Nav, Image, Badge, Table, Form } from 'react-bootstrap';
import { FaUtensils, FaCalendarAlt, FaUsers, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const DapurModern = () => {
  // State untuk data
  const [makanan, setMakanan] = useState([]);
  const [menu, setMenu] = useState([]);
  const [piket, setPiket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('makanan');
  const [searchTerm, setSearchTerm] = useState('');

  // Base URL API
  const baseUrl = 'https://profur.rikpetik.site/api/v1';
  const baseImageUrl = 'https://profur.rikpetik.site';

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token tidak ditemukan');
        }
        
        // Fetch semua data sekaligus dengan error handling untuk masing-masing request
        const [makananRes, menuRes, piketRes] = await Promise.all([
          axios.get(`${baseUrl}/kesehatan/makanan`, {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error('Error fetching makanan:', err);
            return { data: { data: [] } }; // Return empty array jika error
          }),
          axios.get(`${baseUrl}/dapur/menu`, {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error('Error fetching menu:', err);
            return { data: { data: [] } }; // Return empty array jika error
          }),
          axios.get(`${baseUrl}/dapur/piket`, {
            headers: { Authorization: `Bearer ${token}` }
          }).catch(err => {
            console.error('Error fetching piket:', err);
            return { data: { data: [] } }; // Return empty array jika error
          })
        ]);

        // Pastikan data yang disimpan adalah array
        setMakanan(Array.isArray(makananRes.data.data) ? makananRes.data.data : []);
        setMenu(Array.isArray(menuRes.data.data) ? menuRes.data.data : []);
        setPiket(Array.isArray(piketRes.data.data) ? piketRes.data.data : []);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire('Error', 'Gagal memuat data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data berdasarkan search term
  const filteredMakanan = makanan.filter(item =>
    item?.nama_makanan?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredMenu = menu.filter(item =>
    item?.nama_menu?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPiket = piket.filter(item =>
    item?.nama_kelompok?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Memuat data dapur...</p>
        </div>
      </div>
    );
  }

  return (
    <Container fluid className="px-4 py-4">
      <h2 className="fw-bold mb-4">
        <FaUtensils className="me-2 text-warning" /> Manajemen Dapur
      </h2>

      {/* Search Bar */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="input-group" style={{ maxWidth: '400px' }}>
              <span className="input-group-text bg-white">
                <FaSearch className="text-muted" />
              </span>
              <Form.Control
                type="search"
                placeholder="Cari..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-start-0"
              />
            </div>
            <Badge bg="light" text="dark" className="px-3 py-2">
              {activeTab === 'makanan' && `Total: ${filteredMakanan.length} Makanan`}
              {activeTab === 'menu' && `Total: ${filteredMenu.length} Menu`}
              {activeTab === 'piket' && `Total: ${filteredPiket.length} Kelompok`}
            </Badge>
          </div>
        </Card.Body>
      </Card>

      {/* Tabs Navigation */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="makanan" className="d-flex align-items-center">
              <FaUtensils className="me-2" /> Data Makanan
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="menu" className="d-flex align-items-center">
              <FaCalendarAlt className="me-2" /> Menu Makanan
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="piket" className="d-flex align-items-center">
              <FaUsers className="me-2" /> Jadwal Piket
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab Content */}
        <Tab.Content>
          {/* Tab Data Makanan */}
          <Tab.Pane eventKey="makanan">
            {filteredMakanan.length === 0 ? (
              <Card className="text-center py-5">
                <Card.Body>
                  <Image 
                    src="/img/empty-food.svg" 
                    fluid 
                    style={{ maxHeight: '200px' }} 
                    className="mb-4 opacity-75"
                  />
                  <h5>Belum ada data makanan</h5>
                  <Button variant="primary" className="mt-3">
                    <FaPlus className="me-2" /> Tambah Makanan
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Row className="g-4">
                {filteredMakanan.map(item => (
                  <Col key={item.id} lg={4} md={6}>
                    <Card className="h-100 shadow-sm border-0">
                      <div style={{ height: '200px', overflow: 'hidden' }}>
                        <Image
                          src={item.image ? `${baseImageUrl}${item.image}` : '/img/food-placeholder.jpg'}
                          alt={item.nama_makanan}
                          fluid
                          className="w-100 h-100 object-fit-cover"
                          onError={(e) => {
                            e.target.src = '/img/food-placeholder.jpg';
                          }}
                        />
                      </div>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start">
                          <Card.Title className="fw-bold mb-2">{item.nama_makanan}</Card.Title>
                          <div>
                            <Button variant="outline-primary" size="sm" className="me-2">
                              <FaEdit />
                            </Button>
                          </div>
                        </div>
                        <Card.Text className="text-muted">
                          {item.deskripsi || 'Tidak ada deskripsi'}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-0">
                        <small className="text-muted">
                          Terakhir diupdate: {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : 'Tidak diketahui'}
                        </small>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Tab.Pane>

          {/* Tab Menu Makanan */}
          <Tab.Pane eventKey="menu">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <Table hover responsive className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>No</th>
                      <th>Nama Menu</th>
                      <th>Makanan</th>
                      <th>Deskripsi</th>
                      <th>Tanggal</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMenu.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td className="fw-semibold">{item.nama_menu || '-'}</td>
                        <td>
                          {item.makanan ? (
                            <Badge bg="light" text="dark" className="me-1">
                              {item.makanan.nama_makanan}
                            </Badge>
                          ) : (
                            <Badge bg="secondary">Tidak ada makanan</Badge>
                          )}
                        </td>
                        <td>{item.deskripsi || '-'}</td>
                        <td>{item.tanggal ? new Date(item.tanggal).toLocaleDateString() : '-'}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-2">
                            <FaEdit />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {filteredMenu.length === 0 && (
                  <div className="text-center py-5">
                    <Image 
                      src="/img/empty-menu.svg" 
                      fluid 
                      style={{ maxHeight: '150px' }} 
                      className="mb-3 opacity-75"
                    />
                    <h5>Belum ada data menu</h5>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* Tab Jadwal Piket */}
          <Tab.Pane eventKey="piket">
            <Row className="g-4">
              {filteredPiket.map(item => (
                <Col key={item.id} lg={6}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Header className="bg-primary text-white">
                      <Card.Title className="mb-0">
                        Kelompok: {item.nama_kelompok || 'Tanpa nama'}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <h6 className="mb-3">Anggota Kelompok:</h6>
                      <ul className="list-group list-group-flush">
                        {item.anggota_kelompok && typeof item.anggota_kelompok === 'string' ? (
                          item.anggota_kelompok.split(',').map((anggota, idx) => (
                            <li key={idx} className="list-group-item">
                              {anggota.trim() || `Anggota ${idx + 1}`}
                            </li>
                          ))
                        ) : (
                          <li className="list-group-item text-muted">Tidak ada anggota</li>
                        )}
                      </ul>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0 d-flex justify-content-end">
                      <Button variant="outline-primary" size="sm" className="me-2">
                        <FaEdit />
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
              {filteredPiket.length === 0 && (
                <Col>
                  <Card className="text-center py-5 border-0 shadow-sm">
                    <Card.Body>
                      <Image 
                        src="/img/empty-team.svg" 
                        fluid 
                        style={{ maxHeight: '200px' }} 
                        className="mb-4 opacity-75"
                      />
                      <h5>Belum ada jadwal piket</h5>
                    </Card.Body>
                  </Card>
                </Col>
              )}
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default DapurModern;