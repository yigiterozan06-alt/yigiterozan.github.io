/* ===================================
   Main JavaScript - Core Functionality
   =================================== */

import { initCursor } from './cursor.js';
import { initGallery } from './gallery.js';
import { initAnimations } from './animations.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { initSEO } from './seo.js';

// Application State
const state = {
    isLoading: true,
    isMenuOpen: false,
    currentSection: 'hero',
    scrollProgress: 0
};

// DOM Elements
const elements = {
    loadingScreen: document.querySelector('.loading-screen'),
    nav: document.querySelector('.nav'),
    navToggle: document.querySelector('.nav-toggle'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    heroTitle: document.querySelector('.hero-title'),
    heroText: document.querySelectorAll('.reveal-text'),
    scrollIndicator: document.querySelector('.scroll-indicator')
};

// Initialize Application
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
}

function initApp() {
    console.log('🎬 Yiğit Erozan Portfolio - Initializing');
    
    // Initialize all modules
    initLoadingScreen();
    initNavigation();
    initCursor();
    initGallery();
    initAnimations();
    initSmoothScroll();
    initSEO();
    initVideoPlayer();
    initParallax();
    initScrollProgress();
    
    // Mark app as loaded
    state.isLoading = false;
    
    console.log('✅ Portfolio initialized successfully');
}

// Loading Screen
function initLoadingScreen() {
    if (!elements.loadingScreen) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            elements.loadingScreen.classList.add('hidden');
            
            // Trigger hero animations after loading
            setTimeout(() => {
                if (elements.heroTitle) {
                    elements.heroTitle.classList.add('animate');
                }
                
                elements.heroText.forEach((text, index) => {
                    setTimeout(() => {
                        text.classList.add('active');
                    }, 300 + (index * 150));
                });
            }, 300);
            
            // Remove loading screen from DOM after animation
            setTimeout(() => {
                elements.loadingScreen.style.display = 'none';
            }, 1000);
        }, 1500);
    });
}

// Navigation
function initNavigation() {
    if (!elements.nav || !elements.navToggle) return;
    
    // Mobile menu toggle
    elements.navToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (state.isMenuOpen) {
                toggleMenu();
            }
        });
    });
    
    // Scroll-based navigation changes
    window.addEventListener('scroll', handleNavScroll);
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.isMenuOpen) {
            toggleMenu();
        }
    });
    
    // Close menu on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991 && state.isMenuOpen) {
            toggleMenu();
        }
    });
}

function toggleMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    
    elements.navToggle.classList.toggle('active');
    elements.navMenu.classList.toggle('active');
    elements.navToggle.setAttribute('aria-expanded', state.isMenuOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
}

function handleNavScroll() {
    const scrollY = window.scrollY;
    
    // Add scrolled class when page is scrolled
    if (scrollY > 50) {
        elements.nav.classList.add('scrolled');
    } else {
        elements.nav.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            elements.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            
            state.currentSection = sectionId;
        }
    });
}

// Video Player
function initVideoPlayer() {
    const videoContainer = document.querySelector('.video-container');
    const video = videoContainer?.querySelector('video');
    const playButton = videoContainer?.querySelector('.video-play');
    
    if (!video || !playButton) return;
    
    playButton.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playButton.classList.add('hidden');
        } else {
            video.pause();
            playButton.classList.remove('hidden');
        }
    });
    
    video.addEventListener('play', () => {
        playButton.classList.add('hidden');
    });
    
    video.addEventListener('pause', () => {
        playButton.classList.remove('hidden');
    });
    
    video.addEventListener('ended', () => {
        playButton.classList.remove('hidden');
    });
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(element => {
                    const speed = 0.5;
                    const rect = element.getBoundingClientRect();
                    const scrolled = window.scrollY;
                    
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const yPos = -(scrolled * speed);
                        element.style.transform = `translateY(${yPos}px)`;
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
        state.scrollProgress = progress;
    });
}

// Keyboard Navigation
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Skip if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                navigateToNextSection();
                break;
            case 'ArrowUp':
                e.preventDefault();
                navigateToPrevSection();
                break;
            case 'Home':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'End':
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;
        }
    });
}

function navigateToNextSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentIndex = Array.from(sections).findIndex(
        section => section.getAttribute('id') === state.currentSection
    );
    
    if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function navigateToPrevSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentIndex = Array.from(sections).findIndex(
        section => section.getAttribute('id') === state.currentSection
    );
    
    if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        prevSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Log Core Web Vitals when available
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log(`[Performance] ${entry.name}:`, entry.value);
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        } catch (e) {
            console.warn('Performance monitoring not fully supported');
        }
    }
}

// Error Handling
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
    });
}

// Service Worker Registration (for PWA support)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
}

// Visibility Change Handling
function initVisibilityHandling() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Page is hidden, pause animations/videos
            document.querySelectorAll('video').forEach(video => {
                if (!video.paused) {
                    video.dataset.wasPlaying = 'true';
                    video.pause();
                }
            });
        } else {
            // Page is visible again, resume if needed
            document.querySelectorAll('video').forEach(video => {
                if (video.dataset.wasPlaying === 'true') {
                    video.play();
                    delete video.dataset.wasPlaying;
                }
            });
        }
    });
}

// Before Unload Handling
function initBeforeUnload() {
    window.addEventListener('beforeunload', () => {
        // Save any necessary state
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });
}

// Initialize additional utilities
initKeyboardNav();
initPerformanceMonitoring();
initErrorHandling();
registerServiceWorker();
initVisibilityHandling();
initBeforeUnload();

// Restore scroll position if available
window.addEventListener('load', () => {
    const savedScroll = sessionStorage.getItem('scrollPosition');
    if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll, 10));
        sessionStorage.removeItem('scrollPosition');
    }
});

// Start the application
init();

// Export for external use if needed
export { state, elements, toggleMenu };