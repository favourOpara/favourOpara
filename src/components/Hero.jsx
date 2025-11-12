import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowDown } from 'react-icons/fi'
import './Hero.css'

const Hero = () => {
  const roles = [
    'Cybersecurity Professional',
    'Risk Manager',
    'Security Analyst',
    'Compliance Expert'
  ]

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="hero-grid"></div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Available for opportunities
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">Favour Opara</span>
          </motion.h1>

          <motion.div
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {roles.map((role, index) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="role-tag"
              >
                {role}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Cybersecurity analyst specializing in risk management, vulnerability assessment,
            and compliance. 2+ years of experience protecting enterprise infrastructures and
            ensuring regulatory compliance with ISO 27001, PCI DSS standards.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <a href="#contact" className="btn btn-primary">
              Get In Touch
            </a>
            <a href="#portfolio" className="btn btn-secondary">
              View My Work
            </a>
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <a
              href="https://www.linkedin.com/in/favour-opara-a2513018a"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FiLinkedin />
            </a>
            <a
              href="https://twitter.com/candlesticksand"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FiTwitter />
            </a>
            <a
              href="mailto:favouropara48@gmail.com"
              className="social-link"
            >
              <FiMail />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="image-wrapper">
            <img
              src="assets/img/my-profile-img.jpg"
              alt="Favour Opara"
              className="profile-image"
            />
            <div className="image-glow"></div>
          </div>
          <div className="floating-cards">
            <motion.div
              className="stat-card"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="stat-number">2+</span>
              <span className="stat-label">Years</span>
            </motion.div>
            <motion.div
              className="stat-card"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
      >
        <FiArrowDown />
      </motion.div>
    </section>
  )
}

export default Hero
