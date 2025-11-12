import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiAward } from 'react-icons/fi'
import './Experience.css'

const Experience = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const experiences = [
    {
      title: 'IT Risk Analyst',
      company: 'Fidelity Bank Plc, Nigeria',
      period: '2022-2024',
      achievements: [
        'Improved threat response by 43% through proactive network monitoring, SIEM tool optimization (Sentinel, QRadar, InsightIDR), and vulnerability assessment (InsightVM)',
        'Reduced repeat incidents by 25% by conducting detailed risk assessment and root cause analysis',
        'Enhanced third-party risk management, reducing onboarding risk by 30% through comprehensive vendor security evaluations',
        'Maintained regulatory compliance (ISO 27001, PCI DSS) with zero non-compliance issues during audits',
        'Led forensic investigations of security breaches, developing recommendations that reduced recurrence risks by 50%'
      ]
    }
  ]

  const education = [
    {
      degree: 'Master of Cybersecurity',
      school: 'University of Sunderland, UK',
      period: '2024-2025',
      topics: 'GRC, Secure coding, Cryptography, IAM, Network security'
    },
    {
      degree: 'Bachelor of Mechanical Engineering',
      school: 'Landmark University, Nigeria',
      period: '2014-2019',
      topics: 'Mechatronics, Thermodynamics, Automobile engineering'
    }
  ]

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Experience & Education</h2>
          <p>My professional journey</p>
        </motion.div>

        <div className="experience-grid">
          <div className="experience-column">
            <h3><FiBriefcase /> Professional Experience</h3>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="timeline-card"
              >
                <div className="timeline-dot" />
                <div className="card-content">
                  <span className="period">{exp.period}</span>
                  <h4>{exp.title}</h4>
                  <p className="company">{exp.company}</p>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="experience-column">
            <h3><FiAward /> Education</h3>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="timeline-card"
              >
                <div className="timeline-dot" />
                <div className="card-content">
                  <span className="period">{edu.period}</span>
                  <h4>{edu.degree}</h4>
                  <p className="company">{edu.school}</p>
                  <p className="topics">{edu.topics}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
