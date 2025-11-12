import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import './Contact.css'

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const contactInfo = [
    { icon: <FiMail />, label: 'Email', value: 'favouropara48@gmail.com', href: 'mailto:favouropara48@gmail.com' },
    { icon: <FiPhone />, label: 'Phone', value: '+44 7392 982752', href: 'tel:+447392982752' },
    { icon: <FiMapPin />, label: 'Location', value: 'Sunderland, United Kingdom', href: null },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Get In Touch</h2>
          <p>Let's work together</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-info"
          >
            <h3>Contact Information</h3>
            <p className="contact-description">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat about cybersecurity and risk management.
            </p>

            <div className="info-items">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="contact-item"
                >
                  <div className="contact-icon">{info.icon}</div>
                  <div>
                    <h4>{info.label}</h4>
                    {info.href ? (
                      <a href={info.href}>{info.value}</a>
                    ) : (
                      <p>{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="contact-form"
            action="forms/contact.php"
            method="post"
          >
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                placeholder="How can I help you?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                placeholder="Your message..."
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
