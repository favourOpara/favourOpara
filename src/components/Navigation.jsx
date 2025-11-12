import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import './Navigation.css'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (href) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container nav-container">
          <motion.div
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
          >
            <span>F</span>avour <span>O</span>para
          </motion.div>

          {/* Desktop Menu */}
          <ul className="nav-menu desktop">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <ul>
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 50 }}
              transition={{ delay: isOpen ? index * 0.1 : 0 }}
            >
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
              >
                {item.name}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          className="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Navigation
