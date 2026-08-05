# Yiğit Erozan - Profesyonel Oyuncu Portföyü

 premium, production-ready portfolio website for Turkish actor Yiğit Erozan. Built with modern web technologies and best practices for performance, accessibility, and SEO.

## 🎭 Project Overview

This is a cinematic, minimalist portfolio website designed to showcase Yiğit Erozan's acting career, projects, and professional information. The design draws inspiration from premium brands like Apple, A24 Films, and Porsche to create a luxurious, modern experience.

## ✨ Features

### Design & UX
- **Dark Mode Only**: Immersive dark theme with elegant white accents
- **Cinematic Animations**: Smooth, premium animations using Intersection Observer
- **Custom Cursor**: Interactive cursor effects for desktop users
- **Glassmorphism**: Modern glass effects with backdrop blur
- **Responsive Design**: Perfect display on all devices
- **Premium Typography**: Large, bold typography with generous whitespace

### Sections
- **Hero**: Full-screen cinematic intro with parallax effects
- **About**: Detailed professional profile and biography
- **Education**: Training and educational background
- **Projects**: Selected works with hover animations
- **Gallery**: Masonry grid with lightbox functionality
- **Showreel**: Cinematic video player
- **Timeline**: Career timeline with scroll animations
- **Contact**: Professional contact information

### Technical Features
- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD for Person, WebSite, BreadcrumbList
- **Performance**: Optimized for 95+ Google Lighthouse score
- **Accessibility**: ARIA labels, keyboard navigation, focus states
- **Lazy Loading**: Images load as needed for performance
- **Smooth Scrolling**: Premium scroll experience
- **PWA Ready**: Web manifest for installable experience

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with custom properties
- **JavaScript (ES Modules)**: Vanilla JavaScript, no frameworks
- **No External Libraries**: All functionality built from scratch

## 📁 Project Structure

```
yiigit-erozan-portfolio/
│
├── index.html                    # Main HTML file
├── robots.txt                    # Search engine directives
├── sitemap.xml                   # XML sitemap
├── site.webmanifest              # PWA manifest
├── favicon.ico                   # Site favicon
├── README.md                     # Project documentation
│
└── assets/
    │
    ├── css/
    │   ├── style.css            # Main styles
    │   ├── variables.css        # CSS custom properties
    │   ├── animations.css       # Animation keyframes and classes
    │   └── responsive.css       # Media queries
    │
    ├── js/
    │   ├── main.js              # Core functionality
    │   ├── cursor.js            # Custom cursor effects
    │   ├── gallery.js           # Lightbox functionality
    │   ├── animations.js        # Scroll animations
    │   ├── smooth-scroll.js     # Smooth scrolling
    │   └── seo.js               # SEO enhancements
    │
    ├── images/
    │   ├── hero/                # Hero section images
    │   ├── gallery/             # Gallery images
    │   ├── projects/            # Project images
    │   ├── press/               # Press/mention images
    │   ├── posters/             # Poster images
    │   └── profile/             # Profile/bio images
    │
    ├── videos/
    │   └── showreel.mp4         # Showreel video
    │
    ├── fonts/                   # Custom fonts (if needed)
    └── icons/                   # Custom icons (if needed)
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- A local web server (for testing ES modules)

### Installation

1. **Clone or download the project**
   ```bash
   cd yiigit-erozan-portfolio
   ```

2. **Serve the project locally**
   
   Using Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   Using Node.js (http-server):
   ```bash
   npx http-server -p 8000
   ```
   
   Using VS Code Live Server extension

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Deployment

1. **Upload to web server**
   - Upload all files to your web host
   - Ensure `index.html` is in the root directory

2. **Configure domain**
   - Point your domain to the hosting directory
   - Update URLs in `sitemap.xml` and `seo.js` if needed

3. **Test production**
   - Check all links and functionality
   - Test on mobile devices
   - Run Lighthouse audit

## 🎨 Customization

### Colors
Edit `assets/css/variables.css`:
```css
:root {
    --color-background: #050505;
    --color-accent: #ffffff;
    /* ... other colors */
}
```

### Typography
Change fonts in `index.html` and `variables.css`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### Content
Edit `index.html` to update:
- Personal information
- Project details
- Gallery images
- Contact information

### Images
Replace placeholder images in `assets/images/`:
- Hero portrait: `assets/images/hero/hero-portrait.jpg`
- Profile: `assets/images/profile/about.jpg`
- Projects: `assets/images/projects/`
- Gallery: `assets/images/gallery/`

## 📊 Performance Optimization

The site is optimized for:
- **95+ Lighthouse Score**
- **Fast First Contentful Paint**
- **Low Cumulative Layout Shift**
- **Quick First Input Delay**

Optimization techniques used:
- Critical CSS preloading
- Lazy loading images
- Optimized JavaScript
- No render-blocking resources
- Efficient animations

## 🔍 SEO Features

- Complete meta tags
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data
- XML sitemap
- Robots.txt
- Canonical URLs
- Semantic HTML
- Proper heading hierarchy

## ♿ Accessibility

- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance
- Skip to content link
- Reduced motion support

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- Extra Large: 1400px+
- Large: 1200px - 1399px
- Medium Large: 992px - 1199px
- Medium: 768px - 991px
- Small: 576px - 767px
- Extra Small: < 576px

## 🔧 Maintenance

### Regular Updates
- Update project information in `index.html`
- Add new projects to the projects section
- Update gallery with new photos
- Refresh showreel video
- Update copyright year in footer

### Performance Monitoring
Check Core Web Vitals regularly:
- Lighthouse audit
- PageSpeed Insights
- Search Console

## 📞 Contact Information

- **Email**: yigiterozan06@gmail.com
- **Instagram**: @yigiterozan_
- **Agency**: Cast Point
- **Location**: Ankara, Türkiye

## 📄 License

This portfolio website is designed for Yiğit Erozan. All rights reserved.

## 🙏 Credits

- **Design & Development**: Premium Portfolio Template
- **Inspiration**: Apple, A24 Films, Porsche, Arc Browser, Framer, Linear.app
- **Fonts**: Google Fonts (Inter)
- **Icons**: SVG icons (custom)

## 🔄 Version History

- **v1.0.0** (2024-08-05): Initial release
  - Complete portfolio website
  - All sections implemented
  - SEO optimization
  - Responsive design
  - Performance optimization

## 🐛 Known Issues

None currently. Please report any issues found.

## 🚧 Future Enhancements

Potential improvements for future versions:
- Multi-language support
- Blog section
- News/press section
- Advanced filtering for gallery
- Contact form
- Social media feed integration
- Behind-the-scenes section

## 📞 Support

For technical support or questions about this portfolio, please contact via email.

---

**Built with ❤️ for Yiğit Erozan**