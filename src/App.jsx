import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="loading-content"
        >
          <h2>Favour Opara</h2>
          <div className="loading-bar"></div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="app">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
