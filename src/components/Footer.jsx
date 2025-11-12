import { FiHeart } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Favour Opara</h3>
            <p>Cybersecurity Professional & Risk Management Expert</p>
          </div>

          <div className="footer-links">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Favour Sobechi Opara. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FiHeart className="heart" /> using React & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
