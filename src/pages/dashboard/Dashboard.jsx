import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { FaEdit, FaTrash, FaDownload, FaSort, FaSun, FaMoon, FaUserTie, FaUsers, FaCalendarAlt, FaMoneyBillWave, FaBullhorn, FaGraduationCap, FaUtensils, FaBroom, FaHeartbeat } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BEMDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const itemsPerPage = 5;
  const navigate = useNavigate();


  const bemData = [
    {
      id: 1,
      nama: "Sudarman",
      jabatan: "Ketua BEM",
      divisi: "Pimpinan",
      angkatan: "2020",
      prodi: "Teknik Informatika",
      no_hp: "081234567890",
      email: "sudarman@petik.ac.id",
      tugas: "Memimpin seluruh kegiatan BEM",
      status: "Aktif",
      join_date: "2023-01-15"
    },
    {
      id: 2,
      nama: "Muhammad Riza Al-Fahri",
      jabatan: "Wakil Ketua",
      divisi: "Pimpinan",
      angkatan: "2021",
      prodi: "Sistem Informasi",
      no_hp: "081298765432",
      email: "riza@petik.ac.id",
      tugas: "Mendampingi ketua",
      status: "Aktif",
      join_date: "2023-01-15"
    },
    {
      id: 3,
      nama: "Risky Agustian",
      jabatan: "Koordinator Logistik",
      divisi: "Logistik",
      angkatan: "2021",
      prodi: "Teknologi Informasi",
      no_hp: "082112345678",
      email: "risky@petik.ac.id",
      tugas: "Pengelolaan logistik",
      status: "Aktif",
      join_date: "2023-02-10"
    },
    {
      id: 4,
      nama: "Firdaus Al-Ayubi",
      jabatan: "Bendahara",
      divisi: "Keuangan",
      angkatan: "2020",
      prodi: "Akuntansi",
      no_hp: "085678901234",
      email: "firdaus@petik.ac.id",
      tugas: "Pengelolaan keuangan",
      status: "Aktif",
      join_date: "2023-02-10"
    },
    {
      id: 5,
      nama: "Muhammad Ilmiannur",
      jabatan: "Koordinator Kesehatan",
      divisi: "Kesehatan",
      angkatan: "2021",
      prodi: "Kedokteran",
      no_hp: "087812345678",
      email: "ilmiannur@petik.ac.id",
      tugas: "Program kesehatan mahasiswa",
      status: "Aktif",
      join_date: "2023-03-05"
    },
    {
      id: 6,
      nama: "Kholis Ibrohim",
      jabatan: "Koordinator Pendidikan",
      divisi: "Pendidikan",
      angkatan: "2021",
      prodi: "Pendidikan",
      no_hp: "081345678901",
      email: "kholis@petik.ac.id",
      tugas: "Program akademik",
      status: "Aktif",
      join_date: "2023-03-05"
    },
    {
      id: 7,
      nama: "Ikhsan Prasetyo",
      jabatan: "Koordinator Kebersihan",
      divisi: "Kebersihan",
      angkatan: "2022",
      prodi: "Teknik Lingkungan",
      no_hp: "082212345678",
      email: "ikhsan@petik.ac.id",
      tugas: "Kebersihan lingkungan",
      status: "Aktif",
      join_date: "2023-04-01"
    }
  ];

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  useEffect(() => {
    // Simulate API fetch
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        setData(bemData);
        setLoading(false);
        toast.success('Data pengurus BEM berhasil dimuat!', { position: 'top-right' });
      }, 1000);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Data?",
      text: "Data pengurus akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      background: darkMode ? '#2c3e50' : 'white',
      color: darkMode ? 'white' : '#2c3e50'
    });

    if (result.isConfirmed) {
      try {
        // Simulate delete
        setData(data.filter(item => item.id !== id));
        toast.success('Data pengurus berhasil dihapus!');
      } catch (err) {
        console.error('Gagal menghapus data:', err);
        toast.error('Gagal menghapus data!');
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportToCSV = () => {
    const headers = Object.keys(data[0]).join(',');
    const csvContent = data.map(item => Object.values(item).join(',')).join('\n');
    const csv = `${headers}\n${csvContent}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data_pengurus_bem.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.info('Data pengurus berhasil diunduh!');
  };

  const getDivisiIcon = (divisi) => {
    switch(divisi) {
      case 'Pimpinan': return <FaUserTie className="me-2" />;
      case 'Logistik': return <FaUtensils className="me-2" />;
      case 'Keuangan': return <FaMoneyBillWave className="me-2" />;
      case 'Kesehatan': return <FaHeartbeat className="me-2" />;
      case 'Pendidikan': return <FaGraduationCap className="me-2" />;
      case 'Kebersihan': return <FaBroom className="me-2" />;
      default: return <FaUsers className="me-2" />;
    }
  };

  const getDivisiColor = (divisi) => {
    switch(divisi) {
      case 'Pimpinan': return 'primary';
      case 'Logistik': return 'warning';
      case 'Keuangan': return 'success';
      case 'Kesehatan': return 'danger';
      case 'Pendidikan': return 'info';
      case 'Kebersihan': return 'secondary';
      default: return 'light';
    }
  };

  return (
    <Layout>
      {/* Animated Gradient Background */}
      <div className={`animated-bg ${darkMode ? 'dark' : ''}`}></div>

      <div className="container py-4">
        {/* Header dengan Glassmorphism */}
        <div className={`glass-card p-4 mb-4 rounded-4 ${darkMode ? 'dark-glass' : ''}`}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="mb-3 mb-md-0">
              <h2 className={`mb-0 ${darkMode ? 'text-white' : 'text-primary'}`}>
                👥 Data Pengurus BEM PeTIK
              </h2>
              <p className={`mb-0 ${darkMode ? 'text-light' : 'text-muted'}`}>
                Periode 2024/2025 • Total: <strong>{data.length}</strong> pengurus
              </p>
            </div>
            
            <div className="d-flex align-items-center flex-wrap">
              <button 
                onClick={toggleDarkMode} 
                className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} me-3 mb-2 mb-md-0`}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              
              <button 
                onClick={exportToCSV} 
                className="btn btn-info me-3 mb-2 mb-md-0 btn-hover"
              >
                <FaDownload /> Ekspor
              </button>
              
              <button
                onClick={() => navigate('/pengurus/tambah')}
                className="btn btn-success btn-hover mb-2 mb-md-0"
              >
                <i className="bi bi-plus-circle me-2"></i>Tambah
              </button>
            </div>
          </div>
        </div>

        <div className={`search-bar mb-4 ${darkMode ? 'dark-search' : ''}`}>
          <div className="input-group">
            <span className={`input-group-text ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className={`form-control ${darkMode ? 'bg-dark text-light border-dark' : ''}`}
              placeholder="Cari pengurus BEM..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className={`main-card ${darkMode ? 'dark-card' : ''}`}>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className={`mt-3 ${darkMode ? 'text-light' : ''}`}>Memuat data pengurus...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className={`alert ${darkMode ? 'alert-dark' : 'alert-warning'} text-center`}>
              Tidak ada data pengurus yang ditemukan.
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className={`table ${darkMode ? 'table-dark' : ''} table-hover align-middle`}>
                  <thead>
                    <tr className={`${darkMode ? 'bg-gray-800' : 'table-primary'}`}>
                      <th>No</th>
                      <th onClick={() => handleSort('nama')} className="sortable-header">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-badge me-2"></i> Nama
                          <FaSort className="ms-2" />
                        </div>
                      </th>
                      <th onClick={() => handleSort('jabatan')} className="sortable-header">
                        Jabatan
                      </th>
                      <th onClick={() => handleSort('divisi')} className="sortable-header">
                        Divisi
                      </th>
                      <th>Prodi</th>
                      <th>Kontak</th>
                      <th onClick={() => handleSort('status')} className="sortable-header">
                        Status
                      </th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((d, index) => (
                      <tr key={d.id} className={darkMode ? 'hover-dark' : ''}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle me-3">
                              {d.nama.charAt(0)}
                            </div>
                            <div>
                              <span className="fw-bold d-block">{d.nama}</span>
                              <small className={`text-muted ${darkMode ? 'text-light' : ''}`}>
                                Angkatan {d.angkatan}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>{d.jabatan}</td>
                        <td>
                          <span className={`badge bg-${getDivisiColor(d.divisi)} ${darkMode ? 'text-white' : ''}`}>
                            {getDivisiIcon(d.divisi)}
                            {d.divisi}
                          </span>
                        </td>
                        <td>{d.prodi}</td>
                        <td>
                          <div className="d-flex flex-column">
                            <a href={`tel:${d.no_hp}`} className="text-decoration-none">
                              {d.no_hp}
                            </a>
                            <a href={`mailto:${d.email}`} className="text-decoration-none small">
                              {d.email}
                            </a>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${d.status === 'Aktif' ? 
                            (darkMode ? 'bg-success' : 'bg-success') : 
                            (darkMode ? 'bg-secondary' : 'bg-warning')}`}>
                            {d.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex">
                            <button
                              onClick={() => navigate(`/pengurus/edit/${d.id}`)}
                              className={`btn btn-sm ${darkMode ? 'btn-warning' : 'btn-warning'} me-2 action-btn`}
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(d.id)}
                              className={`btn btn-sm ${darkMode ? 'btn-danger' : 'btn-danger'} action-btn`}
                              title="Hapus"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center flex-wrap">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className={`page-link ${darkMode ? 'bg-dark text-light' : ''}`} 
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        &laquo;
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button 
                          className={`page-link ${darkMode ? 'bg-dark text-light' : ''}`}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className={`page-link ${darkMode ? 'bg-dark text-light' : ''}`}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      <ToastContainer theme={darkMode ? 'dark' : 'light'} />

      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #6e8efb, #a777e3);
          --dark-gradient: linear-gradient(135deg, #2c3e50, #4ca1af);
        }

        body {
          transition: all 0.3s ease;
        }

        body.dark-mode {
          background-color: #1a1a1a;
          color: #f8f9fa;
        }

        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: var(--primary-gradient);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          opacity: 0.1;
        }

        .animated-bg.dark {
          background: var(--dark-gradient);
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dark-glass {
          background: rgba(0, 0, 0, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .main-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          padding: 20px;
          transition: all 0.3s ease;
        }

        .dark-card {
          background: #2c3e50 !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
          color: white;
        }

        .search-bar {
          transition: all 0.3s ease;
        }

        .dark-search input {
          background-color: #34495e !important;
          color: white !important;
          border-color: #2c3e50 !important;
        }

        .dark-search .input-group-text {
          background-color: #2c3e50 !important;
          color: white !important;
          border-color: #2c3e50 !important;
        }

        .sortable-header {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sortable-header:hover {
          background: ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} !important;
        }

        .btn-hover {
          transition: all 0.3s ease;
        }

        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .action-btn {
          transition: all 0.2s ease;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px !important;
        }

        .action-btn:hover {
          transform: scale(1.1);
        }

        .hover-dark:hover {
          background: rgba(255,255,255,0.05) !important;
        }

        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: ${darkMode ? '#6e8efb' : '#a777e3'};
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .table-responsive {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          
          table {
            font-size: 14px;
          }
          
          .avatar-circle {
            width: 30px;
            height: 30px;
            font-size: 12px;
          }
        }

        @media (max-width: 576px) {
          .glass-card {
            padding: 15px;
          }
          
          .btn {
            padding: 0.375rem 0.5rem;
            font-size: 0.875rem;
          }
          
          .action-btn {
            width: 30px;
            height: 30px;
            font-size: 12px;
          }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#2c3e50' : '#f1f1f1'};
        }

        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#6e8efb' : '#a777e3'};
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${darkMode ? '#a777e3' : '#6e8efb'};
        }

        .bg-gray-800 {
          background-color: #343a40 !important;
        }
      `}</style>
    </Layout>
  );
}

export default BEMDashboard;