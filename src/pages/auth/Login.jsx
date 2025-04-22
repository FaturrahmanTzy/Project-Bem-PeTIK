import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import petik from '../../assets/PeTIK.jpg';
import gogle from '../../assets/google.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [nim, setNim] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Cek apakah user sudah login
// Di komponen Login
useEffect(() => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    const role = localStorage.getItem('role') || 'user';
    navigate(role === 'admin' ? '/dashboard' : '/', { replace: true });
  }
}, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://profur.rikpetik.site/api/v1/login', {
        username,
        nim
      }, {
        withCredentials: true,
      });
      
      if (response.data.token) {
        // Simpan token dan role
        if (rememberMe) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.role);
        } else {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('role', response.data.role);
        }
        
        // Redirect dan replace history (tidak bisa back)
        navigate(response.data.role === 'admin' ? '/dashboard' : '/', { replace: true });
      } else {
        throw new Error('Token tidak diterima dari server');
      }
    } catch (err) {
      console.error('Login error:', err);
      let errorMsg = 'Login gagal. Silakan coba lagi.';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMsg = 'NIM tidak ditemukan';
        } else if (err.response.status === 400) {
          errorMsg = err.response.data.message || 'Username tidak cocok dengan yang sudah terdaftar';
        }
      } else if (err.request) {
        errorMsg = 'Tidak ada respon dari server';
      } else {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-glass-card">
        <div className="login-header">
          <div className="logo-container">
            <img src={petik} alt="BEM PeTIK Logo" className="logo" />
          </div>
          <h1>BEM PeTIK</h1>
          <p className="subtitle">Portal Mahasiswa Pendidikan TIK</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <span className="input-icon"><FaUser /></span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type={showPassword ? "text" : "password"}
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="NIM"  // Changed from Password to NIM
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="remember-me-checkbox"
                required
              />
              <span>Ingat Saya</span>
            </label>
            <a href="/forgot-password" className="forgot-password">Lupa NIM?</a>  {/* Changed text */}
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
            <span className="button-overlay"></span>
          </button>
        </form>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className="login-footer">
          <p>Belum punya akun? <a href="/register">Daftar disini</a></p>
          <div className="social-login">
            <p>Atau masuk dengan:</p>
            <div className="social-icons">
              <a href="#" className="social-icon google">
                <img src={gogle} alt="Google" />
              </a>
              <a href="#" className="social-icon microsoft">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="login-background">
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
        <div className="welcome-message fw-bold">
          <h2>Selamat Datang di BEM PeTIK</h2>
          <p>Wadah aspirasi dan pengembangan diri mahasiswa Pendidikan Teknologi Informasi dan Komunikasi</p>
        </div>
      </div>

          <style> {`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

              :root {
                --primary-color: #4361ee;
                --secondary-color: #3a0ca3;
                --accent-color: #f72585;
                --light-color: #f8f9fa;
                --dark-color: #212529;
                --text-color: #495057;
                --border-color: #dee2e6;
              }

              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Poppins', sans-serif;
              }

              .login-container {
                display: flex;
                min-height: 100vh;
                background-color: var(--light-color);
              }

              .login-glass-card {
                width: 100%;
                max-width: 450px;
                padding: 2.5rem;
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border-radius: 0 20px 20px 0;
                box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.18);
                display: flex;
                flex-direction: column;
                justify-content: center;
                z-index: 2;
              }

              .login-header {
                text-align: center;
                margin-bottom: 2.5rem;
              }

              .logo-container {
                width: 100px;
                height: 100px;
                margin: 0 auto 1.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
                border-radius: 50%;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                padding: 10px;
              }

              .logo {
                width: 100%;
                height: auto;
                object-fit: contain;
              }

              .login-header h1 {
                color: var(--secondary-color);
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
              }

              .subtitle {
                color: var(--text-color);
                font-size: 0.9rem;
                font-weight: 400;
              }

              .login-form {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
              }

              .input-group {
                position: relative;
                display: flex;
                align-items: center;
              }

              .input-icon {
                position: absolute;
                left: 15px;
                color: var(--text-color);
                font-size: 1rem;
              }

              .input-group input {
                width: 100%;
                padding: 0.9rem 1rem 0.9rem 3rem;
                border: 1px solid var(--border-color);
                border-radius: 10px;
                font-size: 0.95rem;
                transition: all 0.3s ease;
                background-color: rgba(255, 255, 255, 0.8);
              }

              .input-group input:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
              }

              .password-toggle {
                position: absolute;
                right: 15px;
                background: none;
                border: none;
                color: var(--text-color);
                cursor: pointer;
                font-size: 1rem;
              }

              .form-options {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.85rem;
                margin-top: -0.5rem;
              }

              .remember-me {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-color);
                cursor: pointer;
              }

              .remember-me input {
                cursor: pointer;
              }

              .forgot-password {
                color: var(--primary-color);
                text-decoration: none;
                transition: color 0.2s;
                font-weight: 500;
              }

              .forgot-password:hover {
                color: var(--secondary-color);
                text-decoration: underline;
              }

              .login-button {
                position: relative;
                background-color: var(--primary-color);
                color: white;
                border: none;
                padding: 1rem;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                overflow: hidden;
                margin-top: 0.5rem;
              }

              .button-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.1);
                transform: translateX(-100%);
                transition: transform 0.3s ease;
              }

              .login-button:hover {
                background-color: var(--secondary-color);
              }

              .login-button:hover .button-overlay {
                transform: translateX(0);
              }

              .login-footer {
                margin-top: 2rem;
                text-align: center;
                font-size: 0.85rem;
                color: var(--text-color);
              }

              .login-footer a {
                color: var(--primary-color);
                text-decoration: none;
                font-weight: 500;
              }

              .login-footer a:hover {
                text-decoration: underline;
              }

              .social-login {
                margin-top: 1.5rem;
              }

              .social-login p {
                margin-bottom: 1rem;
                color: var(--text-color);
                font-size: 0.9rem;
              }

              .social-icons {
                display: flex;
                justify-content: center;
                gap: 1rem;
              }

              .social-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
              }

              .social-icon:hover {
                transform: translateY(-3px);
              }

              .social-icon img {
                width: 60%;
                height: auto;
              }

              .login-background {
                flex: 1;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;
              }

              .particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }

              .particle {
                position: absolute;
                background-color: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: float 15s infinite linear;
              }

              @keyframes float {
                0% {
                  transform: translateY(0) rotate(0deg);
                  opacity: 1;
                }
                100% {
                  transform: translateY(-1000px) rotate(720deg);
                  opacity: 0;
                }
              }

              .welcome-message {
                max-width: 500px;
                padding: 2rem;
                color: white;
                text-align: center;
                z-index: 1;
              }

              .welcome-message h2 {
                font-size: 2.2rem;
                margin-bottom: 1.5rem;
                font-weight: 700;
              }

              .welcome-message p {
                font-size: 1.1rem;
                line-height: 1.6;
                opacity: 0.9;
              }

              /* Generate random particles */
              .particle:nth-child(1) {
                width: 20px;
                height: 20px;
                top: 20%;
                left: 10%;
                animation-delay: 0s;
                animation-duration: 20s;
              }

              .particle:nth-child(2) {
                width: 15px;
                height: 15px;
                top: 60%;
                left: 25%;
                animation-delay: 2s;
                animation-duration: 18s;
              }

              /* Add more particles as needed... */

              /* Responsive design */
              @media (max-width: 992px) {
                .login-glass-card {
                  max-width: 400px;
                  padding: 2rem;
                }
              }

              @media (max-width: 768px) {
                .login-container {
                  flex-direction: column;
                }
                
                .login-glass-card {
                  max-width: 100%;
                  border-radius: 0;
                  padding: 2rem 1.5rem;
                margin: 0 auto;
                box-shadow: none;
                }
                
                .login-background {
                  display: none;
                }
              }
          ` 
            }

          </style>
    </div>
  );
};

export default Login;