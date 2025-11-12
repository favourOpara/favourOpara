import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Skills.css'

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const skills = [
    { name: 'Risk Management', level: 100 },
    { name: 'Rapid7 (InsightVM, AppSpider, CTI)', level: 90 },
    { name: 'Networks & Network Security', level: 75 },
    { name: 'PAM (Thycotic, Beyondtrust)', level: 80 },
    { name: 'IBM Guardium (DAM)', level: 90 },
    { name: 'Tripwire (FIM)', level: 50 },
    { name: 'SIEM (QRadar, Sentinel, Seceon)', level: 40 },
    { name: 'Technical Reporting', level: 100 },
    { name: 'Microsoft Products (MDATP, O365)', level: 80 },
    { name: 'Crowdstrike Falcon (AD Security)', level: 60 },
    { name: 'vSphere Client (HCI)', level: 50 },
    { name: 'System Administration', level: 60 },
  ]

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Skills & Expertise</h2>
          <p>Technologies and tools I work with</p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="skill-card"
            >
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percent">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-progress"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
