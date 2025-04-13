import React from 'react';
import { 
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin, 
  FaGithub, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt 
} from 'react-icons/fa';
import "./footer.css";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-5 pb-3 footer">
      <div className="container">
        {/* Main Content */}
        <div className="row g-4">
          {/* About Section */}
          <div className="col-lg-4">
            <div className="mb-4">
              <h3 className="text-white fw-bold mb-3">
                <span className="text-warning">BEM</span> PeTIK
              </h3>
              <p className="text-light">
                Wadah mahasiswa untuk belajar, berkembang, dan berkontribusi nyata dalam membangun lingkungan 
                yang lebih baik melalui program kerja yang solutif, kolaboratif, dan penuh integritas.
              </p>
            </div>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=100081029107620" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaFacebook size={20} className="social-icon" />
              </a>
              <a href="https://www.instagram.com/muhammadftrahman26/" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaInstagram size={20} className="social-icon" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaTwitter size={20} className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/fatur-rahman-413361334/" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaLinkedin size={20} className="social-icon" />
              </a>
              <a href="https://github.com/FaturrahmanTzy" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaGithub size={20} className="social-icon" />
              </a>
              <a href="https://www.youtube.com/@faturrahman6796" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaYoutube size={20} className="social-icon" />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="col-lg-4">
            <h5 className="text-warning fw-bold mb-4">Kontak Kami</h5>
            <ul className="list-unstyled text-light">
              <li className="mb-3 d-flex align-items-start">
                <FaPhone className="me-3 mt-1 text-warning" />
                <span>
                  +62 811-1200-3752
                </span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaEnvelope className="me-3 mt-1 text-warning" />
                <span>
                info@petik.or.id 
                </span>
              </li>
              <li className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="me-3 mt-1 text-warning" />
                <span>
                Jl. Mandor Basar No.54, Rangkapan Jaya, <br />
                Kec. Pancoran Mas, Kota Depok, Jawa Barat <br />
                16434
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-lg-4">
            <h5 className="text-warning fw-bold mb-4">Bergabung Bersama Kami</h5>
            <p className="text-light mb-4">
              Dapatkan informasi terbaru tentang kegiatan dan program kerja BEM PeTIK
            </p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control bg-light border-0" 
                placeholder="Alamat Email" 
                aria-label="Email" 
              />
              <button className="btn btn-warning text-dark fw-bold" type="button">
                Subscribe
              </button>
            </div>
            <button className="btn btn-outline-light w-100 fw-bold">
              Daftar Anggota
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-light opacity-25" />

        {/* Copyright */}
        <div className="row">
          <div className="col-md-6 text-center text-md-start text-light mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} BEM PeTIK. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end text-light">
            Developed with ❤️ by Fatur Rahman
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;