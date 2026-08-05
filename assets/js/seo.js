/* ===================================
   SEO Enhancements
   =================================== */

// SEO State
const seoState = {
    isInitialized: false,
    performanceMetrics: {}
};

// Initialize SEO
export function initSEO() {
    seoState.isInitialized = true;
    
    // Initialize various SEO enhancements
    initMetaTags();
    initOpenGraph();
    initTwitterCards();
    initStructuredData();
    initCanonicalURL();
    initImageAltText();
    initHeadingStructure();
    initLinkAttributes();
    initPerformanceMonitoring();
    initAccessibilityEnhancements();
    initSocialSharing();
    
    console.log('🔍 SEO enhancements initialized');
}

// Initialize Meta Tags
function initMetaTags() {
    // Ensure all required meta tags are present
    const requiredMetaTags = [
        { name: 'description', content: 'Yiğit Erozan - Profesyonel Oyuncu. Ankara merkezli Türk oyuncu. Tiyatro, dizi ve film projeleri için casting ve iletişim bilgileri.' },
        { name: 'keywords', content: 'Yiğit Erozan, oyuncu, actor, Türkiye, Ankara, cast, casting, tiyatro, sinema, dizi' },
        { name: 'author', content: 'Yiğit Erozan' },
        { name: 'robots', content: 'index, follow' }
    ];
    
    requiredMetaTags.forEach(meta => {
        if (!document.querySelector(`meta[name="${meta.name}"]`)) {
            const metaTag = document.createElement('meta');
            metaTag.name = meta.name;
            metaTag.content = meta.content;
            document.head.appendChild(metaTag);
        }
    });
}

// Initialize Open Graph Tags
function initOpenGraph() {
    const ogTags = [
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:title', content: 'Yiğit Erozan - Profesyonel Oyuncu' },
        { property: 'og:description', content: 'Ankara merkezli profesyonel Türk oyuncu. Tiyatro, dizi ve film projeleri.' },
        { property: 'og:image', content: 'https://yigiterozan.com.tr/assets/images/hero/og-image.jpg' },
        { property: 'og:locale', content: 'tr_TR' }
    ];
    
    ogTags.forEach(tag => {
        if (!document.querySelector(`meta[property="${tag.property}"]`)) {
            const metaTag = document.createElement('meta');
            metaTag.setAttribute('property', tag.property);
            metaTag.content = tag.content;
            document.head.appendChild(metaTag);
        }
    });
}

// Initialize Twitter Card Tags
function initTwitterCards() {
    const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: window.location.href },
        { name: 'twitter:title', content: 'Yiğit Erozan - Profesyonel Oyuncu' },
        { name: 'twitter:description', content: 'Ankara merkezli profesyonel Türk oyuncu. Tiyatro, dizi ve film projeleri.' },
        { name: 'twitter:image', content: 'https://yigiterozan.com.tr/assets/images/hero/og-image.jpg' }
    ];
    
    twitterTags.forEach(tag => {
        if (!document.querySelector(`meta[name="${tag.name}"]`)) {
            const metaTag = document.createElement('meta');
            metaTag.name = tag.name;
            metaTag.content = tag.content;
            document.head.appendChild(metaTag);
        }
    });
}

// Initialize Structured Data (JSON-LD)
function initStructuredData() {
    // Person Schema
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Yiğit Erozan',
        'jobTitle': 'Oyuncu',
        'description': 'Profesyonel Türk oyuncu, tiyatro ve dizi projeleri',
        'url': window.location.href,
        'image': 'https://yigiterozan.com.tr/assets/images/profile/profile.jpg',
        'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'Ankara',
            'addressCountry': 'TR'
        },
        'email': 'yigiterozan06@gmail.com',
        'height': '188 cm',
        'weight': '81 kg',
        'gender': 'Male',
        'birthDate': '2006',
        'sameAs': ['https://www.instagram.com/yigiterozan_'],
        'knowsLanguage': ['Türkçe', 'İngilizce'],
        'worksFor': {
            '@type': 'Organization',
            'name': 'Cast Point'
        }
    };
    
    addStructuredData(personSchema, 'person');
    
    // WebSite Schema
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Yiğit Erozan',
        'url': window.location.href,
        'description': 'Yiğit Erozan - Profesyonel Oyuncu Portföyü',
        'inLanguage': 'tr'
    };
    
    addStructuredData(websiteSchema, 'website');
    
    // BreadcrumbList Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Ana Sayfa',
                'item': window.location.href
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Hakkımda',
                'item': `${window.location.href}#hakkimda`
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': 'Projeler',
                'item': `${window.location.href}#projeler`
            },
            {
                '@type': 'ListItem',
                'position': 4,
                'name': 'Galeri',
                'item': `${window.location.href}#galeri`
            },
            {
                '@type': 'ListItem',
                'position': 5,
                'name': 'İletişim',
                'item': `${window.location.href}#iletisim`
            }
        ]
    };
    
    addStructuredData(breadcrumbSchema, 'breadcrumbs');
}

// Add Structured Data to Page
function addStructuredData(data, id) {
    const scriptId = `structured-data-${id}`;
    
    // Remove existing if present
    const existing = document.getElementById(scriptId);
    if (existing) {
        existing.remove();
    }
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
}

// Initialize Canonical URL
function initCanonicalURL() {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    
    canonicalLink.href = window.location.href;
}

// Initialize Image Alt Text
function initImageAltText() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.alt) {
            // Generate descriptive alt text from src
            const src = img.src;
            const filename = src.split('/').pop();
            const altText = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
            img.alt = altText || 'Yiğit Erozan portfolio image';
        }
    });
}

// Initialize Heading Structure
function initHeadingStructure() {
    // Ensure proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let currentLevel = 0;
    
    headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        
        // Ensure headings don't skip levels
        if (level > currentLevel + 1 && currentLevel !== 0) {
            console.warn(`Heading skipped from h${currentLevel} to h${level}:`, heading.textContent);
        }
        
        currentLevel = level;
    });
}

// Initialize Link Attributes
function initLinkAttributes() {
    // Add rel="noopener noreferrer" to external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        if (!link.rel.includes('noopener')) {
            link.rel += ' noopener';
        }
        if (!link.rel.includes('noreferrer')) {
            link.rel += ' noreferrer';
        }
    });
    
    // Add target="_blank" to external links
    externalLinks.forEach(link => {
        if (link.hostname !== window.location.hostname) {
            link.target = '_blank';
        }
    });
}

// Initialize Performance Monitoring
function initPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
        try {
            // Monitor Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                seoState.performanceMetrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
                console.log(`LCP: ${seoState.performanceMetrics.lcp}ms`);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Monitor First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                seoState.performanceMetrics.fid = entries[0].processingStart - entries[0].startTime;
                console.log(`FID: ${seoState.performanceMetrics.fid}ms`);
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
            
            // Monitor Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
                let clsValue = 0;
                list.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                seoState.performanceMetrics.cls = clsValue;
                console.log(`CLS: ${seoState.performanceMetrics.cls}`);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
            
        } catch (e) {
            console.warn('Performance monitoring not fully supported:', e);
        }
    }
}

// Initialize Accessibility Enhancements
function initAccessibilityEnhancements() {
    // Add lang attribute to html if missing
    if (!document.documentElement.getAttribute('lang')) {
        document.documentElement.setAttribute('lang', 'tr');
    }
    
    // Ensure all interactive elements have aria-labels where needed
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        const text = button.textContent.trim();
        if (text) {
            button.setAttribute('aria-label', text);
        }
    });
    
    // Add skip to main content link
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Ana içeriğe geç';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #000;
            color: #fff;
            padding: 8px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Initialize Social Sharing
function initSocialSharing() {
    // Update URL parameters on page load
    const urlParams = new URLSearchParams(window.location.search);
    
    // Track source if present
    const source = urlParams.get('source');
    if (source) {
        sessionStorage.setItem('trafficSource', source);
    }
}

// Update Page Title
export function updatePageTitle(title) {
    document.title = `${title} | Yiğit Erozan`;
    
    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = document.title;
    }
    
    // Update Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
        twitterTitle.content = document.title;
    }
}

// Update Meta Description
export function updateMetaDescription(description) {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = description;
    }
    
    // Update Open Graph description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.content = description;
    }
    
    // Update Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
        twitterDescription.content = description;
    }
}

// Track Page View
export function trackPageView() {
    // This can be integrated with analytics
    console.log('Page view tracked:', window.location.href);
    
    // Update canonical URL
    initCanonicalURL();
}

// Get Performance Metrics
export function getPerformanceMetrics() {
    return seoState.performanceMetrics;
}

// Generate Share URL
export function generateShareUrl(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const description = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || '');
    
    switch (platform) {
        case 'twitter':
            return `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        case 'facebook':
            return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        case 'linkedin':
            return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        case 'whatsapp':
            return `https://wa.me/?text=${title}%20${url}`;
        default:
            return url;
    }
}

// Export SEO state for external use
export { seoState };