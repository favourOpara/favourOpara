# Favour Opara - Modern Portfolio Website

A modern, professional portfolio website built with React, Framer Motion, and Vite. Features smooth animations, responsive design, and an elegant black & white aesthetic.

## 🚀 Features

- **Modern React Architecture** - Component-based, maintainable code
- **Smooth Animations** - Powered by Framer Motion
- **Fully Responsive** - Mobile-first design that works on all devices
- **Fast Performance** - Built with Vite for lightning-fast development and builds
- **Professional Design** - Clean black & white aesthetic with smooth transitions
- **Interactive Components** - Hover effects, scroll animations, and transitions
- **SEO Friendly** - Optimized for search engines
- **Easy to Customize** - Well-organized code structure

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm (comes with Node.js)

## 🛠️ Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

3. **Build for Production**
   ```bash
   npm run build
   ```
   The production-ready files will be in the `dist` folder

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
favouropara.github.io/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx       # Navigation bar with mobile menu
│   │   ├── Navigation.css
│   │   ├── Hero.jsx            # Hero section with animations
│   │   ├── Hero.css
│   │   ├── About.jsx           # About section
│   │   ├── About.css
│   │   ├── Skills.jsx          # Skills with animated progress bars
│   │   ├── Skills.css
│   │   ├── Experience.jsx      # Experience timeline
│   │   ├── Experience.css
│   │   ├── Portfolio.jsx       # Portfolio grid
│   │   ├── Portfolio.css
│   │   ├── Contact.jsx         # Contact form
│   │   ├── Contact.css
│   │   ├── Footer.jsx          # Footer
│   │   └── Footer.css
│   ├── App.jsx                 # Main app component
│   ├── App.css
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
├── public/
│   └── assets/                 # Static assets (images, etc.)
├── new-index.html              # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
└── README-REACT.md             # This file
```

## 🎨 Customization

### Updating Content

1. **Personal Information** - Edit `src/components/Hero.jsx` and `src/components/About.jsx`
2. **Skills** - Modify the skills array in `src/components/Skills.jsx`
3. **Experience** - Update experiences array in `src/components/Experience.jsx`
4. **Portfolio** - Edit projects array in `src/components/Portfolio.jsx`
5. **Contact Info** - Modify contact info in `src/components/Contact.jsx`

### Changing Colors

Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: #000000;
  --secondary: #1a1a1a;
  --accent: #333333;
  /* ...more variables */
}
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/App.jsx`
3. Add corresponding styles

## 📱 Mobile Optimization

The site is fully optimized for mobile devices with:
- Responsive grid layouts
- Touch-friendly navigation
- Optimized images
- Mobile-specific styling
- Smooth mobile animations

## 🚀 Deployment to GitHub Pages

1. **Update Vite Config**
   In `vite.config.js`, set your repository name:
   ```javascript
   base: '/your-repo-name/'
   ```

2. **Build the Project**
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages**
   - Push the `dist` folder to the `gh-pages` branch, OR
   - Use GitHub Actions for automatic deployment

4. **Alternative: Use the old index.html**
   If you prefer the original design, you can rename:
   - `index.html` to `index-old.html`
   - `new-index.html` to `index.html`

## 🔧 Development Tips

1. **Hot Module Replacement** - Changes reflect instantly during development
2. **Component Structure** - Keep components small and focused
3. **Styling** - Use CSS modules or styled-components for scoped styles
4. **Performance** - Use lazy loading for images and components
5. **Animations** - Framer Motion provides excellent animation capabilities

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM renderer
- **framer-motion** - Animation library
- **react-intersection-observer** - Scroll animations
- **react-icons** - Icon library
- **vite** - Build tool
- **@vitejs/plugin-react** - Vite React plugin

## 🐛 Troubleshooting

**Port already in use:**
```bash
npm run dev -- --port 3000
```

**Build fails:**
```bash
rm -rf node_modules
npm install
npm run build
```

**Images not loading:**
- Ensure images are in the `public/assets/img/` folder
- Check image paths in components

## 📄 License

© 2024 Favour Sobechi Opara. All rights reserved.

## 🤝 Support

For issues or questions:
- Email: favouropara48@gmail.com
- LinkedIn: [Favour Opara](https://www.linkedin.com/in/favour-opara-a2513018a)

---

Built with ❤️ using React & Framer Motion
