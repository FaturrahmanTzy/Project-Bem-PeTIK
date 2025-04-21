import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { 
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaUserCog,
  FaUtensils,
  FaHeartbeat,
  FaGraduationCap,
  FaBroom,
  FaClipboardList
} from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = React.useState({
    kegiatan: false,
    laporan: false,
    divisi: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  return (
    <div className="bg-white p-4 border-end" style={{ 
      minHeight: '100vh',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      width: '280px'
    }}>
      {/* Header with logo and title */}
      <div className="d-flex align-items-center justify-content-start mb-4 ps-3">
        <div className="bg-primary p-2 rounded me-3 d-flex align-items-center justify-content-center" 
          style={{ 
            width: '40px', 
            height: '40px',
            background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)'
          }}>
          <h4 className="text-white m-0">👥</h4>
        </div>
        <div>
          <h4 className="text-dark m-0 fw-bold">BEM PeTIK</h4>
          <small className="text-muted">Admin Kepengurusan</small>
        </div>
      </div>
      
      <hr className="my-2" />
      
      {/* Main Navigation */}
      <ul className="nav flex-column mt-4">
        <li className="nav-item mb-1">
          <NavLink 
            to="/dashboard" 
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              fontWeight: isActive ? '600' : '500',
              color: isActive ? '#0d6efd' : '#000',
              backgroundColor: isActive ? 'rgba(13, 110, 253, 0.1)' : 'transparent',
              borderRadius: '8px',
              padding: '12px 15px',
              transition: 'all 0.3s ease',
              borderLeft: isActive ? '3px solid #0d6efd' : '3px solid transparent'
            })}
          >
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              backgroundColor: 'rgba(13, 110, 253, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <FaTachometerAlt className="text-primary" style={{ width: '16px' }} />
            </div>
            <span style={{ color: '#000' }}>Dashboard</span>
          </NavLink>
        </li>

        <li className="nav-item mb-1">
          <div 
            className="nav-link d-flex align-items-center justify-content-between cursor-pointer"
            onClick={() => toggleMenu('divisi')}
            style={{
              fontWeight: '500',
              color: '#000',
              borderRadius: '8px',
              padding: '12px 15px',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="d-flex align-items-center">
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <FaUsers className="text-success" style={{ width: '16px' }} />
              </div>
              <span style={{ color: '#000' }}>Divisi BEM</span>
            </div>
            <i className={`bi bi-chevron-${openMenus.divisi ? 'down' : 'right'}`}></i>
          </div>
          
          {openMenus.divisi && (
            <ul className="nav flex-column ps-5 mt-1" style={{ animation: 'fadeIn 0.3s ease' }}>
              <li className="nav-item mb-1">
                <NavLink 
                  to="/divisi/dapur" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <FaUtensils className="me-2 text-warning" />
                  <span style={{ color: '#000' }}>Dapur</span>
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink 
                  to="/divisi/kesehatan" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <FaHeartbeat className="me-2 text-danger" />
                  <span style={{ color: '#000' }}>Kesehatan/Olahraga</span>
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink 
                  to="/divisi/pendidikan" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <FaGraduationCap className="me-2 text-info" />
                  <span style={{ color: '#000' }}>Pendidikan</span>
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink 
                  to="/divisi/keuangan" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <FaMoneyBillWave className="me-2 text-success" />
                  <span style={{ color: '#000' }}>Keuangan</span>
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink 
                  to="/divisi/kebersihan" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <FaBroom className="me-2 text-secondary" />
                  <span style={{ color: '#000' }}>Kebersihan (Piket)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/divisi/sekretaris" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <FaClipboardList className="me-2 text-primary" />
                  <span style={{ color: '#000' }}>Sekretaris</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item mb-1">
          <div 
            className="nav-link d-flex align-items-center justify-content-between cursor-pointer"
            onClick={() => toggleMenu('kegiatan')}
            style={{
              fontWeight: '500',
              color: '#000',
              borderRadius: '8px',
              padding: '12px 15px',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="d-flex align-items-center">
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                backgroundColor: 'rgba(220, 53, 69, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <FaCalendarAlt className="text-danger" style={{ width: '16px' }} />
              </div>
              <span style={{ color: '#000' }}>Kegiatan</span>
            </div>
            <i className={`bi bi-chevron-${openMenus.kegiatan ? 'down' : 'right'}`}></i>
          </div>
          
          {openMenus.kegiatan && (
            <ul className="nav flex-column ps-5 mt-1" style={{ animation: 'fadeIn 0.3s ease' }}>
              <li className="nav-item mb-1">
                <NavLink 
                  to="/kegiatan/internal" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <span style={{ color: '#000' }}>Kegiatan Internal</span>
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink 
                  to="/kegiatan/eksternal" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <span style={{ color: '#000' }}>Kegiatan Eksternal</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/kegiatan/rutin" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <span style={{ color: '#000' }}>Kegiatan Rutin</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item mb-1">
          <div 
            className="nav-link d-flex align-items-center justify-content-between cursor-pointer"
            onClick={() => toggleMenu('laporan')}
            style={{
              fontWeight: '500',
              color: '#000',
              borderRadius: '8px',
              padding: '12px 15px',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="d-flex align-items-center">
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                backgroundColor: 'rgba(13, 202, 240, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px'
              }}>
                <FaFileAlt className="text-info" style={{ width: '16px' }} />
              </div>
              <span style={{ color: '#000' }}>Laporan</span>
            </div>
            <i className={`bi bi-chevron-${openMenus.laporan ? 'down' : 'right'}`}></i>
          </div>
          
          {openMenus.laporan && (
            <ul className="nav flex-column ps-5 mt-1" style={{ animation: 'fadeIn 0.3s ease' }}>
              <li className="nav-item mb-1">
                <NavLink 
                  to="/laporan/bulanan" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <span style={{ color: '#000' }}>Laporan Bulanan</span>
                </NavLink>
              </li>
              <li className="nav-item mb-1">
                <NavLink 
                  to="/laporan/proker" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <span style={{ color: '#000' }}>Laporan Proker</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/laporan/keuangan" 
                  className="nav-link"
                  style={({ isActive }) => ({
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#0d6efd' : '#000',
                    padding: '8px 15px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  })}
                >
                  <span style={{ color: '#000' }}>Laporan Keuangan</span>
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item mb-1">
          <NavLink 
            to="/pengaturan" 
            className="nav-link d-flex align-items-center"
            style={({ isActive }) => ({
              fontWeight: isActive ? '600' : '500',
              color: isActive ? '#0d6efd' : '#000',
              backgroundColor: isActive ? 'rgba(13, 110, 253, 0.1)' : 'transparent',
              borderRadius: '8px',
              padding: '12px 15px',
              transition: 'all 0.3s ease',
              borderLeft: isActive ? '3px solid #0d6efd' : '3px solid transparent'
            })}
          >
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              backgroundColor: 'rgba(108, 117, 125, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              <FaUserCog className="text-secondary" style={{ width: '16px' }} />
            </div>
            <span style={{ color: '#000' }}>Pengaturan</span>
          </NavLink>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-auto pt-4">
        <button className="btn btn-outline-danger w-100 rounded-pill  d-flex align-items-center justify-content-center">
          <RiLogoutBoxRLine className="me-2" />
          <span><NavLink to="/login" style={{ color: '#dc3545' }} className="text-decoration-none">Keluar </NavLink></span>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .nav-link:hover {
          background-color: rgba(13, 110, 253, 0.05) !important;
        }
        
        .nav-link.active {
          background-color: rgba(13, 110, 253, 0.1) !important;
          border-left: 3px solid #0d6efd !important;
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .sidebar-container {
            width: 100%;
            position: relative;
            min-height: auto;
          }
          
          .nav-link {
            padding: 10px 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;