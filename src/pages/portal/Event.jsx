import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaRegClock, FaArrowLeft, FaUserTie } from 'react-icons/fa';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    });

    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://profur.rikpetik.site/api/v1/event', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log('API Response:', response.data);
        
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else if (response.data.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data);
        } else if (response.data.events && Array.isArray(response.data.events)) {
          setEvents(response.data.events);
        } else {
          setEvents([]);
          setError('Format data tidak dikenali');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
        setLoading(false);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'seminar': return 'bg-info';
      case 'lomba': return 'bg-warning';
      case 'pelatihan': return 'bg-success';
      case 'workshop': return 'bg-primary';
      case 'pengabdian': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="mt-3 text-primary">Memuat data...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center p-4">
        <div className="bg-danger text-white rounded-circle p-4 mb-3">
          <i className="bi bi-exclamation-triangle-fill" style={{fontSize: '2rem'}}></i>
        </div>
        <h3 className="text-danger mb-3">Terjadi Kesalahan</h3>
        <p className="mb-4">{error}</p>
        <button 
          className="btn btn-primary rounded-pill px-4"
          onClick={() => window.location.reload()}
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center p-4">
        <div className="bg-light rounded-circle p-4 mb-3">
          <i className="bi bi-calendar-x text-muted" style={{fontSize: '2rem'}}></i>
        </div>
        <h3 className="text-muted mb-2">Tidak ada event tersedia</h3>
        <p className="text-muted">Belum ada kegiatan yang bisa ditampilkan saat ini</p>
      </div>
    );
  }

  return (
    <div className="event-page">
      <Header />
      
      <main className="event-container">
        {/* Hero Section */}
        <section className="hero-section bg-gradient-primary text-white py-5">
          <div className="container py-5">
            <div className="text-center">
              <h1 className="display-4 fw-bold mb-3" data-aos="fade-down">Kegiatan BEM PeTIK</h1>
              <p className="lead mb-4" data-aos="fade-down" data-aos-delay="50">Berbagai acara dan kegiatan yang diselenggarakan oleh BEM PeTIK</p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-warning rounded-pill px-4 fw-bold" data-aos="fade-down">
                  Periode 2024/2025
                </button>
                <button className="btn btn-outline-light rounded-pill px-4 fw-bold" data-aos="fade-down">
                  Semua Kategori
                </button>
              </div>
            </div>
          </div>
        </section>

        {selectedEvent ? (
          <div className="container py-5">
            <div className="event-detail-container" data-aos="fade-up">
              <button 
                className="btn btn-outline-primary mb-4 d-flex align-items-center" 
                onClick={() => setSelectedEvent(null)}
                data-aos="fade-right"
              >
                <FaArrowLeft className="me-2" /> Kembali ke Daftar Kegiatan
              </button>
              
              <div className="event-detail-content card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="event-detail-header position-relative">
                  <img 
                    src={selectedEvent.gambarCover || '/default-cover.jpg'} 
                    alt={selectedEvent.judulKegiatan} 
                    className="event-detail-cover w-100"
                    style={{height: '400px', objectFit: 'cover'}}
                    data-aos="zoom-in"
                    onError={(e) => {
                      e.target.src = '/default-cover.jpg';
                    }}
                  />
                  <div className="event-detail-info position-absolute bottom-0 start-0 end-0 p-4 p-md-5 text-white" 
                    style={{background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'}}>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h2 className="fw-bold mb-3" data-aos="fade-up">{selectedEvent.judulKegiatan || 'Judul Kegiatan'}</h2>
                        <div className="d-flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="100">
                          <span className={`badge ${getCategoryColor(selectedEvent.kategori)} rounded-pill px-3 py-2`}>
                            {selectedEvent.kategori || 'Umum'}
                          </span>
                          <span className="badge bg-light text-dark rounded-pill px-3 py-2 d-flex align-items-center">
                            <FaUsers className="me-2" /> {selectedEvent.jumlahPendaftar || 0}/{selectedEvent.kuotaPeserta || 0} Peserta
                          </span>
                        </div>
                      </div>
                      {selectedEvent.linkPendaftaran && (
                        <a 
                          href={selectedEvent.linkPendaftaran} 
                          className="btn btn-primary rounded-pill px-4 fw-bold align-self-center"
                          target="_blank"
                          rel="noopener noreferrer"
                          data-aos="fade-left"
                        >
                          <a href="https://pmbt.petik.or.id/" className='text-white text-decoration-none'>Daftar Sekarang</a>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="event-detail-body p-4 p-md-5">
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <div className="card border-0 shadow-sm rounded-3 h-100 p-3">
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                            <FaCalendarAlt className="text-primary" size={20} />
                          </div>
                          <div>
                            <h6 className="mb-0 text-muted">Waktu Pelaksanaan</h6>
                            <p className="mb-0 fw-bold">
                              {formatDate(selectedEvent.waktuMulai)} - {formatDate(selectedEvent.waktuSelesai)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card border-0 shadow-sm rounded-3 h-100 p-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                            <FaMapMarkerAlt className="text-primary" size={20} />
                          </div>
                          <div>
                            <h6 className="mb-0 text-muted">Lokasi Kegiatan</h6>
                            <p className="mb-0 fw-bold">
                              {selectedEvent.lokasiKegiatan || 'Lokasi belum ditentukan'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="fw-bold mb-3">Deskripsi Kegiatan</h4>
                    <div 
                      className="event-description"
                      dangerouslySetInnerHTML={{ __html: selectedEvent.deskripsiLengkap || '<p>Deskripsi belum tersedia</p>' }}
                    ></div>
                  </div>

                  <div className="card border-0 shadow-sm rounded-3 p-4 mb-4">
                    <h4 className="fw-bold mb-3">Detail Kegiatan</h4>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                            <FaUsers className="text-primary" size={20} />
                          </div>
                          <div>
                            <h6 className="mb-0 text-muted">Pendaftar</h6>
                            <p className="mb-0 fw-bold fs-5">{selectedEvent.jumlahPendaftar || 0}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                            <FaUsers className="text-primary" size={20} />
                          </div>
                          <div>
                            <h6 className="mb-0 text-muted">Kuota</h6>
                            <p className="mb-0 fw-bold fs-5">{selectedEvent.kuotaPeserta || 0}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                            <FaUserTie className="text-primary" size={20} />
                          </div>
                          <div>
                            <h6 className="mb-0 text-muted">Penanggung Jawab</h6>
                            <p className="mb-0 fw-bold fs-5">{selectedEvent.penanggungJawab || '-'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedEvent.linkPendaftaran && (
                    <div className="text-center">
                      <a 
                        href={selectedEvent.linkPendaftaran} 
                        className="btn btn-primary btn-lg rounded-pill px-5 fw-bold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <a href="https://pmbt.petik.or.id/" className='text-white text-decoration-none'>Daftar Sekarang</a>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container py-5">
            <section className="event-list-section">
              <div className="row g-4">
                {events.map((event, index) => (
                  <div 
                    key={event.id || index} 
                    className="col-md-6 col-lg-4"
                    data-aos="fade-up"
                    data-aos-delay={index % 3 * 100}
                  >
                    <div 
                      className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden event-card"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="position-relative">
                        <img 
                          src={event.gambarCover || '/default-cover.jpg'} 
                          alt={event.judulKegiatan}
                          className="card-img-top"
                          style={{height: '200px', objectFit: 'cover'}}
                          onError={(e) => {
                            e.target.src = '/default-cover.jpg';
                          }}
                        />
                        <div className="position-absolute top-0 end-0 m-3">
                          <span className={`badge ${getCategoryColor(event.kategori)} rounded-pill px-3 py-2`}>
                            {event.kategori || 'Umum'}
                          </span>
                        </div>
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h3 className="card-title fw-bold">{event.judulKegiatan || 'Judul Kegiatan'}</h3>
                        <div className="d-flex align-items-center text-muted mb-2">
                          <FaCalendarAlt className="me-2" />
                          <small>{formatDate(event.waktuMulai)}</small>
                        </div>
                        <div className="d-flex align-items-center text-muted mb-3">
                          <FaMapMarkerAlt className="me-2" />
                          <small>{event.lokasiKegiatan || 'Online'}</small>
                        </div>
                        <p className="card-text flex-grow-1">
                          {event.ringkasan 
                            ? (event.ringkasan.length > 100 
                              ? `${event.ringkasan.substring(0, 100)}...` 
                              : event.ringkasan)
                            : 'Deskripsi singkat belum tersedia'}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <span className="badge bg-light text-dark">
                            <FaUsers className="me-1" /> {event.jumlahPendaftar || 0}/{event.kuotaPeserta || 0}
                          </span>
                          <button className="btn btn-sm btn-outline-primary rounded-pill">
                            Lihat Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />

      <style>{`
        .event-page {
          font-family: 'Poppins', sans-serif;
        }
        
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%,;
        }
        
        .hero-section {
          background-size: cover;
          background-position: center;
        }
        
        .event-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .event-card .card-img-top {
          transition: transform 0.5s ease;
        }
        
        .event-card:hover .card-img-top {
          transform: scale(1.05);
        }
        
        .event-description img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 15px 0;
        }
        
        .event-description iframe {
          max-width: 100%;
          border-radius: 8px;
          margin: 15px 0;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 20px !important;
          }
          
          .hero-section h1 {
            font-size: 2rem !important;
          }
          
          .event-detail-cover {
            height: 250px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Event;