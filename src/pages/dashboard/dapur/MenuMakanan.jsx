import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Table, 
  Button, 
  Spinner, 
  Alert, 
  Form,
  Modal,
  Row,
  Col,
  Card,
  Badge,
  InputGroup,
  FloatingLabel
} from 'react-bootstrap';
import { 
  FaArrowLeft, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaFilter,
  FaTimes,
  FaCheck
} from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';

const MenuMakanan = () => {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    bulan: '',
    pekan: '',
    hari: '',
    waktu: ''
  });
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'https://profur.rikpetik.site/api/v1',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (filters.bulan) params.bulan = filters.bulan;
      if (filters.pekan) params.pekan = filters.pekan;
      if (filters.hari) params.hari = filters.hari;
      if (filters.waktu) params.waktu = filters.waktu;

      const response = await api.get('/dapur/menu', { params });
      setMenuList(response.data.data || []);
    } catch (err) {
      console.error('Error fetching menu:', err);
      let errorMessage = 'Gagal memuat data menu';
      if (err.response?.status === 401) {
        errorMessage = 'Sesi Anda telah habis. Silakan login kembali.';
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentMenu(null);
  };

  useEffect(() => {
    fetchMenu();
  }, [searchTerm, filters]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Data menu akan dihapus permanen!",
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
        await api.delete(`/dapur/menu/${id}`);
        await Swal.fire({
          title: 'Dihapus!',
          text: 'Data menu berhasil dihapus.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        fetchMenu();
      }
    } catch (err) {
      console.error('Error deleting menu:', err);
      let errorMessage = 'Gagal menghapus menu';
      if (err.response?.status === 401) {
        errorMessage = 'Sesi Anda telah habis. Silakan login kembali.';
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        errorMessage = err.response?.data?.message || errorMessage;
      }
      Swal.fire('Error!', errorMessage, 'error');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const menuToUpdate = menuList.find(menu => menu.id === id);
      await api.put(`/dapur/menu/status/${id}`, { 
        ...menuToUpdate,
        status_kesesuaian: status 
      });
      fetchMenu();
    } catch (err) {
      console.error('Error updating status:', err);
      Swal.fire('Error!', err.response?.data?.message || 'Gagal mengupdate status', 'error');
    }
  };

  const openEditModal = (menu) => {
    setCurrentMenu(menu || {
      bulan: '',
      pekan: '',
      hari: '',
      waktu: '',
      menu: '',
      keterangan: '',
      status_kesesuaian: ''
    });
    setShowModal(true);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (!currentMenu.bulan || !currentMenu.pekan || !currentMenu.hari || 
          !currentMenu.waktu || !currentMenu.menu || !currentMenu.keterangan) {
        throw new Error('Semua field harus diisi');
      }
  
      if (currentMenu.id) {
        await api.put(`/dapur/menu/${currentMenu.id}`, currentMenu);
        await Swal.fire({
          title: 'Berhasil!',
          text: 'Menu berhasil diupdate',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      } else {
        await api.post('/dapur/menu', currentMenu);
        await Swal.fire({
          title: 'Berhasil!',
          text: 'Menu berhasil ditambahkan',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
      
      handleCloseModal();
      fetchMenu();
    } catch (err) {
      console.error('Error saving menu:', err);
      Swal.fire('Error!', err.message || err.response?.data?.message || 'Gagal menyimpan menu', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMenu({
      ...currentMenu,
      [name]: value
    });
  };

  const bulanOptions = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const pekanOptions = [1, 2, 3, 4];
  const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const waktuOptions = ['Pagi', 'Siang', 'Malam'];

  const filteredMenuList = menuList.filter(menu => 
    menu.menu.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.keterangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Sesuai':
        return <Badge bg="success" pill><FaCheck className="me-1" /> Sesuai</Badge>;
      case 'Tidak Sesuai':
        return <Badge bg="danger" pill><FaTimes className="me-1" /> Tidak Sesuai</Badge>;
      default:
        return <Badge bg="secondary" pill>Belum Dicek</Badge>;
    }
  };

  return (
    <Layout>
      <Container className="menu-makanan-container">
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
            onClick={() => openEditModal(null)}
            className="add-button"
          >
            <FaPlus className="me-2" /> Tambah Menu
          </Button>
        </div>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6}>
                <h2 className="mb-0">
                  <FaCalendarAlt className="me-2 text-primary" />
                  Menu Makanan
                </h2>
              </Col>
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
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h5 className="mb-3">
              <FaFilter className="me-2 text-muted" />
              Filter Menu
            </h5>
            <Row>
              <Col md={3}>
                <FloatingLabel controlId="floatingBulan" label="Bulan">
                  <Form.Select
                    value={filters.bulan}
                    onChange={(e) => setFilters({...filters, bulan: e.target.value})}
                  >
                    <option value="">Semua Bulan</option>
                    {bulanOptions.map(bulan => (
                      <option key={bulan} value={bulan}>{bulan}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              
              <Col md={2}>
                <FloatingLabel controlId="floatingPekan" label="Pekan">
                  <Form.Select
                    value={filters.pekan}
                    onChange={(e) => setFilters({...filters, pekan: e.target.value})}
                  >
                    <option value="">Semua</option>
                    {pekanOptions.map(pekan => (
                      <option key={pekan} value={pekan}>Pekan {pekan}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              
              <Col md={2}>
                <FloatingLabel controlId="floatingHari" label="Hari">
                  <Form.Select
                    value={filters.hari}
                    onChange={(e) => setFilters({...filters, hari: e.target.value})}
                  >
                    <option value="">Semua</option>
                    {hariOptions.map(hari => (
                      <option key={hari} value={hari}>{hari}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              
              <Col md={2}>
                <FloatingLabel controlId="floatingWaktu" label="Waktu">
                  <Form.Select
                    value={filters.waktu}
                    onChange={(e) => setFilters({...filters, waktu: e.target.value})}
                  >
                    <option value="">Semua</option>
                    {waktuOptions.map(waktu => (
                      <option key={waktu} value={waktu}>{waktu}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              
              <Col md={3} className="d-flex align-items-end">
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setFilters({
                    bulan: '',
                    pekan: '',
                    hari: '',
                    waktu: ''
                  })}
                  className="w-100"
                >
                  <FaTimes className="me-2" /> Reset Filter
                </Button>
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
            <p className="mt-3 text-muted">Memuat data menu...</p>
          </div>
        ) : (
          <>
            {filteredMenuList.length === 0 ? (
              <Card className="text-center py-5 shadow-sm">
                <Card.Body>
                  <img 
                    src="/images/empty-state.svg" 
                    alt="No data" 
                    style={{ height: '150px', opacity: 0.7 }}
                    className="mb-4"
                  />
                  <h4 className="text-muted">
                    {searchTerm || Object.values(filters).some(f => f) 
                      ? 'Menu tidak ditemukan' 
                      : 'Belum ada data menu'}
                  </h4>
                  <p className="text-muted">
                    {searchTerm || Object.values(filters).some(f => f)
                      ? 'Coba dengan kata kunci atau filter lain'
                      : 'Tambahkan menu baru dengan tombol di atas'}
                  </p>
                </Card.Body>
              </Card>
            ) : (
              <Card className="shadow-sm">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-primary">
                      <tr>
                        <th style={{ width: '5%' }}>No</th>
                        <th style={{ width: '10%' }}>Bulan</th>
                        <th style={{ width: '8%' }}>Pekan</th>
                        <th style={{ width: '10%' }}>Hari</th>
                        <th style={{ width: '10%' }}>Waktu</th>
                        <th style={{ width: '25%' }}>Menu</th>
                        <th style={{ width: '15%' }}>Keterangan</th>
                        <th style={{ width: '12%' }}>Status</th>
                        <th style={{ width: '15%' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMenuList.map((menu, index) => (
                        <tr key={menu.id} className="align-middle">
                          <td>
                            <Badge bg="primary" pill>
                              {index + 1}
                            </Badge>
                          </td>
                          <td>{menu.bulan}</td>
                          <td>Pekan {menu.pekan}</td>
                          <td>{menu.hari}</td>
                          <td>{menu.waktu}</td>
                          <td className="menu-text">{menu.menu}</td>
                          <td className="keterangan-text">{menu.keterangan}</td>
                          <td>
                            <Form.Select
                              value={menu.status_kesesuaian || ''}
                              onChange={(e) => handleStatusChange(menu.id, e.target.value)}
                              size="sm"
                              className="status-select"
                            >
                              <option value="">- Pilih -</option>
                              <option value="Sesuai">Sesuai</option>
                              <option value="Tidak Sesuai">Tidak Sesuai</option>
                            </Form.Select>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => openEditModal(menu)}
                                className="action-button"
                                title="Edit"
                              >
                                <FaEdit />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => handleDelete(menu.id)}
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
                </div>
              </Card>
            )}
          </>
        )}

        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="w-100 text-center">
              <h4 className="mb-0">
                {currentMenu?.id ? 'Edit Menu Makanan' : 'Tambah Menu Makanan'}
              </h4>
            </Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body className="pt-0">
              <Row>
                <Col md={6}>
                  <FloatingLabel controlId="floatingBulan" label="Bulan" className="mb-3">
                    <Form.Select
                      name="bulan"
                      value={currentMenu?.bulan || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Pilih Bulan</option>
                      {bulanOptions.map(bulan => (
                        <option key={bulan} value={bulan}>{bulan}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                
                <Col md={6}>
                  <FloatingLabel controlId="floatingPekan" label="Pekan" className="mb-3">
                    <Form.Select
                      name="pekan"
                      value={currentMenu?.pekan || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Pilih Pekan</option>
                      {pekanOptions.map(pekan => (
                        <option key={pekan} value={pekan}>Pekan {pekan}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <FloatingLabel controlId="floatingHari" label="Hari" className="mb-3">
                    <Form.Select
                      name="hari"
                      value={currentMenu?.hari || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Pilih Hari</option>
                      {hariOptions.map(hari => (
                        <option key={hari} value={hari}>{hari}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
                
                <Col md={6}>
                  <FloatingLabel controlId="floatingWaktu" label="Waktu" className="mb-3">
                    <Form.Select
                      name="waktu"
                      value={currentMenu?.waktu || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Pilih Waktu</option>
                      {waktuOptions.map(waktu => (
                        <option key={waktu} value={waktu}>{waktu}</option>
                      ))}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              </Row>
              
              <FloatingLabel controlId="floatingMenu" label="Menu" className="mb-3">
                <Form.Control
                  as="textarea"
                  style={{ height: '100px' }}
                  name="menu"
                  value={currentMenu?.menu || ''}
                  onChange={handleInputChange}
                  required
                  placeholder="Masukkan menu makanan"
                />
              </FloatingLabel>
              
              <FloatingLabel controlId="floatingKeterangan" label="Keterangan" className="mb-3">
                <Form.Control
                  type="text"
                  name="keterangan"
                  value={currentMenu?.keterangan || ''}
                  onChange={handleInputChange}
                  required
                  placeholder="Masukkan keterangan"
                />
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button variant="outline-secondary" onClick={handleCloseModal} className="px-4">
                Batal
              </Button>
              <Button variant="primary" type="submit" disabled={loading} className="px-4">
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan'
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
      <style>{`
        .menu-makanan-container {
                max-width: 1400px;
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

                .menu-text, .keterangan-text {
                max-width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                }

                .status-select {
                min-width: 120px;
                }

                /* Animation */
                @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
                }

                .animated {
                animation: fadeIn 0.3s ease-out;
                }

                /* Modal styling */
                .modal-content {
                border-radius: 15px;
                }

                .modal-header {
                padding: 1.5rem 1.5rem 0;
                }

                .modal-footer {
                padding: 0 1.5rem 1.5rem;
                }
      `}</style>
    </Layout>
  );
};

export default MenuMakanan;