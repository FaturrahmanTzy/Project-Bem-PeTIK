import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';

const AddPiketDapur = () => {
  const [formData, setFormData] = useState({
    nama_kelompok: '',
    anggota_kelompok: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: 'https://profur.rikpetik.site/api/v1',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nama_kelompok.trim()) {
      newErrors.nama_kelompok = 'Nama kelompok harus diisi';
    }
    
    if (!formData.anggota_kelompok.trim()) {
      newErrors.anggota_kelompok = 'Anggota kelompok harus diisi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setErrorMessage('');
      
      // Format anggota_kelompok to remove extra spaces and commas
      const formattedAnggota = formData.anggota_kelompok
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '')
        .join(', ');
      
      const payload = {
        nama_kelompok: formData.nama_kelompok,
        anggota_kelompok: formattedAnggota
      };

      await api.post('/dapur/piketdapur', payload);
      
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Data piket dapur berhasil ditambahkan',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      navigate('/dapur/piket');
    } catch (err) {
      console.error('Error adding piket:', err);
      
      let message = 'Gagal menambahkan data piket';
      if (err.response) {
        if (err.response.status === 401) {
          message = 'Sesi Anda telah habis. Silakan login kembali.';
        } else {
          message = err.response.data?.message || message;
        }
      }
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container className="my-5">
        <Button 
          variant="outline-primary" 
          onClick={() => navigate('/dapur/piketdapur')}
          className="mb-4"
        >
          <FaArrowLeft className="me-2" /> Kembali
        </Button>

        <h2 className="mb-4">Tambah Piket Dapur</h2>
        
        {errorMessage && (
          <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
            {errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nama_kelompok">
            <Form.Label>Nama Kelompok</Form.Label>
            <Form.Control
              type="text"
              name="nama_kelompok"
              value={formData.nama_kelompok}
              onChange={handleChange}
              isInvalid={!!errors.nama_kelompok}
              placeholder="Contoh: Kelompok A"
            />
            <Form.Control.Feedback type="invalid">
              {errors.nama_kelompok}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="anggota_kelompok">
            <Form.Label>Anggota Kelompok</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="anggota_kelompok"
              value={formData.anggota_kelompok}
              onChange={handleChange}
              isInvalid={!!errors.anggota_kelompok}
              placeholder="Masukkan nama anggota, dipisahkan dengan koma. Contoh: Anggota 1, Anggota 2, Anggota 3"
            />
            <Form.Control.Feedback type="invalid">
              {errors.anggota_kelompok}
            </Form.Control.Feedback>
            <Form.Text muted>
              Pisahkan setiap nama anggota dengan koma (,)
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
            >
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
                <>
                  <FaSave className="me-2" /> Simpan
                </>
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </Layout>
  );
};

export default AddPiketDapur;