import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Spinner, Alert, Image, Badge } from 'react-bootstrap';
import { FaUtensils, FaPlus, FaEdit, FaTrash, FaUpload, FaTimes, FaSearch, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../../layout/Layout';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Dapur = () => {
  const [makanan, setMakanan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Tambah Data Makanan');
  const [currentMakanan, setCurrentMakanan] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama_makanan: '',
    deskripsi: '',
    image: null
  });

  // Create axios instance with base URL and headers
  const api = axios.create({
    baseURL: 'https://profur.rikpetik.site/api/v1',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const baseImageUrl = 'https://profur.rikpetik.site'; // Sesuaikan dengan URL server Anda

  // Fetch data with better error handling
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Anda harus login terlebih dahulu');
      }
  
      const response = await api.get('/kesehatan/makanan');
      console.log('Response dari API:', response.data); // Untuk debugging
      
      // Perbaikan utama di sini - sesuaikan dengan struktur response API
      const data = Array.isArray(response.data) 
        ? response.data.map(item => ({
            ...item,
            imageUrl: item.image ? `${baseImageUrl}${item.image}` : null
          })) 
        : response.data?.data?.map(item => ({
            ...item,
            imageUrl: item.image ? `${baseImageUrl}${item.image}` : null
          })) || [];
      
      setMakanan(data);
    } catch (err) {
      console.error('Error fetching data:', err);
      
      let errorMessage = 'Gagal memuat data makanan. Silakan coba lagi.';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Sesi Anda telah habis. Silakan login kembali.';
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setMakanan([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter makanan
  const filteredMakanan = Array.isArray(makanan)
    ? makanan.filter(item => 
        item?.nama_makanan?.toLowerCase()?.includes(searchTerm.toLowerCase()))
    : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (file) {
      setError('Ukuran gambar terlalu besar. Maksimal 2MB');
    }
  };
  

  const resetForm = () => {
    setFormData({
      nama_makanan: '',
      deskripsi: '',
      image: null
    });
    setPreviewImage(null);
    setCurrentMakanan(null);
    setModalTitle('Tambah Data Makanan');
  };

  const handleAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setCurrentMakanan(item);
    setFormData({
      nama_makanan: item.nama_makanan,
      deskripsi: item.deskripsi,
      image: null
    });
    setPreviewImage(item.imageUrl || '/img/food-placeholder.jpg');
    setModalTitle(`Edit ${item.nama_makanan}`);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Anda harus login terlebih dahulu');
      }

      const formDataToSend = new FormData();
      formDataToSend.append('nama_makanan', formData.nama_makanan);
      formDataToSend.append('deskripsi', formData.deskripsi);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      if (currentMakanan) {
        await api.put(`/kesehatan/makanan/${currentMakanan.id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await api.post('/kesehatan/makanan', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      await fetchData();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error('Error submitting form:', err);
      
      let errorMessage = 'Gagal menyimpan data';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Sesi Anda telah habis. Silakan login kembali.';
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      }
      setError(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Data makanan akan dihapus permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
      });
  
      if (result.isConfirmed) {
        await api.delete(`/kesehatan/makanan/${id}`);
        
        await Swal.fire(
          'Dihapus!',
          'Data makanan berhasil dihapus.',
          'success'
        );
        
        await fetchData();
      }
    } catch (err) {
      console.error('Error deleting data:', err);
      
      let errorMessage = 'Gagal menghapus data';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Sesi Anda telah habis. Silakan login kembali.';
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      }
      
      await Swal.fire(
        'Error!',
        errorMessage,
        'error'
      );
    }
  };

  return (
    <Layout>
      <Container fluid className="px-md-4 px-lg-5">
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div className="text-center text-md-start mb-3 mb-md-0">
            <h1 className="fw-bold mb-2">
              <FaUtensils className="me-2 text-warning" /> Divisi Dapur
            </h1>
            <p className="text-muted mb-0">Manajemen menu dan makanan harian</p>
          </div>
          
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Button 
              variant="outline-warning" 
              onClick={() => navigate('/dapur/menumakanan')}
              className="d-flex align-items-center"
            >
              <FaCalendarAlt className="me-2" /> Menu Makanan
            </Button>
            <Button 
              variant="outline-info" 
              onClick={() => navigate('/dapur/piketdapur')}
              className="d-flex align-items-center"
            >
              <FaInfoCircle className="me-2" /> Lihat Piket
            </Button>
            <Button 
              variant="primary" 
              onClick={handleAdd}
              className="d-flex align-items-center"
            >
              <FaPlus className="me-2" /> Tambah Makanan
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible className="mb-4">
            {error}
          </Alert>
        )}

        {/* Search Card */}
        <Card className="shadow-sm mb-4 border-0 bg-light">
          <Card.Body className="p-3">
            <Row className="align-items-center">
              <Col md={6}>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch className="text-muted" />
                  </span>
                  <Form.Control
                    type="search"
                    placeholder="Cari makanan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0"
                  />
                </div>
              </Col>
              <Col md={6} className="mt-3 mt-md-0">
                <div className="d-flex justify-content-md-end gap-2 flex-wrap">
                  <Badge bg="light" text="dark" className="px-3 py-2 border">
                    Total: {filteredMakanan.length} Makanan
                  </Badge>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Memuat data makanan...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredMakanan.length === 0 && (
          <Card className="text-center py-5 border-0 shadow-sm bg-light">
            <Card.Body>
              <Image 
                src="/img/empty-food.svg" 
                fluid 
                style={{ maxHeight: '200px' }} 
                className="mb-4 opacity-75"
                onError={(e) => {
                  e.target.src = '/img/empty-state.svg';
                }}
              />
              <h5 className="mb-3">Belum ada data makanan</h5>
              <p className="text-muted mb-4">Tambahkan makanan pertama Anda untuk memulai</p>
              <Button variant="primary" onClick={handleAdd} className="px-4">
                <FaPlus className="me-2" /> Tambah Makanan Baru
              </Button>
            </Card.Body>
          </Card>
        )}

        {/* Food Items Grid */}
        {!loading && filteredMakanan.length > 0 && (
          <Row className="g-4">
            {filteredMakanan.map((item) => (
              <Col key={item.id} xl={3} lg={4} md={6}>
                <Card className="h-100 shadow-sm food-card border-0">
                  <div className="food-image-container position-relative">
                  <Image
                        src={item.imageUrl || '/img/food-placeholder.jpg'}
                        alt={item.nama_makanan}
                        fluid
                        className="food-image"
                        onError={(e) => {
                          console.error('Gagal memuat gambar:', item.nama_makanan, item.imageUrl);
                          e.target.src = '/img/food-placeholder.jpg'; // Gambar placeholder
                          e.target.onerror = null; // Mencegah infinite loop
                        }}
                      />
                    <div className="food-actions position-absolute top-0 end-0 p-2">
                      <Button
                        variant="outline-light"
                        size="sm"
                        className="me-1 shadow-sm"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit className="text-primary" />
                      </Button>
                      <Button
                        variant="outline-light"
                        size="sm"
                        className="shadow-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaTrash className="text-danger" />
                      </Button>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold mb-2">{item.nama_makanan}</Card.Title>
                    <Card.Text className="text-muted food-description">
                      {item.deskripsi || 'Tidak ada deskripsi'}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pt-0">
                    <small className="text-muted">
                      Terakhir diupdate: {new Date(item.updated_at).toLocaleDateString()}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Add/Edit Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold">
              <FaUtensils className="me-2 text-warning" /> {modalTitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Nama Makanan</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama_makanan"
                      value={formData.nama_makanan}
                      onChange={handleInputChange}
                      required
                      placeholder="Contoh: Nasi Goreng Special"
                      className="border-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Deskripsi</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="deskripsi"
                      value={formData.deskripsi}
                      onChange={handleInputChange}
                      required
                      placeholder="Deskripsi bahan dan cara penyajian"
                      className="border-2"
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Gambar Makanan</Form.Label>
                    {previewImage ? (
                      <div className="mb-3 image-preview-container position-relative">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          fluid
                          className="image-preview rounded-3 shadow-sm"
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          className="position-absolute top-0 end-0 m-2 remove-image-btn rounded-circle"
                          onClick={() => {
                            setPreviewImage(null);
                            setFormData(prev => ({ ...prev, image: null }));
                          }}
                        >
                          <FaTimes />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 rounded-3 p-4 text-center bg-light">
                        <FaUpload className="display-5 text-muted mb-3" />
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="d-none"
                          id="uploadImage"
                        />
                        <Form.Label 
                          htmlFor="uploadImage" 
                          className="btn btn-outline-primary mb-2 px-4"
                        >
                          Pilih Gambar
                        </Form.Label>
                        <Form.Text className="d-block text-muted small">
                          Format JPG/PNG, maksimal 2MB
                        </Form.Text>
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <Button variant="light" onClick={() => setShowModal(false)}>
                  Batal
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Menyimpan...
                    </>
                  ) : (
                    'Simpan Data'
                  )}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <style>{`
            /* Food Card Styles */
              .food-card {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                border-radius: 12px;
                overflow: hidden;
              }

              .food-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
              }

              .food-image-container {
                height: 180px;
                overflow: hidden;
                position: relative;
              }

              .food-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
              }

              .food-card:hover .food-image {
                transform: scale(1.05);
              }

              .food-description {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                min-height: 72px;
              }

              /* Image Preview Styles */
              .image-preview-container {
                border-radius: 12px;
                overflow: hidden;
              }

              .image-preview {
                max-height: 200px;
                width: 100%;
                object-fit: cover;
              }

              .remove-image-btn {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.8;
              }

              .remove-image-btn:hover {
                opacity: 1;
              }

              /* Modal Styles */
              .modal-content {
                border: none;
                border-radius: 15px;
              }

              /* Responsive Adjustments */
              @media (max-width: 768px) {
                .food-image-container {
                  height: 150px;
                }
                
                .food-description {
                  min-height: auto;
                  -webkit-line-clamp: 2;
                }
              }
      `}</style>
    </Layout>
  );
};

export default Dapur;