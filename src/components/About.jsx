import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './About.css'

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const info = [
    { label: 'Location', value: 'Sunderland, UK' },
    { label: 'Phone', value: '+44 7392 982752' },
    { label: 'Email', value: 'favouropara48@gmail.com' },
    { label: 'Degree', value: 'MSc Cybersecurity' },
  ]

  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>About Me</h2>
          <p>Learn more about my background and expertise</p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-content"
          >
            <h3>Cybersecurity Professional & Risk Management Expert</h3>
            <p>
              I'm a dedicated cybersecurity analyst with profound expertise in risk management, specializing in risk identification, analysis, mitigation, and monitoring. My experience encompasses managing security risks across complex IT infrastructures including networks, applications, cloud environments, hyperconverged infrastructure, and datacenters.
            </p>
            <p>
              I excel at conducting comprehensive risk assessments to protect the confidentiality, integrity, and availability of sensitive data, ensuring regulatory compliance with ISO 27001, PCI DSS, and other industry standards. My expertise includes implementing and monitoring critical security controls such as PAM, DAM, FIM, SIEM, and NAC.
            </p>

            <div className="info-grid">
              {info.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="info-item"
                >
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="about-image"
          >
            <div className="image-card">
              <img src="assets/img/my-profile-img.jpg" alt="Favour Opara" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
