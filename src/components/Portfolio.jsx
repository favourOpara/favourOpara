import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiExternalLink } from 'react-icons/fi'
import './Portfolio.css'

const Portfolio = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const projects = [
    {
      title: 'Virtual Infrastructure Assessment',
      category: 'Risk Assessment',
      description: 'Comprehensive risk assessment of vSphere Client infrastructure',
      link: 'https://drive.google.com/drive/folders/1LqDluxbdyczdiaOgfCtk5dibRoXGSK6R'
    },
    {
      title: 'External Intrusion Prevention',
      category: 'KRI',
      description: 'Monitoring controls to prevent external intrusion',
      link: 'https://drive.google.com/drive/folders/1s33qNCcDw1HL9G2UtRzqCYKgFHA9SVCM'
    },
    {
      title: 'Third-Party Risk Assessment',
      category: 'Change Management',
      description: 'Risk assessment on new business process implementation',
      link: 'https://drive.google.com/drive/folders/1H6Ipr6UywhbA6UpvL23eV2VeeTEe4fMb'
    },
    {
      title: 'Risk Assessment Register',
      category: 'Risk Register',
      description: 'Comprehensive risk tracking and exception management',
      link: 'https://drive.google.com/drive/folders/1CErl0bdDldFMB_lWD74XbcnlwbzxIAF2'
    },
    {
      title: 'Datacenter Infrastructure',
      category: 'Risk Assessment',
      description: 'Assessment of Mainone and Rack center datacenters',
      link: 'https://drive.google.com/drive/folders/1SEPkBDZP1cSsSKvlG9W_x6U3REMz4WR5'
    },
    {
      title: 'Database Activity Monitoring',
      category: 'KRI',
      description: 'Monitoring activities in database servers',
      link: 'https://drive.google.com/drive/folders/1vX4j40lIu51f7zMcWBpqsqIa2nAABTp9'
    }
  ]

  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Portfolio</h2>
          <p>Selected projects and assessments</p>
        </motion.div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="portfolio-card"
            >
              <div className="card-header">
                <span className="category">{project.category}</span>
                <FiExternalLink className="link-icon" />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
